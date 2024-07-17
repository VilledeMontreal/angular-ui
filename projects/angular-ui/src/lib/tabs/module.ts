/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoTablistComponent,
  BaoTabHeader,
  BaoTabPanel,
  BaoTabsContainer
} from './tabs.component';

const TABS_DIRECTIVES = [
  BaoTabsContainer,
  BaoTablistComponent,
  BaoTabHeader,
  BaoTabPanel
];

@NgModule({
  imports: [CommonModule],
  declarations: [TABS_DIRECTIVES],
  exports: [TABS_DIRECTIVES]
})
export class BaoTabsModule {}
