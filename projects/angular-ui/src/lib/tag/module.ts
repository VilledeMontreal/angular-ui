/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoTagComponent } from './tag.component';

const TAG_DIRECTIVES = [BaoTagComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [TAG_DIRECTIVES],
  exports: [TAG_DIRECTIVES]
})
export class BaoTagModule {}
