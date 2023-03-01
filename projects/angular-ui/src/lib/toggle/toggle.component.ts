/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

/**
 * Unique ID for each toggle counter
 */
let toggleNextUniqueId = 0;

@Component({
  selector: 'bao-toggle, [bao-toggle]',
  templateUrl: 'toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-toggle',
    '[class.bao-toggle-label-hidden]': 'hiddenLabel',
    '[class.bao-toggle-switch-hidden-label]': 'hiddenLabel',
    '[class.bao-toggle-switch-checked]': 'checked',
    '[class.bao-toggle-switch-disabled]': 'disabled',
    '[class.bao-toggle-label-disabled]': 'disabled',
    '[class.bao-toggle-switch-focus]': 'isFocus',
  },
})
export class BaoToggleComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * The toggle ID. It is set dynamically with an unique ID by default
   */
  @Input()
  public id!: string;

  /**
   * The name property of the toggle
   */
  @Input() public name?: string;

  /**
   * The aria-label for web accessibility
   */
  @Input('aria-label') public ariaLabel?: string;

  /**
   * The tooltip to show if disabled
   */
  @Input() public toolTip?: string;

  /**
   * Emitted object on change event
   */
  @Output() public readonly change: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /**
   * Reference to the button html element
   */
  @ViewChild('button', { static: false })
  private buttonElement!: ElementRef<HTMLButtonElement>;

  /**
   * The aria-labeledby id for web accessibilty
   */
  public ariaLabelledby?: string;

  /**
   * The ID of the button html element
   */
  public buttonId!: string;

  /**
   * The focus status of the button html element
   */
  public isFocus: boolean = false;

  private _disabled = false;
  private _checked = false;
  private _hiddenLabel = false;
  private _uniqueId = `bao-toggle-${++toggleNextUniqueId}`;

  constructor(
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
    return this._checked;
  }

  /**
   * Whether the toggle is disabled. Default value : false
   */
  @Input()
  get disabled() {
    return this._disabled;
  }

  /**
   * Whether the toggle label is visible. Default value : false
   */
  @Input()
  get hiddenLabel() {
    return this._hiddenLabel;
  }

  set checked(value: boolean) {
    if (value !== this.checked) {
      this._checked = value;
      this.cdr.markForCheck();
    }
  }

  set disabled(value: boolean) {
    if (value !== this.disabled) {
      this._disabled = value;
      this.cdr.markForCheck();
    }
  }

  set hiddenLabel(value: boolean) {
    if (value !== this.hiddenLabel) {
      this._hiddenLabel = value;
      this.cdr.markForCheck();
    }
  }

  public ngOnInit() {
    // Set all unique ids for the html elements
    this.buttonId = `${this.id}-button`;
    this.ariaLabelledby = `${this.id}-arialabelledby`;
  }

  public ngAfterViewInit() {
    this.focusMonitor
      .monitor(this.buttonElement, false)
      .subscribe((focusOrigin) => {
        if (!this.disabled) {
          this.isFocus = !this.isFocus;
          this.cdr.markForCheck();
        }
      });
  }

  public ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.buttonElement);
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
   * Emit new values whenever the toggle object has change.
   */
  private emitChangeEvent() {
    if (!this.disabled) {
      this.change.emit(this.checked);
    }
  }

  /**
   * Set checked value
   */
  private toggle() {
    if (!this.disabled) this.checked = !this.checked;
  }
}
