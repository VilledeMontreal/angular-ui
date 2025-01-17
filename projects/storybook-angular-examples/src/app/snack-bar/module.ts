/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BaoButtonModule,
  BaoIconModule,
  BaoSnackBarModule,
  BaoTagModule
} from 'projects/angular-ui/src/public-api';
import { SnackBarDemoExample } from './snack-bar-demo/snack-bar-demo-example.component';
import { SnackBarSimpleWithActionExample } from './snack-bar-simple-with-action/snack-bar-simple-with-action-example.component';
import { SnackBarSimpleWithConfigExample } from './snack-bar-simple-with-config/snack-bar-simple-with-config-example.component';
import { SnackBarSimpleExample } from './snack-bar-simple/snack-bar-simple-example.component';

const SNACK_BAR_DIRECTIVES = [
  SnackBarDemoExample,
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
