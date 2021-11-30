import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaoCommonComponentsModule } from '../common-components/module';
import { BaoCheckboxGroupComponent } from './checkbox-group.component';
import { BaoCheckboxComponent, BaoCheckBoxDescription } from './checkbox.component';
import { BaoCheckboxExampleComponent } from './examples/formModule/checkbox-example.component';
import { BaoCheckboxReactiveFormExampleComponent } from './examples/reactiveForm/checkbox-example.component';

const CHECKBOX_DIRECTIVES = [
  BaoCheckboxComponent,
  BaoCheckboxGroupComponent,
  BaoCheckBoxDescription,
  BaoCheckboxExampleComponent,
  BaoCheckboxReactiveFormExampleComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, BaoCommonComponentsModule, ObserversModule],
  declarations: CHECKBOX_DIRECTIVES,
  exports: CHECKBOX_DIRECTIVES
})
export class BaoCheckboxModule {}
