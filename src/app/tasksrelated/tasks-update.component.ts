import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TasksService } from './tasks.service';
import { Task } from "./task.model";
import { NgPopupsService } from 'ng-popups';

@Component({                                         //this defines a basic component
  selector: 'app-tasks-update',
  templateUrl: './tasks-update.component.html',
  styleUrls: ['tasks-update.component.css']
})

export class TasksUpdateComponent implements OnInit{
  enteredTaskName = '';
  enteredTaskContent = '';
  enteredTaskStatus = '';
  private mode = 'create';
  private taskId: string;
  task: Task;

  constructor(public tasksService: TasksService, public route: ActivatedRoute, public popupsService: NgPopupsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {  //paramMap: observable that can subscribe
      if(paramMap.has('taskId')){
        this.mode = 'edit';
        this.taskId = paramMap.get('taskId');
        this.tasksService.getTask(this.taskId).subscribe(taskData => {
          this.task = {id: taskData._id, name: taskData.name, content: taskData.content, status: taskData.status, startdate: new Date(taskData.startdate), enddate: new Date(taskData.enddate)};
        });
      }
      else{
        this.mode = 'create';
        this.taskId = null;
      }
    });

  }

  onSaveTask(form: NgForm){

    if(form.invalid){
      console.log("Invalid form.");
      return;
    }
    if(this.mode !== 'create'){
      this.tasksService.updateTask(this.taskId, form.value.nameTask, form.value.contentTask, form.value.statusTask, new Date(this.task.startdate), new Date(this.task.enddate));
      this.popupsService.alert('Your task is updated and saved successfully.', {
        theme: 'dark',
        okButtonText: 'OK',
        title: 'Success',
        color: '#69f0ae',
      });
    }
    else{
      console.log("somehting went wrong.");
      //in this component mode should never be equal to create, currently it is connected to tasks-create. 
      //This case is almost impossible but it is kept for just to be sure
    }

    form.resetForm();
  }
}
