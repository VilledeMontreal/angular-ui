import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert/module';
import { BaoBreadcrumbModule } from './breadcrumb/module';
import { BaoButtonModule } from './button/module';
import { BaoCardModule } from './card/module';
import { BaoCheckboxModule } from './checkbox';
import { BaoCommonComponentsModule } from './common-components/module';
import { BaoHeaderInfoModule } from './header-info/module';
import { BaoIconModule } from './icon/module';
import { BaoListModule } from './list/module';
import { BaoRadioModule } from './radio';
import { BaoTagModule } from './tag/module';

@NgModule({
  imports: [
    BaoIconModule,
    BaoButtonModule,
    BaoAlertModule,
    BaoBreadcrumbModule,
    BaoCardModule,
    BaoCheckboxModule,
    BaoRadioModule
  ],
  exports: [
    BaoIconModule,
    BaoButtonModule,
    BaoAlertModule,
    BaoBreadcrumbModule,
    BaoCardModule,
    BaoCheckboxModule,
    BaoRadioModule,
    BaoTagModule,
    BaoHeaderInfoModule,
    BaoListModule,
    BaoCommonComponentsModule
    // TODO: reactivate once component does not depend on global css BaoBadgeModule,
    // TODO: reactivate once component does not depend on global css BaoSnackBarModule,
  ]
})
export class BaoModule {}
