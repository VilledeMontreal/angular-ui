import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

const BAO_ICON_NODE_NAME = 'BAO-ICON';
const LOADING_SPINNER_CLASS = 'loading-spinner';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-button',
    '[class.bao-button-utility]': 'type === "utility"',
    '[class.bao-button-editorial]': 'type === "editorial"',
    '[class.bao-button-primary]': 'level === "primary"',
    '[class.bao-button-secondary]': 'level === "secondary"',
    '[class.bao-button-tertiary]': 'level === "tertiary"',
    '[class.bao-button-large]': 'size === "large"',
    '[class.bao-button-medium]': 'size === "medium"',
    '[class.bao-button-small]': 'size === "small"',
    '[class.bao-button-reversed]': 'reversed === true',
    '[class.bao-button-loading]': 'loading === true',
    '[class.bao-button-no-text]': 'noText === true',
    '[class.bao-button-full-width]': 'fullWidth === true'
  }
})
export class BaoButtonComponent implements OnChanges, AfterViewInit {
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
  /**
   * The aria-label of the loading spinner if it displayed alone
   */
  @Input() public loadingSpinnerAriaLabel = 'chargement';
  /**
   * Allows the button to grow to the width of it's container
   */
  @Input() public fullWidth = false;

  /**
   * If there is no text, some margin/padding will be different, i.e. for the spinner
   */
  public noText = false;

  /**
   * If the icon is on the right of the label, the loading spinner will need to be on the right of the label
   */
  public rightIcon = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngAfterViewInit() {
    const childNodes = Array.from(this.nativeElement.childNodes);
    const textIndex = childNodes.findIndex(c => c.nodeType === Node.TEXT_NODE);
    this.noText = textIndex === -1;
    const iconIdex = childNodes.findIndex(
      c => c.nodeName === BAO_ICON_NODE_NAME && !(c as HTMLElement).classList.contains(LOADING_SPINNER_CLASS)
    );
    this.rightIcon = iconIdex > textIndex;
    this.cdr.detectChanges();
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
