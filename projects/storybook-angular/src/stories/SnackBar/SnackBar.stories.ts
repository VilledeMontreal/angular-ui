/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata } from '@storybook/angular';
import {
  BaoButtonModule,
  BaoIconModule,
  BaoSnackBarModule,
  BaoTagModule
} from 'angular-ui';
import { SnackBarPreview } from 'projects/storybook-angular/src/app/snack-bar/snack-bar-preview/snack-bar-preview.component';

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
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: 'shown' }, // start with the source open
      description: {
        component: description
      }
    }
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BaoSnackBarModule, BaoButtonModule, BaoIconModule, BaoTagModule]
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
 `
} as Meta;

const Template = args => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  toastType: 'success',
  message: 'This is a preview component',
  actionLabelOrIcon: 'icon-refresh',
  showClose: false
};
