import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectorcuisComponent } from './selectorcuis.component';

describe('SelectorcuisComponent', () => {
  let component: SelectorcuisComponent;
  let fixture: ComponentFixture<SelectorcuisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorcuisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorcuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
