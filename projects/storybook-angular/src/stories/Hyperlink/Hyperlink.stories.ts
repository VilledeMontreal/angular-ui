/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata, Meta, StoryFn } from '@storybook/angular';
import {
  BaoHyperlinkComponent,
  BaoHyperlinkModule,
  BaoIconModule
} from 'angular-ui';

const description = `
Hyperlinks allow navigation between the various pages of a digital product.

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Hyperlink](https://zeroheight.com/575tugn0n/p/09cec1)".
`;

export default {
  title: 'Components/Hyperlink',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BaoHyperlinkModule, BaoIconModule]
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
    setIcon: {
      table: {
        disable: true
      }
    },
    addIconClass: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: StoryFn = (args: BaoHyperlinkComponent) => ({
  template: `
    <ul>
      <li bao-hyperlink [size]="size">
        <a href=#> This is a list of hyperlinks.</a>
      </li>
      <li bao-hyperlink [size]="size">
        <a href=#> This is a list of hyperlinks.</a>
      </li>
      <li bao-hyperlink [size]="size">
        <a href=#> This is a list of hyperlinks.</a>
      </li>
    </ul>
   `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {};

export const hyperlinkInline: StoryFn = args => ({
  props: args,
  template: `
    <span style="line-height:24px;">
      This is a line of text and here we have
        <bao-hyperlink>
          <a href=#> a hyperlink!</a>
        </bao-hyperlink>
      Note that inline hyperlinks' size is not affected by the size input.
    </span>
      `
});
hyperlinkInline.storyName = 'Hyperlink inline';
hyperlinkInline.args = {
  ...Primary.args
};

export const hyperlinkWithIcon: StoryFn = args => ({
  props: args,
  template: `
    <span style="line-height:1.5rem;">
      This
        <bao-hyperlink>
          <a href=#> hyperlink </a>
          <bao-icon svgIcon="icon-externallink"></bao-icon>
        </bao-hyperlink>
      also has an icon.
    </span>
      `
});
hyperlinkWithIcon.storyName = 'Hyperlink inline - With icon';
hyperlinkWithIcon.args = {
  ...Primary.args
};

export const hyperlinksList: StoryFn = args => ({
  props: args,
  template: `
    <div style="margin-bottom:1rem">
      <ul>
        <li bao-hyperlink size="extra-small">
          <a href=#> This is a hyperlink!</a>
          <bao-icon svgIcon="icon-externallink"></bao-icon>
        </li>
        <li bao-hyperlink size="extra-small">
          <a href=#> This is a hyperlink!</a>
          <bao-icon svgIcon="icon-externallink"></bao-icon>
        </li>
        <li bao-hyperlink size="extra-small">
          <a href=#> This is a hyperlink!</a>
          <bao-icon svgIcon="icon-externallink"></bao-icon>
        </li>
      </ul>
    </div>
    <div style="margin-bottom:1rem">
      <ul>
        <li bao-hyperlink size="small">
          <bao-icon svgIcon="icon-warning"></bao-icon>
          <a href=#> This is a hyperlink!</a>
        </li>
        <li bao-hyperlink size="small">
          <bao-icon svgIcon="icon-warning"></bao-icon>
          <a href=#> This is a hyperlink!</a>
        </li>
        <li bao-hyperlink size="small">
          <bao-icon svgIcon="icon-warning"></bao-icon>
          <a href=#> This is a hyperlink!</a>
        </li>
      </ul>
    </div>
    <ul>
      <li bao-hyperlink size="medium">
        <a href=#> This is a hyperlink!</a>
      </li>
      <li bao-hyperlink size="medium">
        <a href=#> This is a hyperlink!</a>
      </li>
      <li bao-hyperlink size="medium">
        <a href=#> This is a hyperlink!</a>
      </li>
    </ul>
      `
});
hyperlinksList.storyName = 'List of hyperlinks - Size';
hyperlinksList.args = {
  ...Primary.args
};
