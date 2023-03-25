/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Meta, Story } from '@storybook/angular/types-6-0';
import { BaoTooltipDirective, BaoButtonModule } from 'angular-ui';

// const description = `
// ## Documentation
// The full documentation of this component is available in the Hochelaga design system documentation under "[Info-bulle](https://zeroheight.com/575tugn0n/p/156564-info-bulle)".
// `;
const description = `
Floating labels that briefly explain the function of an interface element.

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Info-bulle](https://zeroheight.com/575tugn0n/p/156564-info-bulle)".

## Placements and text alignment
To modify the placement of the tooltip

* \`top\` for positionning the tooltip on top of the parent element
* \`right\` for positionning the tooltip on right of the parent element
* \`bottom\` for positionning the tooltip on bottom of the parent element
* \`left\` for positionning the tooltip on left of the parent element

To modify the text alignment of the text in the tooltip

* \`center\` for positionning the tooltip on center of the parent element
* \`left\` for positionning the tooltip on left of the parent element
* \`right\` for positionning the tooltip on right of the parent element

## Special text in the tooltip

It's possible to use html tags to format text in the tooltip.  The allowed tags are    
\`<div>\` \`<b>\` \`<i>\` \`<u>\` \`<p>\` \`<ol>\` \`<ul>\` \`<li>\` \`<br>\`
<br><br><br>
`;
export default {
  title: 'Directives/Tooltip',
  component: BaoTooltipDirective,
  argTypes: {
    placement: {
      options: ['top', 'right', 'left', 'bottom'],
      control: { type: 'radio' },
    },
    textAlign: {
      options: ['right', 'left', 'center'],
      control: { type: 'radio' },
    },
    content: {
      name: 'bao-tooltip',
      description: 'The tooltip selector is bind with the directive input "content". Must contain a value of type<br><code>string</code>'
    },
    "bao-tooltip": {
      table: {
        disable: true
      }
    },
    createComponent: {
      table: {
        disable: true
      }
    },
    componentRef: {
      table: {
        disable: true
      }
    },
    ngOnDestroy: {
      table: {
        disable: true
      }
    },
    ngOnInit: {
      table: {
        disable: true
      }
    },
    onFocus: {
      table: {
        disable: true
      }
    },
    onFocusOut: {
      table: {
        disable: true
      }
    },
    onMouseEnter: {
      table: {
        disable: true
      }
    },
    onMouseLeave: {
      table: {
        disable: true
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  }
} as Meta<BaoTooltipDirective>;

const template: Story<BaoTooltipDirective> = (args: BaoTooltipDirective) => ({
  props: {
    content: args.content,
    placement: args.placement,
    textAlign: args.textAlign
  },
  template: `
  <div style="height: 120px; text-align: center; padding-top: 48px">
     <span [bao-tooltip]="content" [placement]="placement" [textAlign]="textAlign" >Hover over me</span>
  </div>
  `
});

export const Primary = template.bind({});

Primary.args = {
  content: 'You must provide a tooltip content'
};

export const TooltipPlacementAndTextAlign: Story = () => ({
  //   props: args,
  moduleMetadata: {
    declarations: [BaoTooltipDirective],
    imports: [BaoButtonModule]
  },
  template: `
  <h4>Placement on TOP and text align CENTER</h4>
  <button bao-button bao-tooltip="A beautiful tooltip on the <b><i>top</i></b> with text align <b><i>center</i></b>" placement="top" textAlign="center">Try me</button>
  <h4 style="margin-top: 1.5rem;">Placement on RIGHT and text align LEFT</h4>
  <button bao-button bao-tooltip="A beautiful tooltip on the <b><i>right</i></b> with text align <b><i>left</i></b>" placement="right" textAlign="left">Try me</button>
  <h4 style="margin-top: 1.5rem;">Placement on BOTTOM and text align RIGHT</h4>
  <button bao-button bao-tooltip="A beautiful tooltip on the <b><i>bottom</i></b> with text align <b><i>right</i></b>" placement="bottom" textAlign="right">Try me</button>
  <h4 style="margin-top: 1.5rem;">Placement on LEFT and text align CENTER by default</h4>
  <button bao-button bao-tooltip="A beautiful tooltip on the <b><i>left</i></b> with text align <b><i>center by default</i></b>" placement="left">Try me</button>
  <h4 style="margin-top: 1.5rem;">Placement on TOP (default) and text align CENTER (default)</h4>
  <button bao-button bao-tooltip="A beautiful tooltip on the <b><i>top by default</i></b> with text align <b><i>center by default</i></b>">Try me</button>
  `
});

TooltipPlacementAndTextAlign.storyName = 'Placements and text alignments';
TooltipPlacementAndTextAlign.args = {
  ...Primary.args
};

export const TooltipOnDifferentTags: Story = () => ({
  //   props: args,
  moduleMetadata: {
    declarations: [BaoTooltipDirective],
    imports: [BaoButtonModule]
  },
  template: `
  <h4 >Tooltip on a part of the texte</h4>
  <p>A tooltip <span bao-tooltip="A beautiful tooltip" placement="top" textAlign="center">THIS PART</span> on a part of the text</p>

  <h4 style="margin-top: 1.5rem;">Tooltip on a div with a 100% width</h4>
  <div bao-tooltip="A beautiful tooltip">Try me all over the width</div>

  <h4 style="margin-top: 1.5rem;">Tooltip on a native input field</h4>
  <input bao-tooltip="A beautiful tooltip on a native input field"/>

  <h4 style="margin-top: 1.5rem;">Tooltip on a bao-button (work on all bao component)</h4>
  <button bao-button bao-tooltip="A beautiful tooltip on a bao-button">Try me</button>

  <h4 style="margin-top: 1.5rem;">Tooltip with special text</h4>
  <pre style="margin-bottom: 1rem">HTML tags accepted are &lt;div&gt; &lt;b&gt; &lt;i&gt; &lt;u&gt; &lt;p&gt; &lt;ol&gt; &lt;ul&gt; &lt;li&gt; &lt;br&gt;</pre>
  <span bao-tooltip="A beautiful tooltip that accept <b>bold</b> or <i>italic</i> or <u>underline</u> or 
  <b><i><u>All together</b></i></u><br>accept line break<br><br><br>
  Bulleted lists <ul style='text-align: left;'><li>first</li><li>second bullet with long description</li></ul>
  Ordered list <ol style='text-align: left;'><li>first</li><li>second</li></ol>" 
  placement="right" textAlign="left">Hover over me</span>
  `
});

TooltipOnDifferentTags.storyName = 'Different tags and special content';
TooltipOnDifferentTags.args = {
  ...Primary.args
};
