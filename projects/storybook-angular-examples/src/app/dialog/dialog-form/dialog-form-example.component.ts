import { Component, Inject } from '@angular/core';
import {
  BaoDialog,
  BaoDialogRef,
  BAO_DIALOG_DATA
} from 'projects/angular-ui/src/public-api';

export interface AddressData {
  numeroCivique: string;
  rue: string;
}

@Component({
  selector: 'dialog-form-example',
  templateUrl: 'dialog-form-example.html'
})
export class DialogFormExample {
  public numeroCivique: string = '801';
  public rue: string = 'Brennan';

  constructor(public dialog: BaoDialog) {}

  public openDialog() {
    const dialogRef = this.dialog.open(DialogFormExampleDialog, {
      data: { numeroCivique: this.numeroCivique, rue: this.rue },
      ariaLabelledBy: 'bao-dialog-unique-title-4'
    });

    dialogRef.afterClosed().subscribe((result: AddressData) => {
      this.numeroCivique = result.numeroCivique;
      this.rue = result.rue;
    });
  }
}

@Component({
  selector: 'dialog-form-example-dialog',
  templateUrl: 'dialog-form-example-dialog.html'
})
export class DialogFormExampleDialog {
  constructor(
    public dialogRef: BaoDialogRef<DialogFormExampleDialog>,
    @Inject(BAO_DIALOG_DATA) public data: AddressData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
