import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreOperacionesSucursalComponent } from './cierre-operaciones-sucursal.component';

describe('CierreOperacionesSucursalComponent', () => {
  let component: CierreOperacionesSucursalComponent;
  let fixture: ComponentFixture<CierreOperacionesSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CierreOperacionesSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreOperacionesSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
