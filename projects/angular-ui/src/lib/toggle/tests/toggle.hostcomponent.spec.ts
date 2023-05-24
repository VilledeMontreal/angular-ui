/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <bao-toggle id="id01" name="name01" [checked]="checked" [hiddenLabel]="hiddenLabel" [disabled]="disabled" [aria-label]="ariaLabel">
      Label
    </bao-toggle>
  `
})
export class TestToggleHostComponent {
  checked: boolean;
  disabled: boolean;
  hiddenLabel: boolean;
  isFocus: boolean;
  ariaLabel: string;
}
