/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaoListModule } from '.';
import { BaoButtonModule } from '../button';
import { BaoDropdownMenuModule } from '../dropdown-menu';
import { BaoIconModule } from '../icon';
import { TestListDropdownMenuComponent } from './tests/list.hostcomponent.spec';

describe('BaoList', () => {
  describe('TestListDropdownMenuComponent', () => {
    let fixture: ComponentFixture<TestListDropdownMenuComponent>;
    let TestListDropdownMenuComponentElement: DebugElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TestListDropdownMenuComponent],
        imports: [
          OverlayModule,
          BaoListModule,
          BaoDropdownMenuModule,
          BaoButtonModule,
          BaoIconModule
        ]
      });
      return TestBed.compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestListDropdownMenuComponent);
      TestListDropdownMenuComponentElement = fixture.debugElement;
    });

    it('should have a list', () => {
      const element = TestListDropdownMenuComponentElement.queryAll(
        By.css('.bao-list')
      );

      expect(element).toBeTruthy();
    });

    it('should have an icon', () => {
      const element = TestListDropdownMenuComponentElement.queryAll(
        By.css('.bao-list-item-header .bao-icon')
      );

      expect(element).toBeTruthy();
    });

    it('should have a title', () => {
      const element = TestListDropdownMenuComponentElement.queryAll(
        By.css(
          '.bao-list-item-content .bao-list-item-text .bao-list-item-title'
        )
      );

      expect(element).toBeTruthy();
    });

    it('should have a description', () => {
      const element = TestListDropdownMenuComponentElement.queryAll(
        By.css(
          '.bao-list-item-content .bao-list-item-text .bao-list-item-description li'
        )
      );

      expect(element).toBeTruthy();
    });

    it('should have a tag', () => {
      const element = TestListDropdownMenuComponentElement.queryAll(
        By.css('.bao-list-item-content .bao-list-item-tag .bao-tag')
      );

      expect(element).toBeTruthy();
    });

    it('should have a dropdown menu within the list item', () => {
      const element = TestListDropdownMenuComponentElement.queryAll(
        By.css('.bao-list-item .bao-dropdown-menu-container')
      );

      expect(element).toBeTruthy();
    });

    it('should have as many dropdown menus as the list items', () => {
      const listItemElement = TestListDropdownMenuComponentElement.queryAll(
        By.css('.bao-list-item')
      );
      const dropDownMenuElement = TestListDropdownMenuComponentElement.queryAll(
        By.css('.bao-dropdown-menu-container')
      );

      expect(listItemElement.length).toEqual(dropDownMenuElement.length);
    });
  });
});
