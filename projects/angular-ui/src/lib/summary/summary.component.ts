/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  Input,
  ViewEncapsulation,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { EDisplayMode } from '../shared';

let summaryUniqueId = 0;
@Component({
  selector: 'bao-summary, [bao-summary], [baoSummary]',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'bao-summary',
    '[class.bao-displaymode-compact]': 'displayMode === "compact"'
  }
})
export class BaoSummaryComponent implements OnInit, AfterViewInit {
  /**
   * Set display mode
   * RESPONSIVE (viewport width <=> is 576px)
   * COMPACT (viewport width < 576px)
   */
  @Input() public displayMode = EDisplayMode.RESPONSIVE;

  /**
   * Initialize the ID for summary
   */
  private _uniqueId = `bao-summary-${++summaryUniqueId}`;

  /**
   * Set value of unique ID for bao-label
   */
  @Input() public id: string = this._uniqueId;

  /**
   * The aria-describebdy-error id for web accessibility
   * only when error section appears
   */
  public ariaDescribedbyError?: string;

  /**
   * The aria-describebdy-text id for web accessibility
   * only when we have de guidance text
   */
  public ariaDescribedbyGuidingText?: string;

  /**
   * The aria-labelledby id for web accessibility
   */
  public ariaLabelledby?: string;

  private attribues: string;

  constructor(private elementRef: ElementRef) {}

  get nativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  public ngOnInit() {
    this.ariaDescribedbyError = `${this.id}-ariadescribedby-error`;
    this.ariaDescribedbyGuidingText = `${this.id}-ariadescribedby-guiding-text`;

    this.ariaLabelledby = `${this.id}-arialabelledby`;
  }

  public ngAfterViewInit() {
    this.setAriaDescribedByToDescription();
  }

  public setAriaDescribedByToDescription() {
    const baoLabel = this.elementNode('BAO-LABEL');
    const baoError = this.elementNode('BAO-ERROR');
    const baoGuidingText = this.elementNode('BAO-GUIDING-TEXT');
    const summaryDiv = this.elementNode('DIV');

    if (summaryDiv) {
      const summaryText = this.elementNode('DIV', summaryDiv);

      if (summaryText && baoLabel) {
        (baoLabel as HTMLElement).setAttribute('id', this.ariaLabelledby);
        (summaryText as HTMLElement).setAttribute(
          'aria-labelledby',
          this.ariaLabelledby
        );
      }

      if (summaryText && baoGuidingText) {
        (baoGuidingText as HTMLElement).setAttribute(
          'id',
          this.ariaDescribedbyGuidingText
        );
        (summaryText as HTMLElement).setAttribute(
          'aria-describedby',
          this.ariaDescribedbyGuidingText
        );
      }

      if (summaryText && baoError) {
        (baoError as HTMLElement).setAttribute('id', this.ariaDescribedbyError);
        this.attribues = baoGuidingText
          ? `${this.ariaDescribedbyError}, ${this.ariaDescribedbyGuidingText}`
          : this.ariaDescribedbyError;
        (summaryText as HTMLElement).setAttribute(
          'aria-describedby',
          this.attribues
        );
      }
    }
  }

  private elementNode(name: string, nativeElt?: Node): Node {
    const childNodes = nativeElt
      ? Array.from(nativeElt.childNodes)
      : Array.from(this.nativeElement.childNodes);
    const element = childNodes.find(x => x.nodeName === name);

    return element;
  }
}

@Directive({
  selector:
    'bao-summary-description, [bao-summary-description], [baoSummaryDescription]',
  host: { class: 'bao-summary-description' }
})
export class BaoSummaryDescription {}
