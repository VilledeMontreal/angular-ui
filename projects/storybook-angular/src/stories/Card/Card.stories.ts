/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { BaoCardComponent, BaoCardModule, BaoIconModule } from 'angular-ui';

const cardWithIconHeaderDescription = `
To define a main icon for a card, a \`bao-icon\` component should be used inside a \`bao-card-header\` tag, 
also to adhere to the design guide, in this case the \`padding\` input should be set to \`'large'\`.

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Tuile](https://zeroheight.com/575tugn0n/p/41a425)".

`;

export default {
  title: 'Components/Card',
  decorators: [
    moduleMetadata({
      imports: [BaoIconModule, BaoCardModule]
    })
  ],
  parameters: {
    docs: {
      description: {
        component: cardWithIconHeaderDescription
      }
    }
  },
  argTypes: {}
} as Meta;

const Template: StoryFn = (args: BaoCardComponent) => ({
  template: `
  <div class="container">
  <div class="row cards">
    <div class="col-12 col-lg-4">
      <a bao-card href="#" [padding]="padding">
        <bao-card-header>
          <bao-icon size="medium" svgIcon="icon-anchor"></bao-icon>
        </bao-card-header>
        <bao-card-content>
          <h2 bao-card-title>{{title}}</h2>
          <bao-card-text-interface>{{content}}</bao-card-text-interface>
        </bao-card-content>
      </a>
    </div>
  </div>
</div>
 `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  title: 'Card title',
  content:
    'Optional description on multiple lines. Maximal number of characters recommended - 140 characters.',
  padding: 'normal'
};

export const Cards: StoryFn = args => ({
  props: args,
  template: `
  <div class="container">
    <div class="row cards">
      <div class="col-12 col-lg-4">
        <a bao-card href="#">
          <bao-card-content>
            <h2 bao-card-title>Card title</h2>
            <bao-card-text-interface>Optional description</bao-card-text-interface>
          </bao-card-content>
        </a>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row cards">
      <div class="col-12 col-lg-4">
        <a bao-card href="#">
          <bao-card-content>
            <h2 bao-card-title>Card title</h2>
            <bao-card-text-interface>Optional description on multiple lines. Maximal number of characters recommended - 140 characters.</bao-card-text-interface>
          </bao-card-content>
        </a>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row cards">
      <div class="col-12 col-lg-4">
        <a bao-card href="#">
          <bao-card-content>
            <h2 bao-card-title>Card title on multiple lines Card title on multiple lines</h2>
            <bao-card-text-interface>Optional description</bao-card-text-interface>
          </bao-card-content>
        </a>
      </div>
    </div>
  </div>
  `
});
Cards.storyName = 'Cards';
Cards.args = {
  ...Primary.args
};
