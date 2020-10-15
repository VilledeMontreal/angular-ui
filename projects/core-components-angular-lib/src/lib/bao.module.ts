import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert/module';

@NgModule({
  imports: [BaoAlertModule],
  exports: [BaoAlertModule]
})
export class BaoModule {}
