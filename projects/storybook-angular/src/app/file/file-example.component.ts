/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @title Reactive form file input
 */
@Component({
  selector: 'bao-file-form-example',
  templateUrl: './file-example.component.html'
})
export class BaoFileReactiveFormExampleComponent {
  public fileInputForm: FormGroup;
  public lastUploadedFiles: File[];

  constructor(
    fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.fileInputForm = fb.group({
      fileList: [[], [Validators.required]]
    });
    this.fileInputForm.valueChanges.subscribe(() => this.cdr.detectChanges());
  }

  get fileList() {
    return this.fileInputForm.get('fileList');
  }

  public onSubmitButtonClick(): void {
    this.lastUploadedFiles = this.fileInputForm
      .getRawValue()
      .fileList.map((file: File) => file.name);
    this.fileList.reset([]);
    this.fileInputForm.markAsPristine();
  }

  public onUploadedFile(file: File): void {
    this.fileList.value.push(file);
  }

  public onDelete(index: number): void {
    this.fileList.value.splice(index, 1);
  }
}
