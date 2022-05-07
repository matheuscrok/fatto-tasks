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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }
  
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.taskService.listar().subscribe(data => {
      this.tasks=data
      console.log(data)
    });
  }

  getTasks(){
    this.taskService.listar().subscribe(data => {
      this.tasks=data
      console.log(data)
    });
  }
}
