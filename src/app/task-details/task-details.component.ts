import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{

  @Input() task: Task;
  @Output() updateRequest: EventEmitter<Task> = new EventEmitter();
  @Output() deleteRequest: EventEmitter<number> = new EventEmitter();

  private oldTitle: string;
  private changesDetected: boolean;

  constructor() {}

   ngOnInit(): void {
    this.oldTitle = this.task.title;
    this.changesDetected = false;
  }

  updateTask(id: number, task: Task): void {
    task.id = id;
    this.updateRequest.emit(task);
  }

  deleteTask(id: number): void {
    this.deleteRequest.emit(id);
  }

  checkChanges(): void{
    if(this.task.title != this.oldTitle){
      this.changesDetected = true;
    }
  }
}
