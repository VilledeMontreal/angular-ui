/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <bao-breadcrumb>
      <a href="#">parent page</a>
      <a href="#">parent page</a>
      <a href="#">current page</a>
    </bao-breadcrumb>
  `
})
export class TestBreadcrumbHostComponent {}
