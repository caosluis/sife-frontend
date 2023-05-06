import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FacturasResumenComponent } from './facturas-resumen.component';

describe('FacturasResumenComponent', () => {
  let component: FacturasResumenComponent;
  let fixture: ComponentFixture<FacturasResumenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
