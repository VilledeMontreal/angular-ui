/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

/**
 * Animations used by the Material snack bar.
 * @docs-private
 */
export const matSnackBarAnimations: {
  readonly snackBarState: AnimationTriggerMetadata;
} = {
  /** Animation that shows and hides a snack bar. */
  snackBarState: trigger('state', [
    state(
      'void, hidden',
      style({
        transform: 'scale(0.8)',
        opacity: 0
      })
    ),
    state(
      'visible',
      style({
        transform: 'scale(1)',
        opacity: 1
      })
    ),
    transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
    transition(
      '* => void, * => hidden',
      animate(
        '75ms cubic-bezier(0.4, 0.0, 1, 1)',
        style({
          opacity: 0
        })
      )
    )
  ])
};
