import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert/module';
import { BaoBadgeModule } from './badge/module';
import { BaoCardModule } from './card/module';
import { BaoHeaderInfoModule } from './header-info/module';
import { BaoSnackBarModule } from './snack-bar/module';

@NgModule({
  imports: [BaoAlertModule, BaoBadgeModule, BaoSnackBarModule, BaoCardModule, BaoHeaderInfoModule],
  exports: [BaoAlertModule, BaoBadgeModule, BaoSnackBarModule, BaoCardModule, BaoHeaderInfoModule]
})
export class BaoModule {}
