/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';

@Component({
  selector: 'bao-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class BaoPaginationComponent implements OnChanges {
  /**
   * The previous button label used for accessibility
   */
  @Input()
  public previousArialLabel: string;
  /**
   * The next button label used for accessibility
   */
  @Input()
  public nextArialLabel: string;
  /**
   * The total number of calculated pages.
   * Value calculated using the paging limit and totalCount
   */
  @Input()
  public totalPages: number;
  /**
   * The current page number
   */
  @Input()
  public currentPage: number;
  /**
   * EventEmitter that triggers when there is a page change and emits page number (index adjusted)
   * @type {EventEmitter<number>}
   */
  @Output()
  public pageChanged = new EventEmitter<number>();
  /**
   * Page number list to display
   */
  public pages: number[];
  /**
   * Max number of pages to display
   */
  private _maxPages: number = 5;

  constructor() {
    this.pages = [];
  }

  /**
   * Flag that indicates if a previous page exists for the current list
   */
  public get hasPrevious(): boolean {
    return this.currentPage !== 1;
  }
  /**
   * Flag that indicates if a next page exists for the current list
   */
  public get hasNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  /**
   * Triggered as part of the angular life cycle
   */
  public ngOnChanges(): void {
    this.pages = this.buildPageNumbers();
  }
  /**
   * Navigate to specific page
   */
  public goTo(page: number): void {
    this.pageChanged.emit(page - 1);
  }
  /**
   * Navigate to previous page
   */
  public handlePreviousClick() {
    if (this.hasPrevious) {
      this.goTo(this.currentPage - 1);
    }
  }
  /**
   * Navigate to next page
   */
  public handleNextClick(): void {
    if (this.hasNext) {
      this.goTo(this.currentPage + 1);
    }
  }
  /**
   * Generate series of page numbers to display
   */
  private buildPageNumbers(): number[] {
    return Array.from(
      {
        // minimum between total pages, max pages and the upper bound relative to the current page
        length: Math.min(
          this.totalPages,
          this._maxPages,
          this.totalPages - this.currentPage + Math.ceil(this._maxPages / 2)
        )
      },
      // generate series of page numbers to display
      (value, index) =>
        Number(index) +
        1 +
        Math.min(
          Math.max(Math.floor(this.currentPage - this._maxPages / 2), 0),
          this.totalPages
        )
    );
  }
}
