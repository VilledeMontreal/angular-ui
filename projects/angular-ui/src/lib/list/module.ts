/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoList,
  BaoListItem,
  BaoListItemDescription,
  BaoListItemTitle,
  BaoNavList
} from './list.component';

const DIRECTIVES = [
  BaoListItem,
  BaoList,
  BaoNavList,
  BaoListItemDescription,
  BaoListItemTitle
];

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class BaoListModule {}
