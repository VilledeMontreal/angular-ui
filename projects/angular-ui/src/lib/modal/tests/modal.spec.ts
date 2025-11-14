/*
 * Copyright (c) 2025 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion*/
/* eslint-disable @typescript-eslint/no-floating-promises*/
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  Component,
  Directive,
  Injectable,
  Injector,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  inject
} from '@angular/core/testing';
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

@Component({
  template:
    " \
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> \
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> \
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> \
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> \
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> \
<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> \
"
})
class LongTextComponent {
  constructor(
    public modalRef: BaoModalRef<LongTextComponent>,
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

    it('Should adjust to content length', done => {
      viewport.set('lg');
      const modalRef = modal.open(AddressComponent, {
        size: eModalDesktopWidthSize.SMALL
      });

      viewContainerFixture.detectChanges();
      const smallOverlay =
        overlayContainerElement.querySelector('.cdk-overlay-pane');
      const smallContentHeight = smallOverlay.clientHeight;

      modalRef.afterClosed().subscribe(() => {
        // wait for the modal to close to avoid having a flaky test
        modal.open(LongTextComponent, {
          size: eModalDesktopWidthSize.SMALL
        });

        viewContainerFixture.detectChanges();
        const longOverlay =
          overlayContainerElement.querySelector('.cdk-overlay-pane');
        const longContentHeight = longOverlay.clientHeight;

        expect(smallContentHeight).toBeLessThan(longContentHeight);
        done();
      });
      modalRef.close();
    });

    it('Should not exceed viewport height', () => {
      viewport.set('md');
      modal.open(LongTextComponent, {
        size: eModalDesktopWidthSize.SMALL
      });

      viewContainerFixture.detectChanges();
      const overlay =
        overlayContainerElement.querySelector('.cdk-overlay-pane');
      const longContentHeight = overlay.clientHeight;

      expect(longContentHeight).toBeLessThanOrEqual(window.innerHeight);
    });

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
      const width = parseFloat(style.width);
      // Allow for browser zoom/scaling tolerance
      expect(width).toBeGreaterThan(75);
      expect(width).toBeLessThan(100);
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
      const width = parseFloat(style.width);
      // Allow for browser zoom/scaling tolerance (300px ±10%)
      expect(width).toBeGreaterThan(270);
      expect(width).toBeLessThanOrEqual(300);
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
        const width = parseFloat(style.width);
        // Allow for browser zoom/scaling tolerance (800px ±10%)
        expect(width).toBeGreaterThan(720);
        expect(width).toBeLessThanOrEqual(800);
      });
    });
  });
});
