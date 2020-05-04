import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooComponent } from './foo/foo.component';
import { AlertComponent } from './alert/alert.component';
import { AlertTypeToAlertClassPipe } from './alert/alert-type-to-alert-class.pipe';
import { AlertTypeToAlertIconClassPipe } from './alert/alert-type-to-alert-icon-class.pipe';



@NgModule({
  declarations: [FooComponent, AlertComponent, AlertTypeToAlertClassPipe, AlertTypeToAlertIconClassPipe],
  imports: [CommonModule],
  exports: []
})
export class CoreAngularComponentsLibModule { }
