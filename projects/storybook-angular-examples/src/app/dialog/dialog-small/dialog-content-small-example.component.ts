import { Component } from '@angular/core';
import { BaoDialog, BaoDialogRef } from 'projects/angular-ui/src/public-api';

/**
 * @title Dialog with header, small content and actions
 */
@Component({
  selector: 'dialog-content-small-example',
  templateUrl: 'dialog-content-small-example.html'
})
export class DialogContentSmallExample {
  constructor(public dialog: BaoDialog) {}

  public openDialog() {
    const dialogRef = this.dialog.open(DialogContentSmallExampleDialog, {
      ariaLabelledBy: 'bao-dialog-unique-title'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-small-example-dialog',
  templateUrl: 'dialog-content-small-example-dialog.html'
})
export class DialogContentSmallExampleDialog {
  constructor(public dialogRef: BaoDialogRef<DialogContentSmallExampleDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
