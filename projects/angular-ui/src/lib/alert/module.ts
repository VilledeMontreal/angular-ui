/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BaoButtonModule } from '../button/module';
import { BaoIconModule } from '../icon/module';
import {
  BaoAlertActions,
  BaoAlertComponent,
  BaoAlertContent,
  BaoAlertLink,
  BaoAlertTitle
} from './alert.component';

const ALERT_DIRECTIVES = [
  BaoAlertTitle,
  BaoAlertContent,
  BaoAlertActions,
  BaoAlertLink,
  BaoAlertComponent
];

@NgModule({
  imports: [CommonModule, BaoIconModule, BaoButtonModule],
  declarations: ALERT_DIRECTIVES,
  exports: [...ALERT_DIRECTIVES, BaoIconModule, BaoButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BaoAlertModule {}
