/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable @typescript-eslint/no-unsafe-return*/
import {
  Directive,
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
import { BaoModalContainer, _BaoModalContainerBase } from './modal-container';
import { BaoModalRef } from './modal-ref';
import {
  BaoModalConfig,
  BaoModalInitialConfig,
  eModalDesktopWidthSize,
  eModalMobileWidthSize
} from './modal-config';
import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';

/** Injection token that can be used to access the data that was passed in to a modal. */
export const BAO_MODAL_DATA = new InjectionToken<unknown>('BaoModalData');

@Directive()
export abstract class BaoModalBase<C extends _BaoModalContainerBase>
  implements OnDestroy
{
  public readonly afterAllClosed: Observable<void> = defer(() =>
    this.openModals.length
      ? this.getAfterAllClosed()
      : this.getAfterAllClosed().pipe(startWith(undefined))
  );

  private _openModalsAtThisLevel: BaoModalRef<unknown>[] = [];
  private readonly _afterAllClosedAtThisLevel = new Subject<void>();
  private readonly _afterOpenedAtThisLevel = new Subject<
    BaoModalRef<unknown>
  >();
  private _ariaHiddenElements = new Map<Element, string | null>();
  private _modalAnimatingOpen = false;
  private _animationStateSubscriptions: Subscription;
  private _lastModalRef: BaoModalRef<unknown>;

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    private _parentModal: BaoModalBase<C> | undefined,
    private _overlayContainer: OverlayContainer,
    private _modalRefConstructor: Type<BaoModalRef<unknown>>,
    private _modalContainerType: Type<C>,
    private _modalDataToken: InjectionToken<unknown>
  ) {}

  /** Keeps track of the currently-open modals. */
  public get openModals(): BaoModalRef<unknown>[] {
    return this._parentModal
      ? this._parentModal.openModals
      : this._openModalsAtThisLevel;
  }

  /** Stream that emits when a modal has been opened. */
  public get afterOpened(): Subject<BaoModalRef<unknown>> {
    // Maybe typescript version difference
    return this._parentModal
      ? this._parentModal.afterOpened
      : this._afterOpenedAtThisLevel;
  }

  public getAfterAllClosed(): Subject<void> {
    const parent = this._parentModal;
    return parent
      ? parent.getAfterAllClosed()
      : this._afterAllClosedAtThisLevel;
  }

  /**
   * Opens a modal modal containing the given template.
   */
  public open<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: BaoModalConfig
  ): BaoModalRef<unknown> {
    const conf = this._applyConfigDefaults(config, new BaoModalInitialConfig());

    // If there is a modal that is currently animating open, return the MatmodalRef of that modal
    if (this._modalAnimatingOpen) {
      return this._lastModalRef;
    }

    const overlayRef = this._createOverlay(conf);
    const modalContainer = this._attachModalContainer(overlayRef, conf);

    const modalRef = this._attachModalContent<T>(
      componentOrTemplateRef,
      modalContainer,
      overlayRef,
      conf
    );
    this._lastModalRef = modalRef;

    // If this is the first modal that we're opening, hide all the non-overlay content.
    if (!this.openModals.length) {
      this._hideNonModalContentFromAssistiveTechnology();
    }

    this.openModals.push(modalRef);
    modalRef.afterClosed().subscribe(() => this._removeOpenModal(modalRef));
    this.afterOpened.next(modalRef);

    // Notify the modal container that the content has been attached.
    modalContainer._initializeWithAttachedContent();

    return modalRef;
  }

  /**
   * Closes all of the currently-open modals.
   */
  public closeAll(): void {
    this._closeModals(this.openModals);
  }

  /**
   * Finds an open modal by its id.
   */
  public getModalById(id: string): BaoModalRef<unknown> | undefined {
    return this.openModals.find(modal => modal.id === id);
  }

  public ngOnDestroy() {
    // Only close the modals at this level on destroy
    // since the parent service may still be active.
    this._closeModals(this._openModalsAtThisLevel);
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();
    // Clean up any subscriptions to modals that never finished opening.
    if (this._animationStateSubscriptions) {
      this._animationStateSubscriptions.unsubscribe();
    }
  }

  /**
   * Creates the overlay into which the modal will be loaded.
   */
  private _createOverlay(config: BaoModalInitialConfig): OverlayRef {
    const overlayConfig = this._getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }

  /**
   * Creates an overlay config from a modal config.
   */
  private _getOverlayConfig(config: BaoModalInitialConfig): OverlayConfig {
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
   * Attaches a modal container to a modal's already-created overlay.
   */
  private _attachModalContainer(
    overlay: OverlayRef,
    config: BaoModalInitialConfig
  ): C {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: BaoModalInitialConfig, useValue: config }]
    });

    const containerPortal = new ComponentPortal(
      this._modalContainerType,
      config.viewContainerRef,
      injector
    );
    const containerRef = overlay.attach<C>(containerPortal);
    containerRef.instance._startOpenAnimation();

    return containerRef.instance;
  }

  /**
   * Attaches the user-provided component to the already-created modal container.
   */
  private _attachModalContent<T>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    modalContainer: C,
    overlayRef: OverlayRef,
    config: BaoModalInitialConfig
  ): BaoModalRef<unknown> {
    // Create a reference to the modal we're creating in order to give the user a handle
    // to modify and close it.
    const modalRef = new this._modalRefConstructor(
      overlayRef,
      modalContainer,
      config.id
    );

    if (componentOrTemplateRef instanceof TemplateRef) {
      modalContainer.attachTemplatePortal(
        new TemplatePortal(componentOrTemplateRef, null, <unknown>{
          $implicit: config.data,
          modalRef
        })
      );
    } else {
      const injector = this._createInjector(config, modalRef, modalContainer);
      const contentRef = modalContainer.attachComponentPortal<T>(
        new ComponentPortal(
          componentOrTemplateRef,
          config.viewContainerRef,
          injector
        )
      );
      modalRef.componentInstance = contentRef.instance;
    }

    modalRef
      .updateSize(config.width, config.height)
      .updatePosition(config.position);

    return modalRef;
  }

  /**
   * Creates a custom injector to be used inside the modal. This allows a component loaded inside
   * of a modal to close itself and, optionally, to return a value.
   */
  private _createInjector(
    config: BaoModalInitialConfig,
    modalRef: BaoModalRef<unknown>,
    modalContainer: C
  ): Injector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    // The modal container should be provided as the modal container and the modal's
    // content are created out of the same `ViewContainerRef` and as such, are siblings
    // for injector purposes. To allow the hierarchy that is expected, the modal
    // container is explicitly provided in the injector.
    const providers: StaticProvider[] = [
      { provide: this._modalContainerType, useValue: modalContainer },
      { provide: this._modalDataToken, useValue: config.data },
      { provide: this._modalRefConstructor, useValue: modalRef }
    ];

    return Injector.create({
      parent: userInjector || this._injector,
      providers
    });
  }

  /**
   * Removes a modal from the array of open modals.
   */
  private _removeOpenModal(modalRef: BaoModalRef<unknown>) {
    const index = this.openModals.indexOf(modalRef);

    if (index > -1) {
      this.openModals.splice(index, 1);

      // If all the modals were closed, remove/restore the `aria-hidden`
      // to a the siblings and emit to the `afterAllClosed` stream.
      if (!this.openModals.length) {
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
  private _hideNonModalContentFromAssistiveTechnology() {
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

  /** Closes all of the modals in an array. */
  private _closeModals(modals: BaoModalRef<unknown>[]) {
    let i = modals.length;
    while (i--) {
      modals[i].close();
    }
  }

  /**
   * Applies default options to the modal config.
   */
  private _applyConfigDefaults(
    config?: BaoModalConfig,
    defaultOptions?: BaoModalInitialConfig
  ): BaoModalInitialConfig {
    const desktopClass = config?.size || eModalDesktopWidthSize.SMALL;
    const mobilClass = config?.mobileSize || eModalMobileWidthSize.FULL;
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
 * Service to open modal.
 */
@Injectable()
export class BaoModal extends BaoModalBase<BaoModalContainer> {
  constructor(
    overlay: Overlay,
    injector: Injector,
    @Optional() @SkipSelf() parentModal: BaoModal,
    overlayContainer: OverlayContainer
  ) {
    super(
      overlay,
      injector,
      parentModal,
      overlayContainer,
      BaoModalRef,
      BaoModalContainer,
      BAO_MODAL_DATA
    );
  }
}
