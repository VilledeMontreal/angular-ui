/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoRadioButtonComponent,
  BaoRadioModule,
  BaoCommonComponentsModule,
  BaoButtonModule,
  BaoListSummary,
  BaoListSummaryItem
} from 'angular-ui';
import { BaoRadioExampleComponent } from 'projects/storybook-angular-examples/src/app/radio/form/radio-example.component';
import { BaoRadioReactiveFormExampleComponent } from 'projects/storybook-angular-examples/src/app/radio/reactiveForm/radio-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export default {
  title: 'Components/Radio',
  decorators: [
    moduleMetadata({
      declarations: [
        BaoRadioExampleComponent,
        BaoRadioReactiveFormExampleComponent,
        BaoListSummary,
        BaoListSummaryItem
      ],
      imports: [
        BaoRadioModule,
        BaoCommonComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        BaoButtonModule
      ]
    })
  ],
  component: BaoRadioButtonComponent,
  argTypes: {}
} as Meta;

const Template: Story<BaoRadioButtonComponent & { label: string }> = (
  args: BaoRadioButtonComponent
) => ({
  component: BaoRadioButtonComponent,
  template: `
  <bao-radio-button id="ID1" name="name" value="example1">
    {{label}}
  </bao-radio-button>
 `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  label: 'Label'
};

export const RadioSimple: Story = args => ({
  props: args,
  template: `
  <bao-radio-button-group id="RadioSimple" name="RadioSimple">
    <legend required="true" bao-label>Radio button avec texte d'assistance</legend>
    <bao-radio-button id="ID012" name="name0" value="example1" inline="true">
      Label
    </bao-radio-button>
    <bao-radio-button id="ID022" name="name0" checked="true" value="example2" inline="true">
      Label (checked)
    </bao-radio-button>
    <bao-radio-button id="ID032" name="name0" disabled="true" value="example3" inline="true">
      Label (disabled)
    </bao-radio-button>
    <bao-guiding-text>Texte d'assistance pour le groupe</bao-guiding-text>
  </bao-radio-button-group>
  `
});
RadioSimple.storyName = 'Radio - Inline & guiding text';
RadioSimple.args = {
  ...Primary.args
};

export const RadioWithDescriptionAndBorder: Story = args => ({
  props: args,
  template: `
  <bao-radio-button-group id="RadioWithDescriptionAndBorder" name="RadioWithDescriptionAndBorder">
    <legend required="true" bao-label>Radio button avec erreur</legend>
    <bao-radio-button id="ID135678" name="name3" value="example1" brandBorder="true">
      Label
      <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
    </bao-radio-button>
    <bao-radio-button id="ID13456" name="name3" checked="true" value="example2" brandBorder="true">
      Label (checked)
      <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
    </bao-radio-button>
    <bao-radio-button id="ID13444" name="name3" disabled="true" value="example3" brandBorder="true">
      Label (disabled)
      <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
    </bao-radio-button>
  <bao-error>Erreur pour le groupe</bao-error>
  </bao-radio-button-group>
  `
});
RadioWithDescriptionAndBorder.storyName = 'Radio - Description and border';
RadioWithDescriptionAndBorder.args = {
  ...Primary.args
};

export const RadioWithDescAndHiddenLabel: Story = args => ({
  props: args,
  template: `
  <bao-radio-button-group id="RadioWithDescAndHiddenLabel" name="RadioWithDescAndHiddenLabel">
    <legend required="true" bao-label>Radio button avec l'étiquette invisible</legend>
    <bao-radio-button id="ID119" name="name144" value="example1" brandBorder="true" hiddenLabel="true">
      Label
      <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
    </bao-radio-button>
    <bao-radio-button id="ID229" name="name144" checked="true" value="example2" brandBorder="true" hiddenLabel="true">
      Label (checked)
      <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
    </bao-radio-button>
    <bao-radio-button id="ID339" name="name144" disabled="true" value="example3" brandBorder="true" hiddenLabel="true">
      Label (disabled)
      <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
    </bao-radio-button>
  </bao-radio-button-group>
  `
});
RadioWithDescAndHiddenLabel.storyName = 'Radio - Description and hidden label';
RadioWithDescAndHiddenLabel.args = {
  ...Primary.args
};

export const RadioExample: Story = args => ({
  props: args,
  template: `
    <bao-radio-button-example></bao-radio-button-example>
  `
});
RadioExample.storyName = 'Radio button - Basic example';
RadioExample.args = {
  ...Primary.args
};

export const RadioReactiveExample: Story = args => ({
  props: args,
  template: `
    <bao-radio-button-reactive-form-example></bao-radio-button-reactive-form-example>
  `
});
RadioReactiveExample.storyName = 'Radio button - Reactive form example';
RadioReactiveExample.args = {
  ...Primary.args
};

export const RadioWithDescAndActionButton: Story = args => ({
  props: args,
  template: `
    <bao-radio-button-group id="RadioWithDescAndHiddenLabel" name="RadioWithDescAndHiddenLabel" >
      <bao-radio-button id="ID200" name="name200" value="example1" horizontalBorder="true" >
      <bao-label>Radio button avec action button</bao-label>
      <bao-radio-action-button>
        <button
          bao-button
          size="medium" 
          level="tertiary" 
          displayType="utility" 
          type="button"
          (click)="onButtonClick($event)"
          class="bao-radio-btn-icon"
        >
          <bao-icon title="Modifier" svgIcon="icon-edit" boa-action-btn-icon></bao-icon>
        </button>
        <button
          bao-button
          size="medium" 
          level="tertiary" 
          displayType="utility" 
          type="button"
          (click)="onButtonClick($event)"
          class="bao-radio-btn-txt"
        >
          <span>Modifier</span>
        </button>
        </bao-radio-action-button>
        <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
        </bao-radio-button>
        <bao-radio-button id="ID201" name="name200" value="example1" horizontalBorder="true" >
        <bao-label >Radio button avec action button</bao-label>
        <bao-radio-action-button>
            <button
              bao-button
              size="medium" 
              level="tertiary" 
              displayType="utility" 
              type="button"
              (click)="onButtonClick($event)"
              class="bao-radio-btn-icon"
            >
              <bao-icon title="Modifier" svgIcon="icon-edit" boa-action-btn-icon></bao-icon>
            </button>
            <button
              bao-button
              size="medium" 
              level="tertiary" 
              displayType="utility" 
              type="button"
              (click)="onButtonClick($event)"
              class="bao-radio-btn-txt"
            >
              <span>Modifier</span>
            </button>
          </bao-radio-action-button>
        <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
        </bao-radio-button>
  </bao-radio-button-group>
  `
});
RadioWithDescAndActionButton.storyName =
  'Radio button - responsive mode width Action button ';
RadioWithDescAndActionButton.args = {
  ...Primary.args
};

export const RadioWithDescAndActionButtonCompact: Story = args => ({
  props: args,
  template: `
    <bao-radio-button-group id="RadioWithDescAndHiddenLabel" name="RadioWithDescAndHiddenLabel" >
      <bao-radio-button id="ID203" name="name203" value="example1" horizontalBorder="true" displayMode="compact" >
      <bao-label>Radio button avec action button</bao-label>
      <bao-radio-action-button>
        <button
          bao-button
          size="medium" 
          level="tertiary" 
          displayType="utility" 
          type="button"
          (click)="onButtonClick($event)"
          class="bao-radio-btn-icon"
        >
          <bao-icon title="Modifier" svgIcon="icon-edit" boa-action-btn-icon></bao-icon>
        </button>
        <button
          bao-button
          size="medium" 
          level="tertiary" 
          displayType="utility" 
          type="button"
          (click)="onButtonClick($event)"
          class="bao-radio-btn-txt"
        >
          <span>Modifier</span>
        </button>
        </bao-radio-action-button>
        <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
        </bao-radio-button>
        <bao-radio-button id="ID204" name="name203" value="example1" horizontalBorder="true"  displayMode="compact" >
        <bao-label >Radio button avec action button</bao-label>
        <bao-radio-action-button>
            <button
              bao-button
              size="medium" 
              level="tertiary" 
              displayType="utility" 
              type="button"
              (click)="onButtonClick($event)"
              class="bao-radio-btn-icon"
            >
              <bao-icon title="Modifier" svgIcon="icon-edit" boa-action-btn-icon></bao-icon>
            </button>
            <button
              bao-button
              size="medium" 
              level="tertiary" 
              displayType="utility" 
              type="button"
              (click)="onButtonClick($event)"
              class="bao-radio-btn-txt"
            >
              <span>Modifier</span>
            </button>
          </bao-radio-action-button>
        <bao-radio-button-description>Est est et dolores dolore sed justo ipsum et sit.</bao-radio-button-description>
        <bao-list-summary>
          <bao-list-summary-item>item 1</bao-list-summary-item>
          <bao-list-summary-item>item 2</bao-list-summary-item>
          <bao-list-summary-item>item 3</bao-list-summary-item>
          <bao-list-summary-item>item 4</bao-list-summary-item>
       </bao-list-summary>
        </bao-radio-button>
  </bao-radio-button-group>
  `
});
RadioWithDescAndActionButtonCompact.storyName =
  'Radio button - compact mode width Action button ';
RadioWithDescAndActionButtonCompact.args = {
  ...Primary.args
};
