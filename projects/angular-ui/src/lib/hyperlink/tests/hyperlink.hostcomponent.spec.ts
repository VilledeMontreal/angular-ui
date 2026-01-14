/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component } from '@angular/core';

@Component({
  standalone: false,
  template: `
    <bao-hyperlink [size]="size">
      <a href="#"> a hyperlink!</a>
    </bao-hyperlink>
  `
})
export class TestHyperlinkHostComponent {
  size: string;
}

@Component({
  standalone: false,
  template: `
    <bao-hyperlink [size]="size">
      <bao-icon svgIcon="icon-externallink" title="navigation link"></bao-icon>
      <a href="#"> hyperlink </a>
    </bao-hyperlink>
  `
})
export class TestHyperlinkInlineIconHostComponent {
  size: string;
}

@Component({
  standalone: false,
  template: `
    <ul>
      <li bao-hyperlink [size]="size">
        <bao-icon
          svgIcon="icon-externallink"
          title="navigation link"
        ></bao-icon>
        <a href="#"> hyperlink </a>
      </li>
      <li bao-hyperlink [size]="size">
        <a href="#"> hyperlink </a>
        <bao-icon
          svgIcon="icon-externallink"
          title="navigation link"
        ></bao-icon>
      </li>
    </ul>
  `
})
export class TestHyperlinkListIconHostComponent {
  size: string;
}

@Component({
  standalone: false,
  template: `
    <ul>
      <li bao-hyperlink [size]="size">
        <a href="#"> This is a hyperlink!</a>
      </li>
      <li bao-hyperlink [size]="size">
        <a href="#"> This is a hyperlink!</a>
      </li>
    </ul>
  `
})
export class TestHyperlinkListHostComponent {
  size: string;
}
