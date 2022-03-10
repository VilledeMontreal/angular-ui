/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

const SPAN = 'span';
const SPAN_TEXT_PROPERTY = 'textContent';
const SCREEN_READER_CLASS_NAME = 'sr-only';
const BAO_ICON = 'bao-icon';
const HAS_ICON = 'has-icon';

@Component({
  selector: 'bao-tag, [bao-tag], [baoTag]',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-tag',
    '[class.bao-tag-neutral-light]':
      'type === "neutral" && variant === "light"',
    '[class.bao-tag-neutral-strong]':
      'type === "neutral" && variant === "strong"',
    '[class.bao-tag-info-light]': 'type === "info" && variant === "light"',
    '[class.bao-tag-info-strong]': 'type === "info" && variant === "strong"',
    '[class.bao-tag-positive-light]':
      'type === "positive" && variant === "light"',
    '[class.bao-tag-positive-strong]':
      'type === "positive" && variant === "strong"',
    '[class.bao-tag-alert-light]': 'type === "alert" && variant === "light"',
    '[class.bao-tag-alert-strong]': 'type === "alert" && variant === "strong"',
    '[class.bao-tag-negative-light]':
      'type === "negative" && variant === "light"',
    '[class.bao-tag-negative-strong]':
      'type === "negative" && variant === "strong"'
  }
})
export class BaoTagComponent implements AfterViewInit {
  /**
   * The color of the tag.
   */
  @Input() public type: 'neutral' | 'info' | 'positive' | 'alert' | 'negative' =
    'neutral';

  /**
   * The shade of the tags color.
   */
  @Input() public variant: 'light' | 'strong' = 'light';

  /**
   * The hidden text for screen readers.
   */
  @Input() public hiddenText = 'Étiquette';

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterViewInit() {
    this.addHiddenText();
    this.addIconClass();
  }

  private addHiddenText() {
    const screenReaderSpan = this.renderer.createElement(SPAN);
    this.renderer.setProperty(
      screenReaderSpan,
      SPAN_TEXT_PROPERTY,
      this.hiddenText
    );
    this.renderer.addClass(screenReaderSpan, SCREEN_READER_CLASS_NAME);
    const labelChild = Array.from(this.nativeElement.children).find(
      c => c.localName === SPAN
    );
    this.renderer.insertBefore(
      this.nativeElement,
      screenReaderSpan,
      labelChild
    );
  }

  private addIconClass() {
    const children = Array.from(this.nativeElement.children);
    if (children.some(c => c.localName === BAO_ICON)) {
      this.renderer.addClass(this.nativeElement, HAS_ICON);
    }
  }
}
