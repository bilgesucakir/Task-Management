import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { NgPopupsModule } from 'ng-popups';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';



import { AppComponent } from './app.component';
import { TasksCreateComponent } from './tasksrelated/tasks-create.component';
import { TasksUpdateComponent } from './tasksrelated/tasks-update.component';
import { HeaderComponent } from './header/header.component';
import { TasksListComponent } from './tasksrelated/tasks-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ExpiredPipe } from './tasksrelated/tasks-list.component';
import { InProgressPipe } from './tasksrelated/tasks-list.component';
import { SortPipe } from './tasksrelated/tasks-list.component';
import { SortAndInProgressPipe } from './tasksrelated/tasks-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksCreateComponent,
    HeaderComponent,
    TasksListComponent,
    TasksUpdateComponent,
    ExpiredPipe,
    InProgressPipe,
    SortPipe,
    SortAndInProgressPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatRadioModule,
    HttpClientModule,
    AppRoutingModule,
    NgPopupsModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTooltipModule,
    MatCheckboxModule
    ],
  providers: [NgPopupsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
