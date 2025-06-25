/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  BAO_RADIO_GROUP,
  BaoRadioButtonGroupComponent
} from './radio-group.component';

/**
 * Unique ID for each radio button
 */
let radioNextUniqueId = 0;

@Component({
  selector: 'bao-radio-button, [bao-radio-button]',
  templateUrl: 'radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaoRadioButtonComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-radio-button',
    '[class.bao-radio-button-inline]': 'inline',
    '[class.bao-radio-button-checked]': 'checked',
    '[class.bao-radio-button-disabled]': 'disabled',
    '[class.bao-radio-button-card]': 'brandBorder',
    '[class.bao-radio-button-hidden-label]': 'hiddenLabel'
  }
})
export class BaoRadioButtonComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  /**
   * The radio button ID. It is set dynamically with an unique ID by default
   */
  @Input() public id: string;

  /**
   * The aria-label for web accessibility
   */
  @Input('aria-label') public ariaLabel: string | null = null;

  /**
   * Whether the radio button has a border and is considered as a card.
   */
  @Input() public brandBorder = false;

  /**
   * Whether the radio button is inline.
   */
  @Input() public inline = false;

  /**
   * The name property of the radio button
   */
  @Input() public name: string | null = null;

  /**
   * The visible state of the label
   */
  @Input() public hiddenLabel = false;

  /**
   * Emitted boolean on change
   */
  @Output() public readonly change: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * Reference to the input html element
   */
  @ViewChild('input', { static: false })
  private inputElement: ElementRef<HTMLInputElement>;

  /**
   * The radio buttons group
   */
  public radioGroup: BaoRadioButtonGroupComponent;

  /**
   * The aria-describedby id for web accessibilty
   */
  public ariaDescribedby: string | null = null;

  /**
   * The aria-labeledby id for web accessibilty
   */
  public ariaLabelledby: string | null = null;

  /**
   * The ID of the input html element
   */
  public inputID: string;

  private _checked = false;
  private _disabled = false;
  private _required = false;
  private _value: string | null = null;
  private _uniqueId = `bao-radio-button-${++radioNextUniqueId}`;

  constructor(
    @Optional()
    @Inject(BAO_RADIO_GROUP)
    radioGroup: BaoRadioButtonGroupComponent,
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    private radioDispatcher: UniqueSelectionDispatcher
  ) {
    this.radioGroup = radioGroup;
    this._removeUniqueSelectionListener = radioDispatcher.listen(
      (id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
        }
      }
    );
    if (!this.id) {
      this.id = this._uniqueId;
    }
  }

  /**
   * Whether the radio button is checked. Default : false
   */
  @Input()
  get checked(): boolean {
    return this._checked;
  }

  /**
   * Define the radio button value. Default : null
   */
  @Input()
  get value(): string {
    return this._value;
  }

  /**
   * Whether the radio button is disabled. Default : false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled || (this.radioGroup && this.radioGroup.disabled);
  }

  /**
   * Whether the radio button is required. Default : false
   */
  @Input()
  get required(): boolean {
    return this._required || (this.radioGroup && this.radioGroup.required);
  }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  set checked(value: boolean) {
    const newCheckedState = coerceBooleanProperty(value);
    if (this._checked !== newCheckedState) {
      this._checked = newCheckedState;
      if (
        newCheckedState &&
        this.radioGroup &&
        this.radioGroup.value !== this.value
      ) {
        this.radioGroup.selected = this;
      } else if (
        !newCheckedState &&
        this.radioGroup &&
        this.radioGroup.value === this.value
      ) {
        this.radioGroup.selected = null;
      }

      if (newCheckedState) {
        this.radioDispatcher.notify(this.id, this.name);
      }
      this.cdr.markForCheck();
    }
  }

  set value(value: string) {
    if (value !== this._value) {
      this._value = value;
      if (this.radioGroup) {
        if (!this.checked) {
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }

  set disabled(value: boolean) {
    this.setDisabled(coerceBooleanProperty(value));
  }

  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  public focus(options?: FocusOptions, origin?: FocusOrigin): void {
    if (origin) {
      this.focusMonitor.focusVia(this.inputElement, origin, options);
    } else {
      this.inputElement.nativeElement.focus(options);
    }
  }

  /**
   * Method called from the parent as one of the parent input has changed. Prevent change detection error.
   */
  public markForCheck() {
    this.cdr.markForCheck();
  }

  public ngOnInit() {
    // Set all unique ids for the html elements
    this.inputID = `${this.id}-input`;
    this.ariaLabelledby = `${this.id}-arialabelledby`;

    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this._value;

      if (this.checked) {
        this.radioGroup.selected = this;
      }

      this.name = this.radioGroup.name;
    }
  }

  public ngAfterViewInit() {
    this.focusMonitor
      .monitor(this.inputElement, true)
      .subscribe(focusOrigin => {
        if (!focusOrigin && this.radioGroup) {
          this.radioGroup.onGroupTouch();
        }
      });

    this.setAriaDescribedByToDescription();
  }

  public ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.inputElement);
    this._removeUniqueSelectionListener();
  }

  /**
   * Emit the new value from the selected radio-button and the parent
   */
  public onInputInteraction(event: Event) {
    event.stopPropagation();
    if (!this.checked && !this.disabled) {
      const groupValueChanged =
        this.radioGroup && this.value !== this.radioGroup.value;
      this.checked = true;
      this.emitChangeEvent();

      if (this.radioGroup) {
        this.radioGroup.onModelChange(this.value);
        if (groupValueChanged) {
          this.radioGroup.emitChangeEvent();
        }
      }
    }
  }

  private emitChangeEvent(): void {
    this.change.emit(this.value);
  }

  private setDisabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this.cdr.markForCheck();
    }
  }

  /**
   * Set the id property to bao-radio-button-description as a description to the input
   */
  private setAriaDescribedByToDescription() {
    const childNodes = Array.from(this.nativeElement.childNodes);
    const labelNode = childNodes.find(x => {
      return x.nodeName === 'LABEL';
    });
    if (labelNode) {
      const labelChildNodes = Array.from(labelNode.childNodes);
      const descriptionNode = labelChildNodes.find(x => {
        return x.nodeName === 'BAO-RADIO-BUTTON-DESCRIPTION';
      });

      if (descriptionNode) {
        this.ariaDescribedby = `${this.id}-ariadescribedby`;
        (descriptionNode as HTMLElement).setAttribute(
          'id',
          this.ariaDescribedby
        );
      } else {
        this.ariaDescribedby = null;
      }

      this.cdr.detectChanges();
    }
  }

  /** Unregister function for radioDispatcher */
  private _removeUniqueSelectionListener: () => void = () => undefined;
}

@Directive({
  selector:
    'bao-radio-button-description, [bao-radio-button-description],  [baoRadioButtonDescription]',
  host: { class: 'bao-radio-button-description' }
})
export class BaoRadioDescription {}
