// tslint:disable: directive-selector

import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation } from '@angular/core';

/**
 * A basic content container component that adds the styles of a BAO design card.
 *
 * While this component can be used alone, it also provides a number
 * of preset styles for common card sections, including:
 * - bao-card-body
 * - bao-card-title
 * - bao-card-bao-text-interface
 * - bao-card-icon-top
 * - More to come!
 */
@Component({
  selector: 'bao-card, [bao-card], [baoCard]',
  templateUrl: 'card.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card' }
})
export class BaoCardComponent {}

/**
 * A specific content container component that serves the purpose of displaying a card
 * with a icon header the way it is intended by the DVM design system.
 *
 * While this component can be used alone, it also provides a number
 * of preset styles to use in the body:
 * - bao-card-body
 * - bao-card-title
 * - bao-card-bao-text-interface
 */
@Component({
  selector: 'bao-card-icon, [bao-card-icon], [baoCardIcon]',
  templateUrl: 'card-icon.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'card card-icon' }
})
export class BaoCardIconComponent {
  @Input() public icon: string;
}

/**
 * Body of a card, needed as it's used as a selector in the API.
 */
@Directive({
  selector: 'bao-card-body, [bao-card-body], [baoCardBody]',
  host: { class: 'card-body' }
})
export class BaoCardBody {}

/**
 * Title of a card, needed as it's used as a selector in the API.
 */
@Directive({
  selector: `bao-card-title, [bao-card-title], [baoCardTitle]`,
  host: {
    class: 'card-title'
  }
})
export class BaoCardTitle {}

/**
 * Text of a card, needed as it's used as a selector in the API.
 */
@Directive({
  selector: `bao-card-text-interface, [bao-card-text-interface], [baoCardTextInterface]`,
  host: {
    class: 'card-text-interface'
  }
})
export class BaoCardTextInterface {}

/**
 * Card Icon Top, should be used in card-icon component.
 */
@Directive({
  selector: `bao-card-icon-top, [bao-card-icon-top], [baoCardIconTop]`,
  host: {
    class: 'card-icon-top'
  }
})
export class BaoCardIconTop {}
