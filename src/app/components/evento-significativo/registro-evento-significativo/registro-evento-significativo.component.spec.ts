import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEventoSignificativoComponent } from './registro-evento-significativo.component';

describe('RegistroEventoSignificativoComponent', () => {
  let component: RegistroEventoSignificativoComponent;
  let fixture: ComponentFixture<RegistroEventoSignificativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEventoSignificativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEventoSignificativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
