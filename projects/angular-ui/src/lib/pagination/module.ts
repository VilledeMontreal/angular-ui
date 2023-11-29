/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoPaginationComponent } from './pagination.component';
import { BaoIconModule } from '../icon';

@NgModule({
  imports: [CommonModule, BaoIconModule],
  declarations: [BaoPaginationComponent],
  exports: [BaoPaginationComponent]
})
export class BaoPaginationModule {}
