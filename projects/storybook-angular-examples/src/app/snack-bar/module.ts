/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BaoButtonModule,
  BaoTagModule,
  BaoIconModule,
  BaoSnackBarModule
} from 'projects/angular-ui/src/public-api';
import { SnackBarPreview } from './snack-bar-preview/snack-bar-preview.component';
import { SnackBarSimpleWithActionExample } from './snack-bar-simple-with-action/snack-bar-simple-with-action-example.component';
import { SnackBarSimpleWithConfigExample } from './snack-bar-simple-with-config/snack-bar-simple-with-config-example.component';
import { SnackBarSimpleExample } from './snack-bar-simple/snack-bar-simple-example.component';

const SNACK_BAR_DIRECTIVES = [
  SnackBarPreview,
  SnackBarSimpleExample,
  SnackBarSimpleWithActionExample,
  SnackBarSimpleWithConfigExample
];

@NgModule({
  imports: [
    BaoSnackBarModule,
    BaoButtonModule,
    BaoIconModule,
    BaoTagModule,
    BrowserAnimationsModule
  ],
  declarations: SNACK_BAR_DIRECTIVES,
  exports: SNACK_BAR_DIRECTIVES,
  providers: []
})
export class BaoSnackBarModuleTest {}
