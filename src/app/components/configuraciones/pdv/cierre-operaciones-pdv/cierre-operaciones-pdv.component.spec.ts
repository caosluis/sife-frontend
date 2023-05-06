import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreOperacionesPdvComponent } from './cierre-operaciones-pdv.component';

describe('CierreOperacionesPdvComponent', () => {
  let component: CierreOperacionesPdvComponent;
  let fixture: ComponentFixture<CierreOperacionesPdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CierreOperacionesPdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreOperacionesPdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
