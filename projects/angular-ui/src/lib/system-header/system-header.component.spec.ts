/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TestSystemHeaderHostComponent,
  TestBackNavigationHostComponent
} from './tests/system-header.hostcomponent.spec';
import {
  BaoSystemHeaderComponent,
  BaoBackNavigationInsert,
  BaoBackNavigationComponent
} from './system-header.component';
import { BaoTagComponent } from '../tag/tag.component';
import { BaoIconComponent } from '../icon/icon.component';
import { BaoBreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import {
  BaoDropdownMenuComponent,
  BaoDropdownMenuTrigger,
  BaoDropdownMenuItem,
  BaoDropdownMenuItemLabel
} from '../dropdown-menu/dropdown-menu.component';
import { DebugElement } from '@angular/core';

declare const viewport;
/* eslint-disable @typescript-eslint/no-unsafe-return */
describe('BaoSystemHeaderComponent', () => {
  let testComponent: TestSystemHeaderHostComponent;
  let fixture: ComponentFixture<TestSystemHeaderHostComponent>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BaoSystemHeaderComponent,
        BaoBackNavigationInsert,
        BaoBackNavigationComponent,
        BaoIconComponent,
        BaoDropdownMenuComponent,
        BaoDropdownMenuTrigger,
        BaoDropdownMenuItem,
        BaoDropdownMenuItemLabel,
        BaoTagComponent,
        BaoBreadcrumbComponent,
        TestSystemHeaderHostComponent,
        TestBackNavigationHostComponent
      ],
      imports: [],
      providers: []
    });
    return TestBed.compileComponents();
  }));
  describe('Desktop screen', () => {
    beforeEach(() => {
      viewport.set('xl');
      fixture = TestBed.createComponent(TestSystemHeaderHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(testComponent).toBeTruthy();
    });
    it('should display breadcrumb on desktop screen', () => {
      const breadcrumb = fixture.debugElement.query(By.css('bao-breadcrumb'));
      expect(breadcrumb).toBeDefined();
    });
  });
  describe('Tablet screen', () => {
    beforeEach(() => {
      viewport.set('md');
      fixture = TestBed.createComponent(TestSystemHeaderHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should display back button on tablet screen', () => {
      const backButton = fixture.debugElement.query(
        By.css('.bao-system-header-back-button')
      );
      expect(backButton).toBeDefined();
    });
  });
  describe('Mobile screen', () => {
    beforeEach(() => {
      viewport.set('sm');
      fixture = TestBed.createComponent(TestSystemHeaderHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should display back button on mobile screen', () => {
      const backButton = fixture.debugElement.query(
        By.css('.bao-system-header-back-button')
      );
      expect(backButton).toBeDefined();
    });
    it('should apply mobile css class', () => {
      const tagInfoContainer = fixture.debugElement.query(
        By.css('.tag-info-container')
      );
      expect(tagInfoContainer).toBeDefined();
      expect(
        tagInfoContainer.nativeNode.classList.contains('mobile')
      ).toBeTrue();
    });
  });
  describe('BaoBackNavigationComponent', () => {
    let testComponent: TestBackNavigationHostComponent;
    let fixture: ComponentFixture<TestBackNavigationHostComponent>;
    let debugElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(TestBackNavigationHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(testComponent).toBeTruthy();
    });
    it('should set link input as href attribute', () => {
      const parentLink = 'parent-page.ca';
      testComponent.link = parentLink;
      fixture.detectChanges();
      debugElement = fixture.debugElement.query(By.css('a'));
      expect(debugElement.nativeNode.attributes['href'].value).toBe(parentLink);
    });
  });
});
