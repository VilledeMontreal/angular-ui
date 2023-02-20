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
 * Toggle state for aria-checked property
 */
export const enum eToggleAriaState {
  ON = 'on',
  OFF = 'off'
}

/**
 * Unique ID for each toggle counter
 */
let toggleNextUniqueId = 0;

@Component({
  selector: 'bao-toggle, [bao-toggle]',
  templateUrl: 'toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,   // TODO JFG No form control ?????
      useExisting: forwardRef(() => BaoToggleComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaoToggleComponent
  implements ControlValueAccessor, AfterViewInit, OnInit, OnDestroy
{
  /**
   * The toggle ID. It is set dynamically with an unique ID by default
   */
  @Input() public id: string;

  /**
   * The name property of the toggle
   */
  @Input() public name?: string;

  /**
   * The aria-label for web accessibility
   */
  @Input('aria-label') public ariaLabel?: string;

  // // // /**
  // // //  * The visible state of the label
  // // //  */
  // // // @Input() public hiddenLabel = false;

  /**
   * Emitted object on change event
   */
  @Output() public readonly change: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  // // // /**
  // // //  * Inderminate value of the toggle whenever
  // // //  */
  // // // @Output() public readonly indeterminateChange: EventEmitter<boolean> =
  // // //   new EventEmitter<boolean>();

  /**
   * Reference to the button html element
   */
  @ViewChild('button', { static: false })
  private buttonElement: ElementRef<HTMLButtonElement>;

  /**
   * The aria-describedby id for web accessibilty
   */
  public ariaDescribedby?: string;

  /**
   * The aria-labeledby id for web accessibilty
   */
  public ariaLabelledby?: string;

  /**
   * The ID of the button html element
   */
  public buttonID: string;

  private _disabled = false;
  private _checked = false;
  private _hiddenLabel = false;
  private _uniqueId = `bao-toggle-${++toggleNextUniqueId}`;
  // // // private _required: boolean;

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
   * Whether the toggle is checked.  Default value : false
   */
  @Input()
  get checked(): boolean {
    console.log('checked GET - this._checked ===', this._checked);
    return this._checked;
  }

  /**
   * Whether the toggle is disabled. Default value : false
   */
  @Input()
  get disabled() {
    console.log('disabled GET - this._disabled ===', this._disabled);
    return this._disabled;
  }

  /**
   * Whether the toggle label is visible. Default value : false
   */
  @Input()
  get hiddenLabel() {
    console.log('hiddenLabel GET - this._hiddenLabel ===', this._hiddenLabel);
    return this._hiddenLabel;
  }

  // // // /**
  // // //  * Whether the toggle is required.  Default value : false
  // // //  */
  // // // @Input()
  // // // get required(): boolean {
  // // //   return this._required;
  // // // }

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  set checked(value: boolean) {
    console.log('checked SET - value ===', value);
    if (value !== this.checked) {
      console.log('checked SET change - value ===', value);
      this._checked = value;
      this.cdr.markForCheck();
    }
  }

  set disabled(value: boolean) {
    console.log('disabled SET - value ===', value);
    if (value !== this.disabled) {
      console.log('disabled SET change - value ===', value);
      this._disabled = value;
      this.cdr.markForCheck();
    }
  }

  set hiddenLabel(value: boolean) {
    console.log('hiddenLabel SET - value ===', value);
    if (value !== this.hiddenLabel) {
      console.log('hiddenLabel SET change - value ===', value);
      this._hiddenLabel = value;
      this.cdr.markForCheck();
    }
  }

  // // // set required(value: boolean) {
  // // //   this._required = value;
  // // // }

  public ngOnInit() {
    // Set all unique ids for the html elements
    this.buttonID = `${this.id}-button`;
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

    // // // this.setAriaDescribedByToDescription();
    // this.syncIndeterminate(this.indeterminate); // TODO JFG ??? See function
  }

  public ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.elementRef);
  }

  /**
   * Implement ControlValueAccessor
   */
  public writeValue(value: any) {   // TODO JFG No form control ?????
    this.checked = !!value;
  }

  /**
   * Implement ControlValueAccessor
   */
  public registerOnChange(fn: (value: any) => void) {   // TODO JFG No form control ?????
    this.onModelChange = fn;
  }

  /**
   * Implement ControlValueAccessor
   */
  public registerOnTouched(fn: any) {   // TODO JFG No form control ?????
    this.onTouch = fn;
  }

  /**
   * Implement ControlValueAccessor
   */
  public setDisabledState(isDisabled: boolean) {   // TODO JFG No form control ?????
    this.disabled = isDisabled;
  }

  public focus(origin?: FocusOrigin, options?: FocusOptions): void {
    if (origin) {
      this.focusMonitor.focusVia(this.buttonElement, origin, options);
    } else {
      this.buttonElement.nativeElement.focus(options);
    }
  }

  /**
   * Whenever there is change on the button html element
   */
  public onInteractionEvent(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the button element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }

  /**
   * Whenever there is click event triggered on the toggle
   */
  public onButtonClick(event: Event) {
    event.stopPropagation();
    this.toggle();
    this.emitChangeEvent();
  }

  /**
   * Get the value for the aria-checked property (web accessibility)
   */
  public getAriaState(): eToggleAriaState {
    if (this.checked) {
      return eToggleAriaState.ON;
    }
    return eToggleAriaState.OFF;
  }

  /**
   * Emit new values whenever the toggle object has change.
   */
  private emitChangeEvent() {
    this.onModelChange(this.checked);
    this.change.emit(this.checked);
    // this.syncChecked(this.checked); // TODO JFG ??? See function
  }

  // /**
  //  * Set the checked property on the button html element
  //  */
  // private syncChecked(value: boolean) {  // TODO JFG ??? checked does not exist on button element
  //   if (this.buttonElement) {
  //     this.buttonElement.nativeElement.checked = value;
  //   }
  // }

  // /**
  //  * Set the indeterminate property on the button html element
  //  */
  // private syncIndeterminate(value: boolean) {  // TODO JFG ??? indeterminate does not exist on button element
  //   if (this.buttonElement) {
  //     this.buttonElement.nativeElement.indeterminate = value;
  //   }
  // }

  // // // /**
  // // //  * Set the aria-describedby property to bao-toggle-description
  // // //  */
  // // // private setAriaDescribedByToDescription() {
  // // //   const childNodes = Array.from(this.nativeElement.childNodes);
  // // //   const labelNode = childNodes.find(x => {
  // // //     return x.nodeName === 'LABEL';
  // // //   });
  // // //   if (labelNode) {
  // // //     const labelChildNodes = Array.from(labelNode.childNodes);
  // // //     const descriptionNode = labelChildNodes.find(x => {
  // // //       return x.nodeName === 'BAO-TOGGLE-DESCRIPTION';
  // // //     });

  // // //     if (descriptionNode) {
  // // //       this.ariaDescribedby = `${this.id}-ariadescribedby`;
  // // //       (descriptionNode as HTMLElement).setAttribute(
  // // //         'id',
  // // //         this.ariaDescribedby
  // // //       );
  // // //     } else {
  // // //       this.ariaDescribedby = undefined;
  // // //     }

  // // //     this.cdr.detectChanges();
  // // //   }
  // // // }

  /**
   * Set checked value
   */
  private toggle() {
    this.checked = !this.checked;
  }

  private onModelChange: (value: any) => void = () => undefined;
  private onTouch: () => void = () => undefined;
}

// // // @Directive({
// // //   selector:
// // //     'bao-toggle-description, [bao-toggle-description],  [baoToggleDescription]',
// // //   host: { class: 'bao-toggle-description' }
// // // })
// // // export class BaoToggleDescription {}
