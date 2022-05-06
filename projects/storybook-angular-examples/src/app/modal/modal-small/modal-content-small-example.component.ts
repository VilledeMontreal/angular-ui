import { Component } from '@angular/core';
import { BaoModal, BaoModalRef } from 'projects/angular-ui/src/public-api';

/**
 * @title Modal with header, small content and actions
 */
@Component({
  selector: 'modal-content-small-example',
  templateUrl: 'modal-content-small-example.html'
})
export class ModalContentSmallExample {
  constructor(public modal: BaoModal) {}

  public openModal() {
    const modalRef = this.modal.open(ModalContentSmallExampleModal, {
      ariaLabelledBy: 'bao-modal-unique-title'
    });

    modalRef.afterClosed().subscribe(result => {
      console.log(`Modal result: ${result}`);
    });
  }
}

@Component({
  selector: 'modal-content-small-example-modal',
  templateUrl: 'modal-content-small-example-modal.html'
})
export class ModalContentSmallExampleModal {
  constructor(public dialogRef: BaoModalRef<ModalContentSmallExampleModal>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
