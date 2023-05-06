import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CnfUserComponent } from './cnf-user.component';

describe('CnfUserComponent', () => {
  let component: CnfUserComponent;
  let fixture: ComponentFixture<CnfUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CnfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
