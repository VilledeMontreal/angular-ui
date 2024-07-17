/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoFilePreviewComponent,
  BaoDropdownMenuComponent,
  BaoDropdownMenuTrigger,
  BaoDropdownMenuItem,
  BaoDropdownMenuItemLabel,
  BaoButtonComponent,
  BaoIconComponent
} from 'angular-ui';

const description = `
The File component allows users to transfer local files to the system. 

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Fichier](https://zeroheight.com/575tugn0n/p/26da67)".
`;

export default {
  title: 'Components/File/Preview',
  decorators: [
    moduleMetadata({
      declarations: [
        BaoFilePreviewComponent,
        BaoDropdownMenuComponent,
        BaoDropdownMenuTrigger,
        BaoDropdownMenuItem,
        BaoDropdownMenuItemLabel,
        BaoButtonComponent,
        BaoIconComponent
      ],
      imports: [CommonModule, OverlayModule, PortalModule]
    })
  ],
  component: BaoFilePreviewComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    ngAfterContentInit: {
      table: {
        disable: true
      }
    },
    insertGenericIcon: {
      table: {
        disable: true
      }
    },
    thumbnailURL: {
      table: {
        disable: true
      }
    },
    formatSize: {
      table: {
        disable: true
      }
    },
    getSizeAndUnit: {
      table: {
        disable: true
      }
    },
    getThumbnail: {
      table: {
        disable: true
      }
    },
    setIcon: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<BaoFilePreviewComponent> = (
  args: BaoFilePreviewComponent
) => ({
  component: BaoFilePreviewComponent,
  template: `
    <div style="max-width:20rem;">
      <bao-file-preview [file]="file" [isLoading]="isLoading">
        <bao-icon svgIcon="icon-file"></bao-icon>
        <button bao-button type="editorial" level="tertiary" size="medium">
          <bao-icon svgIcon="icon-trash"></bao-icon>
        </button>
      </bao-file-preview>
    </div>
   `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  file: {
    name: 'sample.pdf',
    size: 55555,
    lastModified: 1669754503525,
    type: 'application/pdf',
    webkitRelativePath: ''
  },
  isLoading: false
};

export const filePreviewWithMenu: Story = args => ({
  props: args,
  template: `
      <div style="max-width:20rem;">
        <bao-file-preview [file]="file">
          <bao-icon svgIcon="icon-file"></bao-icon>
          <button bao-button [baoDropdownMenuTriggerFor]="testMenu" type="editorial" level="tertiary" 
            size="medium">
              <bao-icon svgIcon="icon-more-vertical"></bao-icon>
          </button>
          <bao-dropdown-menu #testMenu>
            <ul>
              <li>
                <a bao-dropdown-menu-item>
                  <bao-icon svgIcon="icon-trash"></bao-icon>
                  <bao-dropdown-menu-item-label>Delete</bao-dropdown-menu-item-label>
                </a>
              </li>   
              <li>
                <a bao-dropdown-menu-item>
                  <bao-icon svgIcon="icon-edit"></bao-icon>
                  <bao-dropdown-menu-item-label>Rename</bao-dropdown-menu-item-label>
                </a>
              </li>
            </ul>
          </bao-dropdown-menu>
        </bao-file-preview>
      </div>
  `
});
filePreviewWithMenu.storyName = 'File preview with dropdown menu';
filePreviewWithMenu.args = {
  ...Primary.args
};
