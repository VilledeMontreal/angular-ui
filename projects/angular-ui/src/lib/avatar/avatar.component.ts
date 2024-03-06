/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

@Directive({
  selector: 'bao-avatar-content, [bao-avatar-content]',
  exportAs: 'baoAvatarContent',
  host: {
    class: 'bao-avatar-content'
  }
})
export class BaoAvatarContent {}

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const SVG_PROFILE_ICON =
  "<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='12' fill='#DEE2E6'/><path fill-rule='evenodd' clip-rule='evenodd' d='M20.6328 20.3314C18.4504 22.5932 15.3877 24 11.9964 24C8.60514 24 5.54243 22.5932 3.36 20.3314C3.99242 18.9554 5.38284 18 6.99642 18H16.9964C18.61 18 20.0004 18.9554 20.6328 20.3314ZM17.9964 10C17.9964 13.3137 15.3101 16 11.9964 16C8.68272 16 5.99642 13.3137 5.99642 10C5.99642 6.68629 8.68272 4 11.9964 4C15.3101 4 17.9964 6.68629 17.9964 10Z' fill='#ADB2BD'/></svg>";
const SCREEN_READER_CLASS_NAME = 'sr-only';
const SPAN_TEXT_PROPERTY = 'textContent';
@Component({
  selector: 'bao-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-avatar',
    '[class.bao-avatar-color-1]': 'color === "background-color-1"',
    '[class.bao-avatar-color-2]': 'color === "background-color-2"',
    '[class.bao-avatar-color-3]': 'color === "background-color-3"',
    '[class.bao-avatar-color-4]': 'color === "background-color-4"',
    '[class.bao-avatar-color-5]': 'color === "background-color-5"',
    '[class.bao-avatar-color-6]': 'color === "background-color-6"',
    '[class.bao-avatar-color-7]': 'color === "background-color-7"',
    '[class.bao-avatar-color-8]': 'color === "background-color-8"',
    '[class.bao-avatar-color-9]': 'color === "background-color-9"',
    '[class.bao-avatar-color-10]': 'color === "background-color-10"'
  }
})
export class BaoAvatarComponent implements AfterViewInit {
  /**
   * Name of the profile to be used as title of the avatar.
   */
  @Input() public profileName = 'Avatar du profil';

  /**
   * ID of the background color to be used if avatar's content is text.
   */
  @Input() public color:
    | 'background-color-1'
    | 'background-color-2'
    | 'background-color-3'
    | 'background-color-4'
    | 'background-color-5'
    | 'background-color-6'
    | 'background-color-7'
    | 'background-color-8'
    | 'background-color-9'
    | 'background-color-10' = 'background-color-1';

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    if (!this.nativeElement.childNodes.length) {
      this.addIcon();
    }
    if (this.nativeElement.firstChild.nodeName === 'SPAN') {
      this.formatInitials(this.nativeElement.firstChild);
    }
    this.setProfileName(this.profileName, this.nativeElement.firstChild);
  }

  private addIcon(): void {
    const div = this.renderer.createElement('DIV');
    div.innerHTML = SVG_PROFILE_ICON;
    const svg = div.querySelector('svg') as SVGElement;
    const titleNode = this.renderer.createElement('title', SVG_NAMESPACE);
    const titleText = this.renderer.createText(this.profileName);
    this.renderer.appendChild(titleNode, titleText);
    this.renderer.insertBefore(svg, titleNode, svg.firstChild);
    this.renderer.appendChild(this.nativeElement, svg);
  }

  private setProfileName(name: string, content: Node): void {
    switch (content.nodeName) {
      case 'IMG':
        this.renderer.setAttribute(content, 'alt', name);
        break;
      case 'SPAN':
        this.renderer.setAttribute(content, 'aria-hidden', 'true');
        const screenReaderSpan = this.renderer.createElement('span');
        this.renderer.setProperty(screenReaderSpan, SPAN_TEXT_PROPERTY, name);
        this.renderer.addClass(screenReaderSpan, SCREEN_READER_CLASS_NAME);
        this.renderer.insertBefore(
          this.nativeElement,
          screenReaderSpan,
          content
        );
        break;
    }
  }

  private formatInitials(content: Node): void {
    this.renderer.setValue(
      content.firstChild,
      content.firstChild.nodeValue.slice(0, 2)
    );
    this.renderer.addClass(this.nativeElement, 'display-color');
  }
}
