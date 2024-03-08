/*
 * Copyright (c) 2024 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
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
  /**
   * The checkbox group ID. It is set dynamically with an unique ID by default
   */
  @Input() public id: string;

  @ViewChild('container', { static: false })
  private staticContainer: ElementRef;

  /**
   * The aria-describedby id for web accessibilty
   */
  public ariaDescribedby?: string = undefined;

  private _uniqueId = `bao-checkbox-group-${++checkboxGroupNextUniqueId}`;

  constructor(private cdr: ChangeDetectorRef) {
    if (!this.id) {
      this.id = this._uniqueId;
    }
  }

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
