import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoIconComponent } from './icon.component';

const ICON_DIRECTIVES = [BaoIconComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...ICON_DIRECTIVES],
  exports: [ICON_DIRECTIVES]
})
export class BaoIconModule {}
