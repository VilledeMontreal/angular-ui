/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  ViewEncapsulation
} from '@angular/core';

/**
 * A basic content container component that adds the styles of a BAO design card.
 *
 * While this component can be used alone, it also provides a number
 * of preset styles for common card sections, including:
 * * bao-card-body
 * * bao-card-title
 * * bao-card-bao-text-interface
 * * More to come!
 */
@Component({
  standalone: false,
  selector: 'bao-card, [bao-card], [baoCard]',
  templateUrl: 'card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-card',
    '[class.bao-card-large-padding]': 'padding === "large"'
  }
})
export class BaoCardComponent {
  @Input()
  public padding: 'normal' | 'large' = 'normal';
}

/**
 * Header of a card, needed as it's used as a selector in the API.
 */
@Directive({
  standalone: false,
  selector: 'bao-card-header, [bao-card-header], [baoCardHeader]',
  host: { class: 'bao-card-header' }
})
export class BaoCardHeader {}

/**
 * Body of a card, needed as it's used as a selector in the API.
 */
@Directive({
  standalone: false,
  selector: 'bao-card-content, [bao-card-content], [baoCardContent]',
  host: { class: 'bao-card-content' }
})
export class BaoCardContent {}

/**
 * Title of a card, needed as it's used as a selector in the API.
 */
@Directive({
  standalone: false,
  selector: `bao-card-title, [bao-card-title], [baoCardTitle]`,
  host: {
    class: 'bao-card-title'
  }
})
export class BaoCardTitle {}

/**
 * Text of a card, needed as it's used as a selector in the API.
 */
@Directive({
  standalone: false,
  selector: `bao-card-text-interface, [bao-card-text-interface], [baoCardTextInterface]`,
  host: {
    class: 'bao-card-text-interface'
  }
})
export class BaoCardTextInterface {}
