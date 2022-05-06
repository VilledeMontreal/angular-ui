/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ModalFormExample } from 'projects/storybook-angular-examples/src/app/modal/modal-form/modal-form-example.component';
import { ModalContentMediumExample } from 'projects/storybook-angular-examples/src/app/modal/modal-medium/modal-content-medium-example.component';
import { ModalContentScrollableExample } from 'projects/storybook-angular-examples/src/app/modal/modal-scrollable/modal-content-scrollable-example.component';
import { ModalContentSmallExample } from 'projects/storybook-angular-examples/src/app/modal/modal-small/modal-content-small-example.component';
import { ModalContentWithoutFooterExample } from 'projects/storybook-angular-examples/src/app/modal/modal-without-footer/modal-content-without-footer-example.component';
import { BaoModalModuleTest } from 'projects/storybook-angular-examples/src/app/modal/module';

export default {
  title: 'Components/Modal',
  component: ModalContentSmallExample,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BaoModalModuleTest]
    })
  ]
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
