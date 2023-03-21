/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoTooltipComponent } from './tooltip.component';
import { BaoTooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [BaoTooltipComponent, BaoTooltipDirective],
  exports: [BaoTooltipDirective]
})
export class BaoTooltipModule {}
