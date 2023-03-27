/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, Input } from '@angular/core';
import { ICONS_DCT } from 'projects/angular-ui/src/lib/icon/icons-dictionary';
import {
  BaoSnackBarConfig,
  BaoSnackBarToastType
} from 'projects/angular-ui/src/public-api';

/**
 * @title Shows the preview snackbar
 */
@Component({
  selector: 'snack-bar-preview',
  templateUrl: 'snack-bar-preview.html'
})
export class SnackBarPreview {
  /**
   * The type of toast to display
   */
  @Input() public toastType: BaoSnackBarToastType;

  /**
   * The message to display
   */
  @Input() public message: string;

  /**
   * The action label or icon
   */
  @Input() public actionLabelOrIcon: string;

  /**
   * If true, the snackbar will require user interaction to close. Otherwise the snackbar will expire after 5 seconds.
   */
  @Input() public showClose: boolean;

  /**
   * Additionnal configuration
   */
  @Input() public config: BaoSnackBarConfig;

  /** If the action button should be shown. */
  get toastIcon(): string {
    switch (this.toastType) {
      case 'success':
        return 'icon-check-circle';
      case 'danger':
        return 'icon-error';
    }
    return 'icon-info';
  }

  /** If the action button should be shown. */
  get hasAction(): boolean {
    return !!this.actionLabelOrIcon;
  }

  /** If the action is an icon */
  get isActionIcon(): boolean {
    return !!ICONS_DCT[this.actionLabelOrIcon];
  }
}
