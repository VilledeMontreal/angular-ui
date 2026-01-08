/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { CommonModule } from '@angular/common';
import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj
} from '@storybook/angular';
import { BaoTablistComponent, BaoTabsModule } from 'angular-ui';

const description = `
The Tabs component allows to navigate quickly between different views from a same object. 
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Onglet](https://zeroheight.com/575tugn0n/p/86c083)".
`;

const meta = {
  title: 'Components/Tabs',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BaoTabsModule]
    }),
    componentWrapperDecorator(
      story => `<div style="max-width:30rem;">${story}</div>`
    )
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
} as Meta<BaoTablistComponent>;

export default meta;

type Story = StoryObj;

const Template: Story['render'] = args => ({
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

export const Primary = {
  render: Template,

  args: {
    ariaLabel: 'onglets',
    size: 'large'
  }
};

export const TabsSize: Story = {
  render: args => ({
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
  }),

  name: 'Sizes',

  args: {
    ...Primary.args
  }
};
