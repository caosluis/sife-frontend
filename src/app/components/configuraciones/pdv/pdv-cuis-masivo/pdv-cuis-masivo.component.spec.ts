import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdvCuisMasivoComponent } from './pdv-cuis-masivo.component';

describe('PdvCuisMasivoComponent', () => {
  let component: PdvCuisMasivoComponent;
  let fixture: ComponentFixture<PdvCuisMasivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdvCuisMasivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdvCuisMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
