/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
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

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [BaoBreadcrumbComponent, TestBreadcrumbHostComponent]
        });

        return TestBed.compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(TestBreadcrumbHostComponent);
      fixture.detectChanges();
      breadcrumbDebugElement = fixture.debugElement.query(
        By.css('.bao-breadcrumb')
      );
    });

    it('should contains the exact html tag and attributes', () => {
      const nav = breadcrumbDebugElement.nativeElement.querySelector('nav');
      expect(nav).toBeTruthy();

      const orderLists =
        breadcrumbDebugElement.children[0].nativeElement.querySelector('ol');
      expect(orderLists).toBeTruthy();

      const lists = breadcrumbDebugElement.children[0].children[0].children;
      lists.forEach((el: DebugElement) => {
        expect(el.name).toBe('LI');
        expect(el.nativeElement.querySelector('a')).toBeTruthy();
      });

      const lastLink = lists.slice(-1).pop();
      expect(lastLink.children[0].nativeElement.ariaCurrent).toBe('page');
    });
  });
});
