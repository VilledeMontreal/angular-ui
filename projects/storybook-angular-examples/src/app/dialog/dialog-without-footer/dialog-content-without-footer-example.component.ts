import { Component } from '@angular/core';
import { BaoDialog, BaoDialogRef } from 'projects/angular-ui/src/public-api';

@Component({
  selector: 'dialog-content-without-footer-example',
  templateUrl: 'dialog-content-without-footer-example.html'
})
export class DialogContentWithoutFooterExample {
  constructor(public dialog: BaoDialog) {}

  public openDialog() {
    const dialogRef = this.dialog.open(DialogContentWithoutFooterExampleDialog, {
      ariaLabelledBy: 'bao-dialog-unique-title-5'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-without-footer-example-dialog',
  templateUrl: 'dialog-content-without-footer-example-dialog.html'
})
export class DialogContentWithoutFooterExampleDialog {
  constructor(
    public dialogRef: BaoDialogRef<DialogContentWithoutFooterExampleDialog>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
