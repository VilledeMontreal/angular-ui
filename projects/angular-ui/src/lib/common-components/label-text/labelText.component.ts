/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bao-label, [bao-label]',
  encapsulation: ViewEncapsulation.None,
  template: '<ng-content></ng-content><span *ngIf="required">&nbsp;*</span>',
  styleUrls: ['./labelText.component.scss'],
  host: { class: 'bao-label' }
})
export class BaoLabelTextComponent {
  @Input() public required = false;
}
