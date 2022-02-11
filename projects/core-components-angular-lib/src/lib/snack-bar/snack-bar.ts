import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  ComponentType,
  PortalInjector,
  TemplatePortal
} from '@angular/cdk/portal';
import {
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  TemplateRef,
  Type
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import {
  BaoSimpleSnackBarComponent,
  ITextOnlySnackBar
} from './simple-snack-bar.component';
import { BAO_SNACK_BAR_DATA, BaoSnackBarConfig } from './snack-bar-config';
import {
  BaoSnackBarContainerComponent,
  IBaoSnackBarContainer
} from './snack-bar-container';
import { BaoSnackBarRef } from './snack-bar-ref';

export function baoFactory() {
  return new BaoSnackBarConfig();
}

/** Injection token that can be used to specify default snack bar. */
export const MAT_SNACK_BAR_DEFAULT_OPTIONS =
  new InjectionToken<BaoSnackBarConfig>('mat-snack-bar-default-options', {
    providedIn: 'root',
    factory: baoFactory
  });

/**
 * Service to dispatch Material Design snack bar messages.
 */
@Injectable({ providedIn: 'root' })
export class BaoSnackBarService implements OnDestroy {
  /**
   * Reference to the current snack bar in the view *at this level* (in the Angular injector tree).
   * If there is a parent snack-bar service, all operations should delegate to that parent
   * via `_openedSnackBarRef`.
   */
  private _snackBarRefAtThisLevel: BaoSnackBarRef<any> | null = null;

  /** The component that should be rendered as the snack bar's simple component. */
  protected simpleSnackBarComponent: Type<ITextOnlySnackBar> =
    BaoSimpleSnackBarComponent;

  /** The container component that attaches the provided template or component. */
  protected snackBarContainerComponent: Type<IBaoSnackBarContainer> =
    BaoSnackBarContainerComponent;

  /** The CSS class to applie for handset mode. */
  protected handsetCssClass = 'mat-snack-bar-handset';

  /** Reference to the currently opened snackbar at *any* level. */
  get _openedSnackBarRef(): BaoSnackBarRef<any> | null {
    const parent = this._parentSnackBar;
    return parent ? parent._openedSnackBarRef : this._snackBarRefAtThisLevel;
  }

  set _openedSnackBarRef(value: BaoSnackBarRef<any> | null) {
    if (this._parentSnackBar) {
      this._parentSnackBar._openedSnackBarRef = value;
    } else {
      this._snackBarRefAtThisLevel = value;
    }
  }

  constructor(
    private _overlay: Overlay,
    private _live: LiveAnnouncer,
    private _injector: Injector,
    private _breakpointObserver: BreakpointObserver,
    @Optional() @SkipSelf() private _parentSnackBar: BaoSnackBarService,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS)
    private _defaultConfig: BaoSnackBarConfig
  ) {}

  /**
   * Creates and dispatches a snack bar with a custom component for the content, removing any
   * currently opened snack bars.
   *
   * @param component Component to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  public openFromComponent<T>(
    component: ComponentType<T>,
    config?: BaoSnackBarConfig
  ): BaoSnackBarRef<T> {
    return this.attach(component, config) as BaoSnackBarRef<T>;
  }

  /**
   * Creates and dispatches a snack bar with a custom template for the content, removing any
   * currently opened snack bars.
   *
   * @param template Template to be instantiated.
   * @param config Extra configuration for the snack bar.
   */
  public openFromTemplate(
    template: TemplateRef<any>,
    config?: BaoSnackBarConfig
  ): BaoSnackBarRef<EmbeddedViewRef<any>> {
    return this.attach(template, config);
  }

  /**
   * Opens a snackbar with a message and an optional action.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param config Additional configuration options for the snackbar.
   */
  public open(
    message: string,
    action = '',
    type = '',
    config?: BaoSnackBarConfig
  ): BaoSnackBarRef<ITextOnlySnackBar> {
    const _config = { ...this._defaultConfig, ...config };

    // Since the user doesn't have access to the component, we can
    // override the data to pass in our own message, action and type.
    _config.data = { message, action, type };

    if (!_config.announcementMessage) {
      _config.announcementMessage = message;
    }

    return this.openFromComponent(this.simpleSnackBarComponent, _config);
  }

  /**
   * Dismisses the currently-visible snack bar.
   */
  public dismiss(): void {
    if (this._openedSnackBarRef) {
      this._openedSnackBarRef.dismiss();
    }
  }

  public ngOnDestroy() {
    // Only dismiss the snack bar at the current level on destroy.
    if (this._snackBarRefAtThisLevel) {
      this._snackBarRefAtThisLevel.dismiss();
    }
  }

  /**
   * Attaches the snack bar container component to the overlay.
   */
  private attachSnackBarContainer(
    overlayRef: OverlayRef,
    config: BaoSnackBarConfig
  ): IBaoSnackBarContainer {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = new PortalInjector(
      userInjector || this._injector,
      new WeakMap([[BaoSnackBarConfig, config]])
    );

    const containerPortal = new ComponentPortal(
      this.snackBarContainerComponent,
      config.viewContainerRef,
      injector
    );
    const containerRef: ComponentRef<IBaoSnackBarContainer> =
      overlayRef.attach(containerPortal);
    containerRef.instance.snackBarConfig = config;
    return containerRef.instance;
  }

  /**
   * Places a new component or a template as the content of the snack bar container.
   */
  private attach<T>(
    content: ComponentType<T> | TemplateRef<T>,
    userConfig?: BaoSnackBarConfig
  ): BaoSnackBarRef<T | EmbeddedViewRef<any>> {
    const config = {
      ...new BaoSnackBarConfig(),
      ...this._defaultConfig,
      ...userConfig
    };
    const overlayRef = this.createOverlay(config);
    const container = this.attachSnackBarContainer(overlayRef, config);
    const snackBarRef = new BaoSnackBarRef<T | EmbeddedViewRef<any>>(
      container,
      overlayRef
    );

    if (content instanceof TemplateRef) {
      const portal = new TemplatePortal(content, null!, {
        $implicit: config.data,
        snackBarRef
      } as any);

      snackBarRef.instance = container.attachTemplatePortal(portal);
    } else {
      const injector = this.createInjector(config, snackBarRef);
      const portal = new ComponentPortal(content, undefined, injector);
      const contentRef = container.attachComponentPortal<T>(portal);

      // We can't pass this via the injector, because the injector is created earlier.
      snackBarRef.instance = contentRef.instance;
    }

    // Subscribe to the breakpoint observer and attach the mat-snack-bar-handset class as
    // appropriate. This class is applied to the overlay element because the overlay must expand to
    // fill the width of the screen for full width snackbars.
    this._breakpointObserver
      .observe(Breakpoints.HandsetPortrait)
      .pipe(takeUntil(overlayRef.detachments()))
      .subscribe(state => {
        const classList = overlayRef.overlayElement.classList;
        state.matches
          ? classList.add(this.handsetCssClass)
          : classList.remove(this.handsetCssClass);
      });

    this.animateSnackBar(snackBarRef, config);
    this._openedSnackBarRef = snackBarRef;
    return this._openedSnackBarRef;
  }

  /** Animates the old snack bar out and the new one in. */
  private animateSnackBar(
    snackBarRef: BaoSnackBarRef<any>,
    config: BaoSnackBarConfig
  ) {
    // When the snackbar is dismissed, clear the reference to it.
    snackBarRef.afterDismissed().subscribe(() => {
      // Clear the snackbar ref if it hasn't already been replaced by a newer snackbar.
      // eslint-disable-next-line eqeqeq
      if (this._openedSnackBarRef == snackBarRef) {
        this._openedSnackBarRef = null;
      }

      if (config.announcementMessage) {
        this._live.clear();
      }
    });

    if (this._openedSnackBarRef) {
      // If a snack bar is already in view, dismiss it and enter the
      // new snack bar after exit animation is complete.
      this._openedSnackBarRef.afterDismissed().subscribe(() => {
        snackBarRef.containerInstance.enter();
      });
      this._openedSnackBarRef.dismiss();
    } else {
      // If no snack bar is in view, enter the new snack bar.
      snackBarRef.containerInstance.enter();
    }

    // If a dismiss timeout is provided, set up dismiss based on after the snackbar is opened.
    if (config.duration && config.duration > 0) {
      snackBarRef
        .afterOpened()
        .subscribe(() => snackBarRef.dismissAfter(config.duration));
    }

    if (config.announcementMessage) {
      void this._live.announce(config.announcementMessage, config.politeness);
    }
  }

  /**
   * Creates a new overlay and places it in the correct location.
   * @param config The user-specified snack bar config.
   */
  private createOverlay(config: BaoSnackBarConfig): OverlayRef {
    const overlayConfig = new OverlayConfig();
    overlayConfig.direction = config.direction;

    const positionStrategy = this._overlay.position().global();
    // Set horizontal position.
    const isRtl = config.direction === 'rtl';
    const isLeft =
      config.horizontalPosition === 'left' ||
      (config.horizontalPosition === 'start' && !isRtl) ||
      (config.horizontalPosition === 'end' && isRtl);
    const isRight = !isLeft && config.horizontalPosition !== 'center';
    if (isLeft) {
      positionStrategy.left('0');
    } else if (isRight) {
      positionStrategy.right('0');
    } else {
      positionStrategy.centerHorizontally();
    }
    // Set horizontal position.
    if (config.verticalPosition === 'top') {
      positionStrategy.top('0');
    } else {
      positionStrategy.bottom('0');
    }

    overlayConfig.positionStrategy = positionStrategy;
    return this._overlay.create(overlayConfig);
  }

  /**
   * Creates an injector to be used inside of a snack bar component.
   * @param config Config that was used to create the snack bar.
   * @param snackBarRef Reference to the snack bar.
   */
  private createInjector<T>(
    config: BaoSnackBarConfig,
    snackBarRef: BaoSnackBarRef<T>
  ): PortalInjector {
    const userInjector =
      config && config.viewContainerRef && config.viewContainerRef.injector;

    return new PortalInjector(
      userInjector || this._injector,
      new WeakMap<any, any>([
        [BaoSnackBarRef, snackBarRef],
        [BAO_SNACK_BAR_DATA, config.data]
      ])
    );
  }
}
