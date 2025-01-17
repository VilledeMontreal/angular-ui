/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, ViewChild } from '@angular/core';
import { BaoButtonComponent } from 'dist/angular-ui/public-api';

@Component({
  template: `
    <button
      #ref
      bao-button
      type="button"
      [displayType]="displayType"
      [level]="level"
      [size]="size"
      [fullWidth]="fullWidth"
      [reversed]="reversed"
      [loading]="loading"
      [disabled]="isDisabled"
      (click)="clickCount = clickCount + 1"
    >
      Click me !
    </button>
  `
})
export class TestButtonHostComponent {
  @ViewChild('ref')
  ref = {} as BaoButtonComponent;
  displayType: string;
  level: string;
  size: string;
  fullWidth: boolean;
  reversed: boolean;
  loading: boolean;
  isDisabled = false;
  clickCount = 0;
  private _rightIcon = false;

  get rightIcon() {
    return this._rightIcon;
  }
  set rightIcon(value: boolean) {
    this.ref.rightIcon = this._rightIcon = value;
  }
}

@Component({
  template: `
    <button bao-button [loading]="loading">
      <bao-icon svgIcon="icon-help"></bao-icon>
      Click me !
    </button>
  `
})
export class TestButtonWithIconHostComponent {
  loading: boolean;
}
