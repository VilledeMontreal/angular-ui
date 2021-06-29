import { Component, Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

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
  host: { class: 'bao-alert-title' }
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
  host: { class: 'bao-alert-content' }
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
    class: 'bao-alert-actions'
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
  // tslint:disable-next-line: directive-selector
  selector: 'bao-alert-link',
  host: {
    class: 'bao-alert-link'
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
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-alert bao-alert-with-icon bao-alert-dismissible fade show',
    '[class.bao-alert-success]': 'type === "success"',
    '[class.bao-alert-danger]': 'type === "danger"',
    '[class.bao-alert-warning]': 'type === "warning"',
    '[class.bao-alert-info]': 'type === "info"',
    role: 'alert'
  }
})
export class BaoAlertComponent implements OnChanges {
  @Input() public type: '' | 'success' | 'danger' | 'warning' | 'info' = '';
  @Input() public title: string;
  @Input() public dismissible = false;
  @Input() public showIcon = true;
  @Output() public dismissed = new EventEmitter();
  public iconType = 'icon-info';
  public iconTitle = 'Information';

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.iconType = this.alertTypeIcon(changes.type.currentValue);
      this.iconTitle = this.alertTitleIcon(changes.type.currentValue);
    }
  }

  public alertTypeIcon(value: string): any {
    const typesAlertIcon = {
      success: 'icon-check-circle',
      danger: 'icon-error',
      warning: 'icon-warning',
      default: 'icon-info'
    };
    return typesAlertIcon[value] || typesAlertIcon.default;
  }
  public alertTitleIcon(value: string): any {
    const titleIcon = {
      success: 'Succès',
      danger: 'Erreur',
      warning: 'Attention',
      default: 'Information'
    };
    return titleIcon[value] || titleIcon.default;
  }

  public onDismissClicked() {
    this.dismissed.emit();
  }
}
