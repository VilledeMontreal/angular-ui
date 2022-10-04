import { Component } from '@angular/core';
import {
  BaoDialog,
  BaoDialogRef,
  eDialogDesktopWidthSize,
  eDialogMobileWidthSize
} from 'projects/angular-ui/src/public-api';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  selector: 'dialog-content-scrollable-example',
  templateUrl: 'dialog-content-scrollable-example.html'
})
export class DialogContentScrollableExample {
  constructor(public dialog: BaoDialog) {}

  public openDialog() {
    const dialogRef = this.dialog.open(DialogContentScrollableExampleDialog, {
      size: eDialogDesktopWidthSize.LARGE,
      mobileSize: eDialogMobileWidthSize.COMPACT,
      ariaLabelledBy: 'bao-dialog-unique-title-3'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-scrollable-example-dialog',
  templateUrl: 'dialog-content-scrollable-example-dialog.html'
})
export class DialogContentScrollableExampleDialog {
  constructor(
    public dialogRef: BaoDialogRef<DialogContentScrollableExampleDialog>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
