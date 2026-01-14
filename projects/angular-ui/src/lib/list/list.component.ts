/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Component({
  standalone: false,
  selector: 'bao-list-item, [bao-list-item]',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-list-item',
    role: 'listitem'
  }
})
export class BaoListItem {}

@Directive({
  standalone: false,
  selector: 'bao-list, [bao-list]',
  host: {
    class: 'bao-list',
    role: 'list'
  }
})
export class BaoList {}

@Directive({
  standalone: false,
  selector: 'bao-nav-list, [bao-nav-list]',
  host: {
    class: 'bao-list',
    role: 'navigation'
  }
})
export class BaoNavList {}

@Directive({
  standalone: false,
  selector: 'bao-list-item-description, [bao-list-item-description]',
  host: {
    class: 'bao-list-item-description'
  }
})
export class BaoListItemDescription {}

@Directive({
  standalone: false,
  selector: 'bao-list-item-title, [bao-list-item-title]',
  host: {
    class: 'bao-list-item-title'
  }
})
export class BaoListItemTitle {}
