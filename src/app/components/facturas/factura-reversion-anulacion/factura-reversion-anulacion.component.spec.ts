import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaReversionAnulacionComponent } from './factura-reversion-anulacion.component';

describe('FacturaReversionAnulacionComponent', () => {
  let component: FacturaReversionAnulacionComponent;
  let fixture: ComponentFixture<FacturaReversionAnulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaReversionAnulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaReversionAnulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
