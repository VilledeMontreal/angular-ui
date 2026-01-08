/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  TestFilePreviewHostComponent,
  TestFilePreviewWithoutIconHostComponent
} from './tests/file-preview.hostcomponent.spec';
import { BaoFilePreviewComponent } from './file-preview.component';
import { BaoIconComponent } from '../icon';
import { BaoButtonComponent } from '../button';

/* eslint-disable @typescript-eslint/no-unsafe-return */
describe('BaoFilePreviewComponent', () => {
  let testComponent: TestFilePreviewHostComponent;
  let fixture: ComponentFixture<TestFilePreviewHostComponent>;
  let fixtureWithoutIcon: ComponentFixture<TestFilePreviewWithoutIconHostComponent>;
  let filePreviewDebugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        BaoFilePreviewComponent,
        BaoIconComponent,
        BaoButtonComponent,
        TestFilePreviewHostComponent,
        TestFilePreviewWithoutIconHostComponent
      ],
      imports: [],
      providers: []
    });
    return TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFilePreviewHostComponent);
    fixtureWithoutIcon = TestBed.createComponent(
      TestFilePreviewWithoutIconHostComponent
    );
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
    fixtureWithoutIcon.detectChanges();
    filePreviewDebugElement = fixture.debugElement.query(
      By.css('bao-file-preview')
    );
  });
  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });
  it('should replace button by loader when isLoading is true', () => {
    const buttonElement = Array.from(
      filePreviewDebugElement.nativeNode.children
    ).find((el: Element) => el.classList.contains('bao-button'));
    expect(buttonElement).toBeDefined();
    testComponent.isLoading = true;
    fixture.detectChanges();
    const buttonElementOnLoading = Array.from(
      filePreviewDebugElement.nativeNode.children
    ).find((el: Element) => el.classList.contains('bao-button'));
    expect(buttonElementOnLoading).toBeUndefined();
    const loaderElement = Array.from(
      filePreviewDebugElement.nativeNode.children
    ).find((el: Element) => el.classList.contains('loading-spinner'));
    expect(loaderElement).toBeDefined();
  });
  it('should not replace icon from projected content if there is one', () => {
    const iconElement = fixture.debugElement.queryAll(By.css('.bao-icon'));
    expect(iconElement.length).toBe(1);
    expect(iconElement[0].nativeNode.attributes['svgicon'].value).toBe(
      'icon-trash'
    );
  });
  it('should set generic icon if projected content does not have icon', () => {
    const iconElement = fixtureWithoutIcon.debugElement.queryAll(
      By.css('.bao-icon')
    );
    expect(iconElement.length).toBe(1);
    expect(iconElement[0].nativeNode.attributes['svgicon'].value).toBe(
      'icon-file'
    );
  });
});
