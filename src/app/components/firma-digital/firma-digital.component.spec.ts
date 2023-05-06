import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FirmaDigitalComponent } from './firma-digital.component';

describe('FirmaDigitalComponent', () => {
  let component: FirmaDigitalComponent;
  let fixture: ComponentFixture<FirmaDigitalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaDigitalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
