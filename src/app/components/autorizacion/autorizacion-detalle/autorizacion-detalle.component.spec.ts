import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionDetalleComponent } from './autorizacion-detalle.component';

describe('AutorizacionDetalleComponent', () => {
  let component: AutorizacionDetalleComponent;
  let fixture: ComponentFixture<AutorizacionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
