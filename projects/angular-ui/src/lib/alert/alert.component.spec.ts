/*
 * Copyright (c) 2026 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaoAlertComponent } from './alert.component';
import { BaoAlertModule } from './module';

describe('BaoAlertComponent', () => {
  let component: BaoAlertComponent;
  let fixture: ComponentFixture<BaoAlertComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaoAlertModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoAlertComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be a warning type and the dismissible button invisible', () => {
    // Set input
    component.type = 'warning';

    // Directly call ngOnChanges
    component.ngOnChanges({
      type: new SimpleChange(null, component.type, true)
    });

    // Trigger a change detection
    fixture.detectChanges();

    // Should have the right class on host
    expect(
      element.classList.contains(`bao-alert-${component.type}`)
    ).toBeTrue();

    // Should have a default title tag depending on the alert type
    const titleElement = element.querySelector('title');
    expect(titleElement.textContent).toBe('Attention');

    // The dismissible button should not be there
    const dismissibleButtonElement = element.querySelector('button');
    expect(dismissibleButtonElement).toBeFalsy();
  });

  it('should be a warning type and the dismissible button visible', () => {
    // Set input
    component.type = 'warning';
    component.dismissible = true;

    // Directly call ngOnChanges
    component.ngOnChanges({
      type: new SimpleChange(null, component.type, true)
    });

    // Trigger a change detection
    fixture.detectChanges();

    // Should have a default aria-label text
    const dismissibleButtonElement = element.querySelector('button');
    expect(dismissibleButtonElement.getAttribute('aria-label')).toBe(
      'Cacher le message'
    );
  });

  it('should be created and the title of the alert type and the dismissible button aria-label should be translated', () => {
    // Set input
    component.type = 'warning';
    component.alertTypeTitle = 'Warning';
    component.dismissibleButtonAriaLabel = 'Hide the message';
    component.dismissible = true;

    // Directly call ngOnChanges
    component.ngOnChanges({
      type: new SimpleChange(null, component.type, true)
    });

    // Trigger a change detection
    fixture.detectChanges();

    // Should have an overridden title tag
    const titleElement = element.querySelector('title');
    expect(titleElement.textContent).toBe(component.alertTypeTitle);

    // Should have an overridden aria-label text
    const dismissibleButtonElement = element.querySelector('button');
    expect(dismissibleButtonElement.getAttribute('aria-label')).toBe(
      component.dismissibleButtonAriaLabel
    );
  });
});
