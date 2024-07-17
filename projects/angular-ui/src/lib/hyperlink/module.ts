/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoHyperlinkComponent } from './hyperlink.component';

const HYPERLINK_DIRECTIVES = [BaoHyperlinkComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [HYPERLINK_DIRECTIVES],
  exports: [HYPERLINK_DIRECTIVES]
})
export class BaoHyperlinkModule {}
