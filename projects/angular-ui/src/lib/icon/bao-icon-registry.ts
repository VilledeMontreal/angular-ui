/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS_DCT } from './icons-dictionary';

const SVG_PREFIX = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">`;
const SVG_SUFFIX = `</svg>`;

@Injectable({ providedIn: 'root' })
export class BaoIconDictionary {
  constructor(
    @Inject(DOCUMENT) private document: any,
    private domSanitizer: DomSanitizer
  ) {}

  public getNamedSvgIcon(iconName: string): SVGElement {
    const rawIconString = this.getRawIconStringFromIconName(iconName);
    const literal = this.domSanitizer.bypassSecurityTrustHtml(rawIconString);
    const svgString = this.domSanitizer.sanitize(SecurityContext.HTML, literal);
    return this.svgElementFromString(svgString || '');
  }

  private getRawIconStringFromIconName(iconName: string) {
    const iconSvgPath = ICONS_DCT[iconName] || '';
    return `${SVG_PREFIX}${iconSvgPath}${SVG_SUFFIX}`;
  }

  private svgElementFromString(svgString: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgString;
    const svg = div.querySelector('svg') as SVGElement;
    return svg;
  }
}
