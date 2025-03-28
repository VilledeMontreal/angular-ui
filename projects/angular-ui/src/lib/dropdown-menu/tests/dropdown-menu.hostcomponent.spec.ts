/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <button [baoDropdownMenuTriggerFor]="testMenu">
      <span>Actions</span>
      <bao-icon svgIcon="icon-chevron-down"></bao-icon>
    </button>
    <bao-dropdown-menu #testMenu></bao-dropdown-menu>
  `
})
export class TestButtonMenuHostComponent {}

@Component({
  template: `
    <button [baoDropdownMenuTriggerFor]="testMenu">
      <span>Actions</span>
      <bao-icon svgIcon="icon-chevron-down"></bao-icon>
    </button>
    <bao-dropdown-menu
      (isClosedByKeyEvent)="onClosedByKeyEvent()"
      (isOpenChange)="onIsOpenChange($event)"
      #testMenu
    >
      <a bao-dropdown-menu-item [disabled]="disabled">
        <bao-icon svgIcon="icon-chevron-down"></bao-icon>
        <bao-dropdown-menu-item-label>Libellé</bao-dropdown-menu-item-label>
      </a>
    </bao-dropdown-menu>
  `
})
export class TestDropdownMenuHostComponent {
  disabled: boolean;
  hasEmitClosingEvent = false;
  isMenuOpen = false;

  public onClosedByKeyEvent(): void {
    this.hasEmitClosingEvent = true;
  }

  public onIsOpenChange(isOpen: boolean): void {
    this.isMenuOpen = isOpen;
  }
}
@Component({
  template: `
    <bao-dropdown-menu>
      <a bao-dropdown-menu-item>
        <bao-checkbox></bao-checkbox>
        <bao-dropdown-menu-item-label>Libellé</bao-dropdown-menu-item-label>
      </a>
      <a bao-dropdown-menu-item>
        <bao-radio-button></bao-radio-button>
        <bao-dropdown-menu-item-label>Libellé</bao-dropdown-menu-item-label>
      </a>
    </bao-dropdown-menu>
  `
})
export class TestDropdownWithInputsHostComponent {}
