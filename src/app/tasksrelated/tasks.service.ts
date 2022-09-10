import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TasksService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  getTasks(){
    this.http.get<{message: string, tasks: any}>('http://localhost:3000/api/tasks')
    .pipe(map(taskData => {
      return taskData.tasks.map(task => {
        return {
          name: task.name,
          content: task.content,
          status: task.status,
          id: task._id,
          startdate: task.startdate,
          enddate: task.enddate
        };
      });
    }))
    .subscribe((transformedtasks) => {
      this.tasks = transformedtasks;
      this.tasksUpdated.next([...this.tasks]);
    });
  }

  getTasksUpdateListener(){
    return this.tasksUpdated.asObservable();
  }

  addTask(name: string, content: string, status: string, startdate: Date, enddate: Date){
    const task: Task = {id: null, name: name, content: content, status: status, startdate: startdate, enddate: enddate};
    this.http.post<{message: string, taskId}>("http://localhost:3000/api/tasks", task)
    .subscribe((responseData) => {
      const id = responseData.taskId;
      task.id = id;
      this.tasks.push(task);
      this.tasksUpdated.next([...this.tasks]);

    });
  }

  getTaskUpdateListener(){
    return this.tasksUpdated.asObservable();
  }

  getTask(id: string){
    return this.http.get<{_id: string, name: string, content: string, status: string, startdate: Date, enddate: Date}>("http://localhost:3000/api/tasks/" + id);
  }

  deleteTask(taskId: string){
    this.http.delete("http://localhost:3000/api/tasks/" + taskId)
      .subscribe(() => {
        const updatedTasks = this.tasks.filter(task => task.id !== taskId);
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
      });
  }

  updateTask(id: string, name: string, content: string, status: string, startdate: Date, enddate: Date){
    const task: Task = {id: id, name: name, content: content, status: status, startdate: startdate, enddate: enddate};
    this.http.put("http://localhost:3000/api/tasks/" + id, task)
    .subscribe(response => {
      const updatedTasks = [...this.tasks];
      const oldTaskIndex = updatedTasks.findIndex(t => t.id === task.id);
      updatedTasks[oldTaskIndex] = task;

      this.tasks = updatedTasks;
      this.tasksUpdated.next([...this.tasks]);

    });
  }

}
