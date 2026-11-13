/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';
import {
  BaoModal,
  BaoModalRef,
  eModalDesktopWidthSize,
  eModalMobileWidthSize
} from 'projects/angular-ui/src/public-api';

/**
 * @title Modal with header, content and actions
 */
@Component({
  selector: 'modal-content-large-example',
  templateUrl: 'modal-content-large-example.html'
})
export class ModalContentLargeExample {
  constructor(public modal: BaoModal) {}

  public openModal() {
    const modalRef = this.modal.open(ModalContentLargeExampleModal, {
      size: eModalDesktopWidthSize.LARGE,
      mobileSize: eModalMobileWidthSize.COMPACT,
      ariaLabelledBy: 'bao-modal-unique-title-3'
    });

    modalRef.afterClosed().subscribe(result => {
      console.log(`Modal result: ${result}`);
    });
  }
}

@Component({
  selector: 'modal-content-scrollable-example-modal',
  templateUrl: 'modal-content-large-example-modal.html'
})
export class ModalContentLargeExampleModal {
  constructor(public dialogRef: BaoModalRef<ModalContentLargeExampleModal>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
