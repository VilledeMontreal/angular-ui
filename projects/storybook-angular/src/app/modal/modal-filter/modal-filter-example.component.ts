/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  BaoModal,
  BaoModalRef,
  eModalVariant
} from 'projects/angular-ui/src/public-api';

/**
 * @title Modal with filter variant
 */
@Component({
  selector: 'modal-filter-example',
  templateUrl: 'modal-filter-example.html'
})
export class ModalFilterExample {
  @ViewChild('triggerButton', { read: ElementRef, static: false })
  triggerButton: ElementRef;

  constructor(public modal: BaoModal) {}

  public openFilterModal() {
    if (!this.triggerButton) {
      return;
    }

    const modalRef = this.modal.open(ModalFilterExampleModal, {
      variant: eModalVariant.FILTER,
      triggerElement: this.triggerButton,
      ariaLabelledBy: 'bao-modal-filter-title'
    });

    modalRef.afterClosed().subscribe(() => {
      // Handle the result from the modal
    });
  }
}

@Component({
  selector: 'modal-filter-example-modal',
  templateUrl: 'modal-filter-example-modal.html'
})
export class ModalFilterExampleModal {
  constructor(public dialogRef: BaoModalRef<ModalFilterExampleModal>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onApplyFilters(): void {
    this.dialogRef.close();
  }
}
