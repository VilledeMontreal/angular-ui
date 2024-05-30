/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata, Meta, StoryFn } from '@storybook/angular';
import { BaoIconModule, BaoAlertComponent, BaoAlertModule } from 'angular-ui';

const description = `
Alerts are used to display an important message and optional related **actions**.

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Message ciblé](https://zeroheight.com/575tugn0n/p/929c63)".

## Colors and icons
To modify the color (and icon) of an alert, the \`type\` input property must be used.

* \`success\` for a positive alert
* \`danger\` for a negative alert
* \`warning\` for a warning alert
* \`info\` for an informational alert
* \`emergency\` for emergency alert

## alertTypeTitle (In French by default)
Optional. By default, the title tag of the alert type is set by one of these text depending on the alert type: 

* \`Succès\` for a positive alert
* \`Erreur\` for a negative alert
* \`Attention\` for a warning alert
* \`Information\` for an informational alert
* \`Urgence\` for emergency alert

The alertTypeTitle attribute is there to override the title alert type.
 
## dismissibleButtonAriaLabel (In French by default)
Optional. By default, the attribute aria-label of the dismissible button is set to 'Cacher le message'. It is possible to override it by changing the dismissibleButtonAriaLabel input.
`;

export default {
  title: 'Components/Alert',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [CommonModule, BaoIconModule, BaoAlertModule]
    })
  ],
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
    },
    dismissibleButtonAriaLabel: {
      table: {
        defaultValue: { summary: 'Cacher le message' }
      }
    },
    dismissible: {
      table: {
        defaultValue: { summary: false }
      }
    }
  }
} as Meta;

const Template: StoryFn = (args: BaoAlertComponent) => ({
  template: `
  <bao-alert [type]="type" [dismissible]="dismissible" [alertTypeTitle]="alertTypeTitle">
    <bao-alert-title>{{title}}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
 `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  type: 'info',
  dismissible: true,
  title: "The alert's title",
  content:
    'Alert message with <a href="#" bao-alert-link>an optional link</a> if needed.',
  alertTypeTitle: 'Information',
  dismissibleButtonAriaLabel: 'Close the message'
};

export const DismissableAlert: StoryFn = args => ({
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

export const DismissableAlertLocalized: StoryFn = args => ({
  props: args,
  template: `
  <bao-alert type="warning" [dismissible]="dismissible" [alertTypeTitle]="alertTypeTitle" [dismissibleButtonAriaLabel]="dismissibleButtonAriaLabel">
    <bao-alert-title>{{ title }}</bao-alert-title>
    <bao-alert-content [innerHTML]="content"></bao-alert-content>
  </bao-alert>
  `
});

const dismissableStoryDescriptionLocalized = `
Setting the \`dismissible\` input to \`true\` will add a dismiss button to the top right of the alert. 
Setting the \`alertTypeTitle\` input will override the title tag of the alert type.
Setting the \`dismissibleButtonAriaLabel\` input will override the dismissible button aria-label.`;

DismissableAlertLocalized.storyName = 'Dismissible alerts (localized)';
DismissableAlertLocalized.parameters = {
  docs: {
    description: {
      story: dismissableStoryDescriptionLocalized
    }
  }
};
DismissableAlertLocalized.args = {
  ...Primary.args,
  dismissible: true,
  alertTypeTitle: 'Warning',
  dismissibleButtonAriaLabel: 'Hide the message'
};

export const DismissableWithActionsAlert: StoryFn = args => ({
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

export const DismissableWithoutTitleAlert: StoryFn = args => ({
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
