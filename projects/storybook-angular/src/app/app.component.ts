/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <div>{{ title }}</div> `
})
export class AppComponent {
  title = 'storybook-angular';
}
