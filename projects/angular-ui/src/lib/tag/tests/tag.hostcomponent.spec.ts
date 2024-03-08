/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <bao-tag [type]="type" [hiddenText]="hiddenText" [variant]="variant">
      <span>Label</span>
    </bao-tag>
  `
})
export class TestTagHostComponent {
  type: string;
  hiddenText: string;
  variant: string;
}

@Component({
  template: `
    <bao-tag [type]="type" [hiddenText]="hiddenText" [variant]="variant">
      <bao-icon svgIcon="icon-warning"></bao-icon>
      <span>Label</span>
    </bao-tag>
  `
})
export class TestTagWithIconHostComponent {
  type: string;
  hiddenText: string;
  variant: string;
}
