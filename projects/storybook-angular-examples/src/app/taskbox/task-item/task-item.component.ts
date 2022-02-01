import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-item',
  template: `
      <bao-list-item>
          <bao-checkbox
            (click)="onArchive(task.id)"
            [disabled]="task?.state === 'TASK_ARCHIVED'"
            [checked]="task?.state === 'TASK_ARCHIVED'"
            [id]="task.id"
          >
          <span bao-list-item-title (click)="onArchive(task.id)" attr.aria-label="archiveTask-{{ task?.id }}">{{task.title}}</span>  
          </bao-checkbox>
          <div class="actions">
            <a *ngIf="task?.state !== 'TASK_ARCHIVED'" (click)="onPin(task.id)" class="{{ task?.state }}">
              <bao-icon baoIconTag
                title="paperclip" size="xx-small"
                svgIcon="icon-paperclip"
              ></bao-icon>
            </a>
          </div>
      </bao-list-item>
  `,
})
export class TaskItemComponent {
  @Input() task: Task;

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onPinTask = new EventEmitter<Event>();

  // tslint:disable-next-line: no-output-on-prefix
  @Output()
  onArchiveTask = new EventEmitter<Event>();
  
  /**
   * Component method to trigger the onPin event
   * @param id string
   */
  onPin(id: any) {
    this.onPinTask.emit(id);
  }
  /**
   * Component method to trigger the onArchive event
   * @param id string
   */
  onArchive(id: any) {
    this.onArchiveTask.emit(id);
  }
}