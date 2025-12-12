/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoHeaderInfoComponent,
  BaoHeaderInfoContent,
  BaoHeaderInfoSubtitle,
  BaoHeaderInfoSurtitle,
  BaoHeaderInfoTitle,
  BaoHeaderInfoTitleGroupComponent
} from './header-info.component';

const DIRECTIVES = [
  BaoHeaderInfoComponent,
  BaoHeaderInfoContent,
  BaoHeaderInfoTitleGroupComponent,
  BaoHeaderInfoSubtitle,
  BaoHeaderInfoSurtitle,
  BaoHeaderInfoTitle
];

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class BaoHeaderInfoModule {}
