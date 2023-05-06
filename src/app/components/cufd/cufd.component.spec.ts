import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CufdComponent } from './cufd.component';

describe('CufdComponent', () => {
  let component: CufdComponent;
  let fixture: ComponentFixture<CufdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CufdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CufdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
