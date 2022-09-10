import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { Subscription } from 'rxjs';
import { NgPopupsService } from 'ng-popups';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})

export class TasksListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private tasksSub: Subscription;
  isConfirmed: boolean = false;
  isChecked: boolean = false;

  constructor(public tasksService: TasksService, public popupsService: NgPopupsService){} //added ngPopups
  ngOnInit() {

    this.tasksService.getTasks();
    this.tasksSub = this.tasksService.getTasksUpdateListener().subscribe((tasks: Task[]) => {this.tasks = tasks;});
  }

  onDelete(taskIdToDelete: string){

    this.popupsService.confirm('Are you sure you want to delete this task?', {
      theme: 'dark',
      okButtonText: 'Yes',
      cancelButtonText: 'No',
      title: 'Warning',
      color: '#ff3232',

    })
    .subscribe(res => {
      if (res) { //yes
        console.log("deletion confirmed. Now the process starts.");
        this.isConfirmed = true;
        this.tasksService.deleteTask(taskIdToDelete);
      } else { //no
        console.log('deletion cancelled. Nothing happens.');
      }
    });
  }

  ngOnDestroy()  {
    this.tasksSub.unsubscribe();    //to remove the subscription and to prevent memory leaks
  }

}

//pipelines
@Pipe({ name: 'expiredpipe' })
export class ExpiredPipe implements PipeTransform {
  transform(endDatePipe: Date) {
    var toReturn = null;

    const now = new Date();
    const year = Number(endDatePipe.toString().substring(0,4));
    const month = Number(endDatePipe.toString().substring(5,7));
    const day = Number(endDatePipe.toString().substring(8,10));
    const endingDate = new Date(year, month - 1, day);

    if(!(endingDate.getDate() == now.getDate() && endingDate.getMonth() == now.getMonth() && endingDate.getFullYear() == now.getFullYear())){
      if(endingDate < now){
        toReturn = "Expired";
      }
    }

    return toReturn;
  }
}
@Pipe({ name: 'inprogresspipe' }) //checks if given array has any task that its status is in progress or not
export class InProgressPipe implements PipeTransform {
  transform(tasksArray: Array<Task>) {

    for(let theTask of tasksArray){
      if(theTask.status === 'In progress'){
        return true;
      }
    }

    return false;
  }
}
@Pipe({ name: 'sortpipe' })
export class SortPipe implements PipeTransform {
  transform(tasksArray: Array<Task>) {

    tasksArray.sort((a, b) => (a.enddate < b.enddate ? -1 : 1));
    return tasksArray;
  }
}
@Pipe({ name: 'sortandinprogresspipe' })
export class SortAndInProgressPipe implements PipeTransform {
  transform(tasksArray: Array<Task>) {

    function isInProgress(arrayElem: Task){
      if(arrayElem.status == "In progress"){
        return true;
      }
      else{
        return false;
      }
    }

    tasksArray.sort((a, b) => (a.enddate < b.enddate ? -1 : 1));
    let filteredTasksArray = tasksArray.filter(isInProgress);

    return filteredTasksArray;
  }
}
//pipelines
