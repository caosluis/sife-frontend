import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaPdvComponent } from './consulta-pdv.component';

describe('ConsultaPdvComponent', () => {
  let component: ConsultaPdvComponent;
  let fixture: ComponentFixture<ConsultaPdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaPdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaPdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
