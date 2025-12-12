/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoBackNavigationInsert,
  BaoSystemHeaderComponent,
  BaoBackNavigationComponent
} from './system-header.component';
import { BaoIconModule } from '../icon';

const SYSTEM_HEADER_DIRECTIVES = [
  BaoSystemHeaderComponent,
  BaoBackNavigationInsert,
  BaoBackNavigationComponent
];

@NgModule({
  imports: [CommonModule, BaoIconModule],
  declarations: [SYSTEM_HEADER_DIRECTIVES],
  exports: [SYSTEM_HEADER_DIRECTIVES]
})
export class BaoSystemHeaderModule {}
