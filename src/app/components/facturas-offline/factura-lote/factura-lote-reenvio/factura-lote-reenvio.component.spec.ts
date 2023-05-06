import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaLoteReenvioComponent } from './factura-lote-reenvio.component';

describe('FacturaLoteReenvioComponent', () => {
  let component: FacturaLoteReenvioComponent;
  let fixture: ComponentFixture<FacturaLoteReenvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaLoteReenvioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaLoteReenvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
