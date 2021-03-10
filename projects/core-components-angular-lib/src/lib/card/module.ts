import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoCardBody,
  BaoCardComponent,
  BaoCardIconComponent,
  BaoCardIconTop,
  BaoCardTextInterface,
  BaoCardTitle
} from './card.component';

const CARD_DIRECTIVES = [
  BaoCardComponent,
  BaoCardIconComponent,
  BaoCardBody,
  BaoCardIconTop,
  BaoCardTextInterface,
  BaoCardTitle
];

@NgModule({
  imports: [CommonModule],
  declarations: [CARD_DIRECTIVES],
  exports: [CARD_DIRECTIVES]
})
export class BaoCardModule {}
