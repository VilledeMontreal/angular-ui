/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular';
import {
  BaoIconModule,
  BaoButtonModule,
  BaoCommonComponentsModule,
  BaoSummaryComponent,
  BaoSummaryDescription,
  BaoListSummary,
  BaoListSummaryItem
} from 'angular-ui';

const description = `
This component displays the sumamry of an object that can be edited, such as an address or a profile.
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Résumé d'objet](https://zeroheight.com/575tugn0n/p/627489)".
`;

export default {
  title: 'Components/Summary',
  decorators: [
    moduleMetadata({
      declarations: [
        BaoSummaryComponent,
        BaoSummaryDescription,
        BaoListSummary,
        BaoListSummaryItem
      ],
      imports: [BaoIconModule, BaoButtonModule, BaoCommonComponentsModule]
    })
  ],
  component: BaoSummaryComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {
    _uniqueId: {
      table: {
        disable: true
      }
    },
    ariaDescribedby: {
      table: {
        disable: true
      }
    },
    ariaLabelledby: {
      table: {
        disable: true
      }
    },
    compact: {
      table: {
        disable: true
      }
    },
    id: {
      table: {
        disable: true
      }
    },
    buttonEvent: {
      table: {
        disable: true
      }
    },
    ngAfterViewInit: {
      table: {
        disable: true
      }
    },
    ngOnInit: {
      table: {
        disable: true
      }
    },
    onButtonClick: {
      table: {
        disable: true
      }
    },
    setAriaDescribedByToDescription: {
      table: {
        disable: true
      }
    },
    elementNode: {
      table: {
        disable: true
      }
    },
    verifyButtonElementOnNode: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: Story<
  BaoSummaryComponent & { title: string; content: string }
> = (args: BaoSummaryComponent) => ({
  component: BaoSummaryComponent,
  template: `
  <div class="col-12 md-6 md-4">
    <bao-summary id="ID1">
      <bao-label required="true">{{title}}</bao-label>
      <bao-guiding-text>
        {{content}}
      </bao-guiding-text>
      <bao-title-text>{{title}}</bao-title-text>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonText"
      >
        <span>Modifier</span>
      </button>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonIcon"
      >
        <bao-icon title="Modifier" svgIcon="icon-edit"></bao-icon>
      </button>
      <bao-summary-description>
          <p>
              {{content}}
          </p>
      </bao-summary-description>
    </bao-summary>
  </div>
  `,
  props: args
});

export const Primary = Template.bind({});

Primary.args = {
  title: 'Libellé',
  content: 'Content'
};

export const SimpleSummary: Story = args => ({
  props: args,
  template: `
  <div class="col-12 md-6 md-4">
    <bao-summary id="ID1111">
      <bao-label required="true">Libellé</bao-label>

      <bao-guiding-text>
        Texte d’assisance Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Ridiculus tempus arcu neque arcu quisque egestas.
      </bao-guiding-text>
      <bao-title-text>Libellé optionnel</bao-title-text>
      <bao-summary-description>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Diam arcu proin imperdiet cras sed quam bibendum lacus facilisis.
          </p>
      </bao-summary-description>
      <bao-list-summary>
        <bao-list-summary-item>apple</bao-list-summary-item><br/>
        <bao-list-summary-item>pear</bao-list-summary-item><br/>
        <bao-list-summary-item>banana</bao-list-summary-item><br/>
        <bao-list-summary-item>coconut</bao-list-summary-item><br/>
      </bao-list-summary>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonText"
      >
        <span>Modifier</span>
      </button>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonIcon"
      >
        <bao-icon title="Modifier" svgIcon="icon-edit"></bao-icon>
      </button>
    </bao-summary>
  </div>
  `
});
SimpleSummary.storyName = 'Summary - Description - label with list';
SimpleSummary.args = {
  ...Primary.args
};

export const SummaryWithErrorText: Story = args => ({
  props: args,
  template: `
  <div class="col-12 md-6 md-4" >
    <bao-summary id="ID1112">
      <bao-label required="true">Libellé</bao-label>
      <bao-title-text>Libellé Optionnel</bao-title-text>
      <bao-summary-description>
          <p>
            Lorem ipsum dolor sit amet
          </p>
      </bao-summary-description>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonText"
      >
        <span>Modifier</span>
      </button>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonIcon"
      >
        <bao-icon title="Modifier" svgIcon="icon-edit"></bao-icon>
      </button>
      <bao-error>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </bao-error>
    </bao-summary>
  </div>
  `
});
SummaryWithErrorText.storyName =
  'Summary - Description & label with error text';
SummaryWithErrorText.args = {
  ...Primary.args
};

export const SummaryWithHiddenLabel: Story = args => ({
  props: args,
  template: `
  <div class="col-12 md-6 md-4">
    <bao-summary id="ID1112" displayMode="compact">
      <bao-label required="true">Libellé</bao-label>
      <bao-summary-description>
          <p>
            Lorem ipsum dolor sit amet
          </p>
      </bao-summary-description>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonText"
      >
        <span>Modifier</span>
      </button>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonIcon"
      >
        <bao-icon title="Modifier" svgIcon="icon-edit"></bao-icon>
      </button>
    </bao-summary>
  </div>
  `
});
SummaryWithHiddenLabel.storyName =
  'Summary - Description & hidden label [Compact Mode]';
SummaryWithHiddenLabel.args = {
  ...Primary.args
};

export const SummaryWithHiddenLabelWithoutButton: Story = args => ({
  props: args,
  template: `
  <div class="col-12 md-6 md-4">
    <bao-summary id="ID1112" displayMode="compact">
      <bao-label required="true">Libellé</bao-label>
      <bao-summary-description>
          <p>
            Lorem ipsum dolor sit amet
          </p>
      </bao-summary-description>
    </bao-summary>
  </div>
  `
});
SummaryWithHiddenLabelWithoutButton.storyName =
  'Summary - Description & hidden label without button [Compact Mode]';
SummaryWithHiddenLabelWithoutButton.args = {
  ...Primary.args
};

export const SummaryWithHiddenLabelAndButton: Story = args => ({
  props: args,
  template: `
  <div class="col-12 md-6 md-4">
    <bao-summary id="ID1113">
      <bao-label required="true">Libellé</bao-label>
      <bao-summary-description>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Diam arcu proin imperdiet cras sed quam bibendum lacus facilisis.
          </p>
      </bao-summary-description>
    </bao-summary>
  </div>
  `
});
SummaryWithHiddenLabelAndButton.storyName =
  'Summary - Description -  hidden label & button';
SummaryWithHiddenLabelAndButton.args = {
  ...Primary.args
};

export const SummaryWithHiddenLabelErrorText: Story = args => ({
  props: args,
  template: `
  <div class="col-12 md-6 md-4">
    <bao-summary id="ID1114" displayMode="compact">
      <bao-label required="true">Libellé</bao-label>
      <bao-guiding-text>
      Texte d’assisance Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Ridiculus tempus arcu neque arcu quisque egestas.
    </bao-guiding-text>
      <bao-title-text>Libellé optionnel</bao-title-text>
      <bao-summary-description>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Diam arcu proin imperdiet cras sed quam bibendum lacus facilisis.
          </p>
      </bao-summary-description>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonText"
      >
        <span>Modifier</span>
      </button>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonIcon"
      >
        <bao-icon title="Modifier" svgIcon="icon-edit"></bao-icon>
      </button>
      <bao-error>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</bao-error>
    </bao-summary>
  </div>
  `
});
SummaryWithHiddenLabelErrorText.storyName =
  'Summary - Description & hidden label with error text [Compact Mode]';
SummaryWithHiddenLabelErrorText.args = {
  ...Primary.args
};

export const SummaryWithHiddenLabelErrorTextResponsive: Story = args => ({
  props: args,
  template: `
  <div class="col-12 md-6 md-4">
    <bao-summary id="ID1114">
      <bao-label required="true">Libellé</bao-label>
      <bao-guiding-text>
      Texte d’assisance Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Ridiculus tempus arcu neque arcu quisque egestas.
    </bao-guiding-text>
      <bao-title-text>Libellé optionnel</bao-title-text>
      <bao-summary-description>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Diam arcu proin imperdiet cras sed quam bibendum lacus facilisis.
          </p>
      </bao-summary-description>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonText"
      >
        <span>Modifier</span>
      </button>
      <button
        bao-button
        size="medium" 
        level="tertiary" 
        displayType="utility" 
        type="button"
        class="buttonIcon"
      >
        <bao-icon title="Modifier" svgIcon="icon-edit"></bao-icon>
      </button>
      <bao-error>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</bao-error>
    </bao-summary>
  </div>
  `
});
SummaryWithHiddenLabelErrorTextResponsive.storyName =
  'Summary - Description & hidden label with error text [Responsive Mode]';
SummaryWithHiddenLabelErrorTextResponsive.args = {
  ...Primary.args
};
