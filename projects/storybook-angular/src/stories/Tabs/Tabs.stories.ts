/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import {
  BaoTablistComponent,
  BaoTabHeader,
  BaoTabPanel,
  BaoTabsContainer
} from 'angular-ui';

const description = `
The Tabs component allows to navigate quickly between different views from a same object. 
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Onglet](https://zeroheight.com/575tugn0n/p/86c083)".
`;

export default {
  title: 'Components/Tabs',
  decorators: [
    moduleMetadata({
      declarations: [BaoTabHeader, BaoTabPanel, BaoTabsContainer],
      imports: [CommonModule]
    }),
    componentWrapperDecorator(
      story => `<div style="max-width:30rem;">${story}</div>`
    )
  ],
  component: BaoTablistComponent,
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
    setInitialActiveTab: {
      table: {
        disable: true
      }
    },
    setTablistAttributes: {
      table: {
        disable: true
      }
    },
    activeTabIndex: {
      table: {
        disable: true
      }
    },
    uniqueId: {
      table: {
        disable: true
      }
    },
    changeActiveTab: {
      table: {
        disable: true
      }
    },
    leftKeyEvent: {
      table: {
        disable: true
      }
    },
    rightKeyEvent: {
      table: {
        disable: true
      }
    },
    ngAfterContentInit: {
      table: {
        disable: true
      }
    },
    ngOnDestroy: {
      table: {
        disable: true
      }
    },
    tabHeaders: {
      table: {
        disable: true
      }
    },
    activeTabChange: {
      table: {
        disable: true
      }
    },
    getNextActivableTabIndex: {
      table: {
        disable: true
      }
    },
    tabKeyEvent: {
      table: {
        disable: true
      }
    },
    tabShiftKeyEvent: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<BaoTablistComponent> = (args: BaoTablistComponent) => ({
  component: BaoTablistComponent,
  template: `
      <bao-tabs>
        <bao-tablist [ariaLabel]="ariaLabel" [size]="size">
          <button bao-tab-header>
            Tab #1
          </button>
          <button bao-tab-header>
            Tab #2
          </button>
          <button bao-tab-header disabled>
            Tab #3 (disabled)
          </button>
        </bao-tablist>
        <bao-panel><p>This is the content for tab #1.</p></bao-panel>
        <bao-panel><p>And this is the content for tab #2.</p></bao-panel>
        <bao-panel><p>This content is undisplayable.</p></bao-panel>
      </bao-tabs>
   `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  ariaLabel: 'onglets',
  size: 'large'
};

export const TabsSize: Story = args => ({
  props: args,
  template: `
      <bao-tabs>
        <bao-tablist size="large" style="margin-bottom:2rem;">
          <button bao-tab-header>
            Tab #1
          </button>
          <button bao-tab-header>
            Tab #2
          </button>
          <button bao-tab-header>
            Tab #3
          </button>
        </bao-tablist>
        <bao-panel></bao-panel>
        <bao-panel></bao-panel>
        <bao-panel></bao-panel>
      </bao-tabs>
      <bao-tabs>
        <bao-tablist size="medium" style="margin-bottom:2rem;">
          <button bao-tab-header>
            Tab #1
          </button>
          <button bao-tab-header>
            Tab #2
          </button>
          <button bao-tab-header>
            Tab #3
          </button>
        </bao-tablist>
        <bao-panel></bao-panel>
        <bao-panel></bao-panel>
        <bao-panel></bao-panel>
      </bao-tabs>
      <bao-tabs>
        <bao-tablist size="small">
          <button bao-tab-header>
            Tab #1
          </button>
          <button bao-tab-header>
            Tab #2
          </button>
          <button bao-tab-header>
            Tab #3
          </button>
        </bao-tablist>
        <bao-panel></bao-panel>
        <bao-panel></bao-panel>
        <bao-panel></bao-panel>
      </bao-tabs>
      `
});
TabsSize.storyName = 'Sizes';
TabsSize.args = {
  ...Primary.args
};
