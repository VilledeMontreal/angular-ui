/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { DialogFormExample } from 'projects/storybook-angular-examples/src/app/dialog/dialog-form/dialog-form-example.component';
import { DialogContentMediumExample } from 'projects/storybook-angular-examples/src/app/dialog/dialog-medium/dialog-content-medium-example.component';
import { DialogContentScrollableExample } from 'projects/storybook-angular-examples/src/app/dialog/dialog-scrollable/dialog-content-scrollable-example.component';
import { DialogContentSmallExample } from 'projects/storybook-angular-examples/src/app/dialog/dialog-small/dialog-content-small-example.component';
import { DialogContentWithoutFooterExample } from 'projects/storybook-angular-examples/src/app/dialog/dialog-without-footer/dialog-content-without-footer-example.component';
import { BaoDialogModuleTest } from 'projects/storybook-angular-examples/src/app/dialog/module';

export default {
  title: 'Components/Dialog',
  component: DialogContentSmallExample,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BaoDialogModuleTest]
    })
  ]
} as Meta;

const Template: Story = args => ({
  props: args
});

export const Default = Template.bind({});

const TemplateMedium: Story<DialogContentMediumExample> = () => ({
  component: DialogContentMediumExample
});

export const Medium = TemplateMedium.bind({});

const TemplateScrollable: Story<DialogContentScrollableExample> = () => ({
  component: DialogContentScrollableExample
});

export const Large = TemplateScrollable.bind({});

const TemplateWithoutFooter: Story<DialogContentWithoutFooterExample> = () => ({
  component: DialogContentWithoutFooterExample
});

export const WithoutFooter = TemplateWithoutFooter.bind({});

const TemplateForm: Story<DialogFormExample> = () => ({
  component: DialogFormExample
});

export const Form = TemplateForm.bind({});
