/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert';
import { BaoBreadcrumbModule } from './breadcrumb';
import { BaoButtonModule } from './button';
import { BaoCardModule } from './card';
import { BaoCheckboxModule } from './checkbox';
import { BaoCommonComponentsModule } from './common-components';
import { BaoHeaderInfoModule } from './header-info';
import { BaoIconModule } from './icon';
import { BaoListModule } from './list';
import { BaoRadioModule } from './radio';
import { BaoTagModule } from './tag';
import { BaoSummaryModule } from './summary';
import { BaoAvatarModule } from './avatar';
import { BaoTabsModule } from './tabs';
import { BaoModalModule } from './modal/module';
import { BaoHyperlinkModule } from './hyperlink';
import { BaoDropdownMenuModule } from './dropdown-menu';
import { BaoFileModule } from './file/module';

@NgModule({
  imports: [
    BaoIconModule,
    BaoButtonModule,
    BaoAlertModule,
    BaoCardModule,
    BaoBreadcrumbModule,
    BaoModalModule
  ],
  exports: [
    BaoIconModule,
    BaoButtonModule,
    BaoAlertModule,
    BaoBreadcrumbModule,
    BaoCardModule,
    BaoTagModule,
    BaoHeaderInfoModule,
    BaoListModule,
    BaoCommonComponentsModule,
    BaoCheckboxModule,
    BaoRadioModule,
    BaoSummaryModule,
    BaoAvatarModule,
    BaoTabsModule,
    BaoModalModule,
    BaoHyperlinkModule,
    BaoDropdownMenuModule,
    BaoFileModule
    // TODO: reactivate once component does not depend on global css BaoBadgeModule,
    // TODO: reactivate once component does not depend on global css BaoSnackBarModule,
  ]
})
export class BaoModule {}
