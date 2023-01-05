/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';

@Component({
  template: ` <bao-tabs>
    <bao-tablist [size]="size">
      <button bao-tab-header>Tab1</button>
      <button bao-tab-header>Tab2</button>
      <button bao-tab-header disabled>Tab3</button>
    </bao-tablist>
    <bao-panel><p>Panel1</p></bao-panel>
    <bao-panel><p>Panel2</p></bao-panel>
    <bao-panel><p>Panel3</p></bao-panel>
  </bao-tabs>`
})
export class TestTablistHostComponent {
  size: string;
}
