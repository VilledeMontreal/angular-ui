import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  styles: [
    `
      /* TASKBOX APP  */
      .bao-list-item-content .actions {
        transition: all 200ms ease-in;
        padding-right: 20px;
        position: absolute;
      }
      .bao-list-item-content .actions a,
      .actions a {
        position: relative;
        left: 900px;
        top: 10px;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        cursor: pointer;
        color: #eee;
      }

      .bao-list-item-content .actions a,
      .actions a.PIN_TASK {
        color: #097d6c;
      }

      .actions a {
        border: 0;
      }

      .actions {
        position: absolute;
      }

      .bao-list-item-content .actions .bao-icon {
        font-size: 16px;
        line-height: 24px;
        line-height: 3rem;
        text-align: center;
      }
      .bao-list-item-content .bao-icon {
        color: #a6a9a871;
      }

      .bao-checkbox,
      .bao-list-item-text,
      .bao-checkbox label.bao-checkbox-content-container:after,
      .bao-list-item-title {
        cursor: pointer;
      }
      .bao-list-item-content + .bao-list-item-content {
        border-top: 1px solid #f0f9fb;
      }
    `
  ],
  selector: 'app-task-item',
  template: `
    <bao-list-item>
      <bao-checkbox
        (click)="onArchive(task.id)"
        [disabled]="task?.state === 'TASK_ARCHIVED'"
        [checked]="task?.state === 'TASK_ARCHIVED'"
        [id]="task.id"
      >
        <span
          bao-list-item-title
          (click)="onArchive(task.id)"
          attr.aria-label="archiveTask-{{ task?.id }}"
          >{{ task.title }}</span
        >
      </bao-checkbox>
      <div class="actions">
        <a
          *ngIf="task?.state !== 'TASK_ARCHIVED'"
          (click)="onPin(task.id)"
          class="{{ task?.state }}"
        >
          <bao-icon
            baoIconTag
            title="paperclip"
            size="xx-small"
            svgIcon="icon-paperclip"
          ></bao-icon>
        </a>
      </div>
    </bao-list-item>
  `
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
