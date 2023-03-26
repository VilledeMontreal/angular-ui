/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';
import { BaoSnackBarService } from 'projects/angular-ui/src/public-api';

/**
 * @title Opens a snackbar with a message that expires after 5s.
 */
@Component({
  selector: 'snack-bar-simple-example',
  templateUrl: 'snack-bar-simple-example.html'
})
export class SnackBarSimpleExample {
  constructor(public snackBarService: BaoSnackBarService) {}

  public openInfo() {
    this.snackBarService.open({
      message: 'This snack bar will disappear in 5s.'
    });
  }

  public openSuccess() {
    this.snackBarService.open({
      message: 'This snack bar will disappear in 5s.',
      toastType: 'success'
    });
  }

  public openDanger() {
    this.snackBarService.open({
      message: 'This snack bar will disappear in 5s.',
      toastType: 'danger'
    });
  }
}
