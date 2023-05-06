import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoSignificativoComponent } from './evento-significativo.component';

describe('EventoSignificativoComponent', () => {
  let component: EventoSignificativoComponent;
  let fixture: ComponentFixture<EventoSignificativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventoSignificativoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventoSignificativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
