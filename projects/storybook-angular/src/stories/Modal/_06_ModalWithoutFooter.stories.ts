/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { BaoModalClose, BaoModalInitialConfig, BaoModalRef } from 'angular-ui';
import { ModalContentWithoutFooterExample } from 'projects/storybook-angular/src/app/modal/modal-without-footer/modal-content-without-footer-example.component';
import { BaoModalModuleTest } from 'projects/storybook-angular/src/app/modal/module';

const description = `
The modal is used to make the user focus on a specific message or process.
## Usage
Whenever you do not need a footer or a button. Just strip them.

\`\`\`html
<!-- content-modal.html -->
<div class="bao-modal-content">
  <div class="bao-modal-header">
    <h1 id="bao-modal-unique-title-5" class="bao-modal-title">
      Small sur desktop, full sur mobile sans footer
    </h1>
    <button
      bao-button
      type="button"
      displayType="utility"
      data-dismiss="modal"
      level="tertiary"
      no-text="true"
      (click)="onNoClick()"
    >
      <bao-icon
        color="action"
        svgIcon="icon-x"
        size="x-small"
        title="Fermer la fenêtre modale"
      ></bao-icon>
    </button>
  </div>
  <div class="bao-modal-body">
    <h3>What is Lorem Ipsum?</h3>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
</div>
\`\`\`
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Modale](https://zeroheight.com/575tugn0n/p/905970)".
`;

export default {
  title: 'Components/Modal/Without a footer',
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
} as Meta;

const Template: StoryFn = args => ({
  props: args
});

export const Default = Template.bind({});
