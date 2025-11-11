/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import {
  BaoCheckboxModule,
  BaoIconModule,
  BaoModalClose,
  BaoModalInitialConfig,
  BaoModalRef
} from 'angular-ui';
import { ModalFilterExample } from 'projects/storybook-angular/src/app/modal/modal-filter/modal-filter-example.component';
import { BaoModalModuleTest } from 'projects/storybook-angular/src/app/modal/module';

const description = `
The filter variant modal is positioned relative to a trigger element and has a fixed width of 360px. It's designed for filter menus and similar UI patterns.

## Usage

When opening a modal with the filter variant, you need to:
- Set \`variant: eModalVariant.FILTER\`
- Provide a \`triggerElement\` (ElementRef) to position the modal relative to

\`\`\`typescript
this.modal.open(MyFilterComponent, {
  variant: eModalVariant.FILTER,
  triggerElement: this.buttonElementRef,
  data: myFilters
});
\`\`\`


## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Modale](https://zeroheight.com/575tugn0n/p/905970)".
`;

export default {
  title: 'Components/Modal/Filter Variant',
  component: ModalFilterExample,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BaoModalModuleTest, BaoCheckboxModule, BaoIconModule]
    })
  ],
  subcomponents: { BaoModalInitialConfig, BaoModalRef, BaoModalClose },
  argTypes: {
    modal: { table: { disable: true } },
    selectedFilters: { table: { disable: true } },
    openFilterModal: { table: { disable: true } },
    triggerButton: { table: { disable: true } }
  }
} as Meta;

const Template: StoryFn = args => ({
  props: args
});

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    description: {
      story:
        'This example shows how the filter variant modal opens connected to the trigger button.'
    }
  }
};
