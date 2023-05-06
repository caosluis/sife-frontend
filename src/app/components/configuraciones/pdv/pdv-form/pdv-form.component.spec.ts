import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PdvFormComponent } from './pdv-form.component';

describe('PdvFormComponent', () => {
  let component: PdvFormComponent;
  let fixture: ComponentFixture<PdvFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PdvFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdvFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
