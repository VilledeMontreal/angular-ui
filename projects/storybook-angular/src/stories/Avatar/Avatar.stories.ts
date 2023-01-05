/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BaoAvatarComponent, BaoAvatarContent } from 'angular-ui';

const description = `
Avatar are used to display a representation of a user's profile. 

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Avatar](https://zeroheight.com/575tugn0n/p/34e9ae)".
`;

export default {
  title: 'Components/Avatar',
  decorators: [
    moduleMetadata({
      declarations: [BaoAvatarContent],
      imports: [CommonModule]
    })
  ],
  component: BaoAvatarComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    ngAfterViewInit: {
      table: {
        disable: true
      }
    },
    addIcon: {
      table: {
        disable: true
      }
    },
    formatInitials: {
      table: {
        disable: true
      }
    },
    setProfileName: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<BaoAvatarComponent> = (args: BaoAvatarComponent) => ({
  component: BaoAvatarComponent,
  template: `
    <bao-avatar [color]="color" [profileName]="profileName">
      <span bao-avatar-content>aa</span>
    </bao-avatar>
   `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  color: 'background-color-1',
  profileName: 'Jean Tremblay'
};

export const AvatarDefault: Story = args => ({
  props: args,
  template: `
      <bao-avatar [profileName]="profileName"></bao-avatar>
      `
});
AvatarDefault.storyName = 'Avatar with icon - Default';
AvatarDefault.args = {
  ...Primary.args
};

export const AvatarWithImage: Story = args => ({
  props: args,
  template: `
      <bao-avatar [profileName]="profileName">
        <img bao-avatar-content src="https://picsum.photos/768/768?image=1074">
      </bao-avatar>
      `
});
AvatarWithImage.storyName = 'Avatar with image';
AvatarWithImage.args = {
  ...Primary.args
};
