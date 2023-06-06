/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

const LAST_NODE_ATTRIBUTE = { 'aria-current': 'page' };

@Component({
  selector: 'bao-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-breadcrumb'
  }
})
export class BaoBreadcrumbComponent implements AfterViewInit {
  @ViewChild('container', { static: false })
  private staticContainer: ElementRef;
  constructor(private renderer: Renderer2) {}
  public ngAfterViewInit() {
    this.createLiElement();
  }
  public onContentChange() {
    this.setLastLinkAttribute();
  }

  private createLiElement() {
    const children = Array.from(this.staticContainer.nativeElement.children);
    this.setLastLinkAttribute();
    children.forEach(c => {
      const liElement = this.renderer.createElement('li');
      this.renderer.appendChild(liElement, c);
      this.renderer.appendChild(this.staticContainer.nativeElement, liElement);
    });
  }
  private setLastLinkAttribute() {
    const children = Array.from(this.staticContainer.nativeElement.children);
    this.renderer.setAttribute(
      children[children.length - 1],
      Object.keys(LAST_NODE_ATTRIBUTE)[0],
      Object.values(LAST_NODE_ATTRIBUTE)[0]
    );
  }
}
