import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertTypeToAlertClassPipe } from './alert/alert-type-to-alert-class.pipe';
import { AlertTypeToAlertIconClassPipe } from './alert/alert-type-to-alert-icon-class.pipe';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [AlertComponent, AlertTypeToAlertClassPipe, AlertTypeToAlertIconClassPipe],
  imports: [CommonModule],
  exports: [AlertComponent, AlertTypeToAlertClassPipe, AlertTypeToAlertIconClassPipe]
})
export class BaoModule {}
