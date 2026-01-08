/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: false,
  selector: 'bao-guiding-text, [bao-guiding-text]',
  template: '<div class="bao-guiding-text"><ng-content></ng-content></div>',
  styleUrls: ['./guidingText.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaoGuidingTextComponent {}
