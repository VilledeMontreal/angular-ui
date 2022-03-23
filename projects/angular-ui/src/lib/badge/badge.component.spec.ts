/*
 * Copyright (c) 2022 Ville de Montreal. All rights reserved.
 * Licensed under the MIT license.
 * See LICENSE file in the project root for full license information.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoBadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BaoBadgeComponent;
  let fixture: ComponentFixture<BaoBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaoBadgeComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
