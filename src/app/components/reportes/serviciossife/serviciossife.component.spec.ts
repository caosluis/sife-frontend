import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciossifeComponent } from './serviciossife.component';

describe('ServiciossifeComponent', () => {
  let component: ServiciossifeComponent;
  let fixture: ComponentFixture<ServiciossifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciossifeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciossifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
