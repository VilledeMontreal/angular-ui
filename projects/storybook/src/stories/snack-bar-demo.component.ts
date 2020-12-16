import { Component, Inject } from '@angular/core';
import { BaoSnackBarService } from 'core-components-angular-lib';

@Component({
  selector: 'app-snack-bar',
  template: `
    <button (click)="doStuff()">Click here!</button>
  `
})
export class SnackBarDemoComponent {
  constructor(@Inject(BaoSnackBarService) private baoSnackBarService: BaoSnackBarService) {}

  public doStuff() {
    this.baoSnackBarService.open('Bonjour collegue!', 'close', '', {
      duration: 2000
    });
  }
}
