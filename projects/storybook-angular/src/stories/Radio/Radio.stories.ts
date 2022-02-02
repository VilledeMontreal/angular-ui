// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BaoRadioButtonComponent, BaoRadioModule, BaoCommonComponentsModule, BaoButtonModule } from 'core-components-angular-lib';
import { BaoRadioExampleComponent } from 'projects/storybook-angular-examples/src/app/radio/form/radio-example.component';
import { BaoRadioReactiveFormExampleComponent } from 'projects/storybook-angular-examples/src/app/radio/reactiveForm/radio-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export default {
  title: 'Components/Radio',
  decorators: [
    moduleMetadata({
      declarations: [BaoRadioExampleComponent, BaoRadioReactiveFormExampleComponent],
      imports: [BaoRadioModule, BaoCommonComponentsModule, FormsModule, ReactiveFormsModule, BaoButtonModule],
    }),
  ],
  component: BaoRadioButtonComponent,
  argTypes: {},
} as Meta;

const Template: Story<BaoRadioButtonComponent & { label: string }> = (args: BaoRadioButtonComponent) => ({
  component: BaoRadioButtonComponent,
  template: `
  <bao-radio-button id="ID1" name="name" value="example1">
    {{label}}
  </bao-radio-button>
 `,
  props: args,
});

export const Primary = Template.bind({});

Primary.args = {
  label: 'Label'
};

export const RadioSimple: Story = (args) => ({
  props: args,
  template: `
  <bao-radio-button-group id="RadioSimple" name="RadioSimple">
    <bao-legend required="true">Radio button avec texte d'assistance</bao-legend>
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
  `,
});
RadioSimple.storyName = 'Radio - Inline & guiding text';
RadioSimple.args = {
  ...Primary.args
};

export const RadioWithDescriptionAndBorder: Story = (args) => ({
  props: args,
  template: `
  <bao-radio-button-group id="RadioWithDescriptionAndBorder" name="RadioWithDescriptionAndBorder">
    <bao-legend required="true">Radio button avec erreur</bao-legend>
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
  `,
});
RadioWithDescriptionAndBorder.storyName = 'Radio - Description and border';
RadioWithDescriptionAndBorder.args = {
  ...Primary.args
};

export const RadioWithDescAndHiddenLabel: Story = (args) => ({
  props: args,
  template: `
  <bao-radio-button-group id="RadioWithDescAndHiddenLabel" name="RadioWithDescAndHiddenLabel">
    <bao-legend required="true">Radio button avec l'étiquette invisble</bao-legend>
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
  `,
});
RadioWithDescAndHiddenLabel.storyName = 'Radio - Description and hidden label';
RadioWithDescAndHiddenLabel.args = {
  ...Primary.args
};


export const RadioExample: Story = (args) => ({
  props: args,
  template: `
    <bao-radio-button-example></bao-radio-button-example>
  `,
});
RadioExample.storyName = 'Radio button - Basic example';
RadioExample.args = {
  ...Primary.args
};

export const RadioReactiveExample: Story = (args) => ({
  props: args,
  template: `
    <bao-radio-button-reactive-form-example></bao-radio-button-reactive-form-example>
  `,
});
RadioReactiveExample.storyName = 'Radio button - Reactive form example';
RadioReactiveExample.args = {
  ...Primary.args
};
