/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  ViewContainerRef
} from '@angular/core';
import { BaoTooltipComponent } from './tooltip.component';
import { BaoTooltipPlacement, BaoTooltipTextAlign } from './tooltip.model';

@Directive({
  selector: '[bao-tooltip]'
})
export class BaoTooltipDirective {
  /**
   * The tooltip selector `bao-tooltip` is bind with the directive input `content`.
   */
  @Input('bao-tooltip')
  content: string = 'You must provide a tooltip content';
  /**
   * To specify where the tooltip will appear relative to the parent `top` `right` `left` `bottom`
   */
  @Input()
  placement: BaoTooltipPlacement = 'top';
  /**
   * To specify how the text will be align in the tooltip `left` `right` `center`
   */
  @Input()
  textAlign: BaoTooltipTextAlign = 'center';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef
  ) {}

  @HostListener('mouseenter') private onMouseEnter() {
    this.createComponent();
  }

  @HostListener('mouseleave') private onMouseLeave() {
    this.clearComponent();
  }

  @HostListener('focus') private onFocus() {
    this.createComponent();
  }

  @HostListener('focusout') private onFocusOut() {
    this.clearComponent();
  }

  private clearComponent() {
    this.viewContainerRef.clear();
  }

  private createComponent() {
    const componentRef =
      this.viewContainerRef.createComponent(BaoTooltipComponent);
    componentRef.instance.placement = this.placement;
    componentRef.instance.content = this.content;
    componentRef.instance.textAlign = this.textAlign;
    componentRef.instance.elementRef = this.elementRef;
    componentRef.onDestroy(() => {
      componentRef.instance.hide();
    });
  }
}
