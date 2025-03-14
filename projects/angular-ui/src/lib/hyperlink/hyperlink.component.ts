/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

const BAO_ICON = 'bao-icon';
const LINK_ELEMENT = 'a';
const HAS_LEFT_ICON = 'has-left-icon';
const HAS_RIGHT_ICON = 'has-right-icon';
const LIST_PARENT = 'bao-hyperlink-list-parent';

@Component({
  selector: 'bao-hyperlink, [bao-hyperlink]',
  templateUrl: './hyperlink.component.html',
  styleUrls: ['./hyperlink.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-hyperlink',
    '[class.bao-hyperlink-medium]': 'size === "medium"',
    '[class.bao-hyperlink-small]': 'size === "small"',
    '[class.bao-hyperlink-extra-small]': 'size === "extra-small"'
  }
})
export class BaoHyperlinkComponent implements AfterViewInit {
  /**
   * Size of the link when it's in a list.
   */
  @Input() public size?: 'extra-small' | 'small' | 'medium' = 'medium';

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterViewInit() {
    this.setIcon();
    this.addIconClass();
    this.addTabIndex();
  }

  private addTabIndex() {
    if (!this.nativeElement) return;
    const anchorElement = Array.from(this.nativeElement.children).find(
      el => el.localName === 'a'
    );
    if (!anchorElement) return;
    this.renderer.setAttribute(anchorElement, 'tabIndex', '0');
  }

  private setIcon() {
    const parentName = this.nativeElement.parentElement.localName;
    if (parentName === 'ul') {
      this.renderer.addClass(this.nativeElement.parentElement, LIST_PARENT);
    } else {
      // Icon in inline hyperlink must always be positioned after label.
      const children = Array.from(this.nativeElement.children);
      const iconIndex = children.findIndex(c => c.localName === BAO_ICON);
      if (iconIndex > -1) {
        const labelIndex = children.findIndex(
          c => c.localName === LINK_ELEMENT
        );
        // Set icon's size to match text's lineHeight.
        const lineHeight = getComputedStyle(children[labelIndex])['lineHeight'];
        this.renderer.setStyle(children[iconIndex], 'height', lineHeight);
        this.renderer.setStyle(children[iconIndex], 'width', lineHeight);
        if (iconIndex < labelIndex) {
          const iconElement = children[iconIndex];
          this.renderer.removeChild(this.nativeElement, children[iconIndex]);
          this.renderer.appendChild(this.nativeElement, iconElement);
        }
      }
    }
  }

  private addIconClass() {
    const children = Array.from(this.nativeElement.children);
    const iconIndex = children.findIndex(c => c.localName === BAO_ICON);
    if (iconIndex > -1) {
      const labelIndex = children.findIndex(c => c.localName === LINK_ELEMENT);
      const iconClass = iconIndex < labelIndex ? HAS_LEFT_ICON : HAS_RIGHT_ICON;
      this.renderer.addClass(this.nativeElement, iconClass);
    }
  }
}
