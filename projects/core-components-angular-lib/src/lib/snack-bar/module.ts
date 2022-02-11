import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoSimpleSnackBarComponent } from './simple-snack-bar.component';
import { BaoSnackBarService } from './snack-bar';
import { BaoSnackBarContainerComponent } from './snack-bar-container';

const SNACKBAR_DIRECTIVES = [
  BaoSimpleSnackBarComponent,
  BaoSnackBarContainerComponent
];

@NgModule({
  imports: [CommonModule, OverlayModule, PortalModule],
  providers: [BaoSnackBarService],
  declarations: SNACKBAR_DIRECTIVES,
  exports: SNACKBAR_DIRECTIVES,
  entryComponents: [SNACKBAR_DIRECTIVES]
})
export class BaoSnackBarModule {}
