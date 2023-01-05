/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Checkbox state for aria-checked property
 */
export const enum eCheckboxAriaState {
  TRUE = 'true',
  FALSE = 'false',
  MIXED = 'mixed'
}

/**
 * Unique ID for each checkbox counter
 */
let checkboxNextUniqueId = 0;

@Component({
  selector: 'bao-checkbox, [bao-checkbox]',
  templateUrl: 'checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaoCheckboxComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-checkbox',
    '[class.bao-checkbox-inline]': 'inline',
    '[class.bao-checkbox-checked]': 'checked',
    '[class.bao-checkbox-indeterminate]': 'indeterminate',
    '[class.bao-checkbox-disabled]': 'disabled',
    '[class.bao-checkbox-card]': 'brandBorder',
    '[class.bao-checkbox-required]': 'required',
    '[class.bao-checkbox-hidden-label]': 'hiddenLabel'
  }
})
export class BaoCheckboxComponent
  implements ControlValueAccessor, AfterViewInit, OnInit, OnDestroy
{
  /**
   * The checkbox ID. It is set dynamically with an unique ID by default
   */
  @Input() public id: string;

  /**
   * The aria-label for web accessibility
   */
  @Input('aria-label') public ariaLabel?: string;

  /**
   * Whether the checkbox has a border and is considered as a card.
   */
  @Input() public brandBorder = false;

  /**
   * Whether the checkbox is inline.
   */
  @Input() public inline = false;

  /**
   * The name property of the checkbox
   */
  @Input() public name?: string;

  /**
   * The visible state of the label
   */
  @Input() public hiddenLabel = false;

  /**
   * Emitted object on change event
   */
  @Output() public readonly change: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /**
   * Inderminate value of the checkbox whenever
   */
  @Output() public readonly indeterminateChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /**
   * Reference to the input html element
   */
  @ViewChild('input', { static: false })
  private inputElement: ElementRef<HTMLInputElement>;

  /**
   * The aria-describedby id for web accessibilty
   */
  public ariaDescribedby?: string;

  /**
   * The aria-labeledby id for web accessibilty
   */
  public ariaLabelledby?: string;

  /**
   * The ID of the input html element
   */
  public inputID: string;

  private _disabled = false;
  private _checked = false;
  private _indeterminate = false;
  private _uniqueId = `bao-checkbox-${++checkboxNextUniqueId}`;
  private _required: boolean;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor
  ) {
    if (!this.id) {
      this.id = this._uniqueId;
    }
  }

  /**
   * Whether the checkbox is checked.  Default value : false
   */
  @Input()
  get checked(): boolean {
    return this._checked;
  }

  /**
   * Whether the checkbox is disabled. Default value : false
   */
  @Input()
  get disabled() {
    return this._disabled;
  }

  /**
   * Whether the checkbox is required.  Default value : false
   */
  @Input()
  get required(): boolean {
    return this._required;
  }

  /**
   * Whether the checkbox is indeterminate.  Default value : false
   */
  @Input()
  get indeterminate(): boolean {
    return this._indeterminate;
  }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  set checked(value: boolean) {
    if (value !== this.checked) {
      this._checked = value;
      this.cdr.markForCheck();
    }
  }

  set disabled(value: boolean) {
    // In the case the value is string or boolean
    const newValue = value;

    if (newValue !== this.disabled) {
      this._disabled = newValue;
      this.cdr.markForCheck();
    }
  }

  set required(value: boolean) {
    this._required = value;
  }

  set indeterminate(value: boolean) {
    const newValue = value;

    if (newValue !== this._indeterminate) {
      this._indeterminate = newValue;
      this.indeterminateChange.emit(this._indeterminate);
    }
    // Update the inderteminate value of the html element object
    this.syncIndeterminate(this._indeterminate);
  }

  public ngOnInit() {
    // Set all unique ids for the html elements
    this.inputID = `${this.id}-input`;
    this.ariaLabelledby = `${this.id}-arialabelledby`;
  }

  public ngAfterViewInit() {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        // When a focused element becomes disabled, the browser *immediately* fires a blur event.
        // Angular does not expect events to be raised during change detection, so any state change
        // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
        // See https://github.com/angular/angular/issues/17793. To work around this, we defer
        // telling the form control it has been touched until the next tick.
        Promise.resolve()
          .then(() => {
            this.onTouch();
            this.cdr.markForCheck();
          })
          .catch(() => undefined);
      }
    });

    this.setAriaDescribedByToDescription();
    this.syncIndeterminate(this.indeterminate);
  }

  public ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  /**
   * Implement ControlValueAccessor
   */
  public writeValue(value: any) {
    this.checked = !!value;
  }

  /**
   * Implement ControlValueAccessor
   */
  public registerOnChange(fn: (value: any) => void) {
    this.onModelChange = fn;
  }

  /**
   * Implement ControlValueAccessor
   */
  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  /**
   * Implement ControlValueAccessor
   */
  public setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  public focus(origin?: FocusOrigin, options?: FocusOptions): void {
    if (origin) {
      this.focusMonitor.focusVia(this.inputElement, origin, options);
    } else {
      this.inputElement.nativeElement.focus(options);
    }
  }

  /**
   * Whenever there is change on the input html element
   */
  public onInteractionEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  /**
   * Whenever there is click event triggered on the checkbox
   */
  public onInputClick(event: Event) {
    event.stopPropagation();
    this.toggle();
    this.emitChangeEvent();
  }

  /**
   * Get the value for the aria-checked property (web accessibility)
   */
  public getAriaState(): eCheckboxAriaState {
    if (this.checked) {
      return eCheckboxAriaState.TRUE;
    }

    return this.indeterminate
      ? eCheckboxAriaState.MIXED
      : eCheckboxAriaState.FALSE;
  }

  /**
   * Emit new values whenever the checkbox object has change.
   */
  private emitChangeEvent() {
    this.onModelChange(this.checked);
    this.change.emit(this.checked);
    this.syncChecked(this.checked);
  }

  /**
   * Set the checked property on the input html element
   */
  private syncChecked(value: boolean) {
    if (this.inputElement) {
      this.inputElement.nativeElement.checked = value;
    }
  }

  /**
   * Set the indeterminate property on the input html element
   */
  private syncIndeterminate(value: boolean) {
    if (this.inputElement) {
      this.inputElement.nativeElement.indeterminate = value;
    }
  }

  /**
   * Set the aria-describedby property to bao-checkbox-description
   */
  private setAriaDescribedByToDescription() {
    const childNodes = Array.from(this.nativeElement.childNodes);
    const labelNode = childNodes.find(x => {
      return x.nodeName === 'LABEL';
    });
    if (labelNode) {
      const labelChildNodes = Array.from(labelNode.childNodes);
      const descriptionNode = labelChildNodes.find(x => {
        return x.nodeName === 'BAO-CHECKBOX-DESCRIPTION';
      });

      if (descriptionNode) {
        this.ariaDescribedby = `${this.id}-ariadescribedby`;
        (descriptionNode as HTMLElement).setAttribute(
          'id',
          this.ariaDescribedby
        );
      } else {
        this.ariaDescribedby = undefined;
      }

      this.cdr.detectChanges();
    }
  }

  /**
   * Set checked value
   */
  private toggle() {
    this.checked = !this.checked;
  }

  private onModelChange: (value: any) => void = () => undefined;
  private onTouch: () => void = () => undefined;
}

@Directive({
  selector:
    'bao-checkbox-description, [bao-checkbox-description],  [baoCheckboxDescription]',
  host: { class: 'bao-checkbox-description' }
})
export class BaoCheckBoxDescription {}
