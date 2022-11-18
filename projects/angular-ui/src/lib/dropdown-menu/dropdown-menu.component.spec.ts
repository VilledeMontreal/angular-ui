/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  TestButtonMenuHostComponent,
  TestDropdownMenuHostComponent
} from './tests/dropdown-menu.hostcomponent.spec';
import {
  BaoDropdownMenuComponent,
  BaoDropdownMenuItem,
  BaoDropdownMenuTrigger,
  BaoDropdownMenuItemLabel
} from './dropdown-menu.component';
import { BaoIconComponent } from 'angular-ui';

/* eslint-disable @typescript-eslint/no-unsafe-return */
describe('BaoDropdownMenuComponent', () => {
  describe('Dropdown menu and menu item', () => {
    let testMenuComponent: TestDropdownMenuHostComponent;
    let fixtureMenu: ComponentFixture<TestDropdownMenuHostComponent>;
    let dropdownMenuDebugElement: DebugElement;
    let listItemDebugElement: HTMLElement[];

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [
            BaoDropdownMenuComponent,
            BaoDropdownMenuItem,
            BaoDropdownMenuTrigger,
            BaoDropdownMenuItemLabel,
            TestButtonMenuHostComponent,
            TestDropdownMenuHostComponent,
            BaoIconComponent
          ],
          imports: [OverlayModule]
        });
        return TestBed.compileComponents();
      })
    );

    beforeEach(() => {
      fixtureMenu = TestBed.createComponent(TestDropdownMenuHostComponent);
      testMenuComponent = fixtureMenu.componentInstance;
      fixtureMenu.detectChanges();
      dropdownMenuDebugElement = fixtureMenu.debugElement.query(
        By.css('.bao-dropdown-menu')
      );
      listItemDebugElement =
        dropdownMenuDebugElement.nativeNode.children[0].children;
    });
    it('should apply appropriate css class when menu is initially closed ', () => {
      expect(
        dropdownMenuDebugElement.nativeNode.classList.contains(
          'bao-dropdown-menu'
        )
      ).toBe(true);
      expect(
        dropdownMenuDebugElement.nativeNode.classList.contains(
          'bao-overlay-transparent-backdrop'
        )
      ).toBe(true);
      expect(
        dropdownMenuDebugElement.nativeNode.attributes['aria-expanded'].value
      ).toBe('false');
    });
    it('should add css class and attributes when list item is disabled', () => {
      testMenuComponent.disabled = true;
      fixtureMenu.detectChanges();
      expect(
        listItemDebugElement[0].classList.contains(
          'bao-dropdown-menu-item-disabled'
        )
      ).toBe(true);
      expect(listItemDebugElement[0].attributes['tabIndex'].value).toBe('-1');
    });
    it('should add css class for padding when there is an element next to label', () => {
      expect(
        listItemDebugElement[0].classList.contains('has-element-left')
      ).toBe(true);
    });
  });

  describe('Dropdown menu trigger', () => {
    let fixtureButton: ComponentFixture<TestButtonMenuHostComponent>;
    let buttonDebugElement: DebugElement;
    let dropdownMenuDebugElement: DebugElement;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [
            BaoDropdownMenuComponent,
            BaoDropdownMenuTrigger,
            TestButtonMenuHostComponent,
            BaoIconComponent
          ],
          imports: [OverlayModule]
        });
        return TestBed.compileComponents();
      })
    );
    beforeEach(() => {
      fixtureButton = TestBed.createComponent(TestButtonMenuHostComponent);
      fixtureButton.detectChanges();
      buttonDebugElement = fixtureButton.debugElement.query(By.css('button'));
      dropdownMenuDebugElement = fixtureButton.debugElement.query(
        By.css('.bao-dropdown-menu')
      );
    });

    it('trigger button should control associated menu', () => {
      expect(
        buttonDebugElement.nativeNode.classList.contains(
          'bao-dropdown-menu-trigger'
        )
      ).toBe(true);
      expect(buttonDebugElement.nativeNode.role).toBe('button');
      expect(
        buttonDebugElement.nativeNode.attributes['aria-controls'].value
      ).toBe(dropdownMenuDebugElement.nativeNode.id);
    });
  });
});
