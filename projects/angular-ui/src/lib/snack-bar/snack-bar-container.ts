/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { AnimationEvent } from '@angular/animations';
import { AriaLivePoliteness } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal
} from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  NgZone,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { matSnackBarAnimations } from './snack-bar-animations';
import { BaoSnackBarConfig } from './snack-bar-config';

/**
 * Internal interface for a snack bar container.
 * @docs-private
 */
export interface IBaoSnackBarContainer {
  snackBarConfig: BaoSnackBarConfig;
  _onAnnounce: Subject<any>;
  _onExit: Subject<any>;
  _onEnter: Subject<any>;
  enter: () => void;
  exit: () => Observable<void>;
  attachTemplatePortal: <C>(portal: TemplatePortal<C>) => EmbeddedViewRef<C>;
  attachComponentPortal: <T>(portal: ComponentPortal<T>) => ComponentRef<T>;
}

/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
@Component({
  selector: 'bao-snack-bar-container',
  templateUrl: 'snack-bar-container.html',
  styleUrls: ['snack-bar-container.scss'],
  // In Ivy embedded views will be change detected from their declaration place, rather than
  // where they were stamped out. This means that we can't have the snack bar container be OnPush,
  // because it might cause snack bars that were opened from a template not to be out of date.
  // eslint-disable-next-line
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.None,
  animations: [matSnackBarAnimations.snackBarState],
  host: {
    class: 'mat-snack-bar-container',
    '[@state]': '_animationState',
    '(@state.done)': 'onAnimationEnd($event)'
  }
})
export class BaoSnackBarContainerComponent
  extends BasePortalOutlet
  implements OnDestroy, IBaoSnackBarContainer
{
  /** The portal outlet inside of this container into which the snack bar content will be loaded. */
  @ViewChild(CdkPortalOutlet, { static: true })
  public _portalOutlet: CdkPortalOutlet;

  /** Subject for notifying that the snack bar has announced to screen readers. */
  public readonly _onAnnounce: Subject<void> = new Subject();

  /** Subject for notifying that the snack bar has exited from view. */
  public readonly _onExit: Subject<void> = new Subject();

  /** Subject for notifying that the snack bar has finished entering the view. */
  public readonly _onEnter: Subject<void> = new Subject();

  /** The state of the snack bar animations. */
  public _animationState = 'void';

  /** aria-live value for the live region. */
  public _live: AriaLivePoliteness;

  /** The number of milliseconds to wait before announcing the snack bar's content. */
  private readonly _announceDelay: number = 150;

  /** The timeout for announcing the snack bar's content. */
  private _announceTimeoutId: number;

  /** Whether the component has been destroyed. */
  private _destroyed = false;

  constructor(
    private _ngZone: NgZone,
    private _elementRef: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _platform: Platform,
    /** The snack bar configuration. */
    public snackBarConfig: BaoSnackBarConfig
  ) {
    super();

    // Use aria-live rather than a live role like 'alert' or 'status'
    // because NVDA and JAWS have show inconsistent behavior with live roles.
    if (
      snackBarConfig.politeness === 'assertive' &&
      !snackBarConfig.announcementMessage
    ) {
      this._live = 'assertive';
    } else if (snackBarConfig.politeness === 'off') {
      this._live = 'off';
    } else {
      this._live = 'polite';
    }
  }

  /** Attach a component portal as content to this snack bar container. */
  public attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    this.assertNotAttached();
    this.applySnackBarClasses();
    return this._portalOutlet.attachComponentPortal(portal);
  }

  /** Attach a template portal as content to this snack bar container. */
  public attachTemplatePortal<C>(
    portal: TemplatePortal<C>
  ): EmbeddedViewRef<C> {
    this.assertNotAttached();
    this.applySnackBarClasses();
    return this._portalOutlet.attachTemplatePortal(portal);
  }

  /** Handle end of animations, updating the state of the snackbar. */
  public onAnimationEnd(event: AnimationEvent) {
    const { fromState, toState } = event;

    if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
      this.completeExit();
    }

    if (toState === 'visible') {
      // Note: we shouldn't use `this` inside the zone callback,
      // because it can cause a memory leak.
      const onEnter = this._onEnter;

      this._ngZone.run(() => {
        onEnter.next();
        onEnter.complete();
      });
    }
  }

  /** Begin animation of snack bar entrance into view. */
  public enter(): void {
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._changeDetectorRef.detectChanges();
      this.screenReaderAnnounce();
    }
  }

  /** Begin animation of the snack bar exiting from view. */
  public exit(): Observable<void> {
    // Note: this one transitions to `hidden`, rather than `void`, in order to handle the case
    // where multiple snack bars are opened in quick succession (e.g. two consecutive calls to
    // `MatSnackBar.open`).
    this._animationState = 'hidden';

    // Mark this element with an 'exit' attribute to indicate that the snackbar has
    // been dismissed and will soon be removed from the DOM. This is used by the snackbar
    // test harness.
    this._elementRef.nativeElement.setAttribute('mat-exit', '');

    // If the snack bar hasn't been announced by the time it exits it wouldn't have been open
    // long enough to visually read it either, so clear the timeout for announcing.
    clearTimeout(this._announceTimeoutId);

    return this._onExit;
  }

  /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
  public ngOnDestroy() {
    this._destroyed = true;
    this.completeExit();
  }

  /**
   * Waits for the zone to settle before removing the element. Helps prevent
   * errors where we end up removing an element which is in the middle of an animation.
   */
  private completeExit() {
    this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
      this._onExit.next();
      this._onExit.complete();
    });
  }

  /** Applies the various positioning and user-configured CSS classes to the snack bar. */
  private applySnackBarClasses() {
    const element: HTMLElement = this._elementRef.nativeElement;
    const panelClasses = this.snackBarConfig.panelClass;

    if (panelClasses) {
      if (Array.isArray(panelClasses)) {
        // Note that we can't use a spread here, because IE doesn't support multiple arguments.
        panelClasses.forEach(cssClass => element.classList.add(cssClass));
      } else {
        element.classList.add(panelClasses);
      }
    }

    if (this.snackBarConfig.horizontalPosition === 'center') {
      element.classList.add('mat-snack-bar-center');
    }

    if (this.snackBarConfig.verticalPosition === 'top') {
      element.classList.add('mat-snack-bar-top');
    }
  }

  /** Asserts that no content is already attached to the container. */
  private assertNotAttached() {
    if (this._portalOutlet.hasAttached()) {
      throw Error(
        'Attempting to attach snack bar content after content is already attached'
      );
    }
  }

  /**
   * Starts a timeout to move the snack bar content to the live region so screen readers will
   * announce it.
   */
  private screenReaderAnnounce() {
    if (!this._announceTimeoutId) {
      this._ngZone.runOutsideAngular(() => {
        this._announceTimeoutId = window.setTimeout(() => {
          const inertElement =
            this._elementRef.nativeElement.querySelector('[aria-hidden]');
          const liveElement =
            this._elementRef.nativeElement.querySelector('[aria-live]');
          if (inertElement && liveElement) {
            // If an element in the snack bar content is focused before being moved
            // track it and restore focus after moving to the live region.
            let focusedElement: HTMLElement | null = null;
            if (
              this._platform.isBrowser &&
              document.activeElement instanceof HTMLElement &&
              inertElement.contains(document.activeElement)
            ) {
              focusedElement = document.activeElement;
            }
            inertElement.removeAttribute('aria-hidden');
            liveElement.appendChild(inertElement);
            if (focusedElement) {
              focusedElement.focus();
            }
            this._onAnnounce.next();
            this._onAnnounce.complete();
          }
        }, this._announceDelay);
      });
    }
  }
}
