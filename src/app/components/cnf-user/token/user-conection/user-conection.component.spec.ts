import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserConectionComponent } from './user-conection.component';

describe('UserConectionComponent', () => {
  let component: UserConectionComponent;
  let fixture: ComponentFixture<UserConectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
