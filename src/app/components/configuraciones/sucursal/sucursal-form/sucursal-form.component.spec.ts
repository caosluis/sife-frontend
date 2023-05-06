import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SucursalFormComponent } from './sucursal-form.component';

describe('SucursalFormComponent', () => {
  let component: SucursalFormComponent;
  let fixture: ComponentFixture<SucursalFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
