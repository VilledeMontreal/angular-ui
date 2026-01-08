/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  BaoBreadcrumbComponent,
  BaoHeaderInfoComponent,
  BaoHeaderInfoModule
} from 'angular-ui';

const description = `
Header info is used to present the title of a page and must contain an h1 tag.

## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[En-tête informationnelle](https://zeroheight.com/575tugn0n/p/72c668)".
`;

const meta = {
  title: 'Components/Header/HeaderInfo',
  decorators: [
    moduleMetadata({
      declarations: [BaoBreadcrumbComponent],
      imports: [BaoHeaderInfoModule]
    })
  ],
  component: BaoHeaderInfoComponent,
  parameters: {
    docs: {
      description: {
        component: description
      }
    }
  },
  argTypes: {}
} as Meta<BaoHeaderInfoComponent>;

export default meta;

type Story = StoryObj;

const Template: Story['render'] = args => ({
  component: BaoHeaderInfoComponent,
  template: `
    <bao-header-info [brandBorder]="brandBorder" [notch]="notch" [imageUrl]="imageUrl">
        <bao-header-info-title-group>
            <h1 bao-header-info-title>{{title}}</h1>
            <bao-header-info-subtitle>{{subtitle}}</bao-header-info-subtitle>
        </bao-header-info-title-group>
    </bao-header-info>
 `,
  props: args
});

export const Primary = {
  render: Template,

  args: {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    subtitle: 'Sous-titre optionnel',
    imageUrl:
      'https://res.cloudinary.com/villemontreal/image/upload/q_auto,f_auto,dpr_auto/v1570212188/portail/background/texture-large-undeground.png',
    brandBorder: true,
    notch: 'left'
  }
};

export const HeaderInfo: Story = {
  render: args => ({
    props: args,
    template: `
      <bao-header-info [brandBorder]="true">
      <bao-header-info-title-group>
        <h1 bao-header-info-title>Lorem ipsum dolor</h1>
      </bao-header-info-title-group>
      <bao-header-info-content>
        <div class="badge badge-info">libele</div>
      </bao-header-info-content>
    </bao-header-info>
      `
  }),

  name: 'Header Info',

  args: {
    ...Primary.args
  }
};

export const HeaderInfoComplex: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-header-info imageUrl="https://res.cloudinary.com/villemontreal/image/upload/q_auto,f_auto,dpr_auto/v1570212188/portail/background/texture-large-undeground.png">
      <bao-header-info-title-group>
        <bao-header-info-surtitle>Sur-titre optionnel</bao-header-info-surtitle>
        <h1 bao-header-info-title>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h1>
      </bao-header-info-title-group>
      <bao-header-info-content>
        <div class="form-group form-group-lg">
          <div class="input-group-icon input-group-icon-left">
            <input
              type="text"
              class="form-control input-rounded"
              id="input-group-search"
              placeholder="Rechercher ..."
              aria-label="Rechercher"
            />
            <span class="icon icon-search" aria-hidden="true"></span>
          </div>
        </div>
        <div class="quick-links">
          <span class="quick-links-label">Recherche rapide</span>
          <ul class="list-inline">
            <li class="list-inline-item"><a href="#">Libellé</a></li>
            <li class="list-inline-item"><a href="#">Libellé</a></li>
            <li class="list-inline-item"><a href="#">Libellé</a></li>
          </ul>
        </div> 
      </bao-header-info-content>
    </bao-header-info>
      `
  }),

  name: 'Header Info - search',

  args: {
    ...Primary.args
  }
};

export const HeaderInfoBreadcrumb: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-header-info imageUrl="https://res.cloudinary.com/villemontreal/image/upload/q_auto,f_auto,dpr_auto/v1573672979/portail/background/EnteteVitrine_Quartier.png">
      <bao-header-info-title-group>
        <bao-breadcrumb>
          <a href=#>parent page</a>
          <a href=#>parent page</a>
          <a href=#>current page</a>
        </bao-breadcrumb>
        <h1 bao-header-info-title>Lorem ipsum dolor.</h1>
      </bao-header-info-title-group>
    </bao-header-info>
      `
  }),

  name: 'Header Info - breadcrumb',

  args: {
    ...Primary.args
  }
};

export const HeaderInfoCenterNotch: Story = {
  render: args => ({
    props: args,
    template: `
    <bao-header-info notch="center" imageUrl="https://res.cloudinary.com/villemontreal/image/upload/q_auto,f_auto,dpr_auto/v1570212188/portail/background/texture-large-undeground.png">
      <bao-header-info-title-group>
        <h1 bao-header-info-title>Lorem ipsum dolor.</h1>
      </bao-header-info-title-group>
    </bao-header-info>
      `
  }),

  name: 'Header Info - center notch',

  args: {
    ...Primary.args
  }
};
