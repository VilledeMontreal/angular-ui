/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoDialog } from './dialog';
import { BaoDialogContainer } from './dialog-container';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { BaoDialogClose } from './dialog-directives';

const DIALOG_DIRECTIVES = [BaoDialogContainer, BaoDialogClose];

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  declarations: DIALOG_DIRECTIVES,
  exports: DIALOG_DIRECTIVES,
  providers: [BaoDialog]
})
export class BaoDialogModule {}
