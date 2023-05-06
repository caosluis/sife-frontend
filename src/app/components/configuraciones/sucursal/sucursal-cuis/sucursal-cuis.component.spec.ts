import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalCuisComponent } from './sucursal-cuis.component';

describe('SucursalCuisComponent', () => {
  let component: SucursalCuisComponent;
  let fixture: ComponentFixture<SucursalCuisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalCuisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalCuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
