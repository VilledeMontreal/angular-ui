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
  ViewEncapsulation,
} from '@angular/core';
import { BasePlacement, createPopper, Instance } from '@popperjs/core';
import {
  isPlacement,
  isTextAlign,
  BaoTooltipPlacement,
  BaoTooltipTextAlign,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-tooltip',
    '[class.bao-tooltip-show]': 'show',
    '[class.bao-tooltip-center]': 'textAlign==="center"',
    '[class.bao-tooltip-left]': 'textAlign==="left"',
    '[class.bao-tooltip-right]': 'textAlign==="right"',
  },
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
  public parentRef!: ElementRef;

  offset = 10;
  popperInstance!: Instance;
  private _show = false;
  private uniqueId = `bao-tooltip-${++baoTooltipNextUniqueId}`;

  constructor(private renderer: Renderer2, private tooltipRef: ElementRef) {}

  /**
   * show or Hide tooltip
   */
  @Input()
  get show() {
    return this._show;
  }

  set show(value: boolean) {
    if (value !== this.show) {
      this._show = value;
      if (value) {
        this.renderer.setAttribute(
          this.tooltipRef.nativeElement,
          'aria-hidden',
          'false'
        );
      } else {
        this.renderer.setAttribute(
          this.tooltipRef.nativeElement,
          'aria-hidden',
          'true'
        );
      }
    }
  }

  ngOnInit() {
    this.placement = this.getPlacementValid(this.placement);
    this.textAlign = this.getTextAlignValid(this.textAlign);
    this.create();
  }

  destroy() {
    this.popperInstance.destroy();
  }

  /**
   * Valid the input placement an return a valid value (default top)
   */
  private getPlacementValid(
    placement: BaoTooltipPlacement
  ): BaoTooltipPlacement {
    if (isPlacement(placement)) {
      return placement;
    }
    return 'top';
  }

  /**
   * Valid the input textAlign an return a valid value (default center)
   */
  private getTextAlignValid(
    textAlign: BaoTooltipTextAlign
  ): BaoTooltipTextAlign {
    if (isTextAlign(textAlign)) {
      return textAlign;
    }
    return 'center';
  }

  /**
   * Prepare the content
   * Set some attributes
   * create the popper
   */
  private create() {
    this.cleanContentAndAddToTooltipRef();
    // Set the aria-describedby attribute on parent element ref
    this.renderer.setAttribute(
      this.parentRef.nativeElement,
      'aria-describedby',
      this.uniqueId
    );
    // Set the id attribute on tooltip element ref
    this.renderer.setAttribute(
      this.tooltipRef.nativeElement,
      'id',
      this.uniqueId
    );
    // Set the initial aria-hidden attribute on tooltip element ref
    this.renderer.setAttribute(
      this.tooltipRef.nativeElement,
      'aria-hidden',
      'true'
    );
    // create the popper
    this.popperInstance = createPopper(
      this.parentRef.nativeElement,
      this.tooltipRef.nativeElement,
      {
        placement: this.placement as BasePlacement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, this.offset],
            },
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: this.getFallbackPlacements(
                this.placement as BasePlacement
              ),
            },
          },
        ],
      }
    );
  }

  /**
   * Clean the content (HTML content)
   * Add content to tooltip ElementRef
   */
  private cleanContentAndAddToTooltipRef() {
    const cleanContent = this.removeNotAllowedTags(this.content);
    const domParsed = new DOMParser();
    const element = domParsed.parseFromString(
      `<span>${cleanContent}</span>`,
      'text/html'
    ).body.firstElementChild;
    this.renderer.appendChild(this.tooltipRef.nativeElement, element);
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
