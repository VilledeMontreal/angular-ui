import { Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Component({
  /**
   * There are a few cases where you give a component an attribute, such as
   * when you want to augment a built-in element. For example, Material Design
   * uses this technique with <button mat-button>. However, you wouldn't
   * use this technique on a custom element.
   */
  // tslint:disable-next-line: component-selector
  selector: 'button[bao-button]',
  styleUrls: ['./button.component.scss'],
  templateUrl: './button.component.html',
  host: {
    '[class.utility]': 'type === "utility"',
    '[class.editorial]': 'type === "editorial"',
    '[class.primary]': 'level === "primary"',
    '[class.secondary]': 'level === "secondary"',
    '[class.tertiary]': 'level === "tertiary"',
    '[class.large]': 'size === "large"',
    '[class.medium]': 'size === "medium"',
    '[class.small]': 'size === "small"',
    '[class.reversed]': 'reversed === true',
    '[class.loading]': 'loading === true'
  }
})
export class BaoButtonComponent implements OnChanges {
  /**
   * The type of the button
   */
  @Input() public type: 'utility' | 'editorial' = 'utility';
  /**
   * The hierarchy level of the button
   */
  @Input() public level: 'primary' | 'secondary' | 'tertiary' = 'primary';
  /**
   * The size of the button
   */
  @Input() public size: 'large' | 'medium' | 'small' = 'medium';
  /**
   * Flag to set the button in loading state
   */
  @Input() public loading: boolean = false;
  /**
   * Flag to set the button reversed color mode
   */
  @Input() public reversed: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /**
   * @ignore
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.loading) {
      // if the button is in loading state, it should also be disabled
      if (changes.loading.currentValue === true) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }

  private enable() {
    this.renderer.setAttribute(this.nativeElement, 'disabled', 'false');
  }

  private disable() {
    this.renderer.setAttribute(this.nativeElement, 'disabled', 'true');
  }
}
