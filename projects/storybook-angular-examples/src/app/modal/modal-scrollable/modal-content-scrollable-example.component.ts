import { Component } from '@angular/core';
import {
  BaoModal,
  BaoModalRef,
  eModalDesktopWidthSize,
  eModalMobileWidthSize
} from 'projects/angular-ui/src/public-api';

/**
 * @title Modal with header, scrollable content and actions
 */
@Component({
  selector: 'modal-content-scrollable-example',
  templateUrl: 'modal-content-scrollable-example.html'
})
export class ModalContentScrollableExample {
  constructor(public modal: BaoModal) {}

  public openModal() {
    const modalRef = this.modal.open(ModalContentScrollableExampleModal, {
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
  templateUrl: 'modal-content-scrollable-example-modal.html'
})
export class ModalContentScrollableExampleModal {
  constructor(
    public dialogRef: BaoModalRef<ModalContentScrollableExampleModal>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
