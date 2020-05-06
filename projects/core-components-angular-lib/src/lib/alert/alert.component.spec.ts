import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertTypeToAlertClassPipe } from './alert-type-to-alert-class.pipe';
import { AlertTypeToAlertIconClassPipe } from './alert-type-to-alert-icon-class.pipe';
import { AlertComponent } from './alert.component';


describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach((async() => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent, AlertTypeToAlertClassPipe, AlertTypeToAlertIconClassPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await expect(component).toBeTruthy();
  });
});
