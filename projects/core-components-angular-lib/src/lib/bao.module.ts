import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert/module';
import { BaoBreadcrumbModule } from './breadcrumb/module';
import { BaoButtonModule } from './button/module';
import { BaoCardModule } from './card/module';
import { BaoHeaderInfoModule } from './header-info/module';
import { BaoIconModule } from './icon/module';
import { BaoListModule } from './list/module';
import { BaoTagModule } from './tag/module';

@NgModule({
  imports: [BaoIconModule, BaoButtonModule, BaoAlertModule, BaoCardModule, BaoBreadcrumbModule],
  exports: [
    BaoIconModule,
    BaoButtonModule,
    BaoAlertModule,
    BaoBreadcrumbModule,
    BaoCardModule,
    BaoTagModule,
    BaoHeaderInfoModule,
    BaoListModule
    // TODO: reactivate once component does not depend on global css BaoBadgeModule,
    // TODO: reactivate once component does not depend on global css BaoSnackBarModule,
  ]
})
export class BaoModule {}
