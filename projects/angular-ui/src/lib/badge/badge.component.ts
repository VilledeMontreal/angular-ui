/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bao-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  host: {
    class: '',
    '[class.positive]': 'type === "success"',
    '[class.negative]': 'type === "danger"',
    '[class.warning]': 'type === "warning"',
    '[class.informative]': 'type === "info"'
  }
})
export class BaoBadgeComponent {
  @Input() public type: '' | 'success' | 'danger' | 'warning' | 'info' = '';
}
