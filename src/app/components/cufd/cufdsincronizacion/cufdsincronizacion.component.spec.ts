import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CufdsincronizacionComponent } from './cufdsincronizacion.component';

describe('CufdsincronizacionComponent', () => {
  let component: CufdsincronizacionComponent;
  let fixture: ComponentFixture<CufdsincronizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CufdsincronizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CufdsincronizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
