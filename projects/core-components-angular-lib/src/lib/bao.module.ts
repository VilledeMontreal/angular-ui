import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert/module';
import { BaoBadgeModule } from './badge/module';

@NgModule({
  imports: [BaoAlertModule, BaoBadgeModule],
  exports: [BaoAlertModule, BaoBadgeModule],
  declarations: []
})
export class BaoModule {}
