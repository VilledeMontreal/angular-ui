import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaoCommonComponentsModule } from '../common-components/module';
import { BaoCheckboxGroupComponent } from './checkbox-group.component';
import {
  BaoCheckboxComponent,
  BaoCheckBoxDescription
} from './checkbox.component';

const CHECKBOX_DIRECTIVES = [
  BaoCheckboxComponent,
  BaoCheckboxGroupComponent,
  BaoCheckBoxDescription
];

@NgModule({
  imports: [CommonModule, BaoCommonComponentsModule, ObserversModule],
  declarations: CHECKBOX_DIRECTIVES,
  exports: CHECKBOX_DIRECTIVES
})
export class BaoCheckboxModule {}
