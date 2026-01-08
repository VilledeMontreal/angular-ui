/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoFileInputComponent,
  BaoFileDropDirective,
  BaoFileDropzoneIntructions
} from './file-input.component';
import { BaoFilePreviewComponent } from './file-preview.component';
import { BAO_FILE_INTL_PROVIDER } from './file-intl';
import { BaoButtonModule } from '../button';
import { BaoIconModule } from '../icon';
import { BaoDropdownMenuModule } from '../dropdown-menu';
import { BaoCommonComponentsModule } from '../common-components';

const FILE_DIRECTIVES = [
  BaoFileInputComponent,
  BaoFileDropzoneIntructions,
  BaoFileDropDirective,
  BaoFilePreviewComponent
];

@NgModule({
  imports: [
    CommonModule,
    BaoDropdownMenuModule,
    BaoCommonComponentsModule,
    BaoIconModule,
    BaoButtonModule
  ],
  declarations: [FILE_DIRECTIVES],
  exports: [FILE_DIRECTIVES],
  providers: [BAO_FILE_INTL_PROVIDER]
})
export class BaoFileModule {}
