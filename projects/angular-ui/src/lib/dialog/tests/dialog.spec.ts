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
  BaoDialog,
  BaoDialogModule,
  BaoDialogRef,
  eDialogDesktopWidthSize,
  eDialogMobileWidthSize
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
    public dialogRef: BaoDialogRef<AddressComponent>,
    public dialogInjector: Injector
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

describe('BaoDialogComponent', () => {
  describe('', () => {
    let dialog: BaoDialog;
    let overlayContainerElement: HTMLElement;
    let viewContainerFixture: ComponentFixture<ComponentWithChildViewContainer>;

    beforeEach(fakeAsync(() => {
      TestBed.configureTestingModule({
        imports: [BaoDialogModule],
        declarations: [
          ComponentWithChildViewContainer,
          DirectiveWithViewContainer
        ],
        providers: []
      });

      TestBed.compileComponents();
    }));

    beforeEach(inject(
      [BaoDialog, OverlayContainer],
      (d: BaoDialog, oc: OverlayContainer) => {
        dialog = d;
        overlayContainerElement = oc.getContainerElement();
      }
    ));

    beforeEach(() => {
      viewContainerFixture = TestBed.createComponent(
        ComponentWithChildViewContainer
      );
      viewContainerFixture.detectChanges();
    });

    it('should open a dialog with component', () => {
      const dialogRef = dialog.open(AddressComponent);

      viewContainerFixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('Adresse');
      expect(dialogRef.componentInstance instanceof AddressComponent).toBe(true);

      viewContainerFixture.detectChanges();

      const dialogContainerElement = overlayContainerElement.querySelector(
        'bao-dialog-container'
      )!;
      expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
    });

    it('should close a dialog', fakeAsync(() => {
      const dialogRef = dialog.open(AddressComponent);

      viewContainerFixture.detectChanges();
      expect(dialogRef.componentInstance instanceof AddressComponent).toBe(true);

      dialogRef.close();
      viewContainerFixture.detectChanges();
      flush();

      expect(
        overlayContainerElement.querySelector('bao-dialog-container')
      ).toBeNull();
    }));

    it('should use the default value (small on desktop and fullwidth on mobile)', () => {
      dialog.open(AddressComponent);

      viewContainerFixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-sm')
      ).toBeTruthy();
      expect(overlayContainerElement.querySelector('.bao-dialog-md')).toBeNull();
      expect(overlayContainerElement.querySelector('.bao-dialog-lg')).toBeNull();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-mobil-full')
      ).toBeTruthy();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-mobil-compact')
      ).toBeNull();
    });

    it('should use the config value (small on desktop and fullwidth on mobile)', () => {
      dialog.open(AddressComponent, {
        size: eDialogDesktopWidthSize.SMALL,
        mobileSize: eDialogMobileWidthSize.FULL
      });

      viewContainerFixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-sm')
      ).toBeTruthy();
      expect(overlayContainerElement.querySelector('.bao-dialog-md')).toBeNull();
      expect(overlayContainerElement.querySelector('.bao-dialog-lg')).toBeNull();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-mobil-full')
      ).toBeTruthy();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-mobil-compact')
      ).toBeNull();
    });

    it('should use the config value (medium on desktop and fullwidth on mobile)', () => {
      dialog.open(AddressComponent, {
        size: eDialogDesktopWidthSize.MEDIUM,
        mobileSize: eDialogMobileWidthSize.FULL
      });

      viewContainerFixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-md')
      ).toBeTruthy();
      expect(overlayContainerElement.querySelector('.bao-dialog-sm')).toBeNull();
      expect(overlayContainerElement.querySelector('.bao-dialog-lg')).toBeNull();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-mobil-full')
      ).toBeTruthy();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-mobil-compact')
      ).toBeNull();
    });

    it('should use the config value (medium on desktop and compact on mobile)', () => {
      dialog.open(AddressComponent, {
        size: eDialogDesktopWidthSize.LARGE,
        mobileSize: eDialogMobileWidthSize.COMPACT
      });

      viewContainerFixture.detectChanges();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-lg')
      ).toBeTruthy();
      expect(overlayContainerElement.querySelector('.bao-dialog-sm')).toBeNull();
      expect(overlayContainerElement.querySelector('.bao-dialog-md')).toBeNull();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-mobil-compact')
      ).toBeTruthy();
      expect(
        overlayContainerElement.querySelector('.bao-dialog-mobil-full')
      ).toBeNull();
    });

    it('FULL width on mobile as config should have 100% parent width on mobile resolution', () => {
      viewport.set(100);
      dialog.open(AddressComponent, {
        mobileSize: eDialogMobileWidthSize.FULL
      });

      viewContainerFixture.detectChanges();
      const overlay = overlayContainerElement.querySelector(
        '.bao-dialog-mobil-full'
      );
      const style = window.getComputedStyle(overlay);
      expect(style.width).toBe('85px');
    });

    it('COMPACT width on mobile as config should have 300px max-width on mobile resolution', () => {
      viewport.set('sm');
      dialog.open(AddressComponent, {
        mobileSize: eDialogMobileWidthSize.COMPACT
      });

      viewContainerFixture.detectChanges();
      const overlay = overlayContainerElement.querySelector(
        '.bao-dialog-mobil-compact'
      );
      const style = window.getComputedStyle(overlay);
      expect(style.width).toBe('300px');
    });

    it('SMALL width on desktop as config should have 500px on deskop resolution (>=768px)', () => {
      viewport.from('md', () => {
        dialog.open(AddressComponent, {
          size: eDialogDesktopWidthSize.SMALL
        });

        viewContainerFixture.detectChanges();
        const overlay = overlayContainerElement.querySelector('.bao-dialog-sm');
        const style = window.getComputedStyle(overlay);
        expect(style.width).toBe('500px');
      });
    });

    it('MEDIUM width on desktop as config should have 500px from medium to large screen resolutions', () => {
      viewport.set('md');
      dialog.open(AddressComponent, {
        size: eDialogDesktopWidthSize.MEDIUM
      });

      viewContainerFixture.detectChanges();
      const overlay = overlayContainerElement.querySelector('.bao-dialog-md');
      const style = window.getComputedStyle(overlay);
      expect(style.width).toBe('500px');
    });

    it('MEDIUM width on desktop as config should have 800px on large and higher resolutions', () => {
      viewport.from('lg', () => {
        dialog.open(AddressComponent, {
          size: eDialogDesktopWidthSize.MEDIUM
        });

        viewContainerFixture.detectChanges();
        const overlay = overlayContainerElement.querySelector('.bao-dialog-md');
        const style = window.getComputedStyle(overlay);
        expect(style.width).toBe('800px');
      });
    });
  });
});
