/* tslint:disable:no-unused-variable */
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BaoTooltipComponent } from './tooltip.component';

describe('TooltipPopperComponent', () => {
  let component: BaoTooltipComponent;
  let fixture: ComponentFixture<BaoTooltipComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [BaoTooltipComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoTooltipComponent);
    component = fixture.componentInstance;
    component.content = 'test content';
    component.elementRef = new ElementRef(document.createElement('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
