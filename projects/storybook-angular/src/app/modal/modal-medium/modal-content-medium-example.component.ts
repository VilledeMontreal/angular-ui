/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';
import {
  BaoModal,
  BaoModalRef,
  eModalDesktopWidthSize
} from 'projects/angular-ui/src/public-api';

/**
 * @title Modal with header, medium content and actions
 */
@Component({
  selector: 'modal-content--medium-example',
  templateUrl: 'modal-content-medium-example.html'
})
export class ModalContentMediumExample {
  constructor(public modal: BaoModal) {}

  public openModal() {
    const modalRef = this.modal.open(ModalContentMediumExampleModal, {
      size: eModalDesktopWidthSize.MEDIUM,
      ariaLabelledBy: 'bao-modal-unique-title-2'
    });

    modalRef.afterClosed().subscribe(result => {
      console.log(`Modal result: ${JSON.stringify(result)}`);
    });
  }
}

@Component({
  selector: 'modal-content-medium-example-modal',
  templateUrl: 'modal-content-medium-example-modal.html'
})
export class ModalContentMediumExampleModal {
  constructor(public dialogRef: BaoModalRef<ModalContentMediumExampleModal>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
