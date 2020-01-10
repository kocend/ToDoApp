import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  private tasksToDo: Task[];
  private tasksDone: Task[];

  private newTaskTitle: string;

  constructor(private storageService: LocalStorageService) {}

  ngOnInit() {
    this.updateLists();
  }

  addTask(): void {
    if (this.newTaskTitle != null 
        && this.newTaskTitle != undefined 
        && this.newTaskTitle.trim().length > 0) {

      this.storageService.saveTask({
        id: 0,
        title: this.newTaskTitle,
        isDone: false
      })

      this.updateLists();

      this.newTaskTitle = "";
    }
  }

  updateTask(task: Task): void {
    this.storageService.updateTask(task.id, task);
    this.updateLists();
  }

  deleteTask(id: number): void {
    this.storageService.deleteTask(id);
    this.updateLists();
  }

  updateLists(): void {
    this.tasksToDo = this.storageService.getAllTasks().filter(task => task.isDone == false);
    this.tasksDone = this.storageService.getAllTasks().filter(task => task.isDone == true);
  }
}
