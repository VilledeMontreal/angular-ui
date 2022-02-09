import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { BaoModule } from 'core-components-angular-lib';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksState } from './state/task.state';
import { PureTaskListComponent } from './task-list/pure-task-list.component';

@NgModule({
  imports: [BaoModule, CommonModule, NgxsModule.forFeature([TasksState])],
  exports: [TaskItemComponent, TaskListComponent],
  declarations: [TaskItemComponent, TaskListComponent, PureTaskListComponent],
  providers: []
})
export class TaskModule {}
