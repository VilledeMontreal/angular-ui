import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

/**
 * Unique ID for each checkbox group counter
 */
let checkboxGroupNextUniqueId = 0;

@Component({
  selector: 'bao-checkbox-group, [bao-checkbox-group]',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaoCheckboxGroupComponent implements AfterViewInit {
  private _uniqueId: string = `bao-checkbox-group-${++checkboxGroupNextUniqueId}`;

  /**
   * The checkbox group ID. It is set dynamically with an unique ID by default
   */
  @Input() public id: string = this._uniqueId;

  /**
   * The aria-describedby id for web accessibilty
   */
  public ariaDescribedby?: string = undefined;

  @ViewChild('container', { static: false }) private staticContainer: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  public ngAfterViewInit() {
    this.setAriaDescribedByToDescription();
    this.cdr.detectChanges();
  }

  public onContentChange() {
    this.setAriaDescribedByToDescription();
  }

  /**
   * Set the aria-describedby property to bao-guiding-text if available
   */
  private setAriaDescribedByToDescription() {
    const children = Array.from(this.staticContainer.nativeElement.children);
    if (children.length === 0) {
      this.showAriaDescribedBy(false);
      return;
    }

    this.showAriaDescribedBy(true);
  }

  private showAriaDescribedBy(value: boolean) {
    this.ariaDescribedby = value ? `${this.id}-ariadescribedby` : undefined;
  }
}
