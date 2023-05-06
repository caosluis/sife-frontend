import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CufdFormComponent } from './cufd-form.component';

describe('CufdFormComponent', () => {
  let component: CufdFormComponent;
  let fixture: ComponentFixture<CufdFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CufdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CufdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
