import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksCreateComponent } from './tasksrelated/tasks-create.component';
import { TasksUpdateComponent } from './tasksrelated/tasks-update.component';
import { TasksListComponent } from './tasksrelated/tasks-list.component';

const routes: Routes = [
  { path: '', component: TasksListComponent},  //empty path = main or root page
  { path: 'create', component: TasksCreateComponent }, //do not add the slash
  { path: 'edit/:taskId', component: TasksUpdateComponent }
]; //currently, create and edit modes are handled on different components

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
