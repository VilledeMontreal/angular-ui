import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert/module';
import { BaoButtonModule } from './button/module';
import { BaoCardModule } from './card/module';
import { BaoIconModule } from './icon/module';

@NgModule({
  imports: [BaoIconModule, BaoButtonModule, BaoAlertModule, BaoCardModule],
  exports: [
    BaoIconModule,
    BaoButtonModule,
    BaoAlertModule
    // TODO: reactivate once component does not depend on global css BaoCardModule
    // TODO: reactivate once component does not depend on global css BaoBadgeModule,
    // TODO: reactivate once component does not depend on global css BaoSnackBarModule,
    // TODO: reactivate once component does not depend on global css BaoHeaderInfoModule
  ]
})
export class BaoModule {}
