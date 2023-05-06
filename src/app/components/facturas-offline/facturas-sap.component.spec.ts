import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FacturasSapComponent } from './facturas-sap.component';

describe('FacturasSapComponent', () => {
  let component: FacturasSapComponent;
  let fixture: ComponentFixture<FacturasSapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasSapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasSapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
