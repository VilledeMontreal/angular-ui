/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';
import { DomPortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injectable,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class BaoDropdownMenuService {
  // Observable stream that notifies when the menu should close
  public readonly itemClicked$: Observable<void>;
  private readonly itemClickedSource = new Subject<void>();

  constructor() {
    this.itemClicked$ = this.itemClickedSource.asObservable();
  }

  public close(): void {
    this.itemClickedSource.next();
  }
}

/**
 * Unique ID for each dropdown menu
 */
let dropdownMenuUniqueId = 0;
@Directive({
  standalone: false,
  selector: 'bao-dropdown-menu-item, [bao-dropdown-menu-item]',
  host: {
    class: 'bao-dropdown-menu-item',
    '[class.bao-dropdown-menu-item-disabled]': 'disabled===true'
  }
})
export class BaoDropdownMenuItem implements AfterViewInit, OnChanges {
  /**
   * Is the list item disabled
   */
  @Input() public disabled = false;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private _parent: BaoDropdownMenuComponent,
    private baoDropdownMenuService: BaoDropdownMenuService
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @HostListener('window:keyup.space')
  spaceKeyEvent() {
    if (document.activeElement == this.nativeElement) {
      this.nativeElement.click();
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(el: HTMLElement) {
    if (this.nativeElement.attributes['href']) {
      this._parent.setNavigationAttribute(this.nativeElement);
    }
    // Prevent double-click on checkbox input that undoes the toggle
    if (!el.classList.contains('bao-checkbox-content-container')) {
      this.propagateClick();
    }
  }

  @HostListener('window:keyup.enter')
  enterKeyEvent() {
    if (document.activeElement == this.nativeElement) {
      this.nativeElement.click();
    }
  }

  public ngAfterViewInit(): void {
    this.addContentDiv();
    if (!this.disabled) {
      this.renderer.setAttribute(this.nativeElement, 'tabIndex', '0');
    }
    this.addPaddingClass();
    // Remove input element inside item from keyboard navigation sequence
    if (this.nativeElement.classList.contains('has-element-left')) {
      this.renderer.setAttribute(
        this.nativeElement.children.item(0).firstElementChild,
        'tabIndex',
        '-1'
      );
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && changes['disabled'].currentValue == true) {
      this.disableItem();
    }
  }

  /** Regroups label and description in a new div to help with layout */
  private addContentDiv(): void {
    const children = Array.from(this.nativeElement.children);
    const labelIndex = children.findIndex(
      c => c.localName === 'bao-dropdown-menu-item-label'
    );
    const labelElement = children[labelIndex];
    this.renderer.removeChild(this.nativeElement, children[labelIndex]);
    const contentDiv = this.renderer.createElement('div');
    this.renderer.addClass(contentDiv, 'bao-dropdown-menu-item-content');
    this.renderer.appendChild(this.nativeElement, contentDiv);
    this.renderer.appendChild(contentDiv, labelElement);
    const descriptionIndex = children.findIndex(
      c => c.localName === 'bao-dropdown-menu-item-description'
    );
    if (descriptionIndex > 0) {
      const descriptionElement = children[descriptionIndex];
      this.renderer.removeChild(this.nativeElement, children[descriptionIndex]);
      this.renderer.appendChild(contentDiv, descriptionElement);
    }
  }

  private addPaddingClass(): void {
    const children = Array.from(this.nativeElement.children);
    // Menu item has extra element next to label
    if (children.length > 1) {
      // Only toggle element can be on the right
      if (children.findIndex(c => c.localName === 'bao-toggle') > 0) {
        this.renderer.addClass(this.nativeElement, 'has-element-right');
      }
      // Icon, checkbox, radio button or avatar must be on the left
      else {
        this.renderer.addClass(this.nativeElement, 'has-element-left');
      }
    }
  }

  private disableItem(): void {
    if (this.disabled) {
      this.renderer.setAttribute(this.nativeElement, 'aria-disabled', 'true');
      this.renderer.setAttribute(this.nativeElement, 'tabIndex', '-1');
    }
  }

  /**
   * This method propagates a click event to menu item children with inputs (checkbox, radio button).
   * It emits event to close menu if item does not contain an input.
   */
  private propagateClick(): void {
    let closeMenu = true;
    for (let i = 0; i < this.nativeElement.children.length; i++) {
      if (
        this.nativeElement.children.item(i).firstElementChild.localName ==
        'input'
      ) {
        (
          this.nativeElement.children.item(i).firstElementChild as HTMLElement
        ).click();
        closeMenu = false;
      }
    }
    if (closeMenu) {
      this.baoDropdownMenuService.close();
    }
  }
}
@Component({
  standalone: false,
  selector: 'bao-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-dropdown-menu-container',
    '[class.bao-overlay-transparent-backdrop]': 'isOpen===false',
    '[class.bao-dropdown-menu-closed]': 'isOpen===false',
    '[attr.aria-expanded]': 'isOpen'
  },
  providers: [BaoDropdownMenuService]
})
export class BaoDropdownMenuComponent implements AfterViewInit {
  /**
   * Fired when the dropdown-menu changes its 'isOpen' value
   */
  @Output() public isOpenChange = new EventEmitter<boolean>();

  /**
   * Fired when menu is closed by key event triggered from menu item
   */
  @Output() public isClosedByKeyEvent = new EventEmitter();

  /**
   * Content of menu to be loaded inside Overlay
   */
  @ViewChild('menuContent') _menuContent: ElementRef<HTMLElement>;

  /**
   * All list items inside menu
   */
  @ContentChildren(BaoDropdownMenuItem, { descendants: true })
  _listItems: QueryList<BaoDropdownMenuItem>;

  /**
   * Unique identifier of the dropdown menu
   */
  readonly menuId = `bao-dropdown-menu-${++dropdownMenuUniqueId}`;

  /**
   * Is the dropwdown menu currently open
   */
  private _isOpen = false;

  /**
   * Reference to portal which is attached to Overlay
   */
  private _menuPortal: DomPortal;

  /**
   * Index of currently active list item
   */
  private _activeItemIndex: number;

  constructor(
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    public baoDropdownMenuService: BaoDropdownMenuService
  ) {}

  get isOpen(): boolean {
    return this._isOpen;
  }
  get activeItemIndex(): number {
    return this._activeItemIndex;
  }
  get menuPortal(): DomPortal {
    return this._menuPortal;
  }
  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
  get service(): BaoDropdownMenuService {
    return this.baoDropdownMenuService;
  }
  set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
    this.cdr.detectChanges();
    this.isOpenChange.emit(isOpen);
  }
  set activeItemIndex(index: number) {
    this._activeItemIndex = index;
  }

  @HostListener('window:keyup.arrowup')
  upKeyEvent() {
    if (this.isOpen) {
      const index = isNaN(this._activeItemIndex) ? -1 : this._activeItemIndex;
      const nextIndex = this.getNextActivableItemIndex(index, false);
      if (nextIndex > -1) {
        this.focusNextItem(nextIndex);
      }
    }
  }

  @HostListener('window:keyup.arrowdown')
  downKeyEvent() {
    if (this.isOpen) {
      const index = isNaN(this._activeItemIndex) ? -1 : this._activeItemIndex;
      const nextIndex = this.getNextActivableItemIndex(index, true);
      if (nextIndex > -1) {
        this.focusNextItem(nextIndex);
      }
    }
  }

  /** Prevents focus to be lost when TAB has reached end of menu  */
  @HostListener('window:keydown.tab')
  tabKeyEvent() {
    if (this.isOpen) {
      if (document.activeElement === this._listItems.last.nativeElement) {
        this.isClosedByKeyEvent.emit();
      }
    }
  }

  @HostListener('window:keyup.tab')
  tabUpKeyEvent() {
    if (this.isOpen) {
      this._activeItemIndex = this._listItems.reduce((acc, element, index) => {
        if (element.nativeElement === document.activeElement) {
          acc = index;
        }

        return acc;
      }, -1);
    }
  }

  /** Prevents focus to be lost when SHIFT + TAB has reached beginning of menu  */
  @HostListener('window:keydown.shift.tab', ['$event'])
  shiftTabKeyEvent(event: KeyboardEvent) {
    if (this.isOpen) {
      if (document.activeElement === this._listItems.first.nativeElement) {
        event.preventDefault();
        event.stopPropagation();
        this.isClosedByKeyEvent.emit();
      }
    }
  }

  public ngAfterViewInit(): void {
    this.renderer.setAttribute(this.nativeElement, 'id', this.menuId);
    this._menuPortal = new DomPortal(this._menuContent);
  }

  public open(): void {
    this.isOpen = true;
  }

  public close(): void {
    this.isOpen = false;
  }

  public focus(): void {
    this._activeItemIndex = -1;
    this._menuContent.nativeElement.focus();
  }

  /** Move the aria-current attribute to new active page */
  public setNavigationAttribute(activePageElement: HTMLElement): void {
    const previousActivePage = this._listItems.find(
      (item: BaoDropdownMenuItem) => {
        return item.nativeElement.attributes['aria-current'] === 'page';
      }
    );
    if (previousActivePage) {
      this.renderer.removeAttribute(
        previousActivePage.nativeElement,
        'aria-current'
      );
      this.renderer.removeClass(
        previousActivePage.nativeElement,
        'active-link'
      );
    }
    this.renderer.setAttribute(activePageElement, 'aria-current', 'page');
    this.renderer.addClass(activePageElement, 'active-link');
  }

  private focusNextItem(nextIndex: number): void {
    this._activeItemIndex = nextIndex;
    this._listItems.get(nextIndex).nativeElement.focus();
  }

  /**
   * Finds the next activable tab index when navigating with up and down arrow or TAB keys
   * @param currentIndex List item index which currently has focus
   * @param isDown Whether the navigation is going in the down direction or not
   * @param isBackward If recursive function is going backward looking for last activable item in list
   * @returns Index of the next item that will receive focus
   */
  private getNextActivableItemIndex(
    currentIndex: number,
    isDown: boolean
  ): number {
    const init: number[] = [];
    // Get all the activable indexes
    const activableIndexes = this._listItems.reduce((acc, element, index) => {
      if (!element.disabled) {
        acc = [...acc, index];
      }

      return acc;
    }, init);

    if (activableIndexes.length) {
      if (isDown) {
        // Select the first enabled element
        if (currentIndex === -1) {
          return activableIndexes[0];
        }

        // Select the only enabled element
        if (activableIndexes.length === 1) {
          return activableIndexes[0];
        }

        // Stay on the last enabled element
        if (currentIndex === activableIndexes[activableIndexes.length - 1]) {
          return currentIndex;
        }

        // Select the next enabled element
        return activableIndexes.find(index => index > currentIndex);
      }

      const isUp = !isDown;
      if (isUp) {
        // Do nothing whenever nothing is selected
        if (currentIndex === -1) {
          return currentIndex;
        }

        // Select the only enabled element
        if (activableIndexes.length === 1) {
          return activableIndexes[0];
        }

        // Stay on the first enabled element
        if (currentIndex === activableIndexes[0]) {
          return currentIndex;
        }

        // Select the above enabled element
        return activableIndexes.reverse().find(index => index < currentIndex);
      }

      return -1;
    }
  }
}
/**
 * Directive to be applied on element that will trigger the opening and closing of menu.
 */
@Directive({
  standalone: false,
  selector:
    'bao-dropdown-menu-trigger, [bao-dropdown-menu-trigger], [baoDropdownMenuTriggerFor]',
  host: { class: 'bao-dropdown-menu-trigger' }
})
export class BaoDropdownMenuTrigger implements AfterViewInit, OnDestroy {
  @Input('baoDropdownMenuTriggerFor') menu: BaoDropdownMenuComponent | null;
  private _overlayRef: OverlayRef | null = null;
  private _isMenuOpen = false;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    private overlay: Overlay
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @HostListener('window:keyup.escape')
  escapeKeyEvent() {
    if (this._isMenuOpen) {
      this.closeMenu();
      this.nativeElement.focus();
    }
  }

  @HostListener('click')
  onClick() {
    this.toggleMenu();
  }

  public ngAfterViewInit(): void {
    this.renderer.setAttribute(this.nativeElement, 'role', 'button');
    this.renderer.setAttribute(
      this.nativeElement,
      'aria-controls',
      `bao-dropdown-menu-${dropdownMenuUniqueId}`
    );
    this.menu.isClosedByKeyEvent.subscribe(() => {
      this.closeMenu();
      this.nativeElement.focus();
    });
    this.menu.service.itemClicked$.subscribe(() => {
      this.closeMenu();
      this.nativeElement.focus();
    });
  }

  public ngOnDestroy(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

  private toggleMenu(): void {
    return this._isMenuOpen ? this.closeMenu() : this.openMenu();
  }

  private closeMenu(): void {
    this._isMenuOpen = false;
    this.menu.close();
    if (this._overlayRef) {
      this._overlayRef.detach();
    }
  }

  private openMenu(): void {
    if (!this.menu) {
      return;
    }
    const overlayRef = this.createOverlay();
    overlayRef.attach(this.menu.menuPortal);
    this._isMenuOpen = true;
    this.menu.open();
    this.menu.focus();
  }

  private createOverlay(): OverlayRef {
    if (!this._overlayRef) {
      const config = this.getOverlayConfig();
      this._overlayRef = this.overlay.create(config);
    }
    this._overlayRef.backdropClick().subscribe(() => {
      this.closeMenu();
    });
    return this._overlayRef;
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elementRef)
        .withLockedPosition()
        .withGrowAfterOpen()
        .withPositions([
          {
            // top-left of the overlay is connected to bottom-left of the origin;
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top'
          } as ConnectedPosition,
          {
            // bottom-left of the overlay is connected to top-left of the origin;
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom'
          } as ConnectedPosition,
          {
            // top-right of the overlay is connected to bottom-right of the origin;
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top'
          } as ConnectedPosition,
          {
            // bottom-right of the overlay is connected to top-right of the origin;
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom'
          } as ConnectedPosition
        ]),
      backdropClass: 'bao-overlay-transparent-backdrop',
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
  }
}
/**
 * Sections of list items in menu. Apply proper styling to section's title if there is one.
 */
@Directive({
  standalone: false,
  selector: 'bao-dropdown-menu-section, [bao-dropdown-menu-section]',
  host: { class: 'bao-dropdown-menu-section' }
})
export class BaoDropdownMenuSection implements AfterViewInit {
  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    const children = Array.from(this.nativeElement.childNodes);
    const textIndex = children.findIndex(
      (c: ChildNode) => c.nodeName === '#text'
    );
    if (textIndex > -1) {
      this.insertTitle(children, textIndex);
    }
  }

  private insertTitle(children: ChildNode[], txtIdx: number): void {
    const titleElement = this.renderer.createElement('h5');
    this.renderer.setProperty(
      titleElement,
      'textContent',
      children[txtIdx].nodeValue
    );
    this.renderer.removeChild(this.nativeElement, children[txtIdx]);
    const listIndex = children.findIndex((c: ChildNode) => c.nodeName === 'UL');
    this.renderer.insertBefore(
      this.nativeElement,
      titleElement,
      children[listIndex]
    );
  }
}
/**
 * Label of a list item, add css class to apply proper styling.
 */
@Directive({
  standalone: false,
  selector: 'bao-dropdown-menu-item-label, [bao-dropdown-menu-item-label]',
  host: { class: 'bao-dropdown-menu-item-label' }
})
export class BaoDropdownMenuItemLabel {}
/**
 * Description of a list item, add css class to apply proper styling.
 */
@Directive({
  standalone: false,
  selector:
    'bao-dropdown-menu-item-description, [bao-dropdown-menu-item-description]',
  host: { class: 'bao-dropdown-menu-item-description' }
})
export class BaoDropdownMenuItemDescription {}
/**
 * Divider to separate sections.
 */
@Component({
  standalone: false,
  template: `<hr />`,
  selector: 'bao-dropdown-menu-divider, [bao-dropdown-menu-divider]',
  host: { class: 'bao-dropdown-menu-divider' }
})
export class BaoDropdownMenuDivider implements AfterContentInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterContentInit(): void {
    this.renderer.setAttribute(this.nativeElement, 'role', 'separator');
  }
}
