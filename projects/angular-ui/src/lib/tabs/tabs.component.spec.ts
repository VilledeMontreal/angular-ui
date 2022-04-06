/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { DebugElement, DebugNode } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  BaoTabsContainer,
  BaoTablistComponent,
  BaoTabPanel,
  BaoTabHeader
} from './index';
import { TestTablistHostComponent } from './tests/tabs.hostcomponent.spec';

describe('BaoTablistComponent', () => {
  describe('Primary', () => {
    let testComponent: TestTablistHostComponent;
    let fixture: ComponentFixture<TestTablistHostComponent>;
    let tablistDebugElement: DebugElement;
    let tabsElement: HTMLElement[];
    let panelsElement: DebugNode[];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          BaoTabsContainer,
          BaoTablistComponent,
          BaoTabPanel,
          BaoTabHeader,
          TestTablistHostComponent
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestTablistHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      tablistDebugElement = fixture.debugElement.query(By.css('.bao-tablist'));
      tabsElement = tablistDebugElement.nativeNode.children;
      panelsElement = fixture.debugElement.queryAllNodes(By.css('.bao-panel'));
    });

    it('should apply appropriate class based on size input', () => {
      // Default class
      expect(
        tablistDebugElement.nativeNode.classList.contains('bao-tablist')
      ).toBe(true);
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(
        tablistDebugElement.nativeNode.classList.contains('bao-tablist-small')
      ).toBe(true);

      testComponent.size = 'medium';
      fixture.detectChanges();
      expect(
        tablistDebugElement.nativeNode.classList.contains('bao-tablist-medium')
      ).toBe(true);

      testComponent.size = 'large';
      fixture.detectChanges();
      expect(
        tablistDebugElement.nativeNode.classList.contains('bao-tablist-large')
      ).toBe(true);
    });
    it("should set component's attributes with proper values", () => {
      expect(
        tablistDebugElement.nativeNode.attributes['aria-label'].value
      ).toBe('onglets');
      expect(tablistDebugElement.nativeNode.attributes['role'].value).toBe(
        'tablist'
      );
    });
    it('should set first tab and panel as the active ones on init', () => {
      expect(tabsElement[0].classList.contains('active')).toBe(true);
      expect(tabsElement[0].attributes['aria-selected'].value).toBe('true');
      expect(panelsElement[0].nativeNode.attributes['hidden']).toBeUndefined();
      for (let i = 1; i < tabsElement.length; i++) {
        expect(tabsElement[1].classList.contains('active')).toBe(false);
        expect(tabsElement[1].attributes['aria-selected'].value).toBe('false');
        expect(panelsElement[1].nativeNode.attributes['hidden']).toBeDefined();
      }
    });
    it('should associate each tab to the panel it controls', () => {
      for (let i = 0; i < tabsElement.length; i++) {
        expect(
          panelsElement[i].nativeNode.attributes['aria-labelledby']
        ).toBeDefined();
        expect(tabsElement[i].id).toBe(
          panelsElement[i].nativeNode.attributes['aria-labelledby'].value
        );
        expect(tabsElement[i].attributes['aria-controls']).toBeDefined();
        expect(panelsElement[i].nativeNode.id).toBe(
          tabsElement[i].attributes['aria-controls'].value
        );
      }
    });
    it('should hide disabled tab from navigation', () => {
      for (const tab of tabsElement) {
        if (tab.attributes['disabled']) {
          expect(tab.attributes['tabIndex']).toBeDefined();
          expect(tab.attributes['tabIndex'].value).toBe('-1');
        }
      }
    });
    // On tab change with click
    it('should change active tab and panel on tab click', () => {
      tabsElement[1].click();
      fixture.detectChanges();
      // New active tab
      expect(tabsElement[1].classList.contains('active')).toBe(true);
      expect(tabsElement[1].attributes['aria-selected'].value).toBe('true');
      expect(panelsElement[1].nativeNode.attributes['hidden']).toBeUndefined();
      expect(tabsElement[1].classList.contains('focus-visible')).toBe(false);
      // Previous active tab
      expect(tabsElement[0].classList.contains('active')).toBe(false);
      expect(tabsElement[0].attributes['aria-selected'].value).toBe('false');
      expect(panelsElement[0].nativeNode.attributes['hidden']).toBeDefined();
      expect(tabsElement[0].classList.contains('focus-visible')).toBe(false);
    });
    it('should be impossible to select disabled tab', () => {
      const disabledTab: HTMLElement = Array.from(tabsElement).find(
        (tab: HTMLElement) => !!tab.attributes['disabled']
      );
      disabledTab.click();
      fixture.detectChanges();
      expect(disabledTab.classList.contains('active')).toBe(false);
      expect(disabledTab.attributes['aria-selected'].value).toBe('false');
    });
    // On tab change with keyboard event
    it('should change active tab and panel on right arrow keypress', () => {
      tabsElement[0].focus();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'arrowright' }));
      fixture.detectChanges();
      // New active tab
      expect(tabsElement[1].classList.contains('active')).toBe(true);
      expect(tabsElement[1].attributes['aria-selected'].value).toBe('true');
      expect(panelsElement[1].nativeNode.attributes['hidden']).toBeUndefined();
      expect(tabsElement[1].classList.contains('focus-visible')).toBe(true);
      // Previous active tab
      expect(tabsElement[0].classList.contains('active')).toBe(false);
      expect(tabsElement[0].attributes['aria-selected'].value).toBe('false');
      expect(panelsElement[0].nativeNode.attributes['hidden']).toBeDefined();
      expect(tabsElement[0].classList.contains('focus-visible')).toBe(false);
    });
    it('should skip disabled tab on keyboard navigation', () => {
      const disabledTabIndex: number = Array.from(tabsElement).findIndex(
        (tab: HTMLElement) => !!tab.attributes['disabled']
      );
      tabsElement[disabledTabIndex - 1].focus();
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'arrowright' }));
      fixture.detectChanges();
      expect(tabsElement[disabledTabIndex].classList.contains('active')).toBe(
        false
      );
      expect(
        tabsElement[disabledTabIndex].attributes['aria-selected'].value
      ).toBe('false');
    });
  });
});
