import { Component, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * Content of an alert, intended for use within `<bao-alert>`. This component is an optional
 * convenience for use with other convenience elements, such as `<bao-alert-title>`; any custom
 * content block element may be used in its place.
 *
 * BaoAlertContent provides no behaviors, instead serving as a purely visual treatment.
 */

/**
 * Title of an alert, intended for use within `<bao-alert>`. This component is an optional
 * convenience for one variety of alert title; any custom title element may be used in its place.
 *
 * BaoAlertTitle provides no behaviors, instead serving as a purely visual treatment.
 */
@Directive({
  selector: 'bao-alert-title',
  host: { class: 'alert-heading' }
})
export class BaoAlertTitle {}

/**
 * Content of an alert, intended for use within `<bao-alert>`. This component is an optional
 * convenience for use with other convenience elements, such as `<bao-alert-title>`; any custom
 * content block element may be used in its place.
 *
 * BaoAlertContent provides no behaviors, instead serving as a purely visual treatment.
 */
@Directive({
  selector: 'bao-alert-content',
  host: { class: 'bao-alert-content d-block' }
})
export class BaoAlertContent {}

/**
 * Bottom area of an alert that contains action buttons, intended for use within `<bao-alert>`.
 * This component is an optional convenience for use with other convenience elements, such as
 * `<bao-alert-content>`; any custom action block element may be used in its place.
 *
 * BaoAlertActions provides no behaviors, instead serving as a purely visual treatment.
 */
@Directive({
  selector: 'bao-alert-actions',
  exportAs: 'baoAlertActions',
  host: {
    class: 'alert-actions'
  }
})
export class BaoAlertActions {}

/**
 * Link inside an alert message, intended for use within `<bao-alert>`.
 * This component is an optional convenience for use with other convenience elements, such as
 * `<bao-alert-content>`; any custom action block element may be used in its place.
 *
 * BaoAlertLink provides no behaviors, instead serving as a purely visual treatment.
 */
@Directive({
  selector: 'bao-alert-link',
  host: {
    class: 'alert-link'
  }
})
export class BaoAlertLink {}

/**
 * BAO alert component. Alerts should be used when the message concerns an
 * external subject or a part of the page
 *
 * See https://zeroheight.com/575tugn0n/p/03c51f-messages-dalerte/t/80b47c
 *
 * BaoAlertComponent provides no behaviors, instead serving as a purely visual treatment.
 */
@Component({
  selector: 'bao-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  host: {
    class: 'alert alert-with-icon alert-dismissible fade show',
    '[class.alert-success]': 'type === "success"',
    '[class.alert-danger]': 'type === "danger"',
    '[class.alert-warning]': 'type === "warning"',
    '[class.alert-info]': 'type === "info"',
    role: 'alert"'
  }
})
export class BaoAlertComponent implements OnChanges {
  @Input() public type: '' | 'success' | 'danger' | 'warning' | 'info' = '';
  @Input() public title: string;
  @Input() public dismissible = false;
  @Input() public showIcon = false;
  public iconClass = 'icon icon-info';

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.iconClass = this.alertTypeToAlertIcon(changes.type.currentValue);
    }
  }

  public alertTypeToAlertIcon(value: string): any {
    const prefix = 'icon';
    const typesToSuffixes = {
      success: 'icon-check-circle',
      danger: 'icon-error',
      warning: 'icon-warning',
      default: 'icon-info'
    };
    const suffix = typesToSuffixes[value] || typesToSuffixes.default;
    return `${prefix} ${suffix}`;
  }
}
