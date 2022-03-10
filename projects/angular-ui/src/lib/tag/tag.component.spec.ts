/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BaoTagComponent } from './index';
import {
  TestTagHostComponent,
  TestTagWithIconHostComponent
} from './tests/tag.hostcomponent.spec';
import { BaoIconComponent } from '../icon/icon.component';

describe('BaoTagComponent', () => {
  describe('Primary', () => {
    let testComponent: TestTagHostComponent;
    let fixture: ComponentFixture<TestTagHostComponent>;
    let tagDebugElement: DebugElement;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [BaoTagComponent, TestTagHostComponent]
        });

        return TestBed.compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(TestTagHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      tagDebugElement = fixture.debugElement.query(By.css('.bao-tag'));
    });

    it('should apply appropriate class based on type and variant', () => {
      // Default class
      expect(tagDebugElement.nativeNode.classList.contains('bao-tag')).toBe(
        true
      );

      testComponent.type = 'neutral';
      testComponent.variant = 'light';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-neutral-light')
      ).toBe(true);

      testComponent.type = 'info';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-info-light')
      ).toBe(true);

      testComponent.type = 'positive';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-positive-light')
      ).toBe(true);

      testComponent.type = 'alert';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-alert-light')
      ).toBe(true);

      testComponent.type = 'negative';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-negative-light')
      ).toBe(true);

      testComponent.variant = 'strong';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-negative-strong')
      ).toBe(true);

      testComponent.type = 'info';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-info-strong')
      ).toBe(true);

      testComponent.type = 'positive';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-positive-strong')
      ).toBe(true);

      testComponent.type = 'alert';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-alert-strong')
      ).toBe(true);

      testComponent.type = 'neutral';
      fixture.detectChanges();
      expect(
        tagDebugElement.nativeNode.classList.contains('bao-tag-neutral-strong')
      ).toBe(true);
    });
  });
  describe('With icon', () => {
    let fixtureWithIcon: ComponentFixture<TestTagWithIconHostComponent>;
    let tagWithIconDebugElement: DebugElement;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [
            BaoTagComponent,
            TestTagWithIconHostComponent,
            BaoIconComponent
          ]
        });

        return TestBed.compileComponents();
      })
    );

    beforeEach(() => {
      fixtureWithIcon = TestBed.createComponent(TestTagWithIconHostComponent);
      fixtureWithIcon.detectChanges();
      tagWithIconDebugElement = fixtureWithIcon.debugElement.query(
        By.css('bao-tag')
      );
    });

    it('should apply proper class when tag contains icon', () => {
      expect(
        tagWithIconDebugElement.nativeNode.classList.contains('has-icon')
      ).toBe(true);
    });
  });
});
