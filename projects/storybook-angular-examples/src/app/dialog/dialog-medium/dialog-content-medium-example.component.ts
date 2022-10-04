import { Component } from '@angular/core';
import {
  BaoDialog,
  BaoDialogRef,
  eDialogDesktopWidthSize
} from 'projects/angular-ui/src/public-api';

/**
 * @title Dialog with header, medium content and actions
 */
@Component({
  selector: 'dialog-content--medium-example',
  templateUrl: 'dialog-content-medium-example.html'
})
export class DialogContentMediumExample {
  constructor(public dialog: BaoDialog) {}

  public openDialog() {
    const dialogRef = this.dialog.open(DialogContentMediumExampleDialog, {
      size: eDialogDesktopWidthSize.MEDIUM,
      ariaLabelledBy: 'bao-dialog-unique-title-2'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-medium-example-dialog',
  templateUrl: 'dialog-content-medium-example-dialog.html'
})
export class DialogContentMediumExampleDialog {
  constructor(public dialogRef: BaoDialogRef<DialogContentMediumExampleDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
