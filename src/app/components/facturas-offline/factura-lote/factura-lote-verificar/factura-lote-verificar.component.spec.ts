import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaLoteVerificarComponent } from './factura-lote-verificar.component';

describe('FacturaLoteVerificarComponent', () => {
  let component: FacturaLoteVerificarComponent;
  let fixture: ComponentFixture<FacturaLoteVerificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaLoteVerificarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaLoteVerificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
