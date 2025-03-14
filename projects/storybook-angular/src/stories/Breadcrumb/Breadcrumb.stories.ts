/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { BaoBreadcrumbComponent, BaoBreadcrumbModule } from 'angular-ui';

const description = `
The breadcrumb trail component allows users to locate themselves within the depth of a website's pages, while keeping a quick access to previous levels they've already visited.

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Fil d'Ariane](https://zeroheight.com/575tugn0n/p/180577)".

## Properties
The breadcrumb component has no properties.

`;

export default {
  title: 'Components/Breadcrumb',
  decorators: [
    moduleMetadata({
      imports: [BaoBreadcrumbModule]
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
    setLastLinkAttribute: {
      table: {
        disable: true
      }
    },
    onContentChange: {
      table: {
        disable: true
      }
    },
    staticContainer: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: StoryFn = (args: BaoBreadcrumbComponent) => ({
  template: `
  <bao-breadcrumb>
    <a href=#>parent page</a>
    <a href=#>parent page</a>
    <a href=#>current page</a>
  </bao-breadcrumb>
 `,
  props: args
});

export const Primary = Template.bind({});
