import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alertTypeToAlertIconClass'
})
export class AlertTypeToAlertIconClassPipe implements PipeTransform {

  transform(value: string): any {
    const prefix = 'icon';
    let suffix = '';
    switch (value) {
      case 'success':
        suffix = 'icon-check-circle';
        break;
      case 'danger':
        suffix = 'icon-error';
        break;
      case 'warning':
        suffix = 'icon-warning';
        break;
      default:
        suffix = 'icon-info';
    }
    return `${prefix} ${suffix}`;
  }

}
