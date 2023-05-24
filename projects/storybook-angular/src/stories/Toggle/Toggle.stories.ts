/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoToggleComponent,
  BaoToggleModule,
  BaoCommonComponentsModule
} from 'angular-ui';

const description = `
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Interrupteur](https://zeroheight.com/575tugn0n/p/63ca9f-interrupteur)".
`;

export default {
  title: 'Components/Toggle',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [BaoToggleModule, BaoCommonComponentsModule]
    })
  ],
  component: BaoToggleComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {}
} as Meta;

const Template: Story<BaoToggleComponent & { label: string }> = (
  args: BaoToggleComponent
) => ({
  component: BaoToggleComponent,
  template: `
  <bao-toggle id="ID1" name="name"
  [disabled]="disabled"
  [checked]="checked"
  [hiddenLabel]="hiddenLabel"
  >
    {{label}}
  </bao-toggle>
 `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  label: 'Label'
};

export const ToggleSimple: Story = args => ({
  props: args,
  template: `
    <bao-toggle id="ID20" name="name20">
    Interrupteur supplémentaire non fontionnel en position 1
    </bao-toggle>
    <bao-toggle id="ID21" name="name21">
      Interrupteur OFF
    </bao-toggle>
    <bao-toggle id="ID22" name="name22" [checked]="true">
      Interrupteur ON
    </bao-toggle>
    <bao-toggle id="ID23" name="name23" [disabled]="true">
      Interrupteur OFF désactivé
    </bao-toggle>
    <bao-toggle id="ID24" name="name24" [checked]="true" [disabled]="true">
      Interrupteur ON désactivé
    </bao-toggle>
  `
});

ToggleSimple.storyName = 'Example with Label';
ToggleSimple.args = {
  ...Primary.args
};

export const ToggleLongLabel: Story = args => ({
  props: args,
  template: `
    <bao-toggle id="ID30" name="name30">
    Interrupteur supplémentaire non fontionnel en position 1
    </bao-toggle>
    <bao-toggle id="ID31" name="name31">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </bao-toggle>
    <bao-toggle id="ID32" name="name32" [checked]="true">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </bao-toggle>
    <bao-toggle id="ID33" name="name33" [disabled]="true">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </bao-toggle>
    <bao-toggle id="ID34" name="name34" [checked]="true" [disabled]="true">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </bao-toggle>
  `
});

ToggleLongLabel.storyName = 'Example with long Label';
ToggleLongLabel.args = {
  ...Primary.args
};

export const ToggleHidden: Story = args => ({
  props: args,
  template: `
    <bao-toggle id="ID41" name="name41" [hiddenLabel]="true">
      Interrupteur supplémentaire avec un libellé invisible non fontionnel en position 1
    </bao-toggle>
    <bao-toggle id="ID412" name="name411" [hiddenLabel]="true">
      Interrupteur OFF avec un libellé invisible
    </bao-toggle>
    <bao-toggle id="ID42" name="name42" [checked]="true" [hiddenLabel]="true">
      Interrupteur ON avec un libellé invisible
    </bao-toggle>
    <bao-toggle id="ID43" name="name43" [disabled]="true" [hiddenLabel]="true">
      Interrupteur OFF désactivé avec un libellé invisible
    </bao-toggle>
    <bao-toggle id="ID44" name="name44" [disabled]="true" [checked]="true" [hiddenLabel]="true">
      Interrupteur ON désactivé avec un libellé invisible
    </bao-toggle>
  `
});

ToggleHidden.storyName = 'Example with hidden Label';
ToggleHidden.args = {
  ...Primary.args
};
