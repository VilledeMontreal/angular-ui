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

  private setLastLinkAttribute() {
    const children = Array.from(this.staticContainer.nativeElement.children);
    this.renderer.setAttribute(
      children[children.length - 1],
      Object.keys(LAST_NODE_ATTRIBUTE)[0],
      Object.values(LAST_NODE_ATTRIBUTE)[0]
    );
  }

  public ngAfterViewInit() {
    this.setLastLinkAttribute();
  }

  public onContentChange() {
    this.setLastLinkAttribute();
  }
}
