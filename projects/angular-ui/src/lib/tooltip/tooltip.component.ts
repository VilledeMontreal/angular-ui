/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { BasePlacement, createPopper, Instance } from '@popperjs/core';
import {
  isPlacement,
  isTextAlign,
  BaoTooltipPlacement,
  BaoTooltipTextAlign
} from './tooltip.model';

export interface IPos {
  top: number;
  left: number;
}
/**
 * Unique ID for each tooltip counter
 */
let baoTooltipNextUniqueId = 0;

@Component({
  selector: 'bao-tooltip',
  templateUrl: 'tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaoTooltipComponent implements OnInit {
  /**
   * The tooltip content
   */
  @Input()
  public content!: string;
  /**
   * The tooltip placement
   */
  @Input()
  public placement!: BaoTooltipPlacement;
  /**
   * The text alignement
   */
  @Input()
  public textAlign!: BaoTooltipTextAlign;
  /**
   * The parent node reference
   */
  @Input()
  public elementRef!: ElementRef;

  delay: number = 150;
  tooltip!: HTMLElement | null;
  offset = 10;
  popperInstance!: Instance;
  private uniqueId = `bao-tooltip-${++baoTooltipNextUniqueId}`;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.placement = this.getPlacementValid(this.placement);
    this.textAlign = this.getTextAlignValid(this.textAlign);
    this.create();
  }

  hide() {
    window.setTimeout(() => {
      this.renderer.removeClass(this.tooltip, 'bao-tooltip');
      this.renderer.removeClass(this.tooltip, `bao-tooltip-${this.textAlign}`);
      this.renderer.removeAttribute(
        this.elementRef.nativeElement,
        'aria-describedby'
      );
      this.renderer.removeAttribute(this.tooltip, 'id');
      this.renderer.removeAttribute(this.tooltip, 'aria-hidden');
      this.renderer.removeChild(document.body, this.tooltip);
      this.popperInstance.destroy();
      this.tooltip = null;
    }, this.delay);
  }

  private getPlacementValid(placement: BaoTooltipPlacement): BaoTooltipPlacement {
    if (isPlacement(placement)) {
      return placement;
    }
    return 'top';
  }

  private getTextAlignValid(textAlign: BaoTooltipTextAlign): BaoTooltipTextAlign {
    if (isTextAlign(textAlign)) {
      return textAlign;
    }
    return 'center';
  }

  private create() {
    const cleanContent = this.removeNotAllowedTags(this.content);
    const domParsed = new DOMParser();
    const element = domParsed.parseFromString(
      `<span>${cleanContent}</span>`,
      'text/html'
    ).body.firstElementChild;
    this.tooltip = this.renderer.createElement('span');
    this.renderer.appendChild(this.tooltip, element);
    this.renderer.appendChild(document.body, this.tooltip);
    this.renderer.addClass(this.tooltip, 'bao-tooltip');
    this.renderer.addClass(this.tooltip, `bao-tooltip-${this.textAlign}`);
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'aria-describedby',
      this.uniqueId
    );
    this.renderer.setAttribute(this.tooltip, 'id', this.uniqueId);
    this.renderer.setAttribute(this.tooltip, 'aria-hidden', 'true');
    this.popperInstance = createPopper(
      this.elementRef.nativeElement,
      this.tooltip,
      {
        placement: this.placement as BasePlacement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, this.offset]
            }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: this.getFallbackPlacements(
                this.placement as BasePlacement
              )
            }
          }
        ]
      }
    );
  }

  /**
   * Return the fallback Placements on overflow depending of the initial placement
   */
  private getFallbackPlacements(initPlacement: BasePlacement): BasePlacement[] {
    switch (initPlacement) {
      case 'bottom':
        return ['right', 'left', 'top'];
      case 'right':
        return ['left', 'top', 'bottom'];
      case 'left':
        return ['top', 'bottom', 'right'];
      default:
        return ['bottom', 'right', 'left'];
    }
  }

  /**
   * Remove all not allowed tags
   * Allowed tags are : "div, b, i, u, p, ol, ul, li, br"
   */
  private removeNotAllowedTags(input: string): string {
    if (!input) return '';
    const allowed = '<div><b><i><u><p><ol><ul><li><br>';
    const allowedLowercase = (
      ((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []
    ).join('');
    const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
    const comments = /<!--[\s\S]*?-->/gi;
    return input.replace(comments, '').replace(tags, function ($0, $1) {
      return allowedLowercase.indexOf('<' + $1.toLowerCase() + '>') > -1
        ? $0
        : '';
    });
  }
}
