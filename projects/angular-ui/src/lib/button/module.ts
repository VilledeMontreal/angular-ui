/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoIconModule } from '../icon/module';
import { BaoButtonComponent } from './button.component';

const BUTTON_DIRECTIVES = [BaoButtonComponent];

@NgModule({
  imports: [CommonModule, BaoIconModule],
  declarations: BUTTON_DIRECTIVES,
  exports: [...BUTTON_DIRECTIVES, BaoIconModule]
})
export class BaoButtonModule {}
