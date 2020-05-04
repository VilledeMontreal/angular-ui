import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alertTypeToAlertClass'
})
export class AlertTypeToAlertClassPipe implements PipeTransform {

  transform(value: string): any {
    const prefix = 'alert alert-dismissible fade show';
    let suffix = '';
    switch (value) {
      case 'success':
        suffix = 'alert-success';
        break;
      case 'danger':
        suffix = 'alert-danger';
        break;
      case 'warning':
        suffix = 'alert-warning';
        break;
      case 'info':
        suffix = 'alert-info';
        break;
      default:
        suffix = '';
    }
    return `${prefix} ${suffix}`
  }

}
