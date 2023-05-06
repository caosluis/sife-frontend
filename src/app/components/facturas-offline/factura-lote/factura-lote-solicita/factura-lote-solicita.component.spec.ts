import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaLoteSolicitaComponent } from './factura-lote-solicita.component';

describe('FacturaLoteSolicitaComponent', () => {
  let component: FacturaLoteSolicitaComponent;
  let fixture: ComponentFixture<FacturaLoteSolicitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaLoteSolicitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaLoteSolicitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
