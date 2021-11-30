import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaoButtonModule } from '../button';
import { BaoCommonComponentsModule } from '../common-components/module';
import { BaoRadioExampleComponent } from './examples/formModule/radio-example.component';
import { BaoRadioReactiveFormExampleComponent } from './examples/reactiveForm/radio-example.component';
import { BaoRadioButtonGroupComponent } from './radio-group.component';
import { BaoRadioButtonComponent, BaoRadioDescription } from './radio.component';

const RADIO_DIRECTIVES = [
  BaoRadioButtonComponent,
  BaoRadioDescription,
  BaoRadioExampleComponent,
  BaoRadioReactiveFormExampleComponent,
  BaoRadioButtonGroupComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaoCommonComponentsModule,
    BaoButtonModule,
    ObserversModule
  ],
  declarations: RADIO_DIRECTIVES,
  exports: RADIO_DIRECTIVES
})
export class BaoRadioModule {}
