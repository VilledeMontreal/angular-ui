/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  standalone: false,
  template: `
    <bao-breadcrumb>
      <a href="#">parent page</a>
      <a href="#">parent page</a>
      <a href="#">current page</a>
    </bao-breadcrumb>
  `
})
export class TestBreadcrumbHostComponent {}
