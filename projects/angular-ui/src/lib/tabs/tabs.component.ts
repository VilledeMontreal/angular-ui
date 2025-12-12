/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

/**
 * Unique number to generate a unique ID
 */
let tabsNextUniqueId = 0;
@Directive({
  selector: 'bao-tab-header, [bao-tab-header]',
  exportAs: 'baoTabHeader',
  host: {
    class: 'bao-tab-header'
  }
})
export class BaoTabHeader implements AfterViewInit {
  /**
   * Emits its index when tab is clicked
   */
  @Output() public onTabClick: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @HostListener('click', ['$event.target'])
  onClick(el: HTMLElement) {
    const tabIndex = el.id.split('-')[el.id.split('-').length - 1];
    this.onTabClick.emit(tabIndex);
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.nativeElement, 'role', 'tab');
    this.renderer.setAttribute(this.nativeElement, 'aria-selected', 'false');
    this.renderer.setAttribute(this.nativeElement, 'tabindex', '-1');
  }
}

@Directive({
  selector: 'bao-panel, [bao-panel]',
  exportAs: 'baoPanel',
  host: {
    class: 'bao-panel'
  }
})
export class BaoTabPanel implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.nativeElement, 'role', 'tabpanel');
    this.renderer.setAttribute(this.nativeElement, 'hidden', 'true');
    this.renderer.setAttribute(this.nativeElement, 'tabindex', '0');
    this.renderer.setAttribute(this.nativeElement, 'aria-expanded', 'false');
  }
}

@Component({
  selector: 'bao-tablist, [bao-tablist]',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-tablist',
    '[class.bao-tablist-small]': 'size === "small"',
    '[class.bao-tablist-medium]': 'size === "medium"',
    '[class.bao-tablist-large]': 'size === "large"'
  }
})
export class BaoTablistComponent
  implements AfterViewInit, AfterContentInit, OnDestroy
{
  @ContentChildren(BaoTabHeader) tabHeaders: QueryList<BaoTabHeader>;

  /**
   * Size of the tabs displayed
   */
  @Input() public size: 'small' | 'medium' | 'large' = 'large';

  /**
   * Optionnal value to be used as aria-label property on tablist component
   */
  @Input() public ariaLabel = 'onglets';

  /**
   * Emits the index of the new active tab
   */
  @Output() public activeTabChange: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * Index of the tab that is currently active
   */
  private activeTabIndex: string;

  /**
   * Unique ID for every instance of BaoTablist component
   */
  private uniqueId: string;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {
    this.uniqueId = `bao-tablist-${tabsNextUniqueId++}`;
  }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get tabs(): HTMLCollection {
    return this.elementRef.nativeElement.children;
  }

  @HostListener('window:keydown.arrowleft')
  leftKeyEvent() {
    if (document.activeElement.parentElement.id === this.uniqueId) {
      this.activeTabIndex = this.getNextActivableTabIndex(
        parseInt(this.activeTabIndex),
        false
      );
      this.changeActiveTab(this.activeTabIndex, true);
      this.activeTabChange.emit(this.activeTabIndex);
    }
  }

  @HostListener('window:keydown.arrowright')
  rightKeyEvent() {
    if (document.activeElement.parentElement.id === this.uniqueId) {
      this.activeTabIndex = this.getNextActivableTabIndex(
        parseInt(this.activeTabIndex),
        true
      );
      this.changeActiveTab(this.activeTabIndex, true);
      this.activeTabChange.emit(this.activeTabIndex);
    }
  }

  /**
   * Makes the focus visible on tab header when changing from mouse to keyboard navigation
   */
  @HostListener('window:keydown.tab')
  tabKeyEvent() {
    if (document.activeElement.parentElement.id === this.uniqueId) {
      this.renderer.addClass(this.tabs[this.activeTabIndex], 'focus-visible');
    }
  }

  /**
   * Makes the focus visible on tab header when changing from mouse to keyboard navigation
   */
  @HostListener('window:keydown.shift.tab')
  tabShiftKeyEvent() {
    if (document.activeElement.parentElement.id === this.uniqueId) {
      this.renderer.addClass(this.tabs[this.activeTabIndex], 'focus-visible');
    }
  }

  ngAfterViewInit(): void {
    this.setTablistAttributes();
    if (this.nativeElement.childElementCount) {
      this.setInitialActiveTab();
    }
  }

  ngAfterContentInit(): void {
    this.tabHeaders.forEach((tab: BaoTabHeader) => {
      tab.onTabClick.subscribe((index: string) => {
        this.renderer.removeClass(this.tabs[index], 'focus-visible');
        this.activeTabIndex = index;
        this.changeActiveTab(index, false);
        this.activeTabChange.emit(index);
      });
    });
  }

  ngOnDestroy(): void {
    this.tabHeaders.forEach((tab: BaoTabHeader) => {
      tab.onTabClick.unsubscribe();
    });
  }

  private setTablistAttributes(): void {
    this.renderer.setAttribute(this.nativeElement, 'role', 'tablist');
    this.renderer.setAttribute(
      this.nativeElement,
      'aria-label',
      this.ariaLabel
    );
    this.renderer.setProperty(this.nativeElement, 'id', this.uniqueId);
  }

  private setInitialActiveTab(): void {
    const firstTabIndex = Array.from(this.tabs).findIndex(
      (tab: HTMLElement) => !tab.attributes['disabled']
    );
    this.activeTabIndex = firstTabIndex.toString();
    this.renderer.setAttribute(
      this.tabs[firstTabIndex],
      'aria-selected',
      'true'
    );
    this.renderer.addClass(this.tabs[firstTabIndex], 'active');
    this.renderer.addClass(this.tabs[firstTabIndex], 'focus-visible');
    this.renderer.removeAttribute(this.tabs[firstTabIndex], 'tabindex');
  }

  private changeActiveTab(
    newActiveTabIndex: string,
    isFocusVisible: boolean
  ): void {
    Array.from(this.tabs).forEach((tab: HTMLElement) => {
      if (tab.id === `bao-tab-${newActiveTabIndex}`) {
        if (isFocusVisible) {
          this.renderer.addClass(tab, 'focus-visible');
        }
        this.renderer.setAttribute(tab, 'aria-selected', 'true');
        this.renderer.addClass(tab, 'active');
        this.renderer.removeAttribute(tab, 'tabindex');
        tab.focus();
      } else {
        this.renderer.setAttribute(tab, 'aria-selected', 'false');
        this.renderer.removeClass(tab, 'active');
        this.renderer.setAttribute(tab, 'tabindex', '-1');
        this.renderer.removeClass(tab, 'focus-visible');
      }
    });
  }

  /**
   * Finds the next activable tab index when navigating with left and right arrow keys
   * @param currentIndex Tab index which currently has focus
   * @param isRight Whether the tab navigation is going in the right direction or not
   * @returns Index of the new tab that will receive focus
   */
  private getNextActivableTabIndex(
    currentIndex: number,
    isRight: boolean
  ): string {
    const nextIndex = isRight ? currentIndex + 1 : currentIndex - 1;
    const nextIndexInTablist =
      ((nextIndex % this.tabs.length) + this.tabs.length) % this.tabs.length;
    if (this.tabs[nextIndexInTablist].attributes['disabled']) {
      return this.getNextActivableTabIndex(nextIndexInTablist, isRight);
    }
    return nextIndexInTablist.toString();
  }
}

@Directive({
  selector: 'bao-tabs, [bao-tabs]',
  exportAs: 'baoTabs',
  host: {
    class: 'bao-tabs'
  }
})
export class BaoTabsContainer
  implements AfterViewInit, AfterContentInit, OnDestroy
{
  @ContentChild(BaoTablistComponent) tablist: BaoTablistComponent;

  private panelIdPrefix = 'bao-panel-';
  private tabIdPrefix = 'bao-tab-';

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  get tabs(): HTMLCollection {
    return this.elementRef.nativeElement.querySelector('.bao-tablist').children;
  }

  get panels(): NodeListOf<Element> {
    return this.elementRef.nativeElement.querySelectorAll('.bao-panel');
  }

  ngAfterViewInit(): void {
    this.setInitialActivePanel();
    Array.from(this.tabs).forEach((tab: HTMLElement, idx) => {
      const tabId = `${this.tabIdPrefix}${idx}`;
      const panelId = `${this.panelIdPrefix}${idx}`;
      this.renderer.setProperty(tab, 'id', tabId);
      this.renderer.setProperty(this.panels[idx], 'id', panelId);
      this.renderer.setAttribute(tab, 'aria-controls', panelId);
      this.renderer.setAttribute(this.panels[idx], 'aria-labelledby', tabId);
    });
  }

  ngAfterContentInit(): void {
    this.tablist.activeTabChange.subscribe((index: string) =>
      this.changeActivePanel(index)
    );
  }

  ngOnDestroy(): void {
    this.tablist.activeTabChange.unsubscribe();
  }

  private setInitialActivePanel(): void {
    const firstTabIndex = Array.from(this.tabs).findIndex(
      (tab: HTMLElement) => !tab.attributes['disabled']
    );
    this.renderer.removeAttribute(this.panels[firstTabIndex], 'hidden');
    this.renderer.setAttribute(
      this.panels[firstTabIndex],
      'aria-expanded',
      'true'
    );
  }

  private changeActivePanel(newActiveId: string): void {
    this.panels.forEach((panel: Element) => {
      if (panel.id === `${this.panelIdPrefix}${newActiveId}`) {
        this.renderer.removeAttribute(panel, 'hidden');
        this.renderer.setAttribute(panel, 'aria-expanded', 'true');
      } else {
        this.renderer.setAttribute(panel, 'hidden', 'true');
        this.renderer.setAttribute(panel, 'aria-expanded', 'false');
      }
    });
  }
}
