/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BaoModalClose, BaoModalInitialConfig, BaoModalRef } from 'angular-ui';
import { ModalContentWithoutFooterExample } from 'projects/storybook-angular/src/app/modal/modal-without-footer/modal-content-without-footer-example.component';
import { BaoModalModuleTest } from 'projects/storybook-angular/src/app/modal/module';

const description = `
The modal is used to make the user focus on a specific message or process.
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Modale](https://zeroheight.com/575tugn0n/p/905970)".
`;

const meta = {
  title: 'Components/Modal/WithoutFooter',
  component: ModalContentWithoutFooterExample,
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
      imports: [BaoModalModuleTest]
    })
  ],
  subcomponents: { BaoModalInitialConfig, BaoModalRef, BaoModalClose }
} as Meta<ModalContentWithoutFooterExample>;

export default meta;

type Story = StoryObj;

const Template: Story['render'] = args => ({
  props: args
});

export const Default = {
  render: Template
};
