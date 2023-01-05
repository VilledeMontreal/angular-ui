/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoBreadcrumbComponent } from './breadcrumb.component';

const BREADCRUMB_DIRECTIVES = [BaoBreadcrumbComponent];

@NgModule({
  imports: [CommonModule, ObserversModule],
  declarations: [BREADCRUMB_DIRECTIVES],
  exports: [BREADCRUMB_DIRECTIVES]
})
export class BaoBreadcrumbModule {}
