/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  Story
} from '@storybook/angular';
import {
  BaoButtonModule,
  BaoIconModule,
  BaoSnackBarModule,
  BaoTagModule
} from 'angular-ui';

import { SnackBarSimpleExample } from '../../app/snack-bar/snack-bar-simple/snack-bar-simple-example.component';

const description = `
The Snackbar (or Toast) is used to give feedback to the user following an action. It is displayed as an overlay out of the Component's context.
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Toast](https://zeroheight.com/575tugn0n/p/29e96e-toast)".
`;

export default {
  title: 'Components/SnackBar/SnackBar colors',
  component: SnackBarSimpleExample,
  parameters: {
    docs: {
      autodocs: false,
      story: { inline: true }, // render the story in an iframe
      description: {
        component: description
      }
    }
  },
  decorators: [
    applicationConfig({
      // List of providers and environment providers that should be available to the root component and all its children.
      providers: [importProvidersFrom(BrowserAnimationsModule)]
    }),
    moduleMetadata({
      declarations: [],
      imports: [BaoSnackBarModule, BaoButtonModule, BaoIconModule, BaoTagModule]
    })
  ]
} as Meta;

const Template: Story = args => ({
  props: args
});

export const Primary = Template.bind({});
