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
// import { BaoToggleExampleComponent } from 'projects/storybook-angular-examples/src/app/toggle/form/toggle-example.component';
// import { BaoToggleReactiveFormExampleComponent } from 'projects/storybook-angular-examples/src/app/toggle/reactiveForm/toggle-example.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  component: BaoToggleComponent,
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

// // // export const ToggleSimple: Story = args => ({
// // //   props: args,
// // //   template: `
// // //   <bao-toggle-group>
// // //     <legend required="true" bao-label>Liste d'options</legend>
// // //     <bao-toggle id="ID11111222" name="name">
// // //       Label
// // //     </bao-toggle>
// // //     <bao-toggle id="ID22222211" name="name2" [checked]="true">
// // //       Label (checked)
// // //     </bao-toggle>
// // //     <bao-toggle id="ID33333222" name="name3" [indeterminate]="true">
// // //       Label (indeterminate)
// // //     </bao-toggle>
// // //     <bao-toggle id="ID4444443333" name="name4" [disabled]="true">
// // //       Label (disabled)
// // //     </bao-toggle>
// // //   </bao-toggle-group>
// // //   `
// // // });
// // // ToggleSimple.storyName = 'Toggle - Simple';
// // // ToggleSimple.args = {
// // //   ...Primary.args
// // // };

// export const InlineToggleWithGuidingText: Story = args => ({
//   props: args,
//   template: `
//     <legend bao-label>Exemple d'interrupteur</legend>
//     <bao-toggle id="ID1" name="name1">
//       Label
//     </bao-toggle>
//     <bao-toggle id="ID2" name="name2" checked="true">
//       Label (on)
//     </bao-toggle>
//     <bao-toggle id="ID3" name="name3" hiddenLabel="true">
//       Label (hiddenLabel)
//     </bao-toggle>
//     <bao-toggle id="ID4" name="name4" disabled="true">
//       Label (disabled)
//     </bao-toggle>
//   `
// });
// InlineToggleWithGuidingText.storyName = "Exemple d'interrupteur";
// InlineToggleWithGuidingText.args = {
//   ...Primary.args
// };

// // // export const ToggleDescriptionError: Story = args => ({
// // //   props: args,
// // //   template: `
// // //   <bao-toggle-group>
// // //     <legend required="true" bao-label>Liste d'options avec erreur</legend>
// // //     <bao-toggle id="ID1111111111" name="name11111" brandBorder="true">
// // //       Label
// // //       <bao-toggle-description>Est est et dolores dolore sed justo ipsum et sit.</bao-toggle-description>
// // //     </bao-toggle>
// // //     <bao-toggle id="ID2222222" name="name2222" brandBorder="true" checked="true">
// // //       Label (checked)
// // //       <bao-toggle-description>Est est et dolores dolore sed justo ipsum et sit.</bao-toggle-description>
// // //     </bao-toggle>
// // //     <bao-toggle id="ID3333333" name="name3333" brandBorder="true" indeterminate="true">
// // //       Label (indeterminate)
// // //       <bao-toggle-description>Est est et dolores dolore sed justo ipsum et sit.</bao-toggle-description>
// // //     </bao-toggle>
// // //     <bao-toggle id="ID44444444" name="name44444" brandBorder="true" disabled="true">
// // //       Label (disabled)
// // //       <bao-toggle-description>Est est et dolores dolore sed justo ipsum et sit.</bao-toggle-description>
// // //     </bao-toggle>
// // //     <bao-error>Erreur pour le groupe</bao-error>
// // //   </bao-toggle-group>
// // //   `
// // // });
// // // ToggleDescriptionError.storyName = 'Toggle - Description & error';
// // // ToggleDescriptionError.args = {
// // //   ...Primary.args
// // // };

// // // export const ToggleDescriptionHiddenLabel: Story = args => ({
// // //   props: args,
// // //   template: `
// // //   <bao-toggle-group>
// // //     <legend required="true" bao-label>Liste d'options avec l'étiquette invisble</legend>
// // //     <bao-toggle id="ID11" name="name1" brandBorder="true" hiddenLabel="true">
// // //       Label
// // //       <bao-toggle-description>Est est et dolores dolore sed justo ipsum et sit.</bao-toggle-description>
// // //     </bao-toggle>
// // //     <bao-toggle id="ID22" name="name2" brandBorder="true" checked="true" hiddenLabel="true">
// // //       Label (checked)
// // //       <bao-toggle-description>Est est et dolores dolore sed justo ipsum et sit.</bao-toggle-description>
// // //     </bao-toggle>
// // //     <bao-toggle id="ID33" name="name3" brandBorder="true" indeterminate="true" hiddenLabel="true">
// // //       Label (indeterminate)
// // //       <bao-toggle-description>Est est et dolores dolore sed justo ipsum et sit.</bao-toggle-description>
// // //     </bao-toggle>
// // //     <bao-toggle id="ID44" name="name4" brandBorder="true" disabled="true" hiddenLabel="true">
// // //       Label (disabled)
// // //       <bao-toggle-description>Est est et dolores dolore sed justo ipsum et sit.</bao-toggle-description>
// // //     </bao-toggle>
// // //   </bao-toggle-group>
// // //   `
// // // });
// // // ToggleDescriptionHiddenLabel.storyName =
// // //   'Toggle - Description & hidden label';
// // // ToggleDescriptionHiddenLabel.args = {
// // //   ...Primary.args
// // // };

// // // export const ToggleExample: Story = args => ({
// // //   props: args,
// // //   template: `
// // //     <bao-toggle-example></bao-toggle-example>
// // //   `
// // // });
// // // ToggleExample.storyName = 'Basic example';
// // // ToggleExample.args = {
// // //   ...Primary.args
// // // };

// // // export const ToggleReactiveExample: Story = args => ({
// // //   props: args,
// // //   template: `
// // //     <bao-toggle-reactive-form-example></bao-toggle-reactive-form-example>
// // //   `
// // // });
// // // ToggleReactiveExample.storyName = 'Toggle - Reactive form example';
// // // ToggleReactiveExample.args = {
// // //   ...Primary.args
// // // };
