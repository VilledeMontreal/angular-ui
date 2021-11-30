import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bao-error, [bao-error]',
  template: '<div class="bao-error"><ng-content></ng-content></div>',
  styleUrls: ['./errorText.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaoErrorTextComponent {}
