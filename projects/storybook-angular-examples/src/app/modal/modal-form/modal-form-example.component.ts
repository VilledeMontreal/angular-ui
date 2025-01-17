/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component, Inject } from '@angular/core';
import {
  BAO_MODAL_DATA,
  BaoModal,
  BaoModalRef
} from 'projects/angular-ui/src/public-api';

export interface AddressData {
  numeroCivique: string;
  rue: string;
}

@Component({
  selector: 'modal-form-example',
  templateUrl: 'modal-form-example.html'
})
export class ModalFormExample {
  public numeroCivique: string = '801';
  public rue: string = 'Brennan';

  constructor(public modal: BaoModal) {}

  public openModal() {
    const modalRef = this.modal.open(ModalFormExampleModal, {
      data: { numeroCivique: this.numeroCivique, rue: this.rue },
      ariaLabelledBy: 'bao-modal-unique-title-4'
    });

    modalRef.afterClosed().subscribe((result: AddressData) => {
      this.numeroCivique = result.numeroCivique;
      this.rue = result.rue;
    });
  }
}

@Component({
  selector: 'modal-form-example-modal',
  templateUrl: 'modal-form-example-modal.html'
})
export class ModalFormExampleModal {
  constructor(
    public dialogRef: BaoModalRef<ModalFormExampleModal>,
    @Inject(BAO_MODAL_DATA) public data: AddressData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
