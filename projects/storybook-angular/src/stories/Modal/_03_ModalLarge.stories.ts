/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { BaoModalClose, BaoModalInitialConfig, BaoModalRef } from 'angular-ui';
import { BaoModalModuleTest } from 'projects/storybook-angular/src/app/modal/module';
import { ModalContentLargeExample } from '../../app/modal/modal-large/modal-content-large-example.component';

const description = `
The modal is used to make the user focus on a specific message or process.
## Usage
To use the large size on desktop and the compact size on mobile, you can set these properties :
- Set \`size: eModalDesktopWidthSize.LARGE\`
- Set \`mobileSize: eModalMobileWidthSize.COMPACT \`

\`\`\`typescript
this.modal.open(ModalComponent, {
  size: eModalDesktopWidthSize.LARGE
  mobileSize: eModalDesktopWidthSize.COMPACT
});
\`\`\`

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Modale](https://zeroheight.com/575tugn0n/p/905970)".
`;

export default {
  title: 'Components/Modal/Desktop Large and Mobile Compact',
  component: ModalContentLargeExample,
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

const Template: StoryFn = args => ({
  props: args
});

export const Default = Template.bind({});
