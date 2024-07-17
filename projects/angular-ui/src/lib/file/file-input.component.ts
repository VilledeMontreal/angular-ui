/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaoErrorTextComponent } from '../common-components';
import { Subscription } from 'rxjs';
import { BaoFileIntl } from './file-intl';
import { BaoFilePreviewComponent } from './file-preview.component';

/**
 * Unique number to generate a unique ID
 */
let fileInputUniqueId = 0;
let fileTextUniqueId = 0;

@Component({
  selector: 'bao-file-input, [bao-file-input]',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // tslint:disable-next-line:no-forward-ref
      useExisting: forwardRef(() => BaoFileInputComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-file-input',
    '[class.bao-file-label-small]': 'size === "small"',
    '[class.bao-file-label-medium]': 'size === "medium"',
    '[class.bao-file-input-disabled]': 'disabled'
  }
})
export class BaoFileInputComponent
  implements AfterContentInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  /**
   * Id of the file input field
   */
  @Input('id') public inputId?: string;

  /**
   * Label of field to be displayed above
   */
  @Input() public label: string;

  /**
   * Size of the file input label
   */
  @Input() public size: 'small' | 'medium' = 'medium';

  /**
   * Maximum size accepted for uploaded files
   */
  @Input() public maximalFileSize = -1;

  /**
   * Accepted types of files
   */
  @Input() public acceptedMIMETypes: string[] = [];

  /**
   * Is field required
   */
  @Input() public required? = false;

  /**
   * Is field disabled
   */
  @Input() public disabled? = false;

  /**
   * File selected to be uploaded
   */
  @Output() public uploadedFile: EventEmitter<File> = new EventEmitter<File>();

  /**
   * List of files that have been uploaded so far
   */
  @ContentChildren(BaoFilePreviewComponent, { descendants: true })
  private _files: QueryList<BaoFilePreviewComponent>;

  /**
   * Form errors when component is used in a form
   */
  @ContentChildren(BaoErrorTextComponent, { descendants: true })
  private _errorForm: QueryList<BaoErrorTextComponent>;

  /**
   * Error texts
   */
  @ViewChildren(BaoErrorTextComponent)
  private _errorTexts: QueryList<BaoErrorTextComponent>;

  /**
   * File input that triggers uploading when clicked
   */
  @ViewChild('uploader', { static: false }) private uploader: ElementRef;

  @ViewChild('dropzone', { static: false })
  private dropzoneElement: ElementRef<HTMLElement>;

  public insertDefaultInstructions = false;
  public isFileTooBig = false;
  public isFileTypeInvalid = false;
  private _value: File[];
  private _intlChanges: Subscription;
  private _helperTextId: string;

  constructor(
    public intl: BaoFileIntl,
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this._intlChanges = intl.changes.subscribe(() => this.cdr.markForCheck());
  }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  @HostListener('window:keyup.enter')
  enterKeyEvent() {
    if (document.activeElement.id === this.inputId) {
      document.getElementById(this.inputId).click();
    }
  }

  @HostListener('window:keyup.tab')
  tabKeyEvent() {
    if (document.activeElement.id === this.inputId) {
      this.renderer.addClass(
        this.dropzoneElement.nativeElement,
        'dropzone-focus'
      );
    }
  }

  @HostListener('window:keyup.shift.tab')
  shiftTabKeyEvent() {
    if (document.activeElement.id === this.inputId) {
      this.renderer.addClass(
        this.dropzoneElement.nativeElement,
        'dropzone-focus'
      );
    }
  }

  public ngAfterContentInit(): void {
    this._errorForm.changes.subscribe(() => this.setErrorTextsAttribute());
    if (!this.inputId) {
      this.inputId = `file-input-${fileInputUniqueId++}`;
    }
    // If no content was added for dropzone instructions, add default text.
    const dropzoneElement = Array.from(this.nativeElement.children).find(
      (el: HTMLElement) => el.className === 'file-drop-zone'
    );
    if (
      !Array.from(dropzoneElement.children).find(
        el => el.localName === 'bao-file-dropzone-instructions'
      )
    ) {
      this.insertDefaultInstructions = true;
    }
    this.setDescribedByAttribute();
    this._files.changes.subscribe(
      (files: QueryList<BaoFilePreviewComponent>) => {
        const filesList: File[] = files.map(
          (el: BaoFilePreviewComponent) => el.file
        );
        this.setValue(filesList);
      }
    );
  }

  public ngAfterViewInit(): void {
    this._errorTexts.changes.subscribe(() => this.setErrorTextsAttribute());
  }

  public ngOnDestroy(): void {
    this._intlChanges.unsubscribe();
  }

  /**
   * Implements ControlValueAccessor interface
   */
  public writeValue(obj: any): void {
    this._value = obj;
  }
  /**
   * Implements ControlValueAccessor interface
   */
  public registerOnChange(fn: (value: any) => void): void {
    this.propagateChange = fn;
  }
  /**
   * Implements ControlValueAccessor interface
   */
  public registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  /**
   * Implements ControlValueAccessor interface
   */
  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public uploadFile(file: File) {
    if (!this.disabled) {
      this.isFileTypeInvalid = false;
      this.isFileTooBig = false;
      this.uploader.nativeElement.value = '';
      if (this.maximalFileSize > 0 && file.size > this.maximalFileSize) {
        this.isFileTooBig = true;
      }
      if (
        this.acceptedMIMETypes.length > 0 &&
        this.acceptedMIMETypes.indexOf(file.type) < 0
      ) {
        this.isFileTypeInvalid = true;
      }
      if (!this.isFileTooBig && !this.isFileTypeInvalid) {
        this.uploadedFile.emit(file);
      }
    }
  }

  /**
   * Saves the registerOnChange function so the component can call it whenever it wants.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  public propagateChange = (_: any) => {};

  /**
   * Saves the registerOnTouched function so the component can call it whenever it wants.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public propagateTouched = () => {};

  private setValue(value: File[]) {
    this._value = value;
    this.propagateChange(this._value);
    this.propagateTouched();
  }

  private setDescribedByAttribute(): void {
    const helperText = Array.from(this.nativeElement.children).find(
      (el: HTMLElement) => el.localName === 'bao-guiding-text'
    );
    if (helperText) {
      this._helperTextId = `bao-guiding-text-${fileTextUniqueId++}`;
      this.renderer.setAttribute(
        helperText.firstElementChild,
        'id',
        this._helperTextId
      );
      const inputElement = Array.from(this.nativeElement.children)
        .find((el: HTMLElement) => el.className == 'file-drop-zone')
        .children.item(1);
      this.renderer.setAttribute(
        inputElement,
        'aria-describedby',
        this._helperTextId
      );
    }
  }

  private setErrorTextsAttribute(): void {
    const textsIds = [];
    const errors = Array.from(this.nativeElement.children).filter(
      (el: HTMLElement) => el.localName == 'bao-error'
    );
    errors.forEach((errorText: HTMLElement) => {
      const errorTextId = `bao-error-${fileTextUniqueId++}`;
      this.renderer.setAttribute(
        errorText.firstElementChild,
        'id',
        errorTextId
      );
      textsIds.push(errorTextId);
    });
    const inputElement = Array.from(this.nativeElement.children)
      .find((el: HTMLElement) => el.classList.contains('file-drop-zone'))
      .children.item(1);
    if (this._helperTextId) {
      textsIds.unshift(this._helperTextId);
    }
    this.renderer.setAttribute(
      inputElement,
      'aria-describedby',
      textsIds.join(' ')
    );
  }
}

@Directive({
  selector: '[baoFileDrop]',
  host: { '[class.drag-over]': '_isDragOver == true' }
})
export class BaoFileDropDirective {
  @Output() public fileDrop: EventEmitter<File> = new EventEmitter<File>();
  private _isDragOver = false;

  @HostListener('dragover', ['$event'])
  public onDragOver(event: DragEvent): void {
    this.preventAndStop(event);
    this._isDragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: DragEvent): void {
    this.preventAndStop(event);
    this._isDragOver = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: DragEvent): void {
    this.preventAndStop(event);
    this._isDragOver = false;
    const transfer = this.getDataTransfer(event);
    this.fileDrop.emit(transfer.files[0]);
  }

  private preventAndStop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private getDataTransfer(event: DragEvent | any): DataTransfer {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }
}

@Directive({
  selector: 'bao-file-dropzone-instructions, [bao-file-dropzone-instructions]',
  host: {
    class: 'bao-file-dropzone-instructions'
  }
})
export class BaoFileDropzoneIntructions implements AfterContentInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    this.renderer.setAttribute(this.nativeElement, 'aria-hidden', 'true');
  }
}
