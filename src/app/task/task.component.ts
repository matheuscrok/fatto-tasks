import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: any=[];

 
  

  
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.listar().subscribe(data => {
      this.tasks=data.sort((a:any, b:any) => (a.ordemApresentacao > b.ordemApresentacao) ? 1 : -1)
    });
    this.ordemApresentacao()
  }

  add(){
    this.taskService.adicionar(this.tasks);
    this.getTasks();
  }

  excluir(tsk: string){
    this.taskService.excluir(tsk);
    this.getTasks();
  }

  editar(){
    this.taskService.adicionar(this.tasks);
    this.getTasks();
  }

  getTasks(){
    this.taskService.listar().subscribe(data => {
      this.tasks=data.sort((a:any, b:any) => (a.ordemApresentacao > b.ordemApresentacao) ? 1 : -1)
    });
  }

  getColor(task:any):any{
    if(task>1000){
      return 'yellow'
    }
  }

  ordemApresentacao(){
    this.tasks=this.tasks.sort((a:any,b:any)=> a.ordemApresentacao.localeCompare(b.ordemApresentacao))
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
}
