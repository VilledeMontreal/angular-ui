import { Component, Input } from '@angular/core';

@Component({
  selector: 'bao-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() public type: '' | 'success' | 'danger' | 'warning' | 'info' = '';
  @Input() public title: string;
  @Input() public dismissible = false;
  @Input() public showIcon = false;
}
