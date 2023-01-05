/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoModal } from './modal';
import { BaoModalContainer } from './modal-container';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations';
import { BaoModalClose } from './modal-directives';

const MODAL_DIRECTIVES = [BaoModalContainer, BaoModalClose];

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  declarations: MODAL_DIRECTIVES,
  exports: MODAL_DIRECTIVES,
  providers: [BaoModal]
})
export class BaoModalModule {}
