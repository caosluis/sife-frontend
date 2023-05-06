import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalCuisMasivoComponent } from './sucursal-cuis-masivo.component';

describe('SucursalCuisMasivoComponent', () => {
  let component: SucursalCuisMasivoComponent;
  let fixture: ComponentFixture<SucursalCuisMasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalCuisMasivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalCuisMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
