/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BaoButtonComponent, BaoButtonModule, BaoIconModule } from 'angular-ui';
const meta = {
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
} as Meta<BaoButtonComponent>;
export default meta;

type Story = StoryObj;

const Template: Story['render'] = args => ({
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

export const Primary = {
  render: Template,

  args: {
    loading: false,
    reversed: false,
    fullWidth: false,
    displayType: 'editorial',
    label: 'Button',
    level: 'primary',
    size: 'medium'
  }
};

export const EditorialLevelButton: Story = {
  render: args => ({
    props: args,
    template: `
    <button bao-button type="button" displayType="editorial" level="primary" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="secondary" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="tertiary">{{label}}</button>
    `
  }),

  name: 'Editorial - Levels',

  args: {
    ...Primary.args
  }
};

export const EditorialSizeButton: Story = {
  render: args => ({
    props: args,
    template: `
    <button bao-button type="button" displayType="editorial" level="primary" size="large" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="primary" size="medium" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="primary" size="small">{{label}}</button>
    `
  }),

  name: 'Editorial - Sizes',

  args: {
    ...Primary.args,
    size: 'large'
  }
};

export const EditorialFullWidthButton = {
  render: args => ({
    props: args,
    template: `
      <div>
      <button bao-button type="button" displayType="editorial" level="primary" [fullWidth]="true">{{label}}</button>
      <button bao-button type="button" displayType="editorial" level="secondary" [fullWidth]="true">{{label}}</button>
      <button bao-button type="button" displayType="editorial" level="tertiary" [fullWidth]="true">{{label}}</button>
    </div>
    `
  }),

  name: 'Editorial - Full width',

  parameters: {
    docs: {
      description: {
        story:
          "If the input `fullWidth` is set to `true`, the button will grow to the width of it's container"
      }
    }
  },

  args: {
    ...Primary.args,
    fullWidth: true
  }
};

export const EditorialDiabledButton = {
  render: args => ({
    props: args,
    template: `
    <button bao-button type="button" displayType="editorial" level="primary" disabled style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="secondary" disabled style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="editorial" level="tertiary" disabled>{{label}}</button>
    `
  }),

  name: 'Editorial - Disabled',

  args: {
    ...Primary.args
  }
};

export const EditorialReversedButton: Story = {
  render: args => ({
    props: args,
    template: `
    <div style="background-color: black; padding: 1rem;">
      <button bao-button type="button" displayType="editorial" level="primary" [reversed]="true" style="margin-right: 1rem;">{{label}}</button>
      <button bao-button type="button" displayType="editorial" level="secondary" [reversed]="true" style="margin-right: 1rem;">{{label}}</button>
      <button bao-button type="button" displayType="editorial" level="tertiary" [reversed]="true">{{label}}</button>
    </div>
    `
  }),

  name: 'Editorial - Reversed',

  args: {
    ...Primary.args,
    reversed: true
  }
};

export const EditorialRDButton: Story = {
  render: args => ({
    props: args,
    template: `
    <div style="background-color: black; padding: 1rem;">
      <button bao-button type="button" displayType="editorial" level="primary" [reversed]="true" disabled style="margin-right: 1rem;">Label</button>
      <button bao-button type="button" displayType="editorial" level="secondary" [reversed]="true" disabled style="margin-right: 1rem;">Label</button>
      <button bao-button type="button" displayType="editorial" level="tertiary" [reversed]="true" disabled>Label</button>
    </div>
    `
  }),

  name: 'Editorial - Reversed and Disabled',

  args: {
    ...Primary.args,
    reversed: true
  }
};
