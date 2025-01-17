/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { BaoModalClose, BaoModalInitialConfig, BaoModalRef } from 'angular-ui';
import { ModalFormExample } from 'projects/storybook-angular-examples/src/app/modal/modal-form/modal-form-example.component';
import { ModalContentMediumExample } from 'projects/storybook-angular-examples/src/app/modal/modal-medium/modal-content-medium-example.component';
import { ModalContentScrollableExample } from 'projects/storybook-angular-examples/src/app/modal/modal-scrollable/modal-content-scrollable-example.component';
import { ModalContentSmallExample } from 'projects/storybook-angular-examples/src/app/modal/modal-small/modal-content-small-example.component';
import { ModalContentWithoutFooterExample } from 'projects/storybook-angular-examples/src/app/modal/modal-without-footer/modal-content-without-footer-example.component';
import { BaoModalModuleTest } from 'projects/storybook-angular-examples/src/app/modal/module';

const description = `
The modal is used to make the user focus on a specific message or process.
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Modale](https://zeroheight.com/575tugn0n/p/905970)".
`;

export default {
  title: 'Components/Modal',
  component: ModalContentSmallExample,
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
} as Meta;

const Template: Story = args => ({
  props: args
});

export const Default = Template.bind({});

const TemplateMedium: Story<ModalContentMediumExample> = () => ({
  component: ModalContentMediumExample
});

export const Medium = TemplateMedium.bind({});

const TemplateScrollable: Story<ModalContentScrollableExample> = () => ({
  component: ModalContentScrollableExample
});

export const Large = TemplateScrollable.bind({});

const TemplateWithoutFooter: Story<ModalContentWithoutFooterExample> = () => ({
  component: ModalContentWithoutFooterExample
});

export const WithoutFooter = TemplateWithoutFooter.bind({});

const TemplateForm: Story<ModalFormExample> = () => ({
  component: ModalFormExample
});

export const Form = TemplateForm.bind({});
