import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoCardComponent, BaoCardContent, BaoCardHeader, BaoCardTextInterface, BaoCardTitle } from './card.component';

const CARD_DIRECTIVES = [BaoCardComponent, BaoCardContent, BaoCardHeader, BaoCardTextInterface, BaoCardTitle];

@NgModule({
  imports: [CommonModule],
  declarations: [CARD_DIRECTIVES],
  exports: [CARD_DIRECTIVES]
})
export class BaoCardModule {}
