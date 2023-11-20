/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { StoryFn, moduleMetadata, Meta } from '@storybook/angular';
import { BaoButtonComponent, BaoButtonModule, BaoIconModule } from 'angular-ui';
export default {
  title: 'Components/Button/Editorial',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BaoButtonModule, BaoIconModule]
    })
  ],
  component: BaoButtonComponent,
  parameters: {
    docs: {
      description: {
        component: 'Primary UI component for user interaction'
      }
    }
  },
  argTypes: {
    ngAfterViewInit: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: StoryFn = (args: BaoButtonComponent) => ({
  component: BaoButtonComponent,
  template: `
  <button
    bao-button
    type="button"
    [reversed]="reversed"
    [fullWidth]="fullWidth"
    [displayType]="displayType"
    [loading]="loading"
    [size]="size"
    [level]="level"
    [loadingSpinnerAriaLabel]="loadingSpinnerAriaLabel"
    style="margin-right: 1rem;">
    {{label}}
  </button>`,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  loading: false,
  reversed: false,
  fullWidth: false,
  displayType: 'editorial',
  label: 'Button',
  level: 'primary',
  size: 'medium'
};

export const EditorialLevelButton: StoryFn = args => ({
  props: args,
  template: `
  <button bao-button type="button" displayType="editorial" level="primary" style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="secondary" style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="tertiary">{{label}}</button>
  `
});
EditorialLevelButton.storyName = 'Editorial - Levels';
EditorialLevelButton.args = {
  ...Primary.args
};

export const EditorialSizeButton: StoryFn = args => ({
  props: args,
  template: `
  <button bao-button type="button" displayType="editorial" level="primary" size="large" style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="primary" size="medium" style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="primary" size="small">{{label}}</button>
  `
});
EditorialSizeButton.storyName = 'Editorial - Sizes';
EditorialSizeButton.args = {
  ...Primary.args,
  size: 'large'
};

export const EditorialFullWidthButton = args => ({
  props: args,
  template: `
    <div>
    <button bao-button type="button" displayType="editorial" level="primary" [fullWidth]="true">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="secondary" [fullWidth]="true">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="tertiary" [fullWidth]="true">{{label}}</button>
  </div>
  `
});
EditorialFullWidthButton.storyName = 'Editorial - Full width';
EditorialFullWidthButton.parameters = {
  docs: {
    description: {
      story:
        "If the input `fullWidth` is set to `true`, the button will grow to the width of it's container"
    }
  }
};
EditorialFullWidthButton.args = {
  ...Primary.args,
  fullWidth: true
};

export const EditorialDiabledButton = args => ({
  props: args,
  template: `
  <button bao-button type="button" displayType="editorial" level="primary" disabled style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="secondary" disabled style="margin-right: 1rem;">{{label}}</button>
  <button bao-button type="button" displayType="editorial" level="tertiary" disabled>{{label}}</button>
  `
});
EditorialDiabledButton.storyName = 'Editorial - Disabled';
EditorialDiabledButton.args = {
  ...Primary.args
};

export const EditorialReversedButton: StoryFn = args => ({
  props: args,
  template: `
  <div style="background-color: black; padding: 1rem;">
    <button bao-button type="button" displayType="editorial" level="primary" [reversed]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="secondary" [reversed]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="tertiary" [reversed]="true">{{label}}</button>
  </div>
  `
});
EditorialReversedButton.storyName = 'Editorial - Reversed';
EditorialReversedButton.args = {
  ...Primary.args,
  reversed: true
};

export const EditorialRDButton: StoryFn = args => ({
  props: args,
  template: `
  <div style="background-color: black; padding: 1rem;">
    <button bao-button type="button" displayType="editorial" level="primary" [reversed]="true" disabled style="margin-right: 1rem;">Label</button>
    <button bao-button type="button" displayType="editorial" level="secondary" [reversed]="true" disabled style="margin-right: 1rem;">Label</button>
    <button bao-button type="button" displayType="editorial" level="tertiary" [reversed]="true" disabled>Label</button>
  </div>
  `
});

EditorialRDButton.storyName = 'Editorial - Reversed and Disabled';
EditorialRDButton.args = {
  ...Primary.args,
  reversed: true
};
