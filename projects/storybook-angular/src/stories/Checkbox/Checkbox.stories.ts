/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular';
import {
  BaoCheckboxComponent,
  BaoCheckboxModule,
  BaoCommonComponentsModule
} from 'angular-ui';
import { BaoCheckboxExampleComponent } from 'projects/storybook-angular/src/app/checkbox/form/checkbox-example.component';
import { BaoCheckboxReactiveFormExampleComponent } from 'projects/storybook-angular/src/app/checkbox/reactiveForm/checkbox-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const description = `
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Case à cocher](https://zeroheight.com/575tugn0n/p/99cd94)".
`;

export default {
  title: 'Components/Checkbox',
  decorators: [
    moduleMetadata({
      declarations: [
        BaoCheckboxExampleComponent,
        BaoCheckboxReactiveFormExampleComponent
      ],
      imports: [
        BaoCheckboxModule,
        BaoCommonComponentsModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: BaoCheckboxComponent,
  argTypes: {}
} as Meta;

const Template: Story<BaoCheckboxComponent & { label: string }> = (
  args: BaoCheckboxComponent
) => ({
  component: BaoCheckboxComponent,
  template: `
  <bao-checkbox id="ID1" name="name"
  [disabled]="disabled"
  [checked]="checked"
  [hiddenLabel]="hiddenLabel"
  [indeterminate]="indeterminate"
  [inline]="inline"
  [required]="required"
  >
    {{label}}
  </bao-checkbox>
 `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  label: 'Label'
};

export const CheckboxSimple: Story = args => ({
  props: args,
  template: `
  <bao-checkbox-group>
    <legend required="true" bao-label>Liste d'options</legend>
    <bao-checkbox id="ID11111222" name="name">
      Label
    </bao-checkbox>
    <bao-checkbox id="ID22222211" name="name2" [checked]="true">
      Label (checked)
    </bao-checkbox>
    <bao-checkbox id="ID33333222" name="name3" [indeterminate]="true">
      Label (indeterminate)
    </bao-checkbox>
    <bao-checkbox id="ID4444443333" name="name4" [disabled]="true">
      Label (disabled)
    </bao-checkbox>
  </bao-checkbox-group>
  `
});
CheckboxSimple.storyName = 'Checkbox - Simple';
CheckboxSimple.args = {
  ...Primary.args
};

export const InlineCheckboxWithGuidingText: Story = args => ({
  props: args,
  template: `
  <bao-checkbox-group>
    <legend required="true" bao-label>Liste d'options avec texte d'assistance</legend>
    <bao-checkbox id="ID121121" name="name11210" inline="true">
      Label
    </bao-checkbox>
    <bao-checkbox id="ID2222221" name="name2222" checked="true" inline="true">
      Label (checked)
    </bao-checkbox>
    <bao-checkbox id="ID312121" name="name313" indeterminate="true" inline="true">
      Label (indeterminate)
    </bao-checkbox>
    <bao-checkbox id="ID433334" name="name4314" disabled="true" inline="true">
      Label (disabled)
    </bao-checkbox>
    <bao-guiding-text>Texte d'assistance pour le groupe</bao-guiding-text>
  </bao-checkbox-group>
  `
});
InlineCheckboxWithGuidingText.storyName = 'Inline checkbox with guiding text';
InlineCheckboxWithGuidingText.args = {
  ...Primary.args
};

export const CheckboxDescriptionError: Story = args => ({
  props: args,
  template: `
  <bao-checkbox-group>
    <legend required="true" bao-label>Liste d'options avec erreur</legend>
    <bao-checkbox id="ID1111111111" name="name11111" brandBorder="true">
      Label
      <bao-checkbox-description>Est est et dolores dolore sed justo ipsum et sit.</bao-checkbox-description>
    </bao-checkbox>
    <bao-checkbox id="ID2222222" name="name2222" brandBorder="true" checked="true">
      Label (checked)
      <bao-checkbox-description>Est est et dolores dolore sed justo ipsum et sit.</bao-checkbox-description>
    </bao-checkbox>
    <bao-checkbox id="ID3333333" name="name3333" brandBorder="true" indeterminate="true">
      Label (indeterminate)
      <bao-checkbox-description>Est est et dolores dolore sed justo ipsum et sit.</bao-checkbox-description>
    </bao-checkbox>
    <bao-checkbox id="ID44444444" name="name44444" brandBorder="true" disabled="true">
      Label (disabled)
      <bao-checkbox-description>Est est et dolores dolore sed justo ipsum et sit.</bao-checkbox-description>
    </bao-checkbox>
    <bao-error>Erreur pour le groupe</bao-error>
  </bao-checkbox-group>
  `
});
CheckboxDescriptionError.storyName = 'Checkbox - Description & error';
CheckboxDescriptionError.args = {
  ...Primary.args
};

export const CheckboxDescriptionHiddenLabel: Story = args => ({
  props: args,
  template: `
  <bao-checkbox-group>
    <legend required="true" bao-label>Liste d'options avec l'étiquette invisble</legend>
    <bao-checkbox id="ID11" name="name1" brandBorder="true" hiddenLabel="true">
      Label
      <bao-checkbox-description>Est est et dolores dolore sed justo ipsum et sit.</bao-checkbox-description>
    </bao-checkbox>
    <bao-checkbox id="ID22" name="name2" brandBorder="true" checked="true" hiddenLabel="true">
      Label (checked)
      <bao-checkbox-description>Est est et dolores dolore sed justo ipsum et sit.</bao-checkbox-description>
    </bao-checkbox>
    <bao-checkbox id="ID33" name="name3" brandBorder="true" indeterminate="true" hiddenLabel="true">
      Label (indeterminate)
      <bao-checkbox-description>Est est et dolores dolore sed justo ipsum et sit.</bao-checkbox-description>
    </bao-checkbox>
    <bao-checkbox id="ID44" name="name4" brandBorder="true" disabled="true" hiddenLabel="true">
      Label (disabled)
      <bao-checkbox-description>Est est et dolores dolore sed justo ipsum et sit.</bao-checkbox-description>
    </bao-checkbox>
  </bao-checkbox-group>
  `
});
CheckboxDescriptionHiddenLabel.storyName =
  'Checkbox - Description & hidden label';
CheckboxDescriptionHiddenLabel.args = {
  ...Primary.args
};

export const CheckboxExample: Story = args => ({
  props: args,
  template: `
    <bao-checkbox-example></bao-checkbox-example>
  `
});
CheckboxExample.storyName = 'Basic example';
CheckboxExample.args = {
  ...Primary.args
};

export const CheckboxReactiveExample: Story = args => ({
  props: args,
  template: `
    <bao-checkbox-reactive-form-example></bao-checkbox-reactive-form-example>
  `
});
CheckboxReactiveExample.storyName = 'Checkbox - Reactive form example';
CheckboxReactiveExample.args = {
  ...Primary.args
};
