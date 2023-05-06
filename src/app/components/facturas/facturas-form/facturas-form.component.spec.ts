import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FacturasFormComponent } from './facturas-form.component';

describe('FacturasFormComponent', () => {
  let component: FacturasFormComponent;
  let fixture: ComponentFixture<FacturasFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
