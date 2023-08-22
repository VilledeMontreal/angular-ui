/*
 * Copyright (c) 2023 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bao-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class BaoPaginationComponent {
  /**
   *  The screen reader previous button label
   */
  @Input() 
  public previousArialLabel: string
  /**
   *  The screen reader next button label
   */
  @Input() 
  public nextArialLabel: string
  /**
   *  The total number of calculated pages. 
   *  Value calculated using the paging limit and totalCount
   */
  @Input() 
  public totalPages: number
  /**
   *  The current page number
   */
  @Input() 
  public currentPage: number
  /**
   *  The previous button label
   */
  @Output() 
  public pageChanged = new EventEmitter();

  public displayStartEllipsis: boolean = false;
  public displayEndEllipsis: boolean = false;
  public pages = [];
  private maxPages = 5;

  public get hasPrevious(): boolean {
    return this.currentPage !== 1;
  }

  public get hasNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  public ngOnChanges(): void {
    this.pages = this.buildPageNumbers();
  }

  public goTo(page: number): void {
    this.pageChanged.emit(page - 1);
  }

  public handlePreviousClick() {
    if (this.hasPrevious) {
      this.goTo(this.currentPage - 1);
    }
  }

  public handleNextClick(): void {
    if (this.hasNext) {
      this.goTo(this.currentPage + 1);
    }
  }

  private buildPageNumbers() : number[] {
    return  Array.from(
      {
        // minimum between total pages, max pages and the upper bound relative to the current page
        length: Math.min(this.totalPages, this.maxPages, this.totalPages - this.currentPage + Math.ceil(this.maxPages / 2))
      },
      // generate series of page numbers to display
      (value, index) => index + 1 + Math.min(Math.max(Math.floor(this.currentPage - this.maxPages / 2), 0), this.totalPages)
    );
  }
}
