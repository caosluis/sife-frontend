import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaLoteDetalleComponent } from './factura-lote-detalle.component';

describe('FacturaLoteDetalleComponent', () => {
  let component: FacturaLoteDetalleComponent;
  let fixture: ComponentFixture<FacturaLoteDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaLoteDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaLoteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
