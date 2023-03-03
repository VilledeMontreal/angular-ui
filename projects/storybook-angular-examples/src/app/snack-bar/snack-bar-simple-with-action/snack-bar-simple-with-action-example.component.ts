/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';
import {
  BaoSnackBarService,
  BaoSnackBarToastTypeEnum
} from 'projects/angular-ui/src/public-api';

/**
 * @title Opens a snackbar with a message and an action. The action dismisses the snackbar.
 */
@Component({
  selector: 'snack-bar-simple-with-action-example',
  templateUrl: 'snack-bar-simple-with-action-example.html'
})
export class SnackBarSimpleWithActionExample {
  constructor(public snackBarService: BaoSnackBarService) {}

  public openActionText() {
    const snackBarRef = this.snackBarService.open({
      message: 'Action with text',
      actionLabelOrIcon: 'Refresh'
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('Refresh with text');
    });
  }

  public openActionIcon() {
    const snackBarRef = this.snackBarService.open({
      message: 'Action with Icon',
      actionLabelOrIcon: 'icon-refresh'
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('Refresh with icon');
    });
  }

  public openActionAndClose() {
    const snackBarRef = this.snackBarService.open({
      message: 'Action and close',
      actionLabelOrIcon: 'icon-refresh',
      showClose: true
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('Retry with icon');
    });
  }

  public openNoActionButClose() {
    this.snackBarService.open({
      message: 'No action but close',
      showClose: true
    });
  }
}
