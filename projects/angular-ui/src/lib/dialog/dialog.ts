/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable @typescript-eslint/no-unsafe-return*/
import {
  Directive,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  StaticProvider,
  TemplateRef,
  Type
} from '@angular/core';
import { defer, Observable, startWith, Subject, Subscription } from 'rxjs';
import { BaoDialogContainer, _BaoDialogContainerBase } from './dialog-container';
import { BaoDialogRef } from './dialog-ref';
import {
  BaoDialogConfig,
  BaoDialogInitialConfig,
  eDialogDesktopWidthSize,
  eDialogMobileWidthSize
} from './dialog-config';
import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

/** Injection token that can be used to access the data that was passed in to a dialog. */
export const BAO_DIALOG_DATA = new InjectionToken<unknown>('BaoDialogData');

@Directive()
export abstract class BaoDialogBase<C extends _BaoDialogContainerBase>
  implements OnDestroy
{
  public readonly afterAllClosed: Observable<void> = defer(() =>
    this.openDialogs.length
      ? this.getAfterAllClosed()
      : this.getAfterAllClosed().pipe(startWith(undefined))
  );

  private _openDialogsAtThisLevel: BaoDialogRef<unknown>[] = [];
  private readonly _afterAllClosedAtThisLevel = new Subject<void>();
  private readonly _afterOpenedAtThisLevel = new Subject<
    BaoDialogRef<unknown>
  >();
  private _ariaHiddenElements = new Map<Element, string | null>();
  private _dialogAnimatingOpen = false;
  private _animationStateSubscriptions: Subscription;
  private _lastDialogRef: BaoDialogRef<unknown>;

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    private _parentDialog: BaoDialogBase<C> | undefined,
    private _overlayContainer: OverlayContainer,
    private _dialogRefConstructor: Type<BaoDialogRef<unknown>>,
    private _dialogContainerType: Type<C>,
    private _dialogDataToken: InjectionToken<unknown>,
    private _animationMode?: 'NoopAnimations' | 'BrowserAnimations'
  ) {}

  /** Keeps track of the currently-open dialogs. */
  public get openDialogs(): BaoDialogRef<unknown>[] {
    return this._parentDialog
      ? this._parentDialog.openDialogs
      : this._openDialogsAtThisLevel;
  }

  /** Stream that emits when a dialog has been opened. */
  public get afterOpened(): Subject<BaoDialogRef<unknown>> {
    // Maybe typescript version difference
    return this._parentDialog
      ? this._parentDialog.afterOpened
      : this._afterOpenedAtThisLevel;
  }

  public getAfterAllClosed(): Subject<void> {
    const parent = this._parentDialog;
    return (
      parent ? parent.getAfterAllClosed() : this._afterAllClosedAtThisLevel
    ) as Subject<void>;
  }

  /**
   * Opens a dialog dialog containing the given template.
   */
  public open<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: BaoDialogConfig
  ): BaoDialogRef<unknown> {
    const conf = this._applyConfigDefaults(config, new BaoDialogInitialConfig());

    // If there is a dialog that is currently animating open, return the MatdialogRef of that dialog
    if (this._dialogAnimatingOpen) {
      return this._lastDialogRef;
    }

    const overlayRef = this._createOverlay(conf);
    const dialogContainer = this._attachDialogContainer(overlayRef, conf);
    if (this._animationMode !== 'NoopAnimations') {
      const animationStateSubscription =
        dialogContainer._animationStateChanged.subscribe(dialogAnimationEvent => {
          if (dialogAnimationEvent.state === 'opening') {
            this._dialogAnimatingOpen = true;
          }
          if (dialogAnimationEvent.state === 'opened') {
            this._dialogAnimatingOpen = false;
            animationStateSubscription.unsubscribe();
          }
        });
      if (!this._animationStateSubscriptions) {
        this._animationStateSubscriptions = new Subscription();
      }
      this._animationStateSubscriptions.add(animationStateSubscription);
    }

    const dialogRef = this._attachDialogContent<T>(
      componentOrTemplateRef,
      dialogContainer,
      overlayRef,
      conf
    );
    this._lastDialogRef = dialogRef;

    // If this is the first dialog that we're opening, hide all the non-overlay content.
    if (!this.openDialogs.length) {
      this._hideNonDialogContentFromAssistiveTechnology();
    }

    this.openDialogs.push(dialogRef);
    dialogRef.afterClosed().subscribe(() => this._removeOpenDialog(dialogRef));
    this.afterOpened.next(dialogRef);

    // Notify the dialog container that the content has been attached.
    dialogContainer._initializeWithAttachedContent();

    return dialogRef;
  }

  /**
   * Closes all of the currently-open dialogs.
   */
  public closeAll(): void {
    this._closeDialogs(this.openDialogs);
  }

  /**
   * Finds an open dialog by its id.
   */
  public getDialogById(id: string): BaoDialogRef<unknown> | undefined {
    return this.openDialogs.find(dialog => dialog.id === id);
  }

  public ngOnDestroy() {
    // Only close the dialogs at this level on destroy
    // since the parent service may still be active.
    this._closeDialogs(this._openDialogsAtThisLevel);
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
    // Clean up any subscriptions to dialogs that never finished opening.
    if (this._animationStateSubscriptions) {
      this._animationStateSubscriptions.unsubscribe();
    }
  }

  /**
   * Creates the overlay into which the dialog will be loaded.
   */
  private _createOverlay(config: BaoDialogInitialConfig): OverlayRef {
    const overlayConfig = this._getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  /**
   * Creates an overlay config from a dialog config.
   */
  private _getOverlayConfig(config: BaoDialogInitialConfig): OverlayConfig {
    const state = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: this._overlay.scrollStrategies.block(),
      panelClass: config.panelClass,
      hasBackdrop: config.hasBackdrop,
      disposeOnNavigation: config.closeOnNavigation
    });

    if (config.backdropClass) {
      state.backdropClass = config.backdropClass;
    }

    return state;
  }

  /**
   * Attaches a dialog container to a dialog's already-created overlay.
   */
  private _attachDialogContainer(
    overlay: OverlayRef,
    config: BaoDialogInitialConfig
  ): C {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: BaoDialogInitialConfig, useValue: config }]
    });

    const containerPortal = new ComponentPortal(
      this._dialogContainerType,
      config.viewContainerRef,
      injector
    );
    const containerRef = overlay.attach<C>(containerPortal);

    return containerRef.instance;
  }

  /**
   * Attaches the user-provided component to the already-created dialog container.
   */
  private _attachDialogContent<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    dialogContainer: C,
    overlayRef: OverlayRef,
    config: BaoDialogInitialConfig
  ): BaoDialogRef<unknown> {
    // Create a reference to the dialog we're creating in order to give the user a handle
    // to modify and close it.
    const dialogRef = new this._dialogRefConstructor(
      overlayRef,
      dialogContainer,
      config.id
    );

    if (componentOrTemplateRef instanceof TemplateRef) {
      dialogContainer.attachTemplatePortal(
        new TemplatePortal(componentOrTemplateRef, null, <unknown>{
          $implicit: config.data,
          dialogRef
        })
      );
    } else {
      const injector = this._createInjector(config, dialogRef, dialogContainer);
      const contentRef = dialogContainer.attachComponentPortal<T>(
        new ComponentPortal(
          componentOrTemplateRef,
          config.viewContainerRef,
          injector
        )
      );
      dialogRef.componentInstance = contentRef.instance;
    }

    dialogRef
      .updateSize(config.width, config.height)
      .updatePosition(config.position);

    return dialogRef;
  }

  /**
   * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
   * of a dialog to close itself and, optionally, to return a value.
   */
  private _createInjector(
    config: BaoDialogInitialConfig,
    dialogRef: BaoDialogRef<unknown>,
    dialogContainer: C
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    // The dialog container should be provided as the dialog container and the dialog's
    // content are created out of the same `ViewContainerRef` and as such, are siblings
    // for injector purposes. To allow the hierarchy that is expected, the dialog
    // container is explicitly provided in the injector.
    const providers: StaticProvider[] = [
      { provide: this._dialogContainerType, useValue: dialogContainer },
      { provide: this._dialogDataToken, useValue: config.data },
      { provide: this._dialogRefConstructor, useValue: dialogRef }
    ];

    return Injector.create({
      parent: userInjector || this._injector,
      providers
    });
  }

  /**
   * Removes a dialog from the array of open dialogs.
   */
  private _removeOpenDialog(dialogRef: BaoDialogRef<unknown>) {
    const index = this.openDialogs.indexOf(dialogRef);

    if (index > -1) {
      this.openDialogs.splice(index, 1);

      // If all the dialogs were closed, remove/restore the `aria-hidden`
      // to a the siblings and emit to the `afterAllClosed` stream.
      if (!this.openDialogs.length) {
        this._ariaHiddenElements.forEach((previousValue, element) => {
          if (previousValue) {
            element.setAttribute('aria-hidden', previousValue);
          } else {
            element.removeAttribute('aria-hidden');
          }
        });

        this._ariaHiddenElements.clear();
        this.getAfterAllClosed().next();
      }
    }
  }

  /**
   * Hides all of the content that isn't an overlay from assistive technology.
   */
  private _hideNonDialogContentFromAssistiveTechnology() {
    const overlayContainer = this._overlayContainer.getContainerElement();

    // Ensure that the overlay container is attached to the DOM.
    if (overlayContainer.parentElement) {
      const siblings = overlayContainer.parentElement.children;

      for (let i = siblings.length - 1; i > -1; i--) {
        const sibling = siblings[i];

        if (
          sibling !== overlayContainer &&
          sibling.nodeName !== 'SCRIPT' &&
          sibling.nodeName !== 'STYLE' &&
          !sibling.hasAttribute('aria-live')
        ) {
          this._ariaHiddenElements.set(
            sibling,
            sibling.getAttribute('aria-hidden')
          );
          sibling.setAttribute('aria-hidden', 'true');
        }
      }
    }
  }

  /** Closes all of the dialogs in an array. */
  private _closeDialogs(dialogs: BaoDialogRef<unknown>[]) {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
    }
  }

  /**
   * Applies default options to the dialog config.
   */
  private _applyConfigDefaults(
    config?: BaoDialogConfig,
    defaultOptions?: BaoDialogInitialConfig
  ): BaoDialogInitialConfig {
    const desktopClass = config?.size || eDialogDesktopWidthSize.SMALL;
    const mobilClass = config?.mobileSize || eDialogMobileWidthSize.FULL;
    const data = config?.data || null;
    const ariaLabelledBy = config?.ariaLabelledBy || null;

    return {
      ...defaultOptions,
      ...{
        panelClass: [desktopClass, mobilClass],
        ariaLabelledBy,
        data
      }
    };
  }
}

/**
 * Service to open dialog.
 */
@Injectable()
export class BaoDialog extends BaoDialogBase<BaoDialogContainer> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    @Optional() @SkipSelf() parentDialog: BaoDialog,
    overlayContainer: OverlayContainer,
    @Optional()
    @Inject(ANIMATION_MODULE_TYPE)
    animationMode?: 'NoopAnimations' | 'BrowserAnimations'
  ) {
    super(
      overlay,
      injector,
      parentDialog,
      overlayContainer,
      BaoDialogRef,
      BaoDialogContainer,
      BAO_DIALOG_DATA,
      animationMode
    );
  }
}
