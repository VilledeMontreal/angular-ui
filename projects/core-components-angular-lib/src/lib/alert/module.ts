import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoAlertActions, BaoAlertComponent, BaoAlertContent, BaoAlertLink, BaoAlertTitle } from './alert.component';

const ALERT_DIRECTIVES = [BaoAlertTitle, BaoAlertContent, BaoAlertActions, BaoAlertLink, BaoAlertComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [ALERT_DIRECTIVES],
  exports: [ALERT_DIRECTIVES]
})
export class BaoAlertModule {}
