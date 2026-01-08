/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BaoButtonModule,
  BaoCheckboxModule,
  BaoIconModule,
  BaoModalModule
} from 'projects/angular-ui/src/public-api';
import {
  ModalFilterExample,
  ModalFilterExampleModal
} from './modal-filter/modal-filter-example.component';
import {
  ModalFormExample,
  ModalFormExampleModal
} from './modal-form/modal-form-example.component';
import {
  ModalContentMediumExample,
  ModalContentMediumExampleModal
} from './modal-medium/modal-content-medium-example.component';
import {
  ModalContentScrollableExample,
  ModalContentScrollableExampleModal
} from './modal-scrollable/modal-content-scrollable-example.component';
import {
  ModalContentSmallExample,
  ModalContentSmallExampleModal
} from './modal-small/modal-content-small-example.component';
import {
  ModalContentWithoutFooterExample,
  ModalContentWithoutFooterExampleModal
} from './modal-without-footer/modal-content-without-footer-example.component';

const MODAL_DIRECTIVES = [
  ModalFormExampleModal,
  ModalFormExample,
  ModalFilterExample,
  ModalFilterExampleModal,
  ModalContentScrollableExample,
  ModalContentScrollableExampleModal,
  ModalContentMediumExampleModal,
  ModalContentMediumExample,
  ModalContentSmallExample,
  ModalContentSmallExampleModal,
  ModalContentWithoutFooterExampleModal,
  ModalContentWithoutFooterExample
];

@NgModule({
  imports: [
    BaoModalModule,
    BaoButtonModule,
    BaoCheckboxModule,
    FormsModule,
    BaoIconModule
  ],
  declarations: MODAL_DIRECTIVES,
  exports: MODAL_DIRECTIVES,
  providers: []
})
export class BaoModalModuleTest {}
