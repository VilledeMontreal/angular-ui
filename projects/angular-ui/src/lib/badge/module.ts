import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoBadgeComponent } from './badge.component';

const BADGE_DIRECTIVES = [BaoBadgeComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [BADGE_DIRECTIVES],
  exports: [BADGE_DIRECTIVES]
})
export class BaoBadgeModule {}
