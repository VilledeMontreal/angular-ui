/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoSystemHeaderComponent,
  BaoBackNavigationInsert,
  BaoBackNavigationComponent,
  BaoDropdownMenuComponent,
  BaoDropdownMenuTrigger,
  BaoDropdownMenuItemLabel,
  BaoDropdownMenuItem,
  BaoIconComponent,
  BaoBreadcrumbComponent,
  BaoButtonComponent,
  BaoTagComponent
} from 'angular-ui';

const description = `
The System Header pattern is used to display the title of a page from an internal service. It can also serve as a secondary navigation tool. 

## Documentation
The full documentation of this pattern is available in the Hochelaga design system documentation under "[En-tête de système](https://zeroheight.com/575tugn0n/p/461f9f-en-tete-de-systeme)".
`;

export default {
  title: 'Patterns/SystemHeader',
  decorators: [
    moduleMetadata({
      declarations: [
        BaoBackNavigationInsert,
        BaoBackNavigationComponent,
        BaoDropdownMenuComponent,
        BaoDropdownMenuTrigger,
        BaoDropdownMenuItemLabel,
        BaoDropdownMenuItem,
        BaoIconComponent,
        BaoBreadcrumbComponent,
        BaoButtonComponent,
        BaoTagComponent
      ],
      imports: [CommonModule]
    })
  ],
  component: BaoSystemHeaderComponent,
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
    textContainer: {
      table: {
        disable: true
      }
    },
    applySizeClass: {
      table: {
        disable: true
      }
    },
    formatNavigation: {
      table: {
        disable: true
      }
    },
    ngOnInit: {
      table: {
        disable: true
      }
    },
    backButtonInsert: {
      table: {
        disable: true
      }
    },
    screenType: {
      table: {
        disable: true
      }
    },
    screenSize: {
      description:
        'This property is JUST AN EXAMPLE to visualize how buttons should be displayed based on screen size. Host application should manage itself the responsiveness for buttons.',
      options: ['mobile', 'tablet', 'desktop'],
      control: { type: 'radio' }
    }
  }
} as Meta;

const Template: Story = args => ({
  props: args,
  template: `
    <bao-system-header>
      <bao-breadcrumb>
        <a href="#">parent page</a>
        <a href="#">parent page</a>
        <a href="#">current page</a>
      </bao-breadcrumb>
      <h1>This is a system header</h1>
      <bao-tag>
        <span>Label</span>
      </bao-tag>
      <span>Additional informations</span>
      <ng-template [ngIf]="screenSize === 'desktop'">
        <button
        bao-button
        [baoDropdownMenuTriggerFor]="testMenu1"
        level="tertiary"
        >
          <bao-icon svgIcon="icon-more-vertical"></bao-icon>
        </button>
        <bao-dropdown-menu #testMenu1>
          <ul>
            <li>
              <a bao-dropdown-menu-item>
              <bao-dropdown-menu-item-label>Tertiary action</bao-dropdown-menu-item-label>
              </a>
            </li>
          </ul>
        </bao-dropdown-menu>
        <button bao-button type="button" level="secondary">
          Secondary action
        </button>
        <button bao-button type="button" level="primary">
          Primary action
        </button>
      </ng-template>
      <ng-template [ngIf]="screenSize === 'tablet'">
        <button
        bao-button
        [baoDropdownMenuTriggerFor]="testMenu1"
        level="tertiary"
        >
          <bao-icon svgIcon="icon-more-vertical"></bao-icon>
        </button>
        <bao-dropdown-menu #testMenu1>
          <ul>
            <li>
              <a bao-dropdown-menu-item>
              <bao-dropdown-menu-item-label>Secondary action</bao-dropdown-menu-item-label>
              </a>
            </li>
            <li>
              <a bao-dropdown-menu-item>
              <bao-dropdown-menu-item-label>Tertiary action</bao-dropdown-menu-item-label>
              </a>
            </li>
          </ul>
        </bao-dropdown-menu>
        <button bao-button type="button" level="primary">
          Primary action
        </button>
      </ng-template>
      <ng-template [ngIf]="screenSize === 'mobile'">
        <button
        bao-button
        [baoDropdownMenuTriggerFor]="testMenu1"
        level="tertiary"
        >
          <bao-icon svgIcon="icon-more-vertical"></bao-icon>
        </button>
        <bao-dropdown-menu #testMenu1>
          <ul>
            <li>
              <a bao-dropdown-menu-item>
              <bao-dropdown-menu-item-label>Primary action</bao-dropdown-menu-item-label>
              </a>
            </li>
            <li>
              <a bao-dropdown-menu-item>
              <bao-dropdown-menu-item-label>Secondary action</bao-dropdown-menu-item-label>
              </a>
            </li>
            <li>
              <a bao-dropdown-menu-item>
              <bao-dropdown-menu-item-label>Tertiary action</bao-dropdown-menu-item-label>
              </a>
            </li>
          </ul>
        </bao-dropdown-menu>
      </ng-template>
    </bao-system-header>
    `
});

export const Primary = Template.bind({});

Primary.args = {
  screenSize: 'desktop'
};

export const SimpleSystemHeader: Story = args => ({
  props: args,
  template: `
    <bao-system-header>
      <a href="#">
        <bao-icon
          color="action"
          title="arrow-left"
          svgIcon="icon-arrow-left"
          size="x-small"
        ></bao-icon>
      </a>
      <h1>This is a system header</h1>
      <button bao-button type="button" level="primary">
          Primary action
      </button>
    </bao-system-header>
  `
});
SimpleSystemHeader.args = {
  ...Primary.args
};
