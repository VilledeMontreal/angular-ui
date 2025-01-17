/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoCommonComponentsModule } from '../common-components';
import {
  BaoSummaryComponent,
  BaoSummaryDescription
} from './summary.component';
import { BaoListSummary, BaoListSummaryItem } from './list-summary.component';

const SUMMARY_DIRECTIVES = [
  BaoSummaryComponent,
  BaoSummaryDescription,
  BaoListSummary,
  BaoListSummaryItem
];

@NgModule({
  imports: [CommonModule, BaoCommonComponentsModule],
  declarations: SUMMARY_DIRECTIVES,
  exports: SUMMARY_DIRECTIVES
})
export class BaoSummaryModule {}
