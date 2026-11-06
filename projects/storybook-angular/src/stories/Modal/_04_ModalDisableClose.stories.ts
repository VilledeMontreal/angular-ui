/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { BaoModalClose, BaoModalInitialConfig, BaoModalRef } from 'angular-ui';
import { BaoModalModuleTest } from 'projects/storybook-angular/src/app/modal/module';
import { ModalDisableCloseExample } from '../../app/modal/modal-disable-backdrop/modal-disable-backdrop-example.component';

const description = `
The modal is used to make the user focus on a specific message or process.
## Usage
To disable the close action on a modal, you need to:
- Set \`disableClose: true\`

\`\`\`typescript
this.modal.open(ModalComponent, {
  disableClose: true,
});
\`\`\`

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Modale](https://zeroheight.com/575tugn0n/p/905970)".
`;

export default {
  title: 'Components/Modal/Disable Close',
  component: ModalDisableCloseExample,
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
