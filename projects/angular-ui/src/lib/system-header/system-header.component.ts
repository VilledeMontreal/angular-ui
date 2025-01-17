/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { Breakpoints } from '../core';

/**
 * This component is dynamically added to replace breadcrumb when System Header is viewed on tablet or mobile screens.
 * Used internally by BaoSystemHeaderComponent only, not to be used by host application.
 */
@Component({
  selector: 'bao-back-navigation-component',
  template: ` <a>
    <bao-icon
      color="action"
      title="arrow-left"
      svgIcon="icon-arrow-left"
      size="x-small"
    ></bao-icon>
  </a>`,
  host: {
    class: 'bao-system-header-back-button'
  }
})
export class BaoBackNavigationComponent implements OnChanges {
  @Input() link: string;
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['link'] && changes['link'].currentValue) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement.children[0],
        'href',
        changes['link'].currentValue
      );
    }
  }
}

/**
 * This directive is to mark the template where the BaoBackNavigationComponent should be dynamically inserted,
 * when a Breadcrumb component needs to be replaced
 */
@Directive({
  selector: '[backNavigationInsert]'
})
export class BaoBackNavigationInsert {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'bao-system-header',
  templateUrl: './system-header.component.html',
  styleUrls: ['./system-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-system-header'
  }
})
export class BaoSystemHeaderComponent implements AfterViewInit, OnInit {
  @ViewChild('textContainer', { static: false })
  private textContainer: ElementRef<HTMLElement>;
  @ViewChild(BaoBackNavigationInsert, { static: true })
  private backButtonInsert: BaoBackNavigationInsert;

  public screenType: 'mobile' | 'tablet' | 'desktop' = 'desktop';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private renderer: Renderer2
  ) {}

  get textContainerChildren(): Element[] {
    return Array.from(this.textContainer.nativeElement.children);
  }

  ngOnInit() {
    if (
      [Breakpoints.XSmall, Breakpoints.Small].some(size =>
        this.breakpointObserver.isMatched(size)
      )
    ) {
      this.screenType = 'mobile';
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.screenType = 'tablet';
    } else if (
      [Breakpoints.Large, Breakpoints.XLarge].some(size =>
        this.breakpointObserver.isMatched(size)
      )
    ) {
      this.screenType = 'desktop';
    }
  }

  ngAfterViewInit() {
    this.formatNavigation();
    this.applySizeClass();
  }

  private formatNavigation() {
    // If view is rendered on a mobile/tablet screen
    if (this.screenType == 'mobile' || this.screenType == 'tablet') {
      if (this.textContainerChildren[0].className == 'bao-breadcrumb') {
        // Retrieve link of parent page
        const breadcrumbElementsList =
          this.textContainerChildren[0].children[0];
        const breadcrumbLength = breadcrumbElementsList.children.length;
        const parentLink =
          breadcrumbElementsList.children[breadcrumbLength - 2].attributes[
            'href'
          ].value;
        // Remove Breadcrumb component and replace it with back button
        this.renderer.removeChild(
          this.textContainer.nativeElement,
          this.textContainerChildren[0]
        );
        const viewContainerRef = this.backButtonInsert.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(
          BaoBackNavigationComponent
        );
        componentRef.instance.link = parentLink;
      }
    }
  }

  private applySizeClass() {
    const tagInfoContainer =
      this.textContainer.nativeElement.childNodes[
        this.textContainerChildren.length - 1
      ];
    if (this.screenType === 'mobile') {
      this.renderer.addClass(tagInfoContainer, 'mobile');
    }
  }
}
