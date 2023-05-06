import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaLoteComponent } from './factura-lote.component';

describe('FacturaLoteComponent', () => {
  let component: FacturaLoteComponent;
  let fixture: ComponentFixture<FacturaLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaLoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
