import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaRegularizacionComponent } from './factura-regularizacion.component';

describe('FacturaRegularizacionComponent', () => {
  let component: FacturaRegularizacionComponent;
  let fixture: ComponentFixture<FacturaRegularizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaRegularizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaRegularizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
