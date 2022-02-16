import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  BaoList,
  BaoListItem,
  BaoListItemDescription,
  BaoListItemTitle,
  BaoNavList
} from './list.component';

const DIRECTIVES = [
  BaoListItem,
  BaoList,
  BaoNavList,
  BaoListItemDescription,
  BaoListItemTitle
];

@NgModule({
  imports: [CommonModule],
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class BaoListModule {}
