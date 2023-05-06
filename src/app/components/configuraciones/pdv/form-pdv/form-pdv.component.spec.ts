import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormPDVComponent } from './form-pdv.component';

describe('FormPDVComponent', () => {
  let component: FormPDVComponent;
  let fixture: ComponentFixture<FormPDVComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPDVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
