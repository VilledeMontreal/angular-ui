/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { FocusOrigin } from '@angular/cdk/a11y';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { filter, Observable, Subject, take } from 'rxjs';
import { ModalPosition } from './modal-config';
import { _BaoModalContainerBase } from './modal-container';

// Counter for unique modal ids.
let uniqueId = 0;

/** Possible states of the lifecycle of a modal. */
export const enum BaoModalState {
  OPEN,
  CLOSING,
  CLOSED
}

/**
 * Reference to a modal opened via the BaoModalService.
 */
export class BaoModalRef<T, R = unknown> {
  /** The instance of component opened into the modal. */
  public componentInstance: T;

  /** Whether the user is allowed to close the modal. */
  public disableClose: boolean | undefined =
    this._containerInstance._config.disableClose;

  /** Subject for notifying the user that the modal has finished opening. */
  private readonly _afterOpened = new Subject<void>();

  /** Subject for notifying the user that the modal has finished closing. */
  private readonly _afterClosed = new Subject<R | undefined>();

  /** Subject for notifying the user that the modal has started closing. */
  private readonly _beforeClosed = new Subject<R | undefined>();

  /** Result to be passed to afterClosed. */
  private _result: R | undefined;

  /** Handle to the timeout that's running as a fallback in case the exit animation doesn't fire. */
  private _closeFallbackTimeout: any;

  /** Current state of the modal. */
  private _state = BaoModalState.OPEN;

  constructor(
    private _overlayRef: OverlayRef,
    public _containerInstance: _BaoModalContainerBase,
    /** Id of the modal. */
    readonly id: string = `bao-modal-${uniqueId++}`
  ) {
    // Pass the id along to the container.
    _containerInstance._id = id;

    // Emit when opening animation completes
    _containerInstance._animationStateChanged
      .pipe(
        filter(event => event.state === 'opened'),
        take(1)
      )
      .subscribe(() => {
        this._afterOpened.next();
        this._afterOpened.complete();
      });

    // Dispose overlay when closing animation is complete
    _containerInstance._animationStateChanged
      .pipe(
        filter(event => event.state === 'closed'),
        take(1)
      )
      .subscribe(() => {
        clearTimeout(this._closeFallbackTimeout);
        this._finishModalClose();
      });

    _overlayRef.detachments().subscribe(() => {
      this._beforeClosed.next(this._result);
      this._beforeClosed.complete();
      this._afterClosed.next(this._result);
      this._afterClosed.complete();
      this.componentInstance = null;
      this._overlayRef.dispose();
    });

    _overlayRef
      .keydownEvents()
      .pipe(
        filter(event => {
          return (
            event.keyCode === ESCAPE &&
            !this.disableClose &&
            !hasModifierKey(event)
          );
        })
      )
      .subscribe(event => {
        event.preventDefault();
        _closeModalVia(this, 'keyboard');
      });

    _overlayRef.backdropClick().subscribe(async () => {
      if (this.disableClose) {
        await this._containerInstance._recaptureFocus();
      } else {
        _closeModalVia(this, 'mouse');
      }
    });
  }

  /**
   * Close the modal.
   * @param modalResult Optional result to return to the modal opener.
   */
  public close(modalResult?: R): void {
    this._result = modalResult;

    // Transition the backdrop in parallel to the modal.
    this._containerInstance._animationStateChanged
      .pipe(
        filter(event => event.state === 'closing'),
        take(1)
      )
      .subscribe(event => {
        this._beforeClosed.next(modalResult);
        this._beforeClosed.complete();
        this._overlayRef.detachBackdrop();
        // The logic that disposes of the overlay depends on the exit animation completing, however
        // it isn't guaranteed if the parent view is destroyed while it's running. Add a fallback
        // timeout which will clean everything up if the animation hasn't fired within the specified
        // amount of time plus 100ms. We don't need to run this outside the NgZone, because for the
        // vast majority of cases the timeout will have been cleared before it has the chance to fire.
        this._closeFallbackTimeout = setTimeout(
          () => this._finishModalClose(),
          (event.totalTime as number) + 100
        );
      });

    this._state = BaoModalState.CLOSING;
    this._containerInstance._startExitAnimation();
  }

  public startOpenAnimation(): void {
    this._containerInstance._startOpenAnimation();
  }

  /**
   * Gets an observable that is notified when the modal is finished opening.
   */
  public afterOpened(): Observable<void> {
    return this._afterOpened;
  }

  /**
   * Gets an observable that is notified when the modal is finished closing.
   */
  public afterClosed(): Observable<R | undefined> {
    return this._afterClosed;
  }

  /**
   * Gets an observable that is notified when the modal has started closing.
   */
  public beforeClosed(): Observable<R | undefined> {
    return this._beforeClosed;
  }

  /**
   * Gets an observable that emits when the overlay's backdrop has been clicked.
   */
  public backdropClick(): Observable<MouseEvent> {
    return this._overlayRef.backdropClick();
  }

  /**
   * Gets an observable that emits when keydown events are targeted on the overlay.
   */
  public keydownEvents(): Observable<KeyboardEvent> {
    return this._overlayRef.keydownEvents();
  }

  /**
   * Updates the dialog's position.
   */
  public updatePosition(position?: ModalPosition): this {
    const strategy = this._getPositionStrategy();

    if (position && (position.left || position.right)) {
      position.left
        ? strategy.left(position.left)
        : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }

    if (position && (position.top || position.bottom)) {
      position.top
        ? strategy.top(position.top)
        : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }

    this._overlayRef.updatePosition();

    return this;
  }

  /**
   * Updates the modal's width and height.
   */
  public updateSize(width = '', height = ''): this {
    this._overlayRef.updateSize({ width, height });
    this._overlayRef.updatePosition();
    return this;
  }

  /** Add a CSS class or an array of classes to the overlay pane. */
  public addPanelClass(classes: string | string[]): this {
    this._overlayRef.addPanelClass(classes);
    return this;
  }

  /** Remove a CSS class or an array of classes from the overlay pane. */
  public removePanelClass(classes: string | string[]): this {
    this._overlayRef.removePanelClass(classes);
    return this;
  }

  /** Gets the current state of the modal's lifecycle. */
  public getState(): BaoModalState {
    return this._state;
  }

  /**
   * Finishes the modal close by updating the state of the modal
   * and disposing the overlay.
   */
  private _finishModalClose() {
    this._state = BaoModalState.CLOSED;
    this._overlayRef.dispose();
  }

  /** Fetches the position strategy object from the overlay ref. */
  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlayRef.getConfig()
      .positionStrategy as GlobalPositionStrategy;
  }
}

/**
 * Closes the modal with the specified interaction type. This is currently not part of
 * `BaoModalRef` as that would conflict with custom modal ref mocks provided in tests.
 * More details. See: https://github.com/angular/components/pull/9257#issuecomment-651342226.
 */
export function _closeModalVia<R>(
  ref: BaoModalRef<R>,
  interactionType: FocusOrigin,
  result?: R
) {
  // Some mock modal ref instances in tests do not have the `_containerInstance` property.
  // For those, we keep the behavior as is and do not deal with the interaction type.
  if (ref._containerInstance !== undefined) {
    ref._containerInstance._closeInteractionType = interactionType;
  }
  return ref.close(result);
}
