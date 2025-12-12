/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <bao-list>
      <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <ul bao-list-item-description>
          <li>Description 1</li>
          <li>Description 2</li>
        </ul>
        <button
          bao-button
          [baoDropdownMenuTriggerFor]="menu1"
          type="editorial"
          level="tertiary"
          size="medium"
        >
          <bao-icon svgIcon="icon-more-vertical"></bao-icon>
        </button>
        <bao-dropdown-menu #menu1>
          <ul>
            <li>
              <a bao-dropdown-menu-item>
                <bao-dropdown-menu-item-label
                  >Libellé 1A</bao-dropdown-menu-item-label
                >
              </a>
            </li>
            <li>
              <a bao-dropdown-menu-item>
                <bao-dropdown-menu-item-label
                  >Libellé 1B</bao-dropdown-menu-item-label
                >
              </a>
            </li>
            <li>
              <a bao-dropdown-menu-item>
                <bao-dropdown-menu-item-label
                  >Libellé 1C</bao-dropdown-menu-item-label
                >
              </a>
            </li>
          </ul>
        </bao-dropdown-menu>
      </bao-list-item>
      <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <ul bao-list-item-description>
          <li>Description 1</li>
          <li>Description 2</li>
        </ul>
        <button
          bao-button
          [baoDropdownMenuTriggerFor]="menu2"
          type="editorial"
          level="tertiary"
          size="medium"
        >
          <bao-icon svgIcon="icon-more-vertical"></bao-icon>
        </button>
        <bao-dropdown-menu #menu2>
          <ul>
            <li>
              <a bao-dropdown-menu-item>
                <bao-dropdown-menu-item-label
                  >Libellé 2A</bao-dropdown-menu-item-label
                >
              </a>
            </li>
            <li>
              <a bao-dropdown-menu-item>
                <bao-dropdown-menu-item-label
                  >Libellé 2B</bao-dropdown-menu-item-label
                >
              </a>
            </li>
            <li>
              <a bao-dropdown-menu-item>
                <bao-dropdown-menu-item-label
                  >Libellé 2C</bao-dropdown-menu-item-label
                >
              </a>
            </li>
          </ul>
        </bao-dropdown-menu>
      </bao-list-item>
    </bao-list>
  `
})
export class TestListDropdownMenuComponent {}
