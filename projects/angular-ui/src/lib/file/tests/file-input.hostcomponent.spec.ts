/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  standalone: false,
  template: `
    <bao-file-input
      [disabled]="disabled"
      [label]="label"
      [size]="size"
      [required]="required"
      [maximalFileSize]="maximalFileSize"
      [acceptedMIMETypes]="acceptedMIMETypes"
    >
      <bao-guiding-text
        >Les documents .pdf, .docx, .png sont acceptés</bao-guiding-text
      >
    </bao-file-input>
  `
})
export class TestFileInputHostComponent {
  disabled: boolean;
  label: string;
  size: 'small' | 'medium';
  required: boolean;
  maximalFileSize: number;
  acceptedMIMETypes: string[];
}
