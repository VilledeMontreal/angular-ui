/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * To modify the labels and text displayed, create a new instance of BaoFileIntl and
 * include it in a custom provider
 */
@Injectable({ providedIn: 'root' })
export class BaoFileIntl {
  /**
   * Stream to emit from when labels are changed. Use this to notify components when the labels have
   * changed after initialization.
   */
  readonly changes: Subject<void> = new Subject<void>();

  /** The label for button in dropzone */
  dropzoneButtonLabel = 'Parcourir';

  /** The default dropzone instructions */
  defaultDropzoneInstructions = 'ou déposer votre fichier ici';

  /** Error message displayed when uploaded file is too large */
  fileTooBigErrorMessage = 'La taille de ce fichier est trop grande';

  /** Error message displayed when uploaded file has an invalid type */
  invalidFileTypeErrorMessage = "Ce format de fichier n'est pas autorisé";
}

@Injectable()
export class BaoFileIntlEnglish extends BaoFileIntl {
  /** The label for button in dropzone */
  dropzoneButtonLabel = 'Browse';

  /** The default dropzone instructions */
  defaultDropzoneInstructions = 'or drop your file here';

  /** Error message displayed when uploaded file is too large */
  fileTooBigErrorMessage = 'The size of this file is too large';

  /** Error message displayed when uploaded file has an invalid type */
  invalidFileTypeErrorMessage = 'The format of this file is unauthorized';
}

/** @docs-private */
export function BAO_FILE_INTL_PROVIDER_FACTORY(parentIntl: BaoFileIntl) {
  return parentIntl || new BaoFileIntl();
}

/** @docs-private */
export const BAO_FILE_INTL_PROVIDER = {
  // If there is already an BaoFileIntl available, use that. Otherwise, provide a new one.
  provide: BaoFileIntl,
  deps: [[new Optional(), new SkipSelf(), BaoFileIntl]],
  useFactory: BAO_FILE_INTL_PROVIDER_FACTORY
};
