/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';
import { BaoModal, BaoModalRef } from 'projects/angular-ui/src/public-api';

@Component({
  selector: 'modal-disable-backdrop-example',
  templateUrl: 'modal-disable-backdrop-example.html'
})
export class ModalDisableCloseExample {
  constructor(public modal: BaoModal) {}

  public openModal() {
    const modalRef = this.modal.open(ModalDisableCloseExampleModal, {
      ariaLabelledBy: 'bao-modal-unique-title-5',
      disableClose: true
    });

    modalRef.afterClosed().subscribe(result => {
      console.log(`Modal result: ${result}`);
    });
  }
}

@Component({
  selector: 'modal-disable-backdrop-example-modal',
  templateUrl: 'modal-disable-backdrop-example-modal.html'
})
export class ModalDisableCloseExampleModal {
  constructor(public dialogRef: BaoModalRef<ModalDisableCloseExampleModal>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
