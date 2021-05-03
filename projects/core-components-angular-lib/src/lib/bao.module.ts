import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert/module';
import { BaoBadgeModule } from './badge/module';
import { BaoButtontModule } from './button/module';
import { BaoCardModule } from './card/module';
import { BaoHeaderInfoModule } from './header-info/module';
import { BaoSnackBarModule } from './snack-bar/module';

@NgModule({
  imports: [BaoButtontModule, BaoAlertModule, BaoBadgeModule, BaoSnackBarModule, BaoCardModule, BaoHeaderInfoModule],
  exports: [BaoButtontModule, BaoAlertModule, BaoBadgeModule, BaoSnackBarModule, BaoCardModule, BaoHeaderInfoModule]
})
export class BaoModule {}
