import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bao-guiding-text, [bao-guiding-text]',
  template: '<div class="bao-guiding-text"><ng-content></ng-content></div>',
  styleUrls: ['./guidingText.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaoGuidingTextComponent {}
