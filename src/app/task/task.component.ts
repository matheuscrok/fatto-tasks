import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: any = [];
  edit: any = false;
  new: any = false;
  hide = true;
  loading = true;
  selected: any = {};

  task: any = {
    nome: '',
    custo: '',
    dataLimite: '',
    ordemApresentacao: 0,
  };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  add(obj: any) {
    this.taskService.adicionar(obj).subscribe({
      next: (data) => {
        this.getTasks();
        console.log(data);
      },
      error: (err) => {
        this.getTasks();
      },
      complete: () => {},
    });
  }

  update(obj: any, id: string) {
    this.taskService.update(obj, id).subscribe({
      next: (data) => {
        this.getTasks();
        console.log(data);
      },
      error: (err) => {
        this.getTasks();
      },
      complete: () => {},
    });
  }

  excluir(tsk: string) {
    var resultado = confirm('Deseja excluir a tarefa?');
    if (resultado == true) {
      this.taskService.excluir(tsk);
      alert('Tarefa excluída da lista!');
    } else {
      alert('Você desistiu de excluir a tarefa da lista!');
    }

    this.getTasks();
  }

  onEdit(objNome: any, objData: any, objCusto: any) {
    if (objNome === '' || objData === '' || objCusto === '') {
      alert('Preencha todos os campos!');
    } else {
      this.loading = false;
      let find: any = this.tasks.find((x: any) => x.nome === objNome);
      console.log(find);
      this.task.nome = objNome;
      this.task.dataLimite = objData;
      this.task.custo = objCusto;
      this.task.ordemApresentacao = find.ordemApresentacao;
      this.update(this.task, find.id);
    }
  }

  onSubmit(objNome: any, objData: any, objCusto: any) {
    if(this.tasks.find((x: any) => x.nome === objNome)){
      alert('Tarefa já existe na lista!');
    }
    if (objNome === '' || objData === '' || objCusto === '') {
      alert('Preencha todos os campos!');
    } else {
      this.loading = false;
      console.log(objNome, objData, objCusto);
      this.task.nome = objNome;
      this.task.dataLimite = objData;
      this.task.custo = objCusto;
      this.task.ordemApresentacao = this.tasks.length + 1;
      this.add(this.task);
    }
  }

  editar(data: any) {
    this.edit = !this.edit;

    this.selected = data;

    console.log(this.selected);

    // this.taskService.adicionar(this.tasks);

    // this.getTasks();
  }

  getTasks() {
    this.loading = false;
    this.taskService.listar().subscribe((data) => {
      this.tasks = data.sort((a: any, b: any) =>
        a.ordemApresentacao > b.ordemApresentacao ? 1 : -1
      );
      console.log('lista ordenada: ', this.tasks);
      setTimeout(() => {
        this.loading = true;
      }, 300);
    });
  }

  getColor(custo: any): any {
    if (custo > 1000) {
      return 'yellow';
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
