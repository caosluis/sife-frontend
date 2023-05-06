import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaAnulacionComponent } from './factura-anulacion.component';

describe('FacturaAnulacionComponent', () => {
  let component: FacturaAnulacionComponent;
  let fixture: ComponentFixture<FacturaAnulacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturaAnulacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaAnulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
