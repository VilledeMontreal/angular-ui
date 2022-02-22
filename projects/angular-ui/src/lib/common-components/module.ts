/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoErrorTextComponent,
  BaoGuidingTextComponent,
  BaoLegendTextComponent
} from '.';

const DIRECTIVES = [
  BaoErrorTextComponent,
  BaoLegendTextComponent,
  BaoGuidingTextComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class BaoCommonComponentsModule {}
