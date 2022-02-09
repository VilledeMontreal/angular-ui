import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoErrorTextComponent,
  BaoGuidingTextComponent,
  BaoLegendTextComponent
} from '.';

const DIRECTIVES = [
  BaoErrorTextComponent,
  BaoLegendTextComponent,
  BaoGuidingTextComponent
];

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class BaoCommonComponentsModule {}
