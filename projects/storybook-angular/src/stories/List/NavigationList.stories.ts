/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  BaoIconModule,
  BaoListItem,
  BaoListModule,
  BaoTagModule
} from 'angular-ui';
import { Primary } from './List.stories';

const description = `
A list of utility items is a list composed of complex objects intended for an application or a tool.
`;

const meta = {
  title: 'Components/List/Navigation',
  decorators: [
    moduleMetadata({
      // declarations: [BaoListItem],
      imports: [BaoListModule, BaoIconModule, BaoTagModule]
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
} as Meta<BaoListItem>;

export default meta;

type Story = StoryObj;

export const navigationList: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-nav-list>
      <a bao-list-item href="#">Navigation list 1</a>
      <a bao-list-item href="#">Navigation list 2</a>
    </bao-nav-list>
    `
  }),

  name: 'Navigation list',

  args: {
    ...Primary.args
  }
};

export const navigationListWithLeftIcon: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-nav-list>
      <a bao-list-item href=#>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
      </a>
      <a bao-list-item href=#>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
      </a>
    </bao-nav-list>
    `
  }),

  name: 'Navigation list - Left icon',

  args: {
    ...Primary.args
  }
};

export const navigationListWithRightIcon: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-nav-list>
      <a bao-list-item href=#>
        <span bao-list-item-title>Title</span>
        <bao-icon baoIconTag svgIcon="icon-arrow-right"></bao-icon>
      </a>
      <a bao-list-item href=#>
        <span bao-list-item-title>Title</span>
        <bao-icon baoIconTag svgIcon="icon-arrow-right"></bao-icon>
      </a>
    </bao-nav-list>
    `
  }),

  name: 'Navigation list - Right icon',

  args: {
    ...Primary.args
  }
};

export const navigationListWithTag: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-nav-list>
      <a bao-list-item href=#>
          <span bao-list-item-title>Title</span>
          <bao-tag type="positive"><span>Label</span></bao-tag>
      </a>
      <a bao-list-item href=#>
          <span bao-list-item-title>Title</span>
          <bao-tag type="positive"><span>Label</span></bao-tag>
      </a>
    </bao-nav-list>
    `
  }),

  name: 'Navigation list - Tag',

  args: {
    ...Primary.args
  }
};

export const navigationListWithTagAndIcon: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-nav-list>
      <a bao-list-item href=#>
          <span bao-list-item-title>Title</span>
          <bao-tag type="positive"><span>Label</span></bao-tag>
      </a>
      <a bao-list-item href=#>
          <span bao-list-item-title>Title</span>
          <bao-tag type="positive"><span>Label</span></bao-tag>
      </a>
    </bao-nav-list>
    `
  }),

  name: 'Navigation list - Tag & icon',

  args: {
    ...Primary.args
  }
};

export const navigationListDescription: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-nav-list>
      <a bao-list-item href=#>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <bao-tag type="positive"><span>Label</span></bao-tag>
        <bao-list-item-description>
          <div>Description 1</div>
          <div>Description 2</div>
        </bao-list-item-description>
      </a>
      <a bao-list-item href=#>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <bao-tag type="positive"><span>Label</span></bao-tag>
        <bao-list-item-description>
          <div>Description 1</div>
          <div>Description 2</div>
        </bao-list-item-description>
      </a>
      <a bao-list-item href=#>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <bao-tag type="positive"><span>Label</span></bao-tag>
        <bao-list-item-description>
          <div>Description 1</div>
          <div>Description 2</div>
        </bao-list-item-description>
      </a>
    </bao-nav-list>
    `
  }),

  name: 'Navigation list - Description',

  args: {
    ...Primary.args
  }
};

export const navigationListInlineDescription: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-nav-list>
      <a bao-list-item href=#>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <ul bao-list-item-description>
          <li>Description 1</li>
          <li>Description 2</li>
        </ul>
        <bao-tag type="positive"><span>Label</span></bao-tag>
      </a>
      <a bao-list-item href=#>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <ul bao-list-item-description>
          <li>Description 1</li>
          <li>Description 2</li>
        </ul>
        <bao-tag type="positive"><span>Label</span></bao-tag>
      </a>
      <a bao-list-item href=#>
        <bao-icon baoIconItemType svgIcon="icon-eye"></bao-icon>
        <span bao-list-item-title>Title</span>
        <ul bao-list-item-description>
          <li>Description 1</li>
          <li>Description 2</li>
        </ul>
        <bao-tag type="positive"><span>Label</span></bao-tag>
      </a>
    </bao-nav-list>
    `
  }),

  name: 'Navigation list - Inline Description',

  args: {
    ...Primary.args
  }
};
