/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BaoBreadcrumbComponent } from './index';
import { TestBreadcrumbHostComponent } from './tests/breadcrumb.hostcomponent.spec';

describe('BaoBreadcrumbComponent', () => {
  describe('Primary', () => {
    let fixture: ComponentFixture<TestBreadcrumbHostComponent>;
    let breadcrumbDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BaoBreadcrumbComponent, TestBreadcrumbHostComponent]
      });

      return TestBed.compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestBreadcrumbHostComponent);
      fixture.detectChanges();
      breadcrumbDebugElement = fixture.debugElement.query(
        By.css('.bao-breadcrumb')
      );
    });

    it('should apply appropriate attribute on navigation elements', () => {
      const navElements = Array.from(
        breadcrumbDebugElement.childNodes[0].nativeNode.childNodes
      );
      const lastElement = navElements.pop() as Element;
      navElements.forEach((el: Element) => {
        expect(el.ariaCurrent).toBe(null);
      });
      expect(lastElement.ariaCurrent).toBe('page');
    });
  });
});
