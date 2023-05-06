import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadrofacturasComponent } from './cuadrofacturas.component';

describe('CuadrofacturasComponent', () => {
  let component: CuadrofacturasComponent;
  let fixture: ComponentFixture<CuadrofacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuadrofacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadrofacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
