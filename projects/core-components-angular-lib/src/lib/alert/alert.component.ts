import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() public type: '' | 'success' | 'danger' | 'warning' | 'info' = '';
  @Input() public title: string;
  @Input() public dismissible = false;
  @Input() public showIcon = false;
}
