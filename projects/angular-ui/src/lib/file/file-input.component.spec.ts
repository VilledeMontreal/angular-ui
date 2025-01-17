/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { TestFileInputHostComponent } from './tests/file-input.hostcomponent.spec';
import {
  BaoFileInputComponent,
  BaoFileDropDirective,
  BaoFileDropzoneIntructions
} from './file-input.component';
import { BaoFileIntl, BaoFileIntlEnglish } from './file-intl';
import { BaoIconComponent } from '../icon';
import { BaoButtonComponent } from '../button';
import {
  BaoGuidingTextComponent,
  BaoLabelTextComponent,
  BaoErrorTextComponent
} from '../common-components';

/* eslint-disable @typescript-eslint/no-unsafe-return */
describe('BaoFileInputComponent', () => {
  describe('Primary', () => {
    let testComponent: TestFileInputHostComponent;
    let fixtureFileInput: ComponentFixture<TestFileInputHostComponent>;
    let fileInputDebugElement: DebugElement;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          BaoFileInputComponent,
          BaoIconComponent,
          BaoGuidingTextComponent,
          BaoFileDropDirective,
          BaoLabelTextComponent,
          BaoErrorTextComponent,
          BaoFileDropzoneIntructions,
          BaoButtonComponent,
          TestFileInputHostComponent
        ],
        imports: [OverlayModule],
        providers: [BaoFileIntl]
      });
      return TestBed.compileComponents();
    }));

    beforeEach(() => {
      fixtureFileInput = TestBed.createComponent(TestFileInputHostComponent);
      testComponent = fixtureFileInput.componentInstance;
      fixtureFileInput.detectChanges();
      fileInputDebugElement = fixtureFileInput.debugElement.query(
        By.css('bao-file-input')
      );
    });
    it('should create', () => {
      expect(testComponent).toBeTruthy();
    });
    it('should apply appropriate css class based on inputs', () => {
      // Default class
      expect(
        fileInputDebugElement.nativeNode.classList.contains('bao-file-input')
      ).toBe(true);
      // Size input
      testComponent.size = 'small';
      fixtureFileInput.detectChanges();
      expect(
        fileInputDebugElement.nativeNode.classList.contains(
          'bao-file-label-small'
        )
      ).toBe(true);

      testComponent.size = 'medium';
      fixtureFileInput.detectChanges();
      expect(
        fileInputDebugElement.nativeNode.classList.contains(
          'bao-file-label-medium'
        )
      ).toBe(true);
      // Disabled input
      testComponent.disabled = true;
      fixtureFileInput.detectChanges();
      expect(
        fileInputDebugElement.nativeNode.classList.contains(
          'bao-file-input-disabled'
        )
      ).toBe(true);
    });
    it('should set aria attributes on helper text', () => {
      const helperText = fixtureFileInput.debugElement.queryAll(
        By.css('bao-guiding-text')
      );
      const dropZone = fixtureFileInput.debugElement.queryAll(
        By.css('.file-drop-zone')
      );
      expect(helperText.length).toBe(1);
      expect(dropZone.length).toBe(1);
      const innerHelperText = helperText[0].nativeNode.firstElementChild;
      const inputElement = dropZone[0].nativeNode.children.item(1);
      expect(inputElement.attributes['aria-describedby']).toBeDefined();
      expect(inputElement.attributes['aria-describedby'].value).toBe(
        innerHelperText.id
      );
    });
    it('should display text in french by default', () => {
      const buttonElement = fixtureFileInput.debugElement.queryAll(
        By.css('.bao-button')
      );
      expect(buttonElement.length).toBe(1);
      const dropzoneInstructions = fixtureFileInput.debugElement.queryAll(
        By.css('.bao-file-dropzone-instructions')
      );
      expect(dropzoneInstructions.length).toBe(1);
      expect(buttonElement[0].nativeNode.innerText).toBe('Parcourir');
      expect(dropzoneInstructions[0].nativeNode.innerText).toBe(
        'ou déposer votre fichier ici'
      );
    });
  });
  describe('With english text', () => {
    let testComponent: TestFileInputHostComponent;
    let fixtureFileInput: ComponentFixture<TestFileInputHostComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          BaoFileInputComponent,
          BaoIconComponent,
          BaoGuidingTextComponent,
          BaoFileDropDirective,
          BaoLabelTextComponent,
          BaoErrorTextComponent,
          BaoFileDropzoneIntructions,
          BaoButtonComponent,
          TestFileInputHostComponent
        ],
        imports: [OverlayModule],
        providers: [{ provide: BaoFileIntl, useClass: BaoFileIntlEnglish }]
      });
      return TestBed.compileComponents();
    }));

    beforeEach(() => {
      fixtureFileInput = TestBed.createComponent(TestFileInputHostComponent);
      testComponent = fixtureFileInput.componentInstance;
      fixtureFileInput.detectChanges();
    });
    it('should create', () => {
      expect(testComponent).toBeTruthy();
    });
    it('should display text in english', () => {
      const buttonElement = fixtureFileInput.debugElement.queryAll(
        By.css('.bao-button')
      );
      expect(buttonElement.length).toBe(1);
      const dropzoneInstructions = fixtureFileInput.debugElement.queryAll(
        By.css('.bao-file-dropzone-instructions')
      );
      expect(dropzoneInstructions.length).toBe(1);
      expect(buttonElement[0].nativeNode.innerText).toBe('Browse');
      expect(dropzoneInstructions[0].nativeNode.innerText).toBe(
        'or drop your file here'
      );
    });
  });
});
