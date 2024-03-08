/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoButtonModule } from '../button/module';
import { BaoIconModule } from '../icon/module';
import { BaoSimpleSnackBarComponent } from './simple-snack-bar.component';
import { BaoSnackBarService } from './snack-bar';
import { BaoSnackBarConfig } from './snack-bar-config';
import { BaoSnackBarContainerComponent } from './snack-bar-container';

const SNACKBAR_DIRECTIVES = [
  BaoSimpleSnackBarComponent,
  BaoSnackBarContainerComponent
];

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    BaoButtonModule,
    BaoIconModule
  ],
  providers: [BaoSnackBarService, BaoSnackBarConfig],
  declarations: SNACKBAR_DIRECTIVES,
  exports: SNACKBAR_DIRECTIVES
})
export class BaoSnackBarModule {}
