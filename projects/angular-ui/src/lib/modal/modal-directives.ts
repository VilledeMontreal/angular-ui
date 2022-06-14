/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ElementRef
} from '@angular/core';
import { BaoModal } from './modal';
import { _closeModalVia, BaoModalRef } from './modal-ref';

/**
 * Button that will close the current dialog.
 */
@Directive({
  selector: '[bao-modal-close], [baoModalClose]',
  exportAs: 'BaoModalClose',
  host: {
    '(click)': '_onButtonClick($event)',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.type]': 'type'
  }
})
export class BaoModalClose implements OnInit, OnChanges {
  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Default to "button" to prevents accidental form submits. */
  @Input() type: 'submit' | 'button' | 'reset' = 'button';

  /** Dialog close input. */
  @Input('bao-modal-close') dialogResult: unknown;

  @Input('baoModalClose') _baoModalClose: unknown;

  constructor(
    @Optional() public modalRef: BaoModalRef<unknown> | null,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: BaoModal
  ) {}

  ngOnInit() {
    if (!this.modalRef) {
      // When this directive is included in a dialog via TemplateRef (rather than being
      // in a Component), the modalRef isn't available via injection because embedded
      // views cannot be given a custom injector. Instead, we look up the modalRef by
      // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
      // be resolved at constructor time.
      this.modalRef =
        getClosestDialog(this._elementRef, this._dialog.openModals) || null;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const proxiedChange =
      changes['_baoModalClose'] || changes['_baoModalCloseResult'];

    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }

  _onButtonClick(event: MouseEvent) {
    // Determinate the focus origin using the click event, because using the FocusMonitor will
    // result in incorrect origins. Most of the time, close buttons will be auto focused in the
    // dialog, and therefore clicking the button won't result in a focus change. This means that
    // the FocusMonitor won't detect any origin change, and will always output `program`.
    _closeModalVia(
      this.modalRef,
      event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse',
      this.dialogResult
    );
  }
}

/**
 * Finds the closest BaoModalRef to an element by looking at the DOM.
 */
function getClosestDialog(
  element: ElementRef<HTMLElement>,
  openDialogs: BaoModalRef<unknown>[]
): BaoModalRef<unknown> | null {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent && !parent.classList.contains('bao-modal-container')) {
    parent = parent.parentElement;
  }

  return parent ? openDialogs.find(dialog => dialog.id === parent.id) : null;
}
