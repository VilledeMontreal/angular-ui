/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { NgModule } from '@angular/core';
import { BaoAlertModule } from './alert';
import { BaoAvatarModule } from './avatar';
import { BaoBreadcrumbModule } from './breadcrumb';
import { BaoButtonModule } from './button';
import { BaoCardModule } from './card';
import { BaoCheckboxModule } from './checkbox';
import { BaoCommonComponentsModule } from './common-components';
import { BaoDropdownMenuModule } from './dropdown-menu';
import { BaoFileModule } from './file/module';
import { BaoHeaderInfoModule } from './header-info';
import { BaoHyperlinkModule } from './hyperlink';
import { BaoIconModule } from './icon';
import { BaoListModule } from './list';
import { BaoMessageBarModule } from './message-bar';
import { BaoModalModule } from './modal/module';
import { BaoPaginationModule } from './pagination';
import { BaoRadioModule } from './radio';
import { BaoSnackBarModule } from './snack-bar/module';
import { BaoSummaryModule } from './summary';
import { BaoSystemHeaderModule } from './system-header';
import { BaoTabsModule } from './tabs';
import { BaoTagModule } from './tag';

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
    BaoFileModule,
    BaoSnackBarModule,
    BaoSystemHeaderModule,
    BaoMessageBarModule,
    BaoPaginationModule
  ]
})
export class BaoModule {}
