/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoCardComponent,
  BaoCardContent,
  BaoCardHeader,
  BaoCardTextInterface,
  BaoCardTitle
} from './card.component';

const CARD_DIRECTIVES = [
  BaoCardComponent,
  BaoCardContent,
  BaoCardHeader,
  BaoCardTextInterface,
  BaoCardTitle
];

@NgModule({
  imports: [CommonModule],
  declarations: [CARD_DIRECTIVES],
  exports: [CARD_DIRECTIVES]
})
export class BaoCardModule {}
