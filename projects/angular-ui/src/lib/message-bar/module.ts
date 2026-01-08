/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaoIconModule } from '../icon/module';
import { BaoButtonModule } from '../button/module';
import {
  BaoMessageBarComponent,
  BaoMessageBarContent
} from './message-bar.component';
import { BaoHyperlinkModule } from '../hyperlink/module';

@NgModule({
  imports: [CommonModule, BaoIconModule, BaoButtonModule, BaoHyperlinkModule],
  declarations: [BaoMessageBarComponent, BaoMessageBarContent],
  exports: [BaoMessageBarComponent, BaoMessageBarContent]
})
export class BaoMessageBarModule {}
