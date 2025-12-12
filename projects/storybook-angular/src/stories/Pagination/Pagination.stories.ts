/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { BaoIconModule } from 'projects/angular-ui/src/lib/icon/module';
import { BaoPaginationModule } from 'projects/angular-ui/src/lib/pagination/module';
import { BaoPaginationComponent } from 'projects/angular-ui/src/lib/pagination/pagination.component';

const description = `
Pagination is used to navigate through a long list of items
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Pagination](https://zeroheight.com/575tugn0n/p/65fd94)".
`;

const meta = {
  title: 'Components/Pagination',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BaoIconModule, FormsModule, BaoPaginationModule]
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
    ngOnChanges: { table: { disable: true } },
    ngOnInit: { table: { disable: true } },
    _maxPages: { table: { disable: true } },
    _startItem: { table: { disable: true } },
    _endItem: { table: { disable: true } },
    _totalPages: { table: { disable: true } },
    displayedPages: { table: { disable: true } },
    buildPageNumbers: { table: { disable: true } },
    goTo: { table: { disable: true } },
    handleNextClick: { table: { disable: true } },
    handlePreviousClick: { table: { disable: true } },
    handlePageSizeChange: { table: { disable: true } },
    updateStartItem: { table: { disable: true } },
    updateEndItem: { table: { disable: true } },
    updateTotalPages: { table: { disable: true } }
  }
} as Meta<BaoPaginationComponent>;
export default meta;

type Story = StoryObj<BaoPaginationComponent>;

export const Default: Story = {
  render: args => ({
    props: args
  }),
  args: {
    totalItems: 65,
    itemsPerPage: 10,
    currentPage: 4,
    pageSizeOptions: [10, 25, 50, 100],
    itemLabel: 'documents',
    showItemsPerPageSelector: true
  }
};

export const NoItemsPerPageSelector: Story = {
  render: args => ({
    props: args
  }),
  name: 'No items per page selector',
  args: {
    totalItems: 34,
    itemsPerPage: 10,
    currentPage: 4,
    pageSizeOptions: [10, 25, 50, 100],
    itemLabel: 'documents',
    showItemsPerPageSelector: false
  }
};
