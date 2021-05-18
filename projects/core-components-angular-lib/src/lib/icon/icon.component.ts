import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { BaoIconDictionary as BaoIconRegistry } from './bao-icon-registry';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const TITLE = 'title';

/**
 * Component to display an icon. It can be used in the following ways:
 *
 * - Specify the svgIcon input to load an SVG icon from a preset list of icons.
 *   Examples:
 *     `<bao-icon svgIcon="heart"></bao-icon>`
 */
@Component({
  template: '<ng-content></ng-content>',
  selector: 'bao-icon',
  exportAs: 'baoIcon',
  styleUrls: ['icon.component.scss'],
  host: {
    role: 'img',
    class: 'bao-icon notranslate',
    '[attr.data-bao-icon-type]': '"svg"',
    '[attr.aria-labelledby]': 'titleId',
    '[attr.aria-hidden]': '!title'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaoIconComponent implements OnDestroy {
  /** Name of the icon in the SVG icon set. */
  @Input()
  get svgIcon(): string {
    return this._svgIcon;
  }
  set svgIcon(value: string) {
    if (value !== this._svgIcon) {
      if (value) {
        this.updateSvgIcon(value, this.title);
      } else if (this._svgIcon) {
        this.clearSvgElement();
      }
      this._svgIcon = value;
    }
  }

  /** Title that will be used as an aria-label for the icon */
  @Input()
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    if (value !== this._title) {
      this._title = value;
      this._titleId = this.generateUniqueTitleId();
      this.updateSvgIcon(this.svgIcon, value);
    }
  }
  get titleId(): string {
    return this._titleId;
  }
  private _svgIcon: string;
  private _title: string;
  private _titleId: string;

  // Keeps track of the elements and attributes that we've prefixed with the current path.
  private _elementsWithExternalReferences?: Map<Element, { name: string; value: string }[]>;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private iconRegistry: BaoIconRegistry,
    private renderer: Renderer2,
    @Attribute('aria-hidden') ariaHidden: string
  ) {
    // If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
    // the right thing to do for the majority of icon use-cases.
    if (!ariaHidden) {
      this.elementRef.nativeElement.setAttribute('aria-hidden', 'true');
    }
  }

  public ngOnDestroy() {
    if (this._elementsWithExternalReferences) {
      this._elementsWithExternalReferences.clear();
    }
  }

  private setSvgElement(svg: SVGElement) {
    this.clearSvgElement();
    // Workaround for IE11 and Edge ignoring `style` tags inside dynamically-created SVGs.
    // See: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/10898469/
    // Do this before inserting the element into the DOM, in order to avoid a style recalculation.
    const styleTags = svg.querySelectorAll('style') as NodeListOf<HTMLStyleElement>;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < styleTags.length; i++) {
      styleTags[i].textContent += ' ';
    }
    this.elementRef.nativeElement.appendChild(svg);
  }

  private clearSvgElement() {
    const layoutElement: HTMLElement = this.elementRef.nativeElement;
    let childCount = layoutElement.childNodes.length;

    if (this._elementsWithExternalReferences) {
      this._elementsWithExternalReferences.clear();
    }

    // Remove existing non-element child nodes and SVGs, and add the new SVG element. Note that
    // we can't use innerHTML, because IE will throw if the element has a data binding.
    while (childCount--) {
      const child = layoutElement.childNodes[childCount];

      // 1 corresponds to Node.ELEMENT_NODE. We remove all non-element nodes in order to get rid
      // of any loose text nodes, as well as any SVG elements in order to remove any old icons.
      if (child.nodeType !== 1 || child.nodeName.toLowerCase() === 'svg') {
        layoutElement.removeChild(child);
      }
    }
  }

  // Sets a new SVG icon with a particular name.
  private updateSvgIcon(iconName: string | undefined, title: string | undefined) {
    if (iconName) {
      let svg = this.iconRegistry.getNamedSvgIcon(iconName);
      if (title) {
        svg = this.addTitleToSVG(svg, title);
      }
      this.setSvgElement(svg);
    }
  }

  private addTitleToSVG(svg: SVGElement, title: string) {
    const titleNode = this.renderer.createElement(TITLE, SVG_NAMESPACE);
    titleNode.id = this._titleId;
    const titleText = this.renderer.createText(title);
    this.renderer.appendChild(titleNode, titleText);
    this.renderer.appendChild(svg, titleNode);
    return svg;
  }

  private generateUniqueTitleId(): string {
    return this.title ? `${this.title}-${Math.random() * 10000000000000000}` : '';
  }
}
