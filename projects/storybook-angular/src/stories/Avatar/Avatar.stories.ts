/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BaoAvatarComponent, BaoAvatarModule } from 'angular-ui';

const description = `
Avatar are used to display a representation of a user's profile. 

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Avatar](https://zeroheight.com/575tugn0n/p/34e9ae)".
`;

const meta = {
  title: 'Components/Avatar',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BaoAvatarModule]
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
} as Meta<BaoAvatarComponent>;
export default meta;

type Story = StoryObj;

const Template: Story['render'] = args => ({
  template: `
    <bao-avatar [color]="color" [profileName]="profileName">
      <span bao-avatar-content>aa</span>
    </bao-avatar>
   `,
  props: args
});

export const Primary = {
  render: Template,

  args: {
    color: 'background-color-1',
    profileName: 'Jean Tremblay'
  }
};

export const AvatarDefault: Story = {
  render: args => ({
    props: args,
    template: `
        <bao-avatar [profileName]="profileName"></bao-avatar>
        `
  }),

  name: 'Avatar with icon - Default',

  args: {
    ...Primary.args
  }
};

export const AvatarWithImage: Story = {
  render: args => ({
    props: args,
    template: `
        <bao-avatar [profileName]="profileName">
          <img bao-avatar-content src="https://picsum.photos/768/768?image=1074">
        </bao-avatar>
        `
  }),

  name: 'Avatar with image',

  args: {
    ...Primary.args
  }
};
