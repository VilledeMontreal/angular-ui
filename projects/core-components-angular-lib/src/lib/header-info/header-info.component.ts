// tslint:disable: directive-selector
import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation } from '@angular/core';

/**
 * A basic content container component that adds the styles of a BAO header-info
 *
 * While this component can be used alone, it also provides a number
 * of preset styles for common header-info sections, including:
 * - bao-header-info-title-group
 * - bao-header-info-content
 * - bao-header-info-title
 * - bao-header-info-surtitle
 * - bao-header-info-subtitle
 */
@Component({
  selector: 'bao-header-info',
  templateUrl: 'header-info.html',
  styleUrls: ['header-info.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'document-heading document-heading-fullwidth',
    '[class.document-heading-left-notch]': 'notch === "left"',
    '[class.document-heading-sm]': 'size === "small"',
    '[class.document-heading-xl]': 'size === "large"'
  }
})
export class BaoHeaderInfoComponent {
  @Input() public notch: '' | 'left' | 'center' = '';
  @Input() public size: '' | 'small' | 'large' = '';
  @Input() public imageUrl: string = '';
  @Input() public brandBorder: boolean = false;
}

@Component({
  selector: 'bao-header-info-title-group',
  templateUrl: 'header-info-title-group.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-header-info-title-group pb-2'
  }
})
export class BaoHeaderInfoTitleGroupComponent {}

@Directive({
  selector: 'bao-header-info-content',
  host: {
    class: 'bao-header-info-content pb-4'
  }
})
export class BaoHeaderInfoContent {}

@Directive({
  selector: 'bao-header-info-surtitle, [bao-header-info-surtitle], [baoHeaderInfoSurtitle]',
  host: {
    class: 'document-heading-surtitle'
  }
})
export class BaoHeaderInfoSurtitle {}

@Directive({
  selector: 'bao-header-info-subtitle, [bao-header-info-subtitle], [baoHeaderInfoSubtitle]',
  host: {
    class: 'document-heading-subtitle'
  }
})
export class BaoHeaderInfoSubtitle {}

@Directive({
  selector: 'bao-header-info-title, [bao-header-info-title], [baoHeaderInfoTitle]',
  host: {
    class: 'h1'
  }
})
export class BaoHeaderInfoTitle {}
