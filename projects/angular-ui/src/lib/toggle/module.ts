/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoCommonComponentsModule } from '../common-components/module';
import { BaoToggleComponent } from './toggle.component';

const TOGGLE_DIRECTIVES = [BaoToggleComponent];

@NgModule({
  imports: [CommonModule, BaoCommonComponentsModule, ObserversModule],
  declarations: TOGGLE_DIRECTIVES,
  exports: TOGGLE_DIRECTIVES
})
export class BaoToggleModule {}
