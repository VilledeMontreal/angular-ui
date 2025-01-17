/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoIconComponent } from './icon.component';

const ICON_DIRECTIVES = [BaoIconComponent];

@NgModule({
  imports: [CommonModule],
  declarations: ICON_DIRECTIVES,
  exports: ICON_DIRECTIVES
})
export class BaoIconModule {}
