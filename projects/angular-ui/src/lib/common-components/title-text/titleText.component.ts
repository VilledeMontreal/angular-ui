/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bao-title-text, [bao-title-text]',
  template: '<div class="bao-title-text"><ng-content></ng-content></div>',
  styleUrls: ['./titleText.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaoTitleTextComponent {}
