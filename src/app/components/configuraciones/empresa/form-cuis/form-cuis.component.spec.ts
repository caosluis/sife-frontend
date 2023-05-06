import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormCuisComponent } from './form-cuis.component';

describe('FormCuisComponent', () => {
  let component: FormCuisComponent;
  let fixture: ComponentFixture<FormCuisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCuisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
