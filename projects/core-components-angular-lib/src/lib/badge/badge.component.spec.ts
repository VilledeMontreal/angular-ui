import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoBadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BaoBadgeComponent;
  let fixture: ComponentFixture<BaoBadgeComponent>;

  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaoBadgeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await expect(component).toBeTruthy();
  });
});
