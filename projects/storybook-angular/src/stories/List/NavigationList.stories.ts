/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
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

export default {
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
} as Meta;

export const navigationList: StoryFn = args => ({
  props: args,
  template: `
  <bao-nav-list>
    <a bao-list-item href="#">Navigation list 1</a>
    <a bao-list-item href="#">Navigation list 2</a>
  </bao-nav-list>
  `
});
navigationList.storyName = 'Navigation list';
navigationList.args = {
  ...Primary.args
};

export const navigationListWithLeftIcon: StoryFn = args => ({
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
});
navigationListWithLeftIcon.storyName = 'Navigation list - Left icon';
navigationListWithLeftIcon.args = {
  ...Primary.args
};

export const navigationListWithRightIcon: StoryFn = args => ({
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
});
navigationListWithRightIcon.storyName = 'Navigation list - Right icon';
navigationListWithRightIcon.args = {
  ...Primary.args
};

export const navigationListWithTag: StoryFn = args => ({
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
});
navigationListWithTag.storyName = 'Navigation list - Tag';
navigationListWithTag.args = {
  ...Primary.args
};

export const navigationListWithTagAndIcon: StoryFn = args => ({
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
});
navigationListWithTagAndIcon.storyName = 'Navigation list - Tag & icon';
navigationListWithTagAndIcon.args = {
  ...Primary.args
};

export const navigationListDescription: StoryFn = args => ({
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
});
navigationListDescription.storyName = 'Navigation list - Description';
navigationListDescription.args = {
  ...Primary.args
};

export const navigationListInlineDescription: StoryFn = args => ({
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
});
navigationListInlineDescription.storyName =
  'Navigation list - Inline Description';
navigationListInlineDescription.args = {
  ...Primary.args
};
