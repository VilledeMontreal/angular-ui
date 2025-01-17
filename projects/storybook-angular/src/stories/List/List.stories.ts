/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoAvatarModule,
  BaoButtonModule,
  BaoCheckboxModule,
  BaoDropdownMenuModule,
  BaoIconModule,
  BaoListItem,
  BaoListModule,
  BaoRadioModule,
  BaoTagModule
} from 'angular-ui';

const description = `
A list of utility items is a list composed of complex objects intended for an application or a tool.
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Listes d'objets utilitaires](https://zeroheight.com/575tugn0n/p/658ba3)".
`;

export default {
  title: 'Components/List',
  decorators: [
    moduleMetadata({
      // declarations: [BaoListItem],
      imports: [
        BaoListModule,
        BaoIconModule,
        BaoTagModule,
        CommonModule,
        BaoDropdownMenuModule,
        BaoButtonModule,
        BaoAvatarModule,
        BaoCheckboxModule,
        BaoRadioModule,
        OverlayModule,
        PortalModule
      ]
    })
  ],
  component: BaoListItem,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {}
} as Meta;

const Template: Story<BaoListItem & { content: string }> = (
  args: BaoListItem
) => ({
  component: BaoListItem,
  template: `
    <bao-list>
      <bao-list-item>{{content}}</bao-list-item>
      <bao-list-item>{{content}}</bao-list-item>
    </bao-list>
 `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  content: 'content'
};

export const SimpleListWithLeftIcon: Story = args => ({
  props: args,
  template: `
    <bao-list>
      <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
      </bao-list-item>
      <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
      </bao-list-item>
    </bao-list>
    `
});
SimpleListWithLeftIcon.storyName = 'Simple list - Left icon';
SimpleListWithLeftIcon.args = {
  ...Primary.args
};

export const SimpleListWithRightIcon: Story = args => ({
  props: args,
  template: `
    <bao-list>
      <bao-list-item>
        <span bao-list-item-title>Title</span>
        <bao-icon baoIconTag svgIcon="icon-check"></bao-icon>
      </bao-list-item>
      <bao-list-item>
        <span bao-list-item-title>Title</span>
        <bao-icon baoIconTag svgIcon="icon-check"></bao-icon>
      </bao-list-item>
    </bao-list>
    `
});
SimpleListWithRightIcon.storyName = 'Simple list - Right icon';
SimpleListWithRightIcon.args = {
  ...Primary.args
};

export const SimpleListWithTag: Story = args => ({
  props: args,
  template: `
    <bao-list>
      <bao-list-item>
          <span bao-list-item-title>Title</span>
          <bao-tag type="positive"><span>Label</span></bao-tag>
      </bao-list-item>
      <bao-list-item>
          <span bao-list-item-title>Title</span>
          <bao-tag type="positive"><span>Label</span></bao-tag>
      </bao-list-item>
    </bao-list>
    `
});
SimpleListWithTag.storyName = 'Simple list - Tag';
SimpleListWithTag.args = {
  ...Primary.args
};

export const SimpleListWithTagAndIcon: Story = args => ({
  props: args,
  template: `
  <bao-list>
    <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <bao-tag type="positive"><span>Label</span></bao-tag>
    </bao-list-item>
    <bao-list-item>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <bao-tag type="alert"><bao-icon svgIcon="icon-warning"></bao-icon><span>Non vérifié</span></bao-tag>
    </bao-list-item>
  </bao-list>
  `
});
SimpleListWithTagAndIcon.storyName = 'Simple list - Tag & Icon';
SimpleListWithTagAndIcon.args = {
  ...Primary.args
};

export const SimpleListWithDescription: Story = args => ({
  props: args,
  template: `
  <bao-list>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <bao-tag type="positive"><span>Label</span></bao-tag>
      <bao-list-item-description>
        <div>Description 1</div>
        <div>Description 2</div>
      </bao-list-item-description>
    </bao-list-item>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <bao-tag type="positive"><span>Label</span></bao-tag>
      <bao-list-item-description>
        <div>Description 1</div>
        <div>Description 2</div>
      </bao-list-item-description>
    </bao-list-item>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <bao-tag type="alert"><bao-icon svgIcon="icon-warning"></bao-icon><span>Non vérifié</span></bao-tag>
      <bao-list-item-description>
        <div>Description 1</div>
        <div>Description 2</div>
      </bao-list-item-description>
    </bao-list-item>
  </bao-list>
  `
});
SimpleListWithDescription.storyName = 'Simple list - Description';
SimpleListWithDescription.args = {
  ...Primary.args
};

export const SimpleListWithInlineDescription: Story = args => ({
  props: args,
  template: `
  <bao-list>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <ul bao-list-item-description>
        <li>Description 1</li>
        <li>Description 2</li>
      </ul>
      <bao-tag type="positive"><span>Label</span></bao-tag>
    </bao-list-item>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <ul bao-list-item-description>
        <li>Description 1</li>
        <li>Description 2</li>
      </ul>
      <bao-tag type="positive"><span>Label</span></bao-tag>
    </bao-list-item>
    <bao-list-item>
      <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
      <span bao-list-item-title>Title</span>
      <ul bao-list-item-description>
        <li>Description 1</li>
        <li>Description 2</li>
      </ul>
      <bao-tag type="alert"><bao-icon svgIcon="icon-warning"></bao-icon><span>Non vérifié</span></bao-tag>
    </bao-list-item>
  </bao-list>
  `
});
SimpleListWithInlineDescription.storyName = 'Simple list - Inline Description';
SimpleListWithInlineDescription.args = {
  ...Primary.args
};

export const SimpleListWithDropdownMenu: Story = args => ({
  props: args,
  template: `
    <bao-list>
      <bao-list-item>
          <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
          <span bao-list-item-title>Title</span>
          <ul bao-list-item-description>
            <li>Description 1</li>
            <li>Description 2</li>
          </ul>
          <bao-tag type="positive"><span>Label</span></bao-tag>
          <button bao-button [baoDropdownMenuTriggerFor]="menu1" type="editorial" level="tertiary" 
            size="medium"  aria-label="Cliquer pour voir les actions">
            <bao-icon svgIcon="icon-more-vertical"></bao-icon>
          </button>
          <bao-dropdown-menu #menu1>
            <ul>
                <li>
                  <a bao-dropdown-menu-item>
                      <bao-dropdown-menu-item-label>Libellé 1A</bao-dropdown-menu-item-label>
                  </a>
                </li>
                <li>
                  <a bao-dropdown-menu-item>
                      <bao-dropdown-menu-item-label>Libellé 1B</bao-dropdown-menu-item-label>
                  </a>
                </li>
                <li>
                  <a bao-dropdown-menu-item>
                      <bao-dropdown-menu-item-label>Libellé 1C</bao-dropdown-menu-item-label>
                  </a>
                </li>
            </ul>
          </bao-dropdown-menu>
      </bao-list-item>
      <bao-list-item>
          <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
          <span bao-list-item-title>Title</span>
          <ul bao-list-item-description>
            <li>Description 1</li>
            <li>Description 2</li>
          </ul>
          <bao-tag type="alert">
            <bao-icon svgIcon="icon-warning"></bao-icon>
            <span>Non vérifié</span>
          </bao-tag>
          <button bao-button [baoDropdownMenuTriggerFor]="menu2" type="editorial" level="tertiary" 
            size="medium" aria-label="Cliquer pour voir les actions">
            <bao-icon svgIcon="icon-more-vertical"></bao-icon>
          </button>
          <bao-dropdown-menu #menu2>
            <ul>
                <li>
                  <a bao-dropdown-menu-item>
                      <bao-dropdown-menu-item-label>Libellé 2A</bao-dropdown-menu-item-label>
                  </a>
                </li>
                <li>
                  <a bao-dropdown-menu-item>
                      <bao-dropdown-menu-item-label>Libellé 2B</bao-dropdown-menu-item-label>
                  </a>
                </li>
                <li>
                  <a bao-dropdown-menu-item>
                      <bao-dropdown-menu-item-label>Libellé 2C</bao-dropdown-menu-item-label>
                  </a>
                </li>
            </ul>
          </bao-dropdown-menu>
      </bao-list-item>
      <bao-list-item>
          <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
          <span bao-list-item-title>Title</span>
          <ul bao-list-item-description>
            <li>Description 1</li>
            <li>Description 2</li>
          </ul>
          <button bao-button [baoDropdownMenuTriggerFor]="menu3" type="editorial" level="tertiary" 
            size="medium" aria-label="Cliquer pour voir les actions">
            <bao-icon svgIcon="icon-more-vertical"></bao-icon>
          </button>
          <bao-dropdown-menu #menu3>
            <ul>
                <li>
                  <a bao-dropdown-menu-item>
                      <bao-dropdown-menu-item-label>Libellé 3A</bao-dropdown-menu-item-label>
                  </a>
                </li>
                <li>
                  <a bao-dropdown-menu-item>
                      <bao-dropdown-menu-item-label>Libellé 3B</bao-dropdown-menu-item-label>
                  </a>
                </li>
                <li>
                  <a bao-dropdown-menu-item>
                      <bao-dropdown-menu-item-label>Libellé 3C</bao-dropdown-menu-item-label>
                  </a>
                </li>
            </ul>
          </bao-dropdown-menu>
      </bao-list-item>
    </bao-list>
  `
});
SimpleListWithDropdownMenu.storyName = 'Simple list - Dropdown menu';
SimpleListWithDropdownMenu.args = {
  ...Primary.args
};

export const SimpleListWithActionButton: Story = args => ({
  props: args,
  template: `
    <bao-list>
      <bao-list-item>
          <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
          <span bao-list-item-title>Title</span>
          <ul bao-list-item-description>
            <li>Description 1</li>
            <li>Description 2</li>
          </ul>
          <bao-tag type="positive"><span>Label</span></bao-tag>
          <button bao-button type="editorial" level="tertiary" 
            size="medium" aria-label="Supprimer cet élément">
            <bao-icon svgIcon="icon-trash"></bao-icon>
          </button>
      </bao-list-item>
      <bao-list-item>
          <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
          <span bao-list-item-title>Title</span>
          <ul bao-list-item-description>
            <li>Description 1</li>
            <li>Description 2</li>
          </ul>
          <bao-tag type="alert">
            <bao-icon svgIcon="icon-warning"></bao-icon>
            <span>Non vérifié</span>
          </bao-tag>
          <button bao-button type="editorial" level="tertiary" 
            size="medium" aria-label="Éditer cet élément">
            <bao-icon svgIcon="icon-edit"></bao-icon>
          </button>
      </bao-list-item>
      <bao-list-item>
          <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
          <span bao-list-item-title>Title</span>
          <ul bao-list-item-description>
            <li>Description 1</li>
            <li>Description 2</li>
          </ul>
          <button bao-button type="editorial" level="tertiary" 
            size="medium" aria-label="Éditer cet élément">
            <bao-icon svgIcon="icon-edit"></bao-icon>
          </button>
      </bao-list-item>
    </bao-list>
  `
});
SimpleListWithActionButton.storyName = 'Simple list - Action button';
SimpleListWithActionButton.args = {
  ...Primary.args
};
