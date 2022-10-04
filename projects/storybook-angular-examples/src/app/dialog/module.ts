import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  BaoButtonModule,
  BaoDialogModule
} from 'projects/angular-ui/src/public-api';
import {
  DialogFormExample,
  DialogFormExampleDialog
} from './dialog-form/dialog-form-example.component';
import {
  DialogContentMediumExample,
  DialogContentMediumExampleDialog
} from './dialog-medium/dialog-content-medium-example.component';
import {
  DialogContentScrollableExample,
  DialogContentScrollableExampleDialog
} from './dialog-scrollable/dialog-content-scrollable-example.component';
import {
  DialogContentSmallExample,
  DialogContentSmallExampleDialog
} from './dialog-small/dialog-content-small-example.component';
import {
  DialogContentWithoutFooterExample,
  DialogContentWithoutFooterExampleDialog
} from './dialog-without-footer/dialog-content-without-footer-example.component';

const DIALOG_DIRECTIVES = [
  DialogFormExampleDialog,
  DialogFormExample,
  DialogContentScrollableExample,
  DialogContentScrollableExampleDialog,
  DialogContentMediumExampleDialog,
  DialogContentMediumExample,
  DialogContentSmallExample,
  DialogContentSmallExampleDialog,
  DialogContentWithoutFooterExampleDialog,
  DialogContentWithoutFooterExample
];

@NgModule({
  imports: [BaoDialogModule, BaoButtonModule, FormsModule],
  declarations: DIALOG_DIRECTIVES,
  exports: DIALOG_DIRECTIVES,
  providers: []
})
export class BaoDialogModuleTest {}
