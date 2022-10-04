/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
  query,
  animateChild,
  group
} from '@angular/animations';

/**
 * Animations used by MatDialog.
 * @docs-private
 */
export const baoDialogAnimations: {
  readonly dialogContainer: AnimationTriggerMetadata;
} = {
  /** Animation that is applied on the dialog container by default. */
  dialogContainer: trigger('dialogContainer', [
    // Note: The `enter` animation transitions to `transform: none`, because for some reason
    // specifying the transform explicitly, causes IE both to blur the dialog content and
    // decimate the animation performance. Leaving it as `none` solves both issues.
    state('void, exit', style({ opacity: 0, transform: 'scale(0.7)' })),
    state('enter', style({ transform: 'none' })),
    transition(
      '* => enter',
      group([
        animate(
          '150ms cubic-bezier(0, 0, 0.2, 1)',
          style({ transform: 'none', opacity: 1 })
        ),
        query('@*', animateChild(), { optional: true })
      ])
    ),
    transition(
      '* => void, * => exit',
      group([
        animate('75ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0 })),
        query('@*', animateChild(), { optional: true })
      ])
    )
  ])
};
