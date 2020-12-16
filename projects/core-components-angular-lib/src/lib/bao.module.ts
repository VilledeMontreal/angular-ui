import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert/module';
import { BaoBadgeModule } from './badge/module';
import { BaoSnackBarModule } from './snack-bar/module';

@NgModule({
  imports: [BaoAlertModule, BaoBadgeModule, BaoSnackBarModule],
  exports: [BaoAlertModule, BaoBadgeModule, BaoSnackBarModule]
})
export class BaoModule {}
