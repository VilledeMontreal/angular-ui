/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Direction } from '@angular/cdk/bidi';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { ElementRef, Injector, ViewContainerRef } from '@angular/core';

export const FILTER_MODAL_WIDTH = '360px';
export enum eModalDesktopWidthSize {
  SMALL = 'bao-modal-sm', // 500px
  MEDIUM = 'bao-modal-md', // 800px
  LARGE = 'bao-modal-lg' // Full width minus 32px (global margin : left and rigth)
}

export enum eModalVariant {
  GLOBAL = 'global',
  FILTER = 'filter'
}

export enum eModalMobileWidthSize {
  FULL = 'bao-modal-mobil-full', // Full width on mobile screen
  COMPACT = 'bao-modal-mobil-compact' // 300px
}

export interface BaoModalConfig {
  size?: eModalDesktopWidthSize;
  mobileSize?: eModalMobileWidthSize;
  data?: unknown;
  ariaLabelledBy?: string;
  variant?: eModalVariant;
  triggerElement?: ElementRef;
}

/** Options for where to set focus to automatically on dialog open */
export type AutoFocusTarget =
  | 'dialog'
  | 'modal'
  | 'first-tabbable'
  | 'first-heading';

/** Valid ARIA roles for a dialog element. */
export type ModalRole = 'dialog' | 'alertdialog';

/** Possible overrides for a dialog's position. */
export interface ModalPosition {
  /** Override for the dialog's top position. */
  top?: string;

  /** Override for the dialog's bottom position. */
  bottom?: string;

  /** Override for the dialog's left position. */
  left?: string;

  /** Override for the dialog's right position. */
  right?: string;
}

/**
 * Configuration for opening a modal dialog with the BaoModal service.
 */
export class BaoModalInitialConfig<D = unknown> {
  /**
   * Where the attached component should live in Angular's *logical* component tree.
   * This affects what is available for injection and the change detection order for the
   * component instantiated inside of the dialog. This does not affect where the dialog
   * content will be rendered.
   */
  viewContainerRef?: ViewContainerRef;

  /**
   * Injector used for the instantiation of the component to be attached. If provided,
   * takes precedence over the injector indirectly provided by `ViewContainerRef`.
   */
  injector?: Injector;

  /** ID for the dialog. If omitted, a unique one will be generated. */
  id?: string;

  /** The ARIA role of the dialog element. */
  role?: ModalRole = 'dialog';

  /** Custom class for the overlay pane. */
  panelClass?: string | string[] = '';

  /** Whether the dialog has a backdrop. */
  hasBackdrop?: boolean = true;

  /** Custom class for the backdrop. */
  backdropClass?: string | string[] = '';

  /** Whether the user can use escape or clicking on the backdrop to close the modal. */
  disableClose?: boolean = false;

  /** Width of the dialog. */
  width?: string = '';

  /** Height of the dialog. */
  height?: string = '';

  /** Min-width of the dialog. If a number is provided, assumes pixel units. */
  minWidth?: number | string;

  /** Min-height of the dialog. If a number is provided, assumes pixel units. */
  minHeight?: number | string;

  /** Max-width of the dialog. If a number is provided, assumes pixel units. Defaults to 80vw. */
  maxWidth?: number | string = '80vw';

  /** Max-height of the dialog. If a number is provided, assumes pixel units. */
  maxHeight?: number | string;

  /** Position overrides. */
  position?: ModalPosition;

  /** Data being injected into the child component. */
  data?: D | null = null;

  /** Layout direction for the dialog's content. */
  direction?: Direction;

  /** ID of the element that describes the dialog. */
  ariaDescribedBy?: string | null = null;

  /** ID of the element that labels the dialog. */
  ariaLabelledBy?: string | null = null;

  /** Aria label to assign to the dialog element. */
  ariaLabel?: string | null = null;

  /** Modal variant (default or filter). */
  variant?: eModalVariant = eModalVariant.GLOBAL;

  /** Trigger element for connected positioning (used with filter variant). */
  triggerElement?: ElementRef;

  /**
   * Where the dialog should focus on open.
   */
  autoFocus?: AutoFocusTarget = 'first-tabbable';

  /**
   * Whether the dialog should restore focus to the
   * previously-focused element, after it's closed.
   */
  restoreFocus?: boolean = true;

  /** Whether to wait for the opening animation to finish before trapping focus. */
  delayFocusTrap?: boolean = true;

  /** Scroll strategy to be used for the dialog. */
  scrollStrategy?: ScrollStrategy;

  /**
   * Whether the dialog should close when the user goes backwards/forwards in history.
   * Note that this usually doesn't include clicking on links (unless the user is using
   * the `HashLocationStrategy`).
   */
  closeOnNavigation?: boolean = true;
}
