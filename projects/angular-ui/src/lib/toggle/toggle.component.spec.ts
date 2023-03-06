/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BaoToggleComponent } from './index';
import { TestToggleHostComponent } from './tests/toggle.hostcomponent.spec';

describe('BaoToggleComponent', () => {
  let testComponent: TestToggleHostComponent;
  let fixture: ComponentFixture<TestToggleHostComponent>;
  let toggleDebugElement: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BaoToggleComponent, TestToggleHostComponent]
      });

      return TestBed.compileComponents();
    })
  );
  describe('CLASSES', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestToggleHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      toggleDebugElement = fixture.debugElement.query(By.css('.bao-toggle'));
    });
    it('should apply global class', () => {
      // Default class
      expect(
        toggleDebugElement.nativeNode.classList.contains('bao-toggle')
      ).toBe(true);
    });
    it('should apply class related to checked attribute', () => {
      testComponent.checked = true;
      fixture.detectChanges();
      expect(
        toggleDebugElement.nativeNode.classList.contains(
          'bao-toggle-switch-checked'
        )
      ).toBe(true);
    });
    it('should apply classes related to disabled attribute', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(
        toggleDebugElement.nativeNode.classList.contains(
          'bao-toggle-switch-disabled'
        )
      )
        .withContext('disabled switch')
        .toBe(true);
      expect(
        toggleDebugElement.nativeNode.classList.contains(
          'bao-toggle-label-disabled'
        )
      )
        .withContext('disabled label')
        .toBe(true);
    });
    it('should apply classes related to hiddenLabel attribute', () => {
      testComponent.hiddenLabel = true;
      fixture.detectChanges();
      expect(
        toggleDebugElement.nativeNode.classList.contains(
          'bao-toggle-label-hidden'
        )
      )
        .withContext('hidden label')
        .toBe(true);
      expect(
        toggleDebugElement.nativeNode.classList.contains(
          'bao-toggle-switch-hidden-label'
        )
      )
        .withContext('hidden label switch styling')
        .toBe(true);
    });
    it('should apply class related to focus', () => {
      const focusesElement =
        fixture.nativeElement.querySelector('#id01-button');
      focusesElement.dispatchEvent(new Event('focus'));
      fixture.detectChanges();
      expect(
        toggleDebugElement.nativeNode.classList.contains(
          'bao-toggle-switch-focus'
        )
      ).toBe(true);
    });
  });
  describe("ARIA", () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestToggleHostComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();
      toggleDebugElement = fixture.debugElement.query(By.css('.bao-toggle'));
    });
    it('should apply aria-label', () => {
      const ariaLabel = 'test aria-label';
      testComponent.ariaLabel = ariaLabel;
      fixture.detectChanges();
      expect(
        toggleDebugElement.childNodes[0].nativeNode.getAttribute('aria-label')
      ).toBe(ariaLabel);
    });
    it('should apply not apply aria-label', () => {
      fixture.detectChanges();
      expect(
        toggleDebugElement.childNodes[0].nativeNode.getAttribute('aria-label')
      ).toBeNull();
    });
    it('should apply aria-labelleby', () => {
      fixture.detectChanges();
      expect(
        toggleDebugElement.childNodes[0].nativeNode.getAttribute(
          'aria-labelledby'
        )
      ).toContain(`id01-arialabelledby`);
    });
    it('should apply aria-checked to false', () => {
      fixture.detectChanges();
      expect(
        toggleDebugElement.childNodes[0].nativeNode.getAttribute('aria-checked')
      ).toBeNull();
    });
    it('should apply aria-checked to true', () => {
      testComponent.checked = true;
      fixture.detectChanges();
      expect(
        toggleDebugElement.childNodes[0].nativeNode.getAttribute('aria-checked')
      ).toBe('true');
    });
  });
});
