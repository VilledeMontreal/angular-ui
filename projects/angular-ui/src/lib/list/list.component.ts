/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, Directive, ViewEncapsulation } from '@angular/core';

@Component({
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
  selector: 'bao-list, [bao-list]',
  host: {
    class: 'bao-list',
    role: 'list'
  }
})
export class BaoList {}

@Directive({
  selector: 'bao-nav-list, [bao-nav-list]',
  host: {
    class: 'bao-list',
    role: 'navigation'
  }
})
export class BaoNavList {}

@Directive({
  selector: 'bao-list-item-description, [bao-list-item-description]',
  host: {
    class: 'bao-list-item-description'
  }
})
export class BaoListItemDescription {}

@Directive({
  selector: 'bao-list-item-title, [bao-list-item-title]',
  host: {
    class: 'bao-list-item-title'
  }
})
export class BaoListItemTitle {}
