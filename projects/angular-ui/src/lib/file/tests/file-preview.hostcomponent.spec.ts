/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  template: `
    <bao-file-preview [file]="file" [isLoading]="isLoading">
      <bao-icon svgIcon="icon-trash"></bao-icon>
      <button bao-button type="editorial" level="tertiary" size="medium">
        Supprimer
      </button>
    </bao-file-preview>
  `
})
export class TestFilePreviewHostComponent {
  file = new File([''], 'testFile', { type: 'text/html' });
  isLoading: boolean;
}
@Component({
  template: `
    <bao-file-preview [file]="file" [isLoading]="isLoading">
      <button bao-button type="editorial" level="tertiary" size="medium">
        Supprimer
      </button>
    </bao-file-preview>
  `
})
export class TestFilePreviewWithoutIconHostComponent {
  file = new File([''], 'testFile', { type: 'text/html' });
  isLoading: boolean;
}
