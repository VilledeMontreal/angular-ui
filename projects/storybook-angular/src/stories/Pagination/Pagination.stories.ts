/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BaoIconModule, BaoPaginationComponent } from 'angular-ui';

const description = `
Pagination is used to navigate through a long list of items
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Pagination](https://zeroheight.com/575tugn0n/p/65fd94)".
`;

export default {
  title: 'Components/Pagination',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BaoIconModule]
    })
  ],
  component: BaoPaginationComponent,
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
    }
  }
} as Meta;

const Template: Story<BaoPaginationComponent & { label: string }> = (
  args: BaoPaginationComponent
) => ({
  component: BaoPaginationComponent,
  template: `
  <bao-pagination 
    [previousArialLabel]=previousArialLabel
    [nextArialLabel]=nextArialLabel
    [totalPages]="totalPages"
    [currentPage]="currentPage"
    >
  </bao-pagination>`,
  props: args
});

export const Default = Template.bind({});

Default.args = {
  previousArialLabel: false,
  nextArialLabel: false,
  totalPages: 5,
  currentPage: 3
};
