import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BaoButtonComponent, BaoIconComponent } from 'core-components-angular-lib';
import { Primary } from './Button.stories';
export default {
  title: 'Components/Button/Editorial',
  decorators: [
    moduleMetadata({
      declarations: [BaoIconComponent],
      imports: [CommonModule],
    }),
  ],
  component: BaoButtonComponent,
  parameters: {
    docs: {
      description: {
        component: 'Primary UI component for user interaction',
      },
    },
  },
  argTypes: {
    ngAfterViewInit: {
      table: {
        disable: true,
      },
    },
  },
} as Meta;

export const EditorialLevelButton: Story = (args) => ({
  props: args,
  template: `
  <button bao-button type="button" displayType="editorial" level="primary" style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="secondary" style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="tertiary">{{label}}</button>
  `,
});
EditorialLevelButton.storyName = 'Editorial - Levels';
EditorialLevelButton.args = {
  ...Primary.args
}

export const EditorialSizeButton: Story = (args) => ({
  props: args,
  template: `
  <button bao-button type="button" displayType="editorial" level="primary" size="large" style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="primary" size="medium" style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="primary" size="small">{{label}}</button>
  `,
});
EditorialSizeButton.storyName = 'Editorial - Sizes';
EditorialSizeButton.args = {
  ...Primary.args
};


export const EditorialFullWidthButton: Story = (args) => ({
  props: args,
  template: `
    <div>
    <button bao-button type="button" displayType="editorial" level="primary" [fullWidth]="true">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="secondary" [fullWidth]="true">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="tertiary" [fullWidth]="true">{{label}}</button>
  </div>
  `,
});
EditorialFullWidthButton.storyName = 'Editorial - Full width';
EditorialFullWidthButton.parameters = {
  docs: {
    description: {
      story: 'If the input `fullWidth` is set to `true`, the button will grow to the width of it\'s container',
    },
  },
}
EditorialFullWidthButton.args = {
  ...Primary.args
};

export const EditorialDiabledButton: Story = (args) => ({
  props: args,
  template: `
  <button bao-button type="button" displayType="editorial" level="primary" disabled style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="secondary" disabled style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="tertiary" disabled>{{label}}</button>
  `,
});
EditorialDiabledButton.storyName = 'Editorial - Disabled';
EditorialDiabledButton.args = {
  ...Primary.args
};

export const EditorialReversedButton: Story = (args) => ({
  props: args,
  template: `
  <div style="background-color: black; padding: 1rem;">
    <button bao-button type="button" displayType="editorial" level="primary" [reversed]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="secondary" [reversed]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="tertiary" [reversed]="true">{{label}}</button>
  </div>
  `,
});
EditorialReversedButton.storyName = 'Editorial - Reversed';
EditorialReversedButton.args = {
  ...Primary.args
};

export const EditorialRDButton: Story = (args) => ({
  props: args,
  template: `
  <div style="background-color: black; padding: 1rem;">
    <button bao-button type="button" displayType="editorial" level="primary" [reversed]="true" disabled style="margin-right: 1rem;">Label</button>
    <button bao-button type="button" displayType="editorial" level="secondary" [reversed]="true" disabled style="margin-right: 1rem;">Label</button>
    <button bao-button type="button" displayType="editorial" level="tertiary" [reversed]="true" disabled>Label</button>
  </div>
  `,
});

EditorialRDButton.storyName = 'Editorial - Reversed and Disabled';
EditorialRDButton.args = {
  ...Primary.args
};
