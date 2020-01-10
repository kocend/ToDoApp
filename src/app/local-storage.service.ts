import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private KEY_TODO_TASKS = "local_todo_tasks";
  private lastID: number;

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    let tasks = this.storage.get(this.KEY_TODO_TASKS) || [];
    this.lastID = 0;
    tasks.forEach(task => {
      if(task.id>this.lastID){
        this.lastID = task.id;
      }
    })
   }

  public saveTask(task: Task): void{
    task.id = ++this.lastID;
    let tasks = this.storage.get(this.KEY_TODO_TASKS) || [];
    tasks.push(task);
    this.storage.set(this.KEY_TODO_TASKS,tasks);
  }

  public updateTask(id: number, updatedTask: Task): void{
    let tasks = this.getAllTasks() || [];
    tasks.map(task => {
      if(task.id == id){
        task.title = updatedTask.title;
        task.isDone = updatedTask.isDone;
      }
    });
    this.storage.set(this.KEY_TODO_TASKS, tasks);
  }

  public deleteTask(id: number): void{
    let tasks = this.getAllTasks();
    let task = tasks.find(task =>task.id==id);
    tasks.splice(tasks.indexOf(task),1);
    this.storage.set(this.KEY_TODO_TASKS,tasks);
  }

  public getAllTasks():Task [] {
    return this.storage.get(this.KEY_TODO_TASKS) || [];
  }
}

