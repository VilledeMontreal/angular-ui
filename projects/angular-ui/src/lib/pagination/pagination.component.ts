/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'bao-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'bao-pagination'
  }
})
export class BaoPaginationComponent implements OnChanges, OnInit {
  /**
   * The total number of items.
   */
  @Input()
  public totalItems: number;
  /**
   * The number of items per page as selected.
   */
  @Input()
  public itemsPerPage: number = 10;
  /**
   * The current page number.
   */
  @Input()
  public currentPage: number = 1;
  /**
   * The different page size options.
   */
  @Input()
  public pageSizeOptions: number[] = [10, 25, 50, 100];
  /**
   * The label for the type of items that are displayed on the page
   */
  @Input()
  public itemLabel: string = 'items';
  /**
   * If selector for number of items per page should be displayed or not
   */
  @Input()
  public showItemsPerPageSelector: boolean = true;
  /**
   * EventEmitter that triggers when there is a page change and emits page number (index adjusted)
   */
  @Output()
  public pageChanged = new EventEmitter<number>();
  /**
   * EventEmitter that triggers when the number of items per page is changed.
   */
  @Output()
  public itemsPerPageChanged = new EventEmitter<number>();
  /**
   * Page number list to display
   */
  public displayedPages: number[];
  /**
   * Max number of pages to display
   */
  private _maxPages: number = 5;
  /**
   * Number of pages in total.
   */
  private _totalPages: number;
  /**
   * Position of first item being displayed on current page.
   */
  private _startItem: number;
  /**
   * Position of last item being displayed on current page.
   */
  private _endItem: number;

  constructor(private cdr: ChangeDetectorRef) {
    this.displayedPages = [];
  }

  public get totalPages(): number {
    return this._totalPages;
  }

  public set totalPages(value: number) {
    this._totalPages = value;
  }

  public get startItem(): number {
    return this._startItem;
  }

  public set startItem(value: number) {
    this._startItem = value;
  }

  public get endItem(): number {
    return this._endItem;
  }

  public set endItem(value: number) {
    this._endItem = value;
  }

  public get rangeLabel(): string {
    return `${this.startItem} à ${this.endItem} sur ${this.totalItems} ${this.itemLabel}`;
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

  public ngOnInit(): void {
    this.startItem = this.updateStartItem();
    this.endItem = this.updateEndItem();
    this.totalPages = this.updateTotalPages();
    this.displayedPages = this.buildPageNumbers();
    this.cdr.detectChanges();
  }

  /**
   * Update list of displayed pages when current page is changed.
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('currentPage')) {
      this.displayedPages = this.buildPageNumbers();
    }
    if (changes.hasOwnProperty('totalItems')) {
      this.startItem = this.updateStartItem();
      this.endItem = this.updateEndItem();
      this.totalPages = this.updateTotalPages();
      this.displayedPages = this.buildPageNumbers();
    }
  }
  /**
   * Navigate to specific page
   */
  public goTo(page: number): void {
    this.currentPage = page;
    this.startItem = this.updateStartItem();
    this.endItem = this.updateEndItem();
    this.displayedPages = this.buildPageNumbers();
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
   * Update all required variables whenever the number of items displayed per page is changed.
   * @param value New amount of items per page
   */
  public handlePageSizeChange(value: number) {
    this.currentPage = 1;
    this.startItem = this.updateStartItem();
    this.endItem = this.updateEndItem();
    this.totalPages = this.updateTotalPages();
    this.displayedPages = this.buildPageNumbers();
    this.itemsPerPageChanged.emit(value);
  }

  private updateTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  private updateStartItem(): number {
    const startItem = Math.min(
      (this.currentPage - 1) * this.itemsPerPage + 1,
      Math.floor(this.totalItems / 10) * 10
    );
    return startItem || 1;
  }

  private updateEndItem(): number {
    return Math.min(
      this.startItem + Number(this.itemsPerPage) - 1,
      this.totalItems
    );
  }

  /**
   * Generate series of page numbers to display. The list always starts with page 1
   * and ends with last page.
   * Adds negative numbers for ellipsis.
   */
  private buildPageNumbers(): number[] {
    const pages = [];
    // If total pages are 5 or less, include all pages
    if (this.totalPages <= this._maxPages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      // Determine middle pages
      let middlePages = [];
      if (this.currentPage <= 3) {
        middlePages = [2, 3, 4, -1];
      } else if (this.currentPage >= this.totalPages - 2) {
        middlePages = [
          -1,
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1
        ];
      } else {
        middlePages = [
          -1,
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          -1
        ];
      }
      pages.push(...middlePages);
      pages.push(this.totalPages);
    }
    return pages;
  }
}
