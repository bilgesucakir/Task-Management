import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TasksService } from './tasks.service';
import { Task } from "./task.model";
import { NgPopupsService } from 'ng-popups';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['tasks-create.component.css']
})

export class TasksCreateComponent implements OnInit{
  enteredTaskName = '';
  enteredTaskContent = '';
  enteredTaskStatus = '';
  public valid =  true;
  private mode = 'create';
  private taskId: string;
  task: Task;

  constructor(public tasksService: TasksService, public route: ActivatedRoute, public popupsService: NgPopupsService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {  //paramMap: observable that can subscribe
      if(paramMap.has('taskId')){ //for now this will never be the case but this piece of code is kept for convienience for now.
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

    this.valid = true; //it is set to true to avoid confusion in each form saving attempt
    if(form.invalid){
      return;
    }
    if(this.mode === 'create'){

      //check validity of the range (start cannot be bigger than end)
      const start = new Date(form.value.startDateTask);
      const end = new Date(form.value.endDateTask);
      if(start.getDate() != end.getDate() || start.getMonth() != end.getMonth() || start.getFullYear() != end.getFullYear()){ 
        //they might have the same day but different hour and minute info, they are considered equal since datepicker does not 
        //collect hour or minute info and having the same day is valid
        if(start > end){
          this.valid = false;//this is the case where end date is smaller than the start date
        }
      }

      if(this.valid){ //after the validity check in the upper part, if it is valid then form can be saved now
        console.log("valid");
        this.tasksService.addTask(form.value.nameTask, form.value.contentTask, form.value.statusTask, new Date(form.value.startDateTask), new Date(form.value.endDateTask));
        this.popupsService.alert('Your task is created and saved successfully.', {
          theme: 'dark',
          okButtonText: 'OK',
          title: 'Success',
          color: '#69f0ae',
        });
      }
      else{
        return;
      }
    }
    else{ //This will never be the case but this piece of code is kept for convienience for now.
      this.tasksService.updateTask(this.taskId, form.value.nameTask, form.value.contentTask, form.value.statusTask, new Date(form.value.startDateTask), new Date(form.value.endDateTask));
      this.popupsService.alert('Your task is updated and saved successfully.', {
        theme: 'dark',
        okButtonText: 'OK',
        title: 'Success',
        color: '#69f0ae',
      });
    } //mode == edit is currently connected to tasks-update component, two modes are on seperated components now

    form.resetForm();
  }
}
