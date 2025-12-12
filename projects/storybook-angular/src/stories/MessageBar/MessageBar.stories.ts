/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BaoButtonComponent } from 'projects/angular-ui/src/lib/button/button.component';
import { BaoHyperlinkModule } from 'projects/angular-ui/src/lib/hyperlink/module';
import { BaoIconModule } from 'projects/angular-ui/src/lib/icon/module';
import {
  BaoMessageBarComponent,
  BaoMessageBarContent
} from 'projects/angular-ui/src/lib/message-bar/message-bar.component';

const description = `
Message bars are used to display important messages globally in the application.

## Documentation
Full documentation is available in the Hochelaga design system under "[Message Global](https://zeroheight.com/575tugn0n/p/288fdf-message-global)".

## Colors and Icons
To change the color (and icon), use the \`type\` input property:
- **\`info\`** → Primary message (blue)
- **\`alert\`** → Warning message (yellow)
- **\`urgent\`** → Critical message (red)
- **\`neutral\`** → Generic/neutral message (dark gray)

## Link
You can add a link to the message content in **tow ways**:
1. **The standard HTML anchor tag \`<a>\`**
   Example: 
      \`<a href="#">HTML Anchor Tag!</a>\`
2. **The HyperLink Component \`<bao-hyperlink>\`**
   Example: \`<bao-hyperlink href="#" >HyperLink Component!</bao-hyperlink>\`
   
These two methods ensure consistent styling across message bars.
See the **Message Bar with Different Links** story for more details.


## Dismissible Button
By default, message bars are non-dismissible. To enable the close button, set \`dismissible\` to \`true\`. 

The close button has an aria-label of **"Cacher le message"** by default. You can override it using \`dismissibleButtonAriaLabel\`.
`;

const meta = {
  title: 'Components/Message Bar',
  decorators: [
    moduleMetadata({
      declarations: [BaoMessageBarContent, BaoButtonComponent],
      imports: [CommonModule, BaoIconModule, BaoHyperlinkModule]
    })
  ],
  component: BaoMessageBarComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    getIconTitle: { table: { disable: true } },
    getIconType: { table: { disable: true } },
    ngOnChanges: { table: { disable: true } },
    iconTitle: { table: { disable: true } },
    iconType: { table: { disable: true } },
    onDismissClicked: { table: { disable: true } },
    dismissibleButtonAriaLabel: {
      table: { defaultValue: { summary: 'Cacher le message' } }
    },
    dismissible: {
      table: { defaultValue: { summary: 'false' } }
    }
  }
} as Meta<BaoMessageBarComponent>;

export default meta;

type Story = StoryObj;

/**
 *  Base Story Template
 */
const Template: Story['render'] = args => ({
  template: `
    <bao-message-bar [type]="type" [dismissible]="dismissible" [dismissibleButtonAriaLabel]="dismissibleButtonAriaLabel">
      <bao-message-content>
        This is an informational message. <a href="#">Learn more</a>
      </bao-message-content>
    </bao-message-bar>
  `,
  props: args
});

export const Primary = {
  render: Template,

  args: {
    type: 'info',
    dismissible: true,
    alertTypeTitle: 'Information',
    dismissibleButtonAriaLabel: 'Close the message'
  }
};

export const DismissibleMessageBar: Story = {
  render: args => ({
    props: args,
    template: `
      <bao-message-bar type="info" [dismissible]="dismissible">
        <bao-message-content>
          This is an informational message. <a href="#">Learn more</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="alert" [dismissible]="dismissible">
        <bao-message-content>
          This is an alert message. <a href="#">See details</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="urgent" [dismissible]="dismissible">
        <bao-message-content>
          This is an urgent message. <a href="#">Act now</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="neutral" [dismissible]="dismissible">
        <bao-message-content>
          This is a neutral message. <a href="#">More info</a>
        </bao-message-content>
      </bao-message-bar>
    `
  }),

  name: 'Dismissible Message Bar',

  args: {
    dismissible: true
  }
};

export const LongTextMessageBar: Story = {
  render: args => ({
    props: args,
    template: `
      <bao-message-bar type="info" [dismissible]="dismissible">
        <bao-message-content>
          This message is an informational message. It provides general guidance and does not require immediate action. It may contain important details for better understanding. Please read carefully.
          <a href="#">Learn more</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="alert" [dismissible]="dismissible">
        <bao-message-content>
          Attention! This is an alert message to warn you about a potential issue or situation to monitor. Please take note and act accordingly.
          <a href="#">See details</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="urgent" [dismissible]="dismissible">
        <bao-message-content>
          Urgency! This message indicates a critical situation requiring immediate action. Read carefully and follow instructions without delay.
          <a href="#">Act now</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="neutral" [dismissible]="dismissible">
        <bao-message-content>
          This is a neutral message providing general information without requiring any specific action.
          <a href="#">More info</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
    `
  }),

  name: 'Message Bar with Long Text',

  args: {
    dismissible: true
  }
};

export const MessageBarWithoutCloseButton: Story = {
  render: args => ({
    props: args,
    template: `
      <bao-message-bar type="info">
        <bao-message-content>
          This is an informational message without a close button.
          <a href="#">Learn more</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="alert">
        <bao-message-content>
          This is an alert message without a close button.
          <a href="#">See details</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="urgent">
        <bao-message-content>
          This is an urgent message without a close button.
          <a href="#">Act now</a>
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="neutral">
        <bao-message-content>
          This is a neutral message without a close button.
          <a href="#">More info</a>
        </bao-message-content>
      </bao-message-bar>
    `
  }),

  name: 'Message Bar without Close Button',

  args: {
    dismissible: false
  }
};

export const MessageBarWithDifferentLinks: Story = {
  render: args => ({
    props: args,
    template: `
      <bao-message-bar type="info" [dismissible]="dismissible">
        <bao-message-content>
          This message uses a standard <a href="#">HTML Anchor Tag</a>.
        </bao-message-content>
      </bao-message-bar>
      <br />
      <bao-message-bar type="urgent" [dismissible]="dismissible">
        <bao-message-content>
          This message uses the <bao-hyperlink href="#" >HyperLink Component</bao-hyperlink>.
        </bao-message-content>
      </bao-message-bar>
      <br />
    `
  }),

  name: 'Message Bar with Different Links',

  args: {
    dismissible: true
  }
};
