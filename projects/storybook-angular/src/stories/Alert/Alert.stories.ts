// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BaoAlertActions, BaoAlertComponent, BaoAlertContent, BaoAlertLink, BaoAlertTitle, BaoButtonComponent, BaoIconComponent } from 'core-components-angular-lib';


const description = `
Alerts are used to display an important message and optional related **actions**.

## Colors and icons
To modify the color (and icon) of an alert, the \`type\` input property must be used.

* \`success\` for a positive alert
* \`danger\` for a negative alert
* \`warning\` for a warning alert
* \`info\` for an informational alert

`

export default {
  title: 'Components/Alert',
  decorators: [
    moduleMetadata({
      declarations: [BaoAlertContent, BaoAlertTitle, BaoAlertActions, BaoAlertLink, BaoIconComponent, BaoButtonComponent],
      imports: [CommonModule],
    }),
  ],
  component: BaoAlertComponent,
  parameters: {
    docs: {
      description: {
        component: description
      },
    },
  },
  argTypes: {
    alertTitleIcon: {
      table: {
        disable: true,
      },
    },
    alertTypeIcon: {
      table: {
        disable: true,
      },
    },
    ngOnChanges: {
      table: {
        disable: true,
      },
    },
    type: {
      options: ['success', 'danger', 'warning', ''],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: Story<BaoAlertComponent & { title: string, content: string }> = (args: BaoAlertComponent) => ({
  component: BaoAlertComponent,
  template: `
  <bao-alert [type]="type" [showIcon]="showIcon" [dismissible]="dismissible">
    <bao-alert-title>{{title}}</bao-alert-title>
    <bao-alert-content [innerHTML]="content">
    </bao-alert-content>
  </bao-alert>
 `,
  props: args,
});

export const Primary = Template.bind({});

Primary.args = {
  type: 'info',
  showIcon: true,
  dismissible: false,
  title: 'The alert\'s title',
  content: 'Alert message with <a href="#" bao-alert-link>an optional link</a> if needed.'
};


export const DismissableAlert: Story = (args) => ({
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
  `,
});

const dismissableStoryDescription = `
Setting the \`dismissible\` input to \`true\` will add a dismiss button to the top right of the alert. Clicking on the button will result in the
the component emitting a \`dismiss\` event that the parent component will be able to handle.`


DismissableAlert.storyName = 'Dismissible alerts';
DismissableAlert.parameters = {
  docs: {
    description: {
      story: dismissableStoryDescription,
    },
  },
}
DismissableAlert.args = {
  ...Primary.args,
  dismissible: true
};

export const DismissableWithActionsAlert: Story = (args) => ({
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
  `,
});


DismissableWithActionsAlert.storyName = 'Alerts with actions';

DismissableWithActionsAlert.args = {
  ...Primary.args,
  dismissible: true
};

export const DismissableWithoutTitleAlert: Story = (args) => ({
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
  `,
});


DismissableWithoutTitleAlert.storyName = 'Alerts without title';

DismissableWithoutTitleAlert.args = {
  ...Primary.args,
  dismissible: true
};
