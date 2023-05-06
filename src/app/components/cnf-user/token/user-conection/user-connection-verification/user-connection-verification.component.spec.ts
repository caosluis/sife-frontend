import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserConnectionVerificationComponent } from './user-connection-verification.component';

describe('UserConnectionVerificationComponent', () => {
  let component: UserConnectionVerificationComponent;
  let fixture: ComponentFixture<UserConnectionVerificationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConnectionVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConnectionVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
