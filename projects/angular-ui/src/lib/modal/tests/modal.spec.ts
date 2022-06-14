/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion*/
/* eslint-disable @typescript-eslint/no-floating-promises*/
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject,
  flush
} from '@angular/core/testing';
import {
  Component,
  Directive,
  Injectable,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  BaoModal,
  BaoModalModule,
  BaoModalRef,
  eModalDesktopWidthSize,
  eModalMobileWidthSize
} from '..';

declare const viewport;

@Directive({ selector: 'dir-with-view-container' })
class DirectiveWithViewContainer {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: 'arbitrary-component',
  template: `<dir-with-view-container
    *ngIf="showChildView"
  ></dir-with-view-container>`
})
class ComponentWithChildViewContainer {
  @ViewChild(DirectiveWithViewContainer)
  public childWithViewContainer: DirectiveWithViewContainer;

  public showChildView = true;

  public get childViewContainer() {
    return this.childWithViewContainer.viewContainerRef;
  }
}

@Component({ template: '<h1>Adresse</h1><input>' })
class AddressComponent {
  constructor(
    public modalRef: BaoModalRef<AddressComponent>,
    public modalInjector: Injector
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class GlobalObjectService {
  public getWindow(): Window {
    return window;
  }
}

describe('BaoModalComponent', () => {
  describe('', () => {
    let modal: BaoModal;
    let overlayContainerElement: HTMLElement;
    let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        imports: [BaoModalModule],
        declarations: [
          ComponentWithChildViewContainer,
          DirectiveWithViewContainer
        ],
        providers: []
      });

      TestBed.compileComponents();
    }));

    beforeEach(inject(
      [BaoModal, OverlayContainer],
      (d: BaoModal, oc: OverlayContainer) => {
        modal = d;
        overlayContainerElement = oc.getContainerElement();
      }
    ));

    beforeEach(() => {
      viewContainerFixture = TestBed.createComponent(
        ComponentWithChildViewContainer
      );
      viewContainerFixture.detectChanges();
    });

    it('should open a modal with component', () => {
      const modalRef = modal.open(AddressComponent);

      viewContainerFixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('Adresse');
      expect(modalRef.componentInstance instanceof AddressComponent).toBe(true);

      viewContainerFixture.detectChanges();

      const modalContainerElement = overlayContainerElement.querySelector(
        'bao-modal-container'
      )!;
      expect(modalContainerElement.getAttribute('role')).toBe('dialog');
    });

    it('should close a modal', fakeAsync(() => {
      const modalRef = modal.open(AddressComponent);

      viewContainerFixture.detectChanges();
      expect(modalRef.componentInstance instanceof AddressComponent).toBe(true);

      modalRef.close();
      viewContainerFixture.detectChanges();
      flush();

      expect(
        overlayContainerElement.querySelector('bao-modal-container')
      ).toBeNull();
    }));

    it('should use the default value (small on desktop and fullwidth on mobile)', () => {
      modal.open(AddressComponent);

      viewContainerFixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.bao-modal-sm')
      ).toBeTruthy();
      expect(overlayContainerElement.querySelector('.bao-modal-md')).toBeNull();
      expect(overlayContainerElement.querySelector('.bao-modal-lg')).toBeNull();
      expect(
        overlayContainerElement.querySelector('.bao-modal-mobil-full')
      ).toBeTruthy();
      expect(
        overlayContainerElement.querySelector('.bao-modal-mobil-compact')
      ).toBeNull();
    });

    it('should use the config value (small on desktop and fullwidth on mobile)', () => {
      modal.open(AddressComponent, {
        size: eModalDesktopWidthSize.SMALL,
        mobileSize: eModalMobileWidthSize.FULL
      });

      viewContainerFixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.bao-modal-sm')
      ).toBeTruthy();
      expect(overlayContainerElement.querySelector('.bao-modal-md')).toBeNull();
      expect(overlayContainerElement.querySelector('.bao-modal-lg')).toBeNull();
      expect(
        overlayContainerElement.querySelector('.bao-modal-mobil-full')
      ).toBeTruthy();
      expect(
        overlayContainerElement.querySelector('.bao-modal-mobil-compact')
      ).toBeNull();
    });

    it('should use the config value (medium on desktop and fullwidth on mobile)', () => {
      modal.open(AddressComponent, {
        size: eModalDesktopWidthSize.MEDIUM,
        mobileSize: eModalMobileWidthSize.FULL
      });

      viewContainerFixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.bao-modal-md')
      ).toBeTruthy();
      expect(overlayContainerElement.querySelector('.bao-modal-sm')).toBeNull();
      expect(overlayContainerElement.querySelector('.bao-modal-lg')).toBeNull();
      expect(
        overlayContainerElement.querySelector('.bao-modal-mobil-full')
      ).toBeTruthy();
      expect(
        overlayContainerElement.querySelector('.bao-modal-mobil-compact')
      ).toBeNull();
    });

    it('should use the config value (medium on desktop and compact on mobile)', () => {
      modal.open(AddressComponent, {
        size: eModalDesktopWidthSize.LARGE,
        mobileSize: eModalMobileWidthSize.COMPACT
      });

      viewContainerFixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.bao-modal-lg')
      ).toBeTruthy();
      expect(overlayContainerElement.querySelector('.bao-modal-sm')).toBeNull();
      expect(overlayContainerElement.querySelector('.bao-modal-md')).toBeNull();
      expect(
        overlayContainerElement.querySelector('.bao-modal-mobil-compact')
      ).toBeTruthy();
      expect(
        overlayContainerElement.querySelector('.bao-modal-mobil-full')
      ).toBeNull();
    });

    it('FULL width on mobile as config should have 100% parent width on mobile resolution', () => {
      viewport.set(100);
      modal.open(AddressComponent, {
        mobileSize: eModalMobileWidthSize.FULL
      });

      viewContainerFixture.detectChanges();
      const overlay = overlayContainerElement.querySelector(
        '.bao-modal-mobil-full'
      );
      const style = window.getComputedStyle(overlay);
      expect(style.width).toBe('85px');
    });

    it('COMPACT width on mobile as config should have 300px max-width on mobile resolution', () => {
      viewport.set('sm');
      modal.open(AddressComponent, {
        mobileSize: eModalMobileWidthSize.COMPACT
      });

      viewContainerFixture.detectChanges();
      const overlay = overlayContainerElement.querySelector(
        '.bao-modal-mobil-compact'
      );
      const style = window.getComputedStyle(overlay);
      expect(style.width).toBe('300px');
    });

    it('SMALL width on desktop as config should have 500px on deskop resolution (>=768px)', () => {
      viewport.from('md', () => {
        modal.open(AddressComponent, {
          size: eModalDesktopWidthSize.SMALL
        });

        viewContainerFixture.detectChanges();
        const overlay = overlayContainerElement.querySelector('.bao-modal-sm');
        const style = window.getComputedStyle(overlay);
        expect(style.width).toBe('500px');
      });
    });

    it('MEDIUM width on desktop as config should have 500px from medium to large screen resolutions', () => {
      viewport.set('md');
      modal.open(AddressComponent, {
        size: eModalDesktopWidthSize.MEDIUM
      });

      viewContainerFixture.detectChanges();
      const overlay = overlayContainerElement.querySelector('.bao-modal-md');
      const style = window.getComputedStyle(overlay);
      expect(style.width).toBe('500px');
    });

    it('MEDIUM width on desktop as config should have 800px on large and higher resolutions', () => {
      viewport.from('lg', () => {
        modal.open(AddressComponent, {
          size: eModalDesktopWidthSize.MEDIUM
        });

        viewContainerFixture.detectChanges();
        const overlay = overlayContainerElement.querySelector('.bao-modal-md');
        const style = window.getComputedStyle(overlay);
        expect(style.width).toBe('800px');
      });
    });
  });
});
