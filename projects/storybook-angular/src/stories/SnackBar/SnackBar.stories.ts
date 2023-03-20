/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata, Story } from '@storybook/angular';
import {
  BaoSnackBarConfig,
  BaoSnackBarRef
} from 'projects/angular-ui/src/public-api';
import { BaoSnackBarModuleTest } from 'projects/storybook-angular-examples/src/app/snack-bar/module';
import { SnackBarPreview } from 'projects/storybook-angular-examples/src/app/snack-bar/snack-bar-preview/snack-bar-preview.component';
import { SnackBarSimpleWithActionExample } from 'projects/storybook-angular-examples/src/app/snack-bar/snack-bar-simple-with-action/snack-bar-simple-with-action-example.component';
import { SnackBarSimpleWithConfigExample } from 'projects/storybook-angular-examples/src/app/snack-bar/snack-bar-simple-with-config/snack-bar-simple-with-config-example.component';
import { SnackBarSimpleExample } from 'projects/storybook-angular-examples/src/app/snack-bar/snack-bar-simple/snack-bar-simple-example.component';

const description = `
The Snackbar (or Toast) is used to give feedback to the user following an action. It is displayed as an overlay out of the Component's context.
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Toast](https://zeroheight.com/575tugn0n/p/29e96e-toast)".
`;

export default {
  title: 'Components/SnackBar',
  component: SnackBarPreview,
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
      imports: [BaoSnackBarModuleTest]
    })
  ],
  template: `
  <snack-bar-preview id="sb1" name="name"
  [toastType]="toastType"
  [message]="message"
  [actionLabelOrIcon]="actionLabelOrIcon"
  [showClose]="showClose"
  [config]="config"
  >
  </snack-bar-preview>
 `,
  subcomponents: { BaoSnackBarConfig, BaoSnackBarRef }
} as Meta;

const Template: Story = args => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  toastType: 'success',
  message: 'This is a preview component',
  actionLabelOrIcon: 'icon-refresh',
  showClose: false
};

const TemplateSimple: Story<SnackBarSimpleExample> = () => ({
  component: SnackBarSimpleExample
});

export const Simple = TemplateSimple.bind({});
Simple.parameters = {
  docs: {
    source: {
      code: `<file src="snack-bar-simple-example.component.ts"></file>`
    }
  }
};

const TemplateSimpleWithAction: Story<SnackBarSimpleWithActionExample> =
  () => ({
    component: SnackBarSimpleWithActionExample
  });

export const SimpleWithAction = TemplateSimpleWithAction.bind({});
SimpleWithAction.parameters = {
  docs: {
    source: {
      code: `<file src="snack-bar-simple-with-action-example.component.ts"></file>`
    }
  }
};

const TemplateSimpleWithConfig: Story<SnackBarSimpleWithConfigExample> =
  () => ({
    component: SnackBarSimpleWithConfigExample
  });

export const SimpleWithConfig = TemplateSimpleWithConfig.bind({});
SimpleWithConfig.parameters = {
  docs: {
    source: {
      code: `<file src="snack-bar-simple-with-config-example.component.ts"></file>`
    }
  }
};
