/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, Input } from '@angular/core';
import { ICONS_DCT } from 'projects/angular-ui/src/lib/icon/icons-dictionary';
import {
  BaoSnackBarConfig,
  BaoSnackBarToastTypeEnum
} from 'projects/angular-ui/src/public-api';

/**
 * @title Shows the demo snackbar
 */
@Component({
  selector: 'snack-bar-demo-example',
  templateUrl: 'snack-bar-demo-example.html'
})
export class SnackBarDemoExample {
  /**
   * The type of toast to display
   */
  @Input() public toastType: BaoSnackBarToastTypeEnum;

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
      case BaoSnackBarToastTypeEnum.Success:
        return 'icon-check-circle';
      case BaoSnackBarToastTypeEnum.Danger:
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
