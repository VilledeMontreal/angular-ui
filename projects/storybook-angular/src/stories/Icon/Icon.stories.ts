/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BaoIconComponent, BaoIconModule } from 'angular-ui';

const description = `
If a color is provided, it will be used as the icon's color. If no color is provided, the default behaviour is to use the parent's text color.
## Documentation
The full documentation of this component is available in the Hochelaga design system documentation under "[Icônes utilitaires](https://zeroheight.com/575tugn0n/p/439e2a)".
`;

export default {
  title: 'Components/Icon',
  decorators: [
    moduleMetadata({
      imports: [BaoIconModule]
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
    addTitleToSVG: {
      table: {
        disable: true
      }
    },
    clearSvgElement: {
      table: {
        disable: true
      }
    },
    generateUniqueTitleId: {
      table: {
        disable: true
      }
    },
    ngOnDestroy: {
      table: {
        disable: true
      }
    },
    setSvgElement: {
      table: {
        disable: true
      }
    },
    updateSvgIcon: {
      table: {
        disable: true
      }
    },
    _elementsWithExternalReferences: {
      table: {
        disable: true
      }
    },
    _svgIcon: {
      table: {
        disable: true
      }
    },
    _title: {
      table: {
        disable: true
      }
    },
    _titleId: {
      table: {
        disable: true
      }
    }
  }
} as Meta;

const Template: StoryFn = (args: BaoIconComponent) => ({
  component: BaoIconComponent,
  template: `
  <div style="display: grid; grid-column-gap: 1rem; grid-template-columns: 2rem 2rem 2rem 2rem 2rem 2rem 2rem 2rem 2rem 2rem">
  <bao-icon [color]="color" [size]="size" title="anchor" svgIcon="icon-anchor"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="apps" svgIcon="icon-apps"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="archive" svgIcon="icon-archive"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="arrow-left" svgIcon="icon-arrow-left"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="arrow-right" svgIcon="icon-arrow-right"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="bell-active" svgIcon="icon-bell-active"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="bell-off" svgIcon="icon-bell-off"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="bell" svgIcon="icon-bell"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="bolt" svgIcon="icon-bolt"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="book" svgIcon="icon-book"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="briefcase" svgIcon="icon-briefcase"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="calendar" svgIcon="icon-calendar"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="cell-phone" svgIcon="icon-cell-phone"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="check-circle-full" svgIcon="icon-check-circle-full"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="check-circle" svgIcon="icon-check-circle"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="check" svgIcon="icon-check"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="chevron-down" svgIcon="icon-chevron-down"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="chevron-left" svgIcon="icon-chevron-left"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="chevron-right" svgIcon="icon-chevron-right"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="chevron-up" svgIcon="icon-chevron-up"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="clipboard" svgIcon="icon-clipboard"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="clock" svgIcon="icon-clock"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="comment" svgIcon="icon-comment"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="cone-fill" svgIcon="icon-cone-fill"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="cone" svgIcon="icon-cone"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="copy" svgIcon="icon-copy"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="copyright" svgIcon="icon-copyright"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="cut" svgIcon="icon-cut"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="delivery" svgIcon="icon-delivery"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="dot-bullet" svgIcon="icon-dot-bullet"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="dot-interpunct" svgIcon="icon-dot-interpunct"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="download" svgIcon="icon-download"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="droplet" svgIcon="icon-droplet"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="duplicate" svgIcon="icon-duplicate"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="edit" svgIcon="icon-edit"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="email" svgIcon="icon-email"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="error" svgIcon="icon-error"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="exclamation" svgIcon="icon-exclamation"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="externallink" svgIcon="icon-externallink"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="eye-off" svgIcon="icon-eye-off"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="eye" svgIcon="icon-eye"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="file-edit" svgIcon="icon-file-edit"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="file-pdf" svgIcon="icon-file-pdf"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="file" svgIcon="icon-file"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="filters" svgIcon="icon-filters"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="flag" svgIcon="icon-flag"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="folder" svgIcon="icon-folder"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="heart" svgIcon="icon-heart"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="help" svgIcon="icon-help"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="home" svgIcon="icon-home"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="image" svgIcon="icon-image"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="info" svgIcon="icon-info"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="key" svgIcon="icon-key"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="layers" svgIcon="icon-layers"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="link" svgIcon="icon-link"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="list" svgIcon="icon-list"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="location" svgIcon="icon-location"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="lock" svgIcon="icon-lock"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="log-in" svgIcon="icon-log-in"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="log-out" svgIcon="icon-log-out"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="map" svgIcon="icon-map"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="menu" svgIcon="icon-menu"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="minus-circle-full" svgIcon="icon-minus-circle-full"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="minus-circle" svgIcon="icon-minus-circle"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="minus" svgIcon="icon-minus"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="money" svgIcon="icon-money"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="more-horizontal" svgIcon="icon-more-horizontal"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="more-vertical" svgIcon="icon-more-vertical"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="music" svgIcon="icon-music"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="package" svgIcon="icon-package"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="paperclip" svgIcon="icon-paperclip"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="partner-bell" svgIcon="icon-partner-bell"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="partner-hydroquebec" svgIcon="icon-partner-hydroquebec"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="phone" svgIcon="icon-phone"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="plus-circle-full" svgIcon="icon-plus-circle-full"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="plus-circle" svgIcon="icon-plus-circle"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="plus" svgIcon="icon-plus"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="position" svgIcon="icon-position"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="print" svgIcon="icon-print"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="refresh" svgIcon="icon-refresh"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="road" svgIcon="icon-road"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="save" svgIcon="icon-save"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="search" svgIcon="icon-search"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="send" svgIcon="icon-send"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="settings" svgIcon="icon-settings"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="share" svgIcon="icon-share"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="shoppingbag" svgIcon="icon-shoppingbag"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="social-facebook" svgIcon="icon-social-facebook"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="social-flickr" svgIcon="icon-social-flickr"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="social-instagram" svgIcon="icon-social-instagram"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="social-linkedin" svgIcon="icon-social-linkedin"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="social-twitter" svgIcon="icon-social-twitter"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="social-youtube" svgIcon="icon-social-youtube"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="star" svgIcon="icon-star"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="steps" svgIcon="icon-steps"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="table" svgIcon="icon-table"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="tag" svgIcon="icon-tag"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="thumb-down-full" svgIcon="icon-thumb-down-full"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="thumb-down" svgIcon="icon-thumb-down"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="thumb-up-full" svgIcon="icon-thumb-up-full"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="thumb-up" svgIcon="icon-thumb-up"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="ticket" svgIcon="icon-ticket"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="trash" svgIcon="icon-trash"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="unlock" svgIcon="icon-unlock"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="upload" svgIcon="icon-upload"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="user-circle" svgIcon="icon-user-circle"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="user" svgIcon="icon-user"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="users" svgIcon="icon-users"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="warning" svgIcon="icon-warning"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="website" svgIcon="icon-website"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="wheelchair" svgIcon="icon-wheelchair"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="x-circle-full" svgIcon="icon-x-circle-full"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="x-circle" svgIcon="icon-x-circle"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="x" svgIcon="icon-x"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="spinner" svgIcon="icon-spinner"></bao-icon>
  <bao-icon [color]="color" [size]="size" title="emergency" svgIcon="icon-emergency"></bao-icon>
</div>
 `,
  props: args
});

export const Primary = Template.bind({});
