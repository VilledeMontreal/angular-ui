/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BaoPaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: BaoPaginationComponent;
  let fixture: ComponentFixture<BaoPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaoPaginationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BaoPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Paging tests', () => {
    const updateComponentWithPaging = (paging, val = 0) => {
      component.totalPages = Math.ceil(paging.totalCount / paging.limit); // total number of pages based on number of items per page
      component.currentPage =
        (val ? val : Math.floor(paging.offset / paging.limit)) + 1; //  passed value or page value based on offset
    };

    it('Should correctly navigate to target page based on paging input values', done => {
      const paging = { limit: 20, offset: 0, totalCount: 100 };
      updateComponentWithPaging(paging);

      component.pageChanged.subscribe(val => {
        updateComponentWithPaging(paging, val);

        expect(component.totalPages).toEqual(5);
        expect(component.currentPage).toEqual(targetPage);
        done();
      });
      expect(component.totalPages).toEqual(5);
      expect(component.currentPage).toEqual(1);

      // simulate page change
      const targetPage = 3;
      paging.offset = 40;
      component.goTo(targetPage);
    });
  });

  describe('Page number tests', () => {
    it('should call goTo when a page number is clicked', () => {
      component.displayedPages = [1, 2, 3];
      fixture.detectChanges();
      spyOn(component, 'goTo');

      const pageNumberButton = fixture.debugElement.query(
        By.css('.page-item:nth-child(2) .page-link') // since there is no elipsis, number page-items start at index 2
      ).nativeElement;
      pageNumberButton.click();

      expect(component.goTo).toHaveBeenCalledWith(1);
    });

    it('should mark the selected page number as active', () => {
      component.displayedPages = [1, 2, 3];
      component.currentPage = 1;
      fixture.detectChanges();

      const pageNumberButton = fixture.debugElement.query(
        By.css('.page-item.active .page-link')
      ).nativeElement;

      expect(pageNumberButton.textContent).toContain('1');
    });
  });

  describe('Previous button tests', () => {
    it('should disable the Previous button when on the first page', () => {
      component.currentPage = 1;
      fixture.detectChanges();

      const previousButton = fixture.debugElement.query(
        By.css('.page-item:first-child')
      ).nativeElement;

      expect(previousButton.classList).toContain('disabled');
    });

    it('should enable the Previous button when not on the first page', () => {
      component.currentPage = 2;
      fixture.detectChanges();

      const previousButton = fixture.debugElement.query(
        By.css('.page-item:first-child')
      ).nativeElement;

      expect(previousButton.classList).not.toContain('disabled');
    });

    it('should call handlePreviousClick when Previous button is clicked', () => {
      spyOn(component, 'handlePreviousClick');

      const previousButtonLink = fixture.debugElement.query(
        By.css('.page-item:first-child .page-link')
      ).nativeElement;
      previousButtonLink.click();

      expect(component.handlePreviousClick).toHaveBeenCalled();
    });
  });

  describe('Next button tests', () => {
    it('should disable the Next button when on the last page', () => {
      component.currentPage = 5;
      component.totalPages = 5;
      fixture.detectChanges();

      const nextButton = fixture.debugElement.query(
        By.css('.page-item:last-child')
      ).nativeElement;

      expect(nextButton.classList).toContain('disabled');
    });

    it('should enable the Next button when not on the last page', () => {
      component.currentPage = 4;
      component.totalPages = 5;
      fixture.detectChanges();

      const nextButton = fixture.debugElement.query(
        By.css('.page-item:last-child')
      ).nativeElement;
      expect(nextButton.classList).not.toContain('disabled');
    });

    it('should call handleNextClick when Next button is clicked', () => {
      spyOn(component, 'handleNextClick');

      const nextButtonLink = fixture.debugElement.query(
        By.css('.page-item:last-child .page-link')
      ).nativeElement;
      nextButtonLink.click();

      expect(component.handleNextClick).toHaveBeenCalled();
    });
  });

  describe('First Elipsis', () => {
    it('should display the first ellipsis when total pages is greater than 5 and current page is last page', () => {
      component.totalItems = 75;
      component.itemsPerPage = 10;
      component.currentPage = 8;
      component.ngOnInit();
      fixture.detectChanges();

      const firstEllipsis = fixture.debugElement.query(
        By.css('.page-item:nth-child(3) .page-link')
      ).nativeElement;

      expect(firstEllipsis.textContent).toContain('...');
    });

    it('should not display the first ellipsis when total pages is greater than 5 and current page is 1', () => {
      component.totalItems = 75;
      component.itemsPerPage = 10;
      component.currentPage = 1;
      component.ngOnInit();
      fixture.detectChanges();

      const firstEllipsis = fixture.debugElement.query(
        By.css('.page-item:nth-child(3) .page-link')
      ).nativeElement;

      expect(firstEllipsis.textContent).not.toContain('...');
    });
  });

  describe('Second Elipsis', () => {
    it('should display the second ellipsis when total pages is greater than 5 and current page is 1', () => {
      component.totalItems = 75;
      component.itemsPerPage = 10;
      component.currentPage = 1;
      component.ngOnInit();
      fixture.detectChanges();

      const lastEllipsis = fixture.debugElement.query(
        By.css('.page-item:nth-last-child(3) .page-link')
      ).nativeElement;

      expect(lastEllipsis.textContent).toContain('...');
    });

    it('should not display the second ellipsis when total pages is greater than 5 and current page is last page', () => {
      component.totalItems = 75;
      component.itemsPerPage = 10;
      component.currentPage = 8;
      component.ngOnInit();
      fixture.detectChanges();

      const lastEllipsis = fixture.debugElement.query(
        By.css('.page-item:nth-last-child(3) .page-link')
      ).nativeElement;

      expect(lastEllipsis.textContent).not.toContain('...');
    });
  });
});
