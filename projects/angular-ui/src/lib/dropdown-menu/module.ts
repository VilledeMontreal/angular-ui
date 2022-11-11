/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoDropdownMenuComponent,
  BaoDropdownMenuTrigger,
  BaoDropdownMenuItem,
  BaoDropdownMenuSection,
  BaoDropdownMenuItemLabel,
  BaoDropdownMenuItemDescription,
  BaoDropdownMenuDivider
} from './dropdown-menu.component';

const DROPDOWN_MENU_DIRECTIVES = [
  BaoDropdownMenuComponent,
  BaoDropdownMenuTrigger,
  BaoDropdownMenuItem,
  BaoDropdownMenuSection,
  BaoDropdownMenuItemLabel,
  BaoDropdownMenuItemDescription,
  BaoDropdownMenuDivider
];

@NgModule({
  imports: [CommonModule, ObserversModule, OverlayModule, PortalModule],
  declarations: [DROPDOWN_MENU_DIRECTIVES],
  exports: [...DROPDOWN_MENU_DIRECTIVES]
})
export class BaoDropdownMenuModule {}
