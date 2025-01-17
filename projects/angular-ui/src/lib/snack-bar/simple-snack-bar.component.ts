/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { ICONS_DCT } from '../icon/icons-dictionary';
import {
  BaoSnackBarToastTypeEnum,
  BAO_SNACK_BAR_DATA
} from './snack-bar-config';
import { BaoSnackBarRef } from './snack-bar-ref';

const toastTypeToAttributes = {
  info: {
    toast: 'snackbar-info',
    icon: 'icon-info',
    iconTitle: 'Information',
    politeness: 'assertive'
  },
  success: {
    toast: 'snackbar-success',
    icon: 'icon-check-circle',
    iconTitle: 'Succès',
    politeness: 'polite'
  },
  danger: {
    toast: 'snackbar-danger',
    icon: 'icon-error',
    iconTitle: 'Erreur',
    politeness: 'assertive'
  }
};

/**
 * Interface for a simple snack bar component that has a message and a single action.
 */
export interface ITextOnlySnackBar {
  data: {
    message: string;
    toastType: BaoSnackBarToastTypeEnum;
    actionLabelOrIcon: string;
    showClose: boolean;
  };
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
  public showCloseTitle = 'Fermer le message';

  /** Data that was injected into the snack bar. */
  public data: {
    message: string;
    toastType: BaoSnackBarToastTypeEnum;
    actionLabelOrIcon: string;
    showClose: boolean;
  };

  constructor(
    public snackBarRef: BaoSnackBarRef<BaoSimpleSnackBarComponent>,
    @Inject(BAO_SNACK_BAR_DATA) data: any
  ) {
    this.data = data;
  }

  /** Returns the politeness */
  get politeness(): string {
    return (
      toastTypeToAttributes[this.data.toastType]?.politeness ||
      toastTypeToAttributes['info'].politeness
    );
  }

  /** Returns the toast class */
  get toastType(): string {
    return (
      toastTypeToAttributes[this.data.toastType]?.toast ||
      toastTypeToAttributes['info'].toast
    );
  }

  /** Returns the toast icon */
  get toastIcon(): string {
    return (
      toastTypeToAttributes[this.data.toastType]?.icon ||
      toastTypeToAttributes['info'].icon
    );
  }

  /** Returns the toast icon title */
  get toastIconTitle(): string {
    return (
      toastTypeToAttributes[this.data.toastType]?.iconTitle ||
      toastTypeToAttributes['info'].iconTitle
    );
  }

  /** If the action button should be shown. */
  get hasAction(): boolean {
    return !!this.data.actionLabelOrIcon;
  }

  /** If the action is an icon */
  get isActionIcon(): boolean {
    return !!ICONS_DCT[this.data.actionLabelOrIcon];
  }

  /** Performs the action on the snack bar. */
  public action(): void {
    this.snackBarRef.dismissWithAction();
  }

  /** Closes the snack bar. */
  public close(): void {
    this.snackBarRef.dismiss();
  }
}
