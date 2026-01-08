/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Component } from '@angular/core';
import { BaoSnackBarService } from 'projects/angular-ui/src/public-api';

/**
 * @title Opens a snackbar with extra configuration.
 */
@Component({
  selector: 'snack-bar-simple-with-config-example',
  templateUrl: 'snack-bar-simple-with-config-example.html'
})
export class SnackBarSimpleWithConfigExample {
  constructor(public snackBarService: BaoSnackBarService) {}

  public openCenterDisplay() {
    this.snackBarService.open({
      message: 'Center display',
      showClose: true,
      horizontalPosition: 'center'
    });
  }

  public openRightDisplay() {
    this.snackBarService.open({
      message: 'Right display',
      showClose: true,
      horizontalPosition: 'right'
    });
  }

  public open10sDuration() {
    this.snackBarService.open({
      message: '10s duration',
      duration: 10000
    });
  }
}
