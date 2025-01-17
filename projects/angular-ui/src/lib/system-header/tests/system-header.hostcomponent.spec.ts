/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <bao-system-header>
      <bao-breadcrumb>
        <a href="#">parent page</a>
        <a href="#">parent page</a>
        <a href="#">current page</a>
      </bao-breadcrumb>
      <h1>This is a header system.</h1>
      <bao-tag>
        <span>Label</span>
      </bao-tag>
      <span>Informations supplementaires</span>
    </bao-system-header>
  `
})
export class TestSystemHeaderHostComponent {}

@Component({
  template: `
    <bao-back-navigation-component
      [link]="link"
    ></bao-back-navigation-component>
  `
})
export class TestBackNavigationHostComponent {
  link: string;
}
