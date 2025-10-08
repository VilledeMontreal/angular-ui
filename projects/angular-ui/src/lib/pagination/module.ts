/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaoIconModule } from '../icon';
import { BaoPaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, BaoIconModule, FormsModule],
  declarations: [BaoPaginationComponent],
  exports: [BaoPaginationComponent]
})
export class BaoPaginationModule {}
