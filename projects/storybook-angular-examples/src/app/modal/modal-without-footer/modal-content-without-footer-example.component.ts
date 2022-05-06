import { Component } from '@angular/core';
import { BaoModal, BaoModalRef } from 'projects/angular-ui/src/public-api';

@Component({
  selector: 'modal-content-without-footer-example',
  templateUrl: 'modal-content-without-footer-example.html'
})
export class ModalContentWithoutFooterExample {
  constructor(public modal: BaoModal) {}

  public openModal() {
    const modalRef = this.modal.open(ModalContentWithoutFooterExampleModal, {
      ariaLabelledBy: 'bao-modal-unique-title-5'
    });

    modalRef.afterClosed().subscribe(result => {
      console.log(`Modal result: ${result}`);
    });
  }
}

@Component({
  selector: 'modal-content-without-footer-example-modal',
  templateUrl: 'modal-content-without-footer-example-modal.html'
})
export class ModalContentWithoutFooterExampleModal {
  constructor(
    public dialogRef: BaoModalRef<ModalContentWithoutFooterExampleModal>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
