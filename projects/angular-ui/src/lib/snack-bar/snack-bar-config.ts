/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
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

/**
 * Configuration used when opening a snack-bar.
 */
export class BaoSnackBarConfig<D = any> {
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

  /** The length of time in milliseconds to wait before automatically dismissing the snack bar. */
  public duration?: number = 0;

  /** Extra CSS classes to be added to the snack bar container. */
  public panelClass?: string | string[];

  /** Text layout direction for the snack bar. */
  public direction?: Direction;

  /** Data being injected into the child component. */
  public data?: D | null = null;

  /** The horizontal position to place the snack bar. */
  public horizontalPosition?: BaoSnackBarHorizontalPosition = 'center';

  /** The vertical position to place the snack bar. */
  public verticalPosition?: BaoSnackBarVerticalPosition = 'bottom';
}
