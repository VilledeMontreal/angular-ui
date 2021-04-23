import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoButtonComponent } from './button.component';

const BUTTON_DIRECTIVES = [BaoButtonComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [BUTTON_DIRECTIVES],
  exports: [BUTTON_DIRECTIVES]
})
export class BaoButtontModule {}
