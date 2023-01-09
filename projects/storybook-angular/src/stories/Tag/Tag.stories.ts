/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BaoIconComponent, BaoTagComponent } from 'angular-ui';

const description = `
Tags are used to categorize, identify and organize content.
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Étiquette](https://zeroheight.com/575tugn0n/p/8594a9)".
`;

export default {
  title: 'Components/Tag',
  decorators: [
    moduleMetadata({
      declarations: [BaoIconComponent]
    })
  ],
  component: BaoTagComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    addHiddenText: {
      table: {
        disable: true
      }
    },
    addIconClass: {
      table: {
        disable: true
      }
    },
    ngAfterViewInit: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<BaoTagComponent & { label: string }> = (
  args: BaoTagComponent
) => ({
  component: BaoTagComponent,
  template: `
  <bao-tag [type]="type" [hiddenText]="hiddenText" [variant]="variant" style="margin-right:1.5rem"><span>{{label}}</span></bao-tag>
 `,
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Label'
};

export const StrongTag: Story = args => ({
  props: args,
  template: `
  <bao-tag type="positive" variant="strong" style="margin-right:1.5rem"><span>{{label}}</span></bao-tag>
  <bao-tag type="negative" variant="strong" style="margin-right:1.5rem"><span>{{label}}</span></bao-tag>
  <bao-tag variant="strong" style="margin-right:1.5rem"><span>{{label}}</span></bao-tag>
  <bao-tag type="alert" variant="strong" style="margin-right:1.5rem"><span>{{label}}</span></bao-tag>
  <bao-tag type="info" variant="strong" style="margin-right:1.5rem"><span>{{label}}</span></bao-tag>
  `
});

StrongTag.storyName = 'Tags - Strong';
StrongTag.args = {
  ...Primary.args
};

export const IconTag: Story = args => ({
  props: args,
  template: `
  <bao-tag type="positive" variant="strong" style="margin-right:1.5rem"><bao-icon svgIcon="icon-check-circle"></bao-icon><span>{{label}}</span></bao-tag>
  <bao-tag type="negative" style="margin-right:1.5rem"><bao-icon svgIcon="icon-minus-circle"></bao-icon><span>{{label}}</span></bao-tag>
  <bao-tag hiddenText="Neutre" style="margin-right:1.5rem"><bao-icon svgIcon="icon-bell"></bao-icon><span>{{label}}</span></bao-tag>
  <bao-tag type="alert" variant="strong" style="margin-right:1.5rem"><bao-icon svgIcon="icon-warning"></bao-icon><span>{{label}}</span></bao-tag>
  <bao-tag type="info" variant="light" style="margin-right:1.5rem"><bao-icon svgIcon="icon-info"></bao-icon><span>{{label}}</span></bao-tag>
  `
});

IconTag.storyName = 'Tags - Icon';
IconTag.args = {
  ...Primary.args
};
