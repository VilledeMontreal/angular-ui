/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  InjectionToken,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaoRadioButtonComponent } from '.';

/**
 * We have to inject the radio button group and all its children to each child.
 */
export const BAO_RADIO_GROUP = new InjectionToken<BaoRadioButtonGroupComponent>(
  'BaoRadioButtonGroup'
);
/**
 * Unique ID for each radio group counter
 */
let radioGroupNextUniqueId = 0;

@Component({
  selector:
    'bao-radio-button-group, [bao-radio-button-group], [baoRadioButtonGroup]',
  exportAs: 'baoRadioGroup',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaoRadioButtonGroupComponent),
      multi: true
    },
    { provide: BAO_RADIO_GROUP, useExisting: BaoRadioButtonGroupComponent }
  ]
})
export class BaoRadioButtonGroupComponent
  implements AfterContentInit, ControlValueAccessor, AfterViewInit, OnInit
{
  @ContentChildren(forwardRef(() => BaoRadioButtonComponent), {
    descendants: true
  })
  private _radios: QueryList<BaoRadioButtonComponent>;
  private _value: string | null = null;
  private _name: string | null = null;
  private _selected: BaoRadioButtonComponent | null = null;
  private _isInitialized = false;
  private _disabled = false;
  private _required = false;

  private _uniqueId = `bao-checkbox-group-${++radioGroupNextUniqueId}`;

  /**
   * The checkbox group ID. It is set dynamically with an unique ID by default
   */
  @Input() public id: string = this._uniqueId;

  /**
   * The aria-describebdy-text id for web accessibility
   * only when we have de guidance text
   */
  public ariaDescribedbyGuidingText?: string;

  /**
   * The aria-labelledby id for web accessibility
   */
  public ariaLabelledby?: string;

  /**
   * The aria-describebdy-error id for web accessibility
   * only when error section appears
   */
  public ariaDescribedbyError?: string;

  /**
   * Define the name property of all radio buttons. Default : null
   */
  @Input()
  get name(): string | null {
    return this._name;
  }
  set name(value: string | null) {
    this._name = value;
    this.updateRadioButtonNames();
  }

  /**
   * Define the value of the selected radio button. Default : null
   */
  @Input()
  get value(): string | null {
    return this._value;
  }
  set value(newValue: string | null) {
    if (this._value !== newValue) {
      this._value = newValue;
      this.updateSelectedRadioFromValue();
      this.checkSelectedRadioButton();
    }
  }

  /**
   * Define which radio button is selected. Default : null
   */
  @Input()
  get selected() {
    return this._selected;
  }
  set selected(selected: BaoRadioButtonComponent | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this.checkSelectedRadioButton();
  }

  /**
   * Whether the radio button groupd is disabled. Default : false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this.markRadiosForCheck();
  }

  /**
   * Whether the radio button groupd is required. Default : false
   */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.markRadiosForCheck();
  }

  /**
   * Emit the value of the selected radio button
   */
  @Output() public readonly change: EventEmitter<string> =
    new EventEmitter<string>();

  /**
   * The aria-describedby for web accessibilty
   */
  public ariaDescribedby: string | null = null;

  constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.ariaDescribedbyError = `${this.id}-ariadescribedby-error`;
    this.ariaDescribedbyGuidingText = `${this.id}-ariadescribedby-guiding-text`;
    this.ariaLabelledby = `${this.id}-arialabelledby`;
  }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterContentInit() {
    this._isInitialized = true;
  }

  public ngAfterViewInit() {
    this.setAriaDescribedByToDescription();
    this.setAriaDescribedLgendsGuidingText();
    this.cdr.detectChanges();
  }

  /**
   * Implement ControlValueAccessor
   */
  public writeValue(value: string) {
    this.value = value;
    this.cdr.markForCheck();
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
    this.cdr.markForCheck();
  }

  /**
   * onTouch() called from the button children
   */
  public onGroupTouch() {
    if (this.onTouch) {
      this.onTouch();
    }
  }

  /**
   * Update all radio button name
   */
  public updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach((radio: BaoRadioButtonComponent) => {
        radio.name = this.name;
        radio.markForCheck();
      });
    }
  }

  /**
   * Define which radio button is selected.
   */
  public updateSelectedRadioFromValue(): void {
    const isAlreadySelected =
      this._selected !== null && this._selected.value === this._value;
    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach((radio: BaoRadioButtonComponent) => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  /**
   * Update checked property on selected radio button
   */
  public checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  /**
   * Emit the value of the new selected radio button
   */
  public emitChangeEvent(): void {
    if (this._isInitialized) {
      this.change.emit(this.value);
    }
  }

  /**
   * Call markForCheck function on all radio buttons since one of the parent inputs could't have change meanwhile. Prevent change detection error.
   */
  public markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach((radio: BaoRadioButtonComponent) =>
        radio.markForCheck()
      );
    }
  }

  public onContentChange() {
    this.setAriaDescribedByToDescription();
  }

  public onModelChange: (value: any) => void = () => undefined;

  /**
   * Set the aria-describedby property to bao-errors if available
   */
  private setAriaDescribedByToDescription() {
    const fieldSet = this.elementNode('FIELDSET');

    if (fieldSet) {
      const baoError = this.elementNode('DIV', fieldSet);
      this.setAriaAttribute(
        baoError,
        this.ariaDescribedbyError,
        fieldSet,
        'aria-describedby'
      );
    }
  }

  /**
   * Set the aria-describedby property to bao-guiding-text and legend if available
   */
  private setAriaDescribedLgendsGuidingText() {
    const fieldSet = this.elementNode('FIELDSET');

    if (fieldSet) {
      const baoLabel = this.elementNode('LEGEND', fieldSet);
      const baoGuidingText = this.elementNode('BAO-GUIDING-TEXT', fieldSet);

      this.setAriaAttribute(
        baoLabel,
        this.ariaLabelledby,
        fieldSet,
        'aria-labelledby'
      );
      this.setAriaAttribute(
        baoGuidingText,
        this.ariaDescribedbyGuidingText,
        fieldSet,
        'aria-describedby'
      );
    }
  }

  private setAriaAttribute(
    nodeElement: Node,
    id: string,
    ariaElment: Node,
    ariaType: string
  ): void {
    if (nodeElement) {
      (nodeElement as HTMLElement).setAttribute('id', id);
      (ariaElment as HTMLElement).setAttribute(ariaType, id);
    }
  }

  private elementNode(name: string, nativeElt?: Node): Node {
    const childNodes = nativeElt
      ? Array.from(nativeElt.childNodes)
      : Array.from(this.nativeElement.childNodes);
    const element = childNodes.find(x => x.nodeName === name);
    console.log(name);
    console.log(childNodes);
    return element;
  }

  private onTouch: () => any = () => undefined;
}
