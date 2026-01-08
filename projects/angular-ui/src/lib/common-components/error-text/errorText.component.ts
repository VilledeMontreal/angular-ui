/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: false,
  selector: 'bao-error, [bao-error]',
  template: '<div class="bao-error"><ng-content></ng-content></div>',
  styleUrls: ['./errorText.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaoErrorTextComponent {}
