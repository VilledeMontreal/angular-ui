/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BaoHyperlinkComponent } from './index';
import {
  TestHyperlinkHostComponent,
  TestHyperlinkInlineIconHostComponent,
  TestHyperlinkListHostComponent,
  TestHyperlinkListIconHostComponent
} from './tests/hyperlink.hostcomponent.spec';
import { BaoIconComponent } from '../icon/icon.component';

/* eslint-disable @typescript-eslint/no-unsafe-return */
describe('BaoHyperlinkComponent', () => {
  describe('Primary', () => {
    let testComponent: TestHyperlinkHostComponent;
    let fixture: ComponentFixture<TestHyperlinkHostComponent>;
    let hyperlinkDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BaoHyperlinkComponent, TestHyperlinkHostComponent]
      });
      return TestBed.compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestHyperlinkHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      hyperlinkDebugElement = fixture.debugElement.query(
        By.css('.bao-hyperlink')
      );
    });

    it('should apply appropriate class based on size', () => {
      // Default class
      expect(
        hyperlinkDebugElement.nativeNode.classList.contains('bao-hyperlink')
      ).toBe(true);
      testComponent.size = 'extra-small';
      fixture.detectChanges();
      expect(
        hyperlinkDebugElement.nativeNode.classList.contains(
          'bao-hyperlink-extra-small'
        )
      ).toBe(true);

      testComponent.size = 'small';
      fixture.detectChanges();
      expect(
        hyperlinkDebugElement.nativeNode.classList.contains(
          'bao-hyperlink-small'
        )
      ).toBe(true);

      testComponent.size = 'medium';
      fixture.detectChanges();
      expect(
        hyperlinkDebugElement.nativeNode.classList.contains(
          'bao-hyperlink-medium'
        )
      ).toBe(true);
    });
  });

  describe('In a list', () => {
    let fixtureInList: ComponentFixture<TestHyperlinkListHostComponent>;
    let hyperlinkInListDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BaoHyperlinkComponent, TestHyperlinkListHostComponent]
      });
      return TestBed.compileComponents();
    }));

    beforeEach(() => {
      fixtureInList = TestBed.createComponent(TestHyperlinkListHostComponent);
      fixtureInList.detectChanges();
      hyperlinkInListDebugElement = fixtureInList.debugElement.query(
        By.css('ul')
      );
    });
    it('should apply appropriate class to list parent element', () => {
      expect(
        hyperlinkInListDebugElement.nativeNode.classList.contains(
          'bao-hyperlink-list-parent'
        )
      ).toBe(true);
    });
  });

  describe('With icon - Inline', () => {
    let fixtureInlineIcon: ComponentFixture<TestHyperlinkInlineIconHostComponent>;
    let hyperlinkInlineIconDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          BaoHyperlinkComponent,
          TestHyperlinkInlineIconHostComponent,
          BaoIconComponent
        ]
      });
      return TestBed.compileComponents();
    }));

    beforeEach(() => {
      fixtureInlineIcon = TestBed.createComponent(
        TestHyperlinkInlineIconHostComponent
      );
      fixtureInlineIcon.detectChanges();
      hyperlinkInlineIconDebugElement = fixtureInlineIcon.debugElement.query(
        By.css('bao-hyperlink')
      );
    });
    it('should always position icon after label', () => {
      const children = hyperlinkInlineIconDebugElement.nativeNode.children;
      expect(children[0].localName).toBe('a');
      expect(children[1].classList.contains('bao-icon')).toBe(true);
    });
  });

  describe('With icon - List', () => {
    let fixtureListIcon: ComponentFixture<TestHyperlinkListIconHostComponent>;
    let hyperlinkListIconDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          BaoHyperlinkComponent,
          TestHyperlinkListIconHostComponent,
          BaoIconComponent
        ]
      });
      return TestBed.compileComponents();
    }));

    beforeEach(() => {
      fixtureListIcon = TestBed.createComponent(
        TestHyperlinkListIconHostComponent
      );
      fixtureListIcon.detectChanges();
      hyperlinkListIconDebugElement = fixtureListIcon.debugElement.query(
        By.css('ul')
      );
    });
    it('should apply appropriate class based on icon position', () => {
      const children = hyperlinkListIconDebugElement.nativeNode.children;
      ['has-left-icon', 'has-right-icon'].forEach(
        (iconClass: string, index: number) => {
          expect(children[index].classList.contains(iconClass)).toBe(true);
        }
      );
    });
  });
});
