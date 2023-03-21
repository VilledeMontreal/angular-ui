/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { AriaLivePoliteness } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { InjectionToken, ViewContainerRef } from '@angular/core';

/** Injection token that can be used to access the data that was passed in to a snack bar. */
export const BAO_SNACK_BAR_DATA = new InjectionToken<any>('BaoSnackBarData');

/** Possible values for horizontalPosition on MatSnackBarConfig. */
export type BaoSnackBarHorizontalPosition =
  | 'start'
  | 'center'
  | 'end'
  | 'left'
  | 'right';

/** Possible values for verticalPosition on MatSnackBarConfig. */
export type BaoSnackBarVerticalPosition = 'top' | 'bottom';

/** Possible types of toast to display the snack bar */
export enum BaoSnackBarToastTypeEnum {
  Info = 'info',
  Success = 'success',
  Danger = 'danger'
}

/**
 * Configuration used when opening a snack-bar.
 */
export class BaoSnackBarConfig<D = any> {
  /** The message to display in the snackbar. */
  public message = 'No message';

  /** The type of snackbar template to display. */
  public toastType?: BaoSnackBarToastTypeEnum = BaoSnackBarToastTypeEnum.Info;

  /**
   * The attached action to the snack bar. If the name of the action matches an icon provided as part of
   * angular-ui icon dictionnary an icon will be displayed instead of text.
   * */
  public actionLabelOrIcon?: string = '';

  /** Displays the close button when set to true */
  public showClose?: boolean = false;

  /** The length of time in milliseconds to wait before automatically dismissing the snack bar. */
  public duration?: number = 5000;

  /** The politeness level for the MatAriaLiveAnnouncer announcement. */
  public politeness?: AriaLivePoliteness = 'assertive';

  /**
   * Message to be announced by the LiveAnnouncer. When opening a snackbar without a custom
   * component or template, the announcement message will default to the specified message.
   */
  public announcementMessage?: string = '';

  /**
   * The view container that serves as the parent for the snackbar for the purposes of dependency
   * injection. Note: this does not affect where the snackbar is inserted in the DOM.
   */
  public viewContainerRef?: ViewContainerRef;

  /** Extra CSS classes to be added to the snack bar container. */
  public panelClass?: string | string[];

  /** Text layout direction for the snack bar. */
  public direction?: Direction;

  /** Data being injected into the child component. */
  public data?: D | null = null;

  /** The horizontal position to place the snack bar. */
  public horizontalPosition?: BaoSnackBarHorizontalPosition = 'left';

  /** The vertical position to place the snack bar. */
  public verticalPosition?: BaoSnackBarVerticalPosition = 'bottom';
}
