import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarfechaComponent } from './solicitarfecha.component';

describe('SolicitarfechaComponent', () => {
  let component: SolicitarfechaComponent;
  let fixture: ComponentFixture<SolicitarfechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarfechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarfechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
