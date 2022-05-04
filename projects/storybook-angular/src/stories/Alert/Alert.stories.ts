/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoIconModule,
  BaoAlertActions,
  BaoAlertComponent,
  BaoAlertContent,
  BaoAlertLink,
  BaoAlertTitle,
  BaoButtonComponent
} from 'angular-ui';

const description = `
Alerts are used to display an important message and optional related **actions**.

## Colors and icons
To modify the color (and icon) of an alert, the \`type\` input property must be used.

* \`success\` for a positive alert
* \`danger\` for a negative alert
* \`warning\` for a warning alert
* \`info\` for an informational alert
* \`emergency\` for emergency alert

`;

export default {
  title: 'Components/Alert',
  decorators: [
    moduleMetadata({
      declarations: [
        BaoAlertContent,
        BaoAlertTitle,
        BaoAlertActions,
        BaoAlertLink,
        BaoButtonComponent
      ],
      imports: [CommonModule, BaoIconModule]
    })
  ],
  component: BaoAlertComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    alertTitleIcon: {
      table: {
        disable: true
      }
    },
    alertTypeIcon: {
      table: {
        disable: true
      }
    },
    ngOnChanges: {
      table: {
        disable: true
      }
    },
    iconTitle: {
      table: {
        disable: true
      }
    },
    iconType: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<BaoAlertComponent & { title: string; content: string }> =
  (args: BaoAlertComponent) => ({
    component: BaoAlertComponent,
    template: `
  <bao-alert [type]="type" [dismissible]="dismissible">
    <bao-alert-title>{{title}}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
 `,
    props: args
  });

export const Primary = Template.bind({});

Primary.args = {
  type: "info",
  dismissible: false,
  title: "The alert's title",
  content:
    'Alert message with <a href="#" bao-alert-link>an optional link</a> if needed.'
};

export const DismissableAlert: Story = args => ({
  props: args,
  template: `
  <bao-alert type="success" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  <bao-alert type="danger" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  <bao-alert type="warning" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  <bao-alert type="info" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  <bao-alert type="emergency" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  `
});

const dismissableStoryDescription = `
Setting the \`dismissible\` input to \`true\` will add a dismiss button to the top right of the alert. Clicking on the button will result in the
the component emitting a \`dismiss\` event that the parent component will be able to handle.`;

DismissableAlert.storyName = 'Dismissible alerts';
DismissableAlert.parameters = {
  docs: {
    description: {
      story: dismissableStoryDescription
    }
  }
};
DismissableAlert.args = {
  ...Primary.args,
  dismissible: true
};

export const DismissableWithActionsAlert: Story = args => ({
  props: args,
  template: `
  <bao-alert type="success" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
    <bao-alert-actions>
    <button bao-button role="button" type="utility" level="primary">Label</button>
    <button bao-button role="button" type="utility" level="secondary">Label</button>
    <button bao-button role="button" type="utility" level="tertiary">Label</button>
  </bao-alert-actions>
  </bao-alert>
  <bao-alert type="danger" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
    <bao-alert-actions>
    <button bao-button role="button" type="utility" level="primary">Label</button>
    <button bao-button role="button" type="utility" level="secondary">Label</button>
    <button bao-button role="button" type="utility" level="tertiary">Label</button>
  </bao-alert-actions>
  </bao-alert>
  <bao-alert type="warning" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
    <bao-alert-actions>
    <button bao-button role="button" type="utility" level="primary">Label</button>
    <button bao-button role="button" type="utility" level="secondary">Label</button>
    <button bao-button role="button" type="utility" level="tertiary">Label</button>
  </bao-alert-actions>
  </bao-alert>
  <bao-alert type="info" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
    <bao-alert-actions>
    <button bao-button role="button" type="utility" level="primary">Label</button>
    <button bao-button role="button" type="utility" level="secondary">Label</button>
    <button bao-button role="button" type="utility" level="tertiary">Label</button>
  </bao-alert-actions>
  </bao-alert>
  <bao-alert type="emergency" [dismissible]="dismissible">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
    <bao-alert-actions>
    <button bao-button role="button" type="utility" level="primary">Label</button>
    <button bao-button role="button" type="utility" level="secondary">Label</button>
    <button bao-button role="button" type="utility" level="tertiary">Label</button>
  </bao-alert-actions>
  </bao-alert>
  `
});

DismissableWithActionsAlert.storyName = 'Alerts with actions';

DismissableWithActionsAlert.args = {
  ...Primary.args,
  dismissible: true
};

export const DismissableWithoutTitleAlert: Story = args => ({
  props: args,
  template: `
  <bao-alert type="success" [dismissible]="dismissible">
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  <bao-alert type="danger" [dismissible]="dismissible">
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  <bao-alert type="warning" [dismissible]="dismissible">
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  <bao-alert type="info" [dismissible]="dismissible">
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  <bao-alert type="emergency" [dismissible]="dismissible">
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  `
});

DismissableWithoutTitleAlert.storyName = 'Alerts without title';

DismissableWithoutTitleAlert.args = {
  ...Primary.args,
  dismissible: true
};
