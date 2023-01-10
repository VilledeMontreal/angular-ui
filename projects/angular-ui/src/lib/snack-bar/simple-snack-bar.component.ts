/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { BAO_SNACK_BAR_DATA } from './snack-bar-config';
import { BaoSnackBarRef } from './snack-bar-ref';

/**
 * Interface for a simple snack bar component that has a message and a single action.
 */
export interface ITextOnlySnackBar {
  data: { message: string; action: string };
  snackBarRef: BaoSnackBarRef<ITextOnlySnackBar>;
  action: () => void;
  hasAction: boolean;
}

/**
 * A component used to open as the default snack bar, matching material spec.
 * This should only be used internally by the snack bar service.
 */
@Component({
  selector: 'bao-simple-snack-bar',
  templateUrl: 'simple-snack-bar.component.html',
  styleUrls: ['simple-snack-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mat-simple-snackbar'
  }
})
export class BaoSimpleSnackBarComponent implements ITextOnlySnackBar {
  /** Data that was injected into the snack bar. */
  public data: { message: string; action: string };

  constructor(
    public snackBarRef: BaoSnackBarRef<BaoSimpleSnackBarComponent>,
    @Inject(BAO_SNACK_BAR_DATA) data: any
  ) {
    this.data = data;
  }

  /** If the action button should be shown. */
  get hasAction(): boolean {
    return !!this.data.action;
  }

  /** Performs the action on the snack bar. */
  public action(): void {
    this.snackBarRef.dismissWithAction();
  }
}
