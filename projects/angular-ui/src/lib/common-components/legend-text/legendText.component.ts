/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bao-legend, [bao-legend]',
  encapsulation: ViewEncapsulation.None,
  template:
    '<legend class="bao-legend"><ng-content></ng-content><span *ngIf="required">&nbsp;*</span></legend>',
  styleUrls: ['./legendText.component.scss']
})
export class BaoLegendTextComponent {
  @Input() public required = false;
}
