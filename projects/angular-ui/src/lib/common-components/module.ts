/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoErrorTextComponent } from './error-text/errorText.component';
import { BaoGuidingTextComponent } from './guiding-text/guidingText.component';
import { BaoLabelTextComponent } from './label-text/labelText.component';
import { BaoTitleTextComponent } from './title-text/titleText.component';

const DIRECTIVES = [
  BaoErrorTextComponent,
  BaoGuidingTextComponent,
  BaoLabelTextComponent,
  BaoTitleTextComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class BaoCommonComponentsModule {}
