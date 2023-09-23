/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { BaoButtonComponent, BaoButtonModule, BaoIconModule } from 'angular-ui';

const description = `
Primary UI component for user interaction
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Bouton](https://zeroheight.com/575tugn0n/p/466f23)".
`;

export default {
  title: 'Components/Button',
  component: BaoButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BaoButtonModule, BaoIconModule]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    ngAfterViewInit: {
      table: {
        disable: true
      }
    },
    rightIcon: {
      table: {
        disable: true
      }
    },
    noText: {
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
  displayType: 'utility',
  label: 'Button',
  level: 'primary',
  size: 'medium'
};

export const UtilitySizeButton: StoryFn = args => ({
  props: args,
  template: `
  <div>
    <button bao-button type="button" displayType="utility" level="primary" size="medium" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" size="medium" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="medium">Label</button>
  </div>
  <div style="margin-top:1rem;">
    <button bao-button type="button" displayType="utility" level="primary" size="small" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" size="small" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="small">{{label}}</button>
  </div>
  `
});
UtilitySizeButton.storyName = 'Utility - Sizes';
UtilitySizeButton.args = {
  ...Primary.args
};

export const UtilityIconsButton: StoryFn = args => ({
  props: args,
  template: `
  <div style="">
    <button bao-button type="button" displayType="utility" level="primary" size="medium" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon><span>{{label}}</span></button>
    <button bao-button type="button" displayType="utility" level="secondary" size="medium" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon><span>{{label}}</span></button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="medium" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon><span>{{label}}</span></button>
  </div>
  <div style="margin-top: 1rem">
    <button bao-button type="button" displayType="utility" level="primary" size="medium" style="margin-right: 1rem;"><span>{{label}}</span><bao-icon svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="secondary" size="medium" style="margin-right: 1rem;"><span>{{label}}</span><bao-icon svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="medium" style="margin-right: 1rem;"><span>{{label}}</span><bao-icon svgIcon="icon-help"></bao-icon></button>
  </div>
  <div style="margin-top: 1rem">
    <button bao-button type="button" displayType="utility" level="primary" size="medium" aria-label="help" style="margin-right: 1rem;"><bao-icon title="help" svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="secondary" size="medium" aria-label="help" style="margin-right: 1rem;"><bao-icon title="help" svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="medium" aria-label="help" style="margin-right: 1rem;"><bao-icon title="help" svgIcon="icon-help"></bao-icon></button>
  </div>
  <div style="margin-top: 1rem">
    <button bao-button type="button" displayType="utility" level="primary" size="small" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon><span>{{label}}</span></button>
    <button bao-button type="button" displayType="utility" level="secondary" size="small" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon><span>{{label}}</span></button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="small" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon><span>{{label}}</span></button>
  </div>
  <div style="margin-top: 1rem">
    <button bao-button type="button" displayType="utility" level="primary" size="small" style="margin-right: 1rem;"><span>{{label}}</span><bao-icon svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="secondary" size="small" style="margin-right: 1rem;"><span>{{label}}</span><bao-icon svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="small" style="margin-right: 1rem;"><span>{{label}}</span><bao-icon svgIcon="icon-help"></bao-icon></button>
  </div>
  `
});
UtilityIconsButton.storyName = 'Utility - Icons';
UtilityIconsButton.args = {
  ...Primary.args
};

export const UtilityLevelButton: StoryFn = args => ({
  props: args,
  template: `
    <button bao-button type="button" displayType="utility" level="primary" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary">{{label}}</button>
  `
});
UtilityLevelButton.storyName = 'Utility - Level';
UtilityLevelButton.args = {
  ...Primary.args
};

export const UtilityDisabledButton: StoryFn = args => ({
  props: args,
  template: `
  <div>
    <button bao-button type="button" displayType="utility" level="primary" size="medium" disabled style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" size="medium" disabled style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="medium" disabled>Label</button>
  </div>
  <div style="margin-top: 1rem">
    <button bao-button type="button" displayType="utility" level="primary" size="small" disabled style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" size="small" disabled style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="small" disabled>{{label}}</button>
  </div>
  `
});
UtilityDisabledButton.storyName = 'Utility - Disabled';
UtilityDisabledButton.args = {
  ...Primary.args
};

export const UtilityReversedButton: StoryFn = args => ({
  props: args,
  template: `
  <div style="background-color: black; padding: 1rem;">
    <button bao-button type="button" displayType="utility" level="primary" [reversed]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" [reversed]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" [reversed]="true">{{label}}</button>
  </div>
  `
});
UtilityReversedButton.storyName = 'Utility - Reversed';
UtilityReversedButton.args = {
  ...Primary.args,
  reversed: true
};

export const UtilityRDButton: StoryFn = args => ({
  props: args,
  template: `
  <div style="background-color: black; padding: 1rem;">
    <button bao-button type="button" displayType="utility" level="primary" [reversed]="true" disabled style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" [reversed]="true" disabled style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" [reversed]="true" disabled>{{label}}</button>
  </div>
  `
});
UtilityRDButton.storyName = 'Utility - Reversed and Disabled';
UtilityRDButton.args = {
  ...Primary.args,
  reversed: true
};

export const UtilityLoadingButton: StoryFn = args => ({
  props: args,
  template: `
  <div>
    <button bao-button type="button" displayType="utility" level="primary" [loading]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" [loading]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" [loading]="true" >{{label}}</button>
  </div>
  <div style="margin-top: 1rem;">
    <button bao-button type="button" displayType="utility" level="primary" [loading]="true" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon>{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" [loading]="true" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon>{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" [loading]="true"><bao-icon svgIcon="icon-help"></bao-icon>{{label}}</button>
  </div>
  <div style="margin-top: 1rem;">
    <button bao-button type="button" displayType="utility" level="primary" [loading]="true" style="margin-right: 1rem;">{{label}}<bao-icon svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="secondary" [loading]="true" style="margin-right: 1rem;">{{label}}<bao-icon svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="tertiary" [loading]="true">{{label}}<bao-icon svgIcon="icon-help"></bao-icon></button>
  </div>
  <div style="margin-top: 1rem;">
    <button bao-button type="button" displayType="utility" level="primary" [loading]="true" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="secondary" [loading]="true" style="margin-right: 1rem;"><bao-icon svgIcon="icon-help"></bao-icon></button>
    <button bao-button type="button" displayType="utility" level="tertiary" [loading]="true"><bao-icon svgIcon="icon-help"></bao-icon></button>
  </div>
  <div style="margin-top: 1rem;">
    <button bao-button type="button" displayType="utility" level="primary" size="small" [loading]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" size="small"  [loading]="true" style="margin-right: 1rem;">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" size="small"  [loading]="true" >{{label}}</button>
  </div>
  `
});
UtilityLoadingButton.storyName = 'Utility - Loading';
UtilityLoadingButton.parameters = {
  docs: {
    description: {
      story:
        "If the input `loading` is set to `true`, the button will be disabled and a loading spinner will appear. The spinner will appear in place of the icon in the button if there is one or to the left of the button's text."
    }
  }
};
UtilityLoadingButton.args = {
  ...Primary.args,
  loading: true
};

export const UtilityFullWidthButton: StoryFn = args => ({
  props: args,
  template: `
    <div>
    <button bao-button type="button" displayType="utility" level="primary" [fullWidth]="true">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="secondary" [fullWidth]="true">{{label}}</button>
    <button bao-button type="button" displayType="utility" level="tertiary" [fullWidth]="true">{{label}}</button>
  </div>
  `
});
UtilityFullWidthButton.storyName = 'Utility - Full width';
UtilityFullWidthButton.parameters = {
  docs: {
    description: {
      story:
        "If the input `fullWidth` is set to `true`, the button will grow to the width of it's container"
    }
  }
};
UtilityFullWidthButton.args = {
  ...Primary.args,
  fullWidth: true
};
