/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BaoButtonComponent } from './index';
import {
  TestButtonHostComponent,
  TestButtonWithIconHostComponent
} from './tests/button.hostcomponent.spec';
import { BaoIconComponent } from '../icon/icon.component';

describe('BaoButtonComponent', () => {
  describe('Primary', () => {
    let testComponent: TestButtonHostComponent;
    let fixture: ComponentFixture<TestButtonHostComponent>;
    let buttonDebugElement: DebugElement;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [
            BaoButtonComponent,
            TestButtonHostComponent,
            BaoIconComponent
          ]
        });

        return TestBed.compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      buttonDebugElement = fixture.debugElement.query(By.css('button'));
    });

    it('should apply default class', () => {
      expect(
        buttonDebugElement.nativeElement.classList.contains('bao-button')
      ).toBe(true);
    });

    it('should apply class based on displayType', () => {
      testComponent.displayType = 'utility';
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains(
          'bao-button-utility'
        )
      ).toBe(true);

      testComponent.displayType = 'editorial';
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains(
          'bao-button-editorial'
        )
      ).toBe(true);

      testComponent.displayType = null;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList).not.toContain(
        'bao-button-editorial'
      );
    });

    it('should apply class based on level', () => {
      testComponent.level = 'primary';
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains(
          'bao-button-primary'
        )
      ).toBe(true);

      testComponent.level = 'secondary';
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains(
          'bao-button-secondary'
        )
      ).toBe(true);

      testComponent.level = 'tertiary';
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains(
          'bao-button-tertiary'
        )
      ).toBe(true);

      testComponent.level = null;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList).not.toContain(
        'bao-button-tertiary'
      );
    });

    it('should apply class based on size', () => {
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains('bao-button-large')
      ).toBe(true);

      testComponent.size = 'medium';
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains('bao-button-medium')
      ).toBe(true);

      testComponent.size = 'small';
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains('bao-button-small')
      ).toBe(true);

      testComponent.size = null;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList).not.toContain(
        'bao-button-small'
      );
    });

    it('should apply class based on fullWidth', () => {
      testComponent.fullWidth = false;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList).not.toContain(
        'bao-button-full-width'
      );

      testComponent.fullWidth = true;
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains(
          'bao-button-full-width'
        )
      ).toBe(true);

      testComponent.fullWidth = null;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList).not.toContain(
        'bao-button-full-width'
      );
    });

    it('should apply class based on reversed', () => {
      testComponent.reversed = false;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList).not.toContain(
        'bao-button-reversed'
      );

      testComponent.reversed = true;
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains(
          'bao-button-reversed'
        )
      ).toBe(true);

      testComponent.reversed = null;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList).not.toContain(
        'bao-button-reversed'
      );
    });

    it('should apply class based on loading', () => {
      testComponent.loading = false;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList).not.toContain(
        'bao-button-loading'
      );

      testComponent.loading = true;
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.classList.contains(
          'bao-button-loading'
        )
      ).toBe(true);

      testComponent.loading = null;
      fixture.detectChanges();
      expect(buttonDebugElement.nativeElement.classList).not.toContain(
        'bao-button-loading'
      );
    });

    it('should apply bao-icon based on loading', () => {
      testComponent.loading = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('bao-icon'))).toBeNull();

      testComponent.loading = true;
      fixture.detectChanges();
      const iconDebugElement = fixture.debugElement.query(By.css('bao-icon'));
      expect(iconDebugElement).toBeDefined();
      expect(iconDebugElement.attributes.svgIcon).toBe('icon-spinner');
      expect(iconDebugElement.attributes.class).toContain('loading-spinner');

      testComponent.loading = null;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('bao-icon'))).toBeNull();
    });

    it('should apply bao-icon to the right side based on loading and rightIcon', () => {
      testComponent.loading = false;
      testComponent.rightIcon = true;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('bao-icon'))).toBeNull();

      testComponent.loading = true;
      testComponent.rightIcon = true;
      fixture.detectChanges();
      const iconDebugElement = fixture.debugElement.query(By.css('bao-icon'));
      expect(iconDebugElement.attributes.class).toContain(
        'loading-spinner-right'
      );

      testComponent.loading = null;
      testComponent.rightIcon = true;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('bao-icon'))).toBeNull();
    });

    it('should handle click on the button', () => {
      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(1);
    });

    it('should not handle click on the button if disabled', () => {
      testComponent.isDisabled = true;
      fixture.detectChanges();

      buttonDebugElement.nativeElement.click();
      expect(testComponent.clickCount).toBe(0);
    });

    it('should disable the native button element', () => {
      const buttonNativeElement = buttonDebugElement.nativeElement;
      expect(buttonNativeElement.disabled)
        .withContext('Expected button not to be disabled')
        .toBeFalsy();

      testComponent.isDisabled = true;
      fixture.detectChanges();

      expect(buttonNativeElement.disabled)
        .withContext('Expected button to be disabled')
        .toBeTruthy();
    });

    it('should not add aria-disabled attribute if disabled', () => {
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.getAttribute('aria-disabled')
      ).toBeFalsy();

      testComponent.isDisabled = true;
      fixture.detectChanges();
      expect(
        buttonDebugElement.nativeElement.getAttribute('aria-disabled')
      ).toBeFalsy();
    });
  });
  describe('With Icon', () => {
    let testWithIconComponent: TestButtonWithIconHostComponent;
    let fixtureWithIcon: ComponentFixture<TestButtonWithIconHostComponent>;
    let defaultIconDebugElement: DebugElement;

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [
            BaoButtonComponent,
            TestButtonWithIconHostComponent,
            BaoIconComponent
          ]
        });

        return TestBed.compileComponents();
      })
    );

    beforeEach(() => {
      fixtureWithIcon = TestBed.createComponent(
        TestButtonWithIconHostComponent
      );
      testWithIconComponent = fixtureWithIcon.componentInstance;
      fixtureWithIcon.detectChanges();
      defaultIconDebugElement = fixtureWithIcon.debugElement.query(
        By.css('bao-icon')
      );
    });

    it('should display bao-icon "icon-spinner" and hide existing bao-icon based on loading', () => {
      testWithIconComponent.loading = false;
      fixtureWithIcon.detectChanges();
      expect(defaultIconDebugElement.attributes.svgIcon).not.toBe(
        'icon-spinner'
      );
      expect(
        fixtureWithIcon.debugElement.queryAll(By.css('bao-icon')).length
      ).toBe(1);

      testWithIconComponent.loading = true;
      fixtureWithIcon.detectChanges();
      const iconDebugElements = fixtureWithIcon.debugElement.queryAll(
        By.css('bao-icon')
      );
      expect(iconDebugElements.length).toBe(2);

      const loadingIconDebugElement = iconDebugElements.find(
        el => el.attributes.svgIcon === 'icon-spinner'
      );
      const iconDebugElement = iconDebugElements.find(
        el => el.attributes.svgIcon !== 'icon-spinner'
      );
      expect(loadingIconDebugElement).toBeDefined();
      expect(iconDebugElement).toBeDefined();

      const loadingIconStyle = window.getComputedStyle(
        loadingIconDebugElement.nativeElement
      );
      const defaultIconStyle = window.getComputedStyle(
        iconDebugElement.nativeElement
      );
      // only icon-spinner is displayed
      expect(
        loadingIconStyle.display !== 'none' &&
          defaultIconStyle.display === 'none'
      ).toBe(true);

      testWithIconComponent.loading = null;
      fixtureWithIcon.detectChanges();
      expect(
        fixtureWithIcon.debugElement.queryAll(By.css('bao-icon')).length
      ).toBe(1);
      expect(
        fixtureWithIcon.debugElement.query(By.css('bao-icon')).attributes
          .svgIcon
      ).not.toBe('icon-spinner');
    });
  });
});
