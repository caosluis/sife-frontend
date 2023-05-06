import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaNitComponent } from './valida-nit.component';

describe('ValidaNitComponent', () => {
  let component: ValidaNitComponent;
  let fixture: ComponentFixture<ValidaNitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidaNitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidaNitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
