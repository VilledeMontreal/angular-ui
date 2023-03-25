/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { BaoTooltipComponent } from './tooltip.component';
import { BaoTooltipPlacement, BaoTooltipTextAlign } from './tooltip.model';

@Directive({
  selector: '[bao-tooltip]'
})
export class BaoTooltipDirective implements OnInit, OnDestroy {
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

  componentRef!: ComponentRef<BaoTooltipComponent>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.createComponent();
  }

  ngOnDestroy(): void {
    this.viewContainerRef.clear();
  }

  @HostListener('mouseenter') private onMouseEnter() {
    this.componentRef.instance.show = true;
  }

  @HostListener('mouseleave') private onMouseLeave() {
    window.setTimeout(() => {
      this.componentRef.instance.show = false;
    }, 200);
  }

  @HostListener('focus') private onFocus() {
    this.componentRef.instance.show = true;
  }

  @HostListener('focusout') private onFocusOut() {
    this.componentRef.instance.show = false;
  }

  private createComponent() {
    this.componentRef =
      this.viewContainerRef.createComponent(BaoTooltipComponent);
    this.componentRef.instance.placement = this.placement;
    this.componentRef.instance.content = this.content;
    this.componentRef.instance.textAlign = this.textAlign;
    this.componentRef.instance.parentRef = this.elementRef;
    this.componentRef.onDestroy(() => {
      this.componentRef.instance.destroy();
    });
  }
}
