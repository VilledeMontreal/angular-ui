/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  standalone: false,
  selector:
    'bao-list-summary-item, [bao-list-summary-item], [baoListSummaryItem]',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./list-summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-list-summary-item',
    role: 'listitem'
  }
})
export class BaoListSummaryItem {}

@Component({
  standalone: false,
  selector: 'bao-list-summary, [bao-list-summary], [baoListSummary]',
  template: `<ng-content></ng-content>`,
  styles: ['.bao-list-summary { padding-left:2rem }'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-list-summary',
    role: 'list'
  }
})
export class BaoListSummary {}
