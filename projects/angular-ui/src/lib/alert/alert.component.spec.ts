/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaoAlertComponent } from './alert.component';
import { BaoAlertModule } from './module';

describe('BaoAlertComponent', () => {
  let component: BaoAlertComponent;
  let fixture: ComponentFixture<BaoAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaoAlertModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await expect(component).toBeTruthy();
  });
});
