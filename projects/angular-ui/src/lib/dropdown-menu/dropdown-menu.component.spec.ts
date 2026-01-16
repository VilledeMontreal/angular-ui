/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  BaoCheckboxComponent,
  BaoIconComponent,
  BaoRadioButtonComponent
} from 'angular-ui';
import {
  BaoDropdownMenuComponent,
  BaoDropdownMenuItem,
  BaoDropdownMenuItemLabel,
  BaoDropdownMenuTrigger
} from './dropdown-menu.component';
import {
  TestButtonMenuHostComponent,
  TestDropdownMenuHostComponent,
  TestDropdownWithInputsHostComponent
} from './tests/dropdown-menu.hostcomponent.spec';

/* eslint-disable @typescript-eslint/no-unsafe-return */
describe('BaoDropdownMenuComponent', () => {
  describe('Dropdown menu and menu item', () => {
    let testMenuComponent: TestDropdownMenuHostComponent;
    let fixtureMenu: ComponentFixture<TestDropdownMenuHostComponent>;
    let dropdownMenuDebugElement: DebugElement;
    let listItemDebugElement: HTMLElement[];
    let triggerDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          BaoDropdownMenuComponent,
          BaoDropdownMenuItem,
          BaoDropdownMenuTrigger,
          BaoDropdownMenuItemLabel,
          TestDropdownMenuHostComponent,
          BaoIconComponent
        ],
        imports: [OverlayModule]
      });
      return TestBed.compileComponents();
    }));

    beforeEach(() => {
      fixtureMenu = TestBed.createComponent(TestDropdownMenuHostComponent);
      testMenuComponent = fixtureMenu.componentInstance;
      fixtureMenu.detectChanges();
      dropdownMenuDebugElement = fixtureMenu.debugElement.query(
        By.css('.bao-dropdown-menu-container')
      );
      listItemDebugElement =
        dropdownMenuDebugElement.nativeNode.children[0].children;
      triggerDebugElement = fixtureMenu.debugElement.query(
        By.css('.bao-dropdown-menu-trigger')
      );
    });
    it('should apply appropriate css class when menu is initially closed ', () => {
      expect(
        dropdownMenuDebugElement.nativeNode.classList.contains(
          'bao-dropdown-menu-container'
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
    it('should change isOpen menu status when trigger button is clicked', () => {
      expect(testMenuComponent.isMenuOpen).toBe(false);
      triggerDebugElement.nativeElement.click();
      fixtureMenu.detectChanges();
      expect(testMenuComponent.isMenuOpen).toBe(true);
      expect(
        dropdownMenuDebugElement.nativeElement.attributes['aria-expanded'].value
      ).toBe('true');
    });
    it('should close menu when it is opened and one item is clicked', () => {
      expect(testMenuComponent.isMenuOpen).toBe(false);
      triggerDebugElement.nativeElement.click();
      fixtureMenu.detectChanges();
      expect(testMenuComponent.isMenuOpen).toBe(true);
      listItemDebugElement[0].click();
      fixtureMenu.detectChanges();
      expect(testMenuComponent.isMenuOpen).toBe(false);
      expect(
        dropdownMenuDebugElement.nativeElement.attributes['aria-expanded'].value
      ).toBe('false');
    });
  });

  describe('Dropdown menu trigger', () => {
    let fixtureButton: ComponentFixture<TestButtonMenuHostComponent>;
    let buttonDebugElement: DebugElement;
    let dropdownMenuDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
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
    }));
    beforeEach(() => {
      fixtureButton = TestBed.createComponent(TestButtonMenuHostComponent);
      fixtureButton.detectChanges();
      buttonDebugElement = fixtureButton.debugElement.query(By.css('button'));
      dropdownMenuDebugElement = fixtureButton.debugElement.query(
        By.css('.bao-dropdown-menu-container')
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
  describe('Dropdown menu items with inputs', () => {
    let fixture: ComponentFixture<TestDropdownWithInputsHostComponent>;
    let menuItemsDebugElement: DebugElement[];
    let checkboxDebugElement: DebugElement;
    let radioDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          BaoDropdownMenuComponent,
          BaoDropdownMenuTrigger,
          BaoDropdownMenuItem,
          BaoDropdownMenuItemLabel,
          TestDropdownWithInputsHostComponent,
          BaoCheckboxComponent,
          BaoRadioButtonComponent
        ],
        imports: [OverlayModule]
      });
      return TestBed.compileComponents();
    }));
    beforeEach(() => {
      fixture = TestBed.createComponent(TestDropdownWithInputsHostComponent);
      fixture.detectChanges();
      menuItemsDebugElement = fixture.debugElement.queryAll(
        By.css('.bao-dropdown-menu-item')
      );
      checkboxDebugElement = fixture.debugElement.query(
        By.css('.bao-checkbox')
      );
      radioDebugElement = fixture.debugElement.query(
        By.css('.bao-radio-button')
      );
    });

    it('click on checkbox or associated menu item should change its state', () => {
      expect(
        checkboxDebugElement.nativeNode.classList.contains(
          'bao-checkbox-checked'
        )
      ).toBe(false);
      checkboxDebugElement.nativeNode.firstElementChild.click();
      fixture.detectChanges();
      expect(
        checkboxDebugElement.nativeNode.classList.contains(
          'bao-checkbox-checked'
        )
      ).toBe(true);
      expect(
        checkboxDebugElement.nativeNode.firstElementChild.attributes[
          'aria-checked'
        ].value
      ).toBe('true');
      menuItemsDebugElement[0].nativeElement.click();
      fixture.detectChanges();
      expect(
        checkboxDebugElement.nativeNode.classList.contains(
          'bao-checkbox-checked'
        )
      ).toBe(false);
      expect(
        checkboxDebugElement.nativeNode.firstElementChild.attributes[
          'aria-checked'
        ].value
      ).toBe('false');
    });
    it('click on radio button or associated menu item should change its state', () => {
      expect(
        radioDebugElement.nativeNode.classList.contains(
          'bao-radio-button-checked'
        )
      ).toBe(false);
      radioDebugElement.nativeNode.firstElementChild.click();
      fixture.detectChanges();
      expect(
        radioDebugElement.nativeNode.classList.contains(
          'bao-radio-button-checked'
        )
      ).toBe(true);
      menuItemsDebugElement[1].nativeElement.click();
      fixture.detectChanges();
      expect(
        radioDebugElement.nativeNode.classList.contains(
          'bao-radio-button-checked'
        )
      ).toBe(true);
    });
  });
});
