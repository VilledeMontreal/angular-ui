/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { IBaoSnackBarContainer } from './snack-bar-container';

/** Event that is emitted when a snack bar is dismissed. */
export interface IBaoSnackBarDismiss {
  /** Whether the snack bar was dismissed using the action button. */
  dismissedByAction: boolean;
}

/** Maximum amount of milliseconds that can be passed into setTimeout. */
const MAX_TIMEOUT = Math.pow(2, 31) - 1;

/**
 * Reference to a snack bar dispatched from the snack bar service.
 */
export class BaoSnackBarRef<T> {
  /** The instance of the component making up the content of the snack bar. */
  public instance: T;

  /**
   * The instance of the component making up the content of the snack bar.
   * @docs-private
   */
  public containerInstance: IBaoSnackBarContainer;

  /** Subject for notifying the user that the snack bar has been dismissed. */
  private readonly _afterDismissed = new Subject<IBaoSnackBarDismiss>();

  /** Subject for notifying the user that the snack bar has opened and appeared. */
  private readonly _afterOpened = new Subject<void>();

  /** Subject for notifying the user that the snack bar action was called. */
  private readonly _onAction = new Subject<void>();

  /**
   * Timeout ID for the duration setTimeout call. Used to clear the timeout if the snackbar is
   * dismissed before the duration passes.
   */
  private _durationTimeoutId: number;

  /** Whether the snack bar was dismissed using the action button. */
  private _dismissedByAction = false;

  constructor(
    containerInstance: IBaoSnackBarContainer,
    private _overlayRef: OverlayRef
  ) {
    this.containerInstance = containerInstance;
    // Dismiss snackbar on action.
    this.onAction().subscribe(() => this.dismiss());
    containerInstance._onExit.subscribe(() => this.finishDismiss());
  }

  /** Dismisses the snack bar. */
  public dismiss(): void {
    if (!this._afterDismissed.closed) {
      this.containerInstance.exit();
    }
    clearTimeout(this._durationTimeoutId);
  }

  /** Marks the snackbar action clicked. */
  public dismissWithAction(): void {
    if (!this._onAction.closed) {
      this._dismissedByAction = true;
      this._onAction.next();
      this._onAction.complete();
    }
  }

  /** Dismisses the snack bar after some duration */
  public dismissAfter(duration: number): void {
    // Note that we need to cap the duration to the maximum value for setTimeout, because
    // it'll revert to 1 if somebody passes in something greater (e.g. `Infinity`). See #17234.

    // @TODO: window.setTimeout() ?
    this._durationTimeoutId = window.setTimeout(
      () => this.dismiss(),
      Math.min(duration, MAX_TIMEOUT)
    );
  }

  /** Marks the snackbar as opened */
  public open(): void {
    if (!this._afterOpened.closed) {
      this._afterOpened.next();
      this._afterOpened.complete();
    }
  }

  /** Gets an observable that is notified when the snack bar is finished closing. */
  public afterDismissed(): Observable<IBaoSnackBarDismiss> {
    return this._afterDismissed;
  }

  /** Gets an observable that is notified when the snack bar has opened and appeared. */
  public afterOpened(): Observable<void> {
    return this.containerInstance._onEnter;
  }

  /** Gets an observable that is notified when the snack bar action is called. */
  public onAction(): Observable<void> {
    return this._onAction;
  }

  /** Cleans up the DOM after closing. */
  private finishDismiss(): void {
    this._overlayRef.dispose();

    if (!this._onAction.closed) {
      this._onAction.complete();
    }

    this._afterDismissed.next({ dismissedByAction: this._dismissedByAction });
    this._afterDismissed.complete();
    this._dismissedByAction = false;
  }
}
