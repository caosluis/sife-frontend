import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HardwareComponent } from './hardware.component';

describe('HardwareComponent', () => {
  let component: HardwareComponent;
  let fixture: ComponentFixture<HardwareComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
