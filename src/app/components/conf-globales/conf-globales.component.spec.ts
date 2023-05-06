import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfGlobalesComponent } from './conf-globales.component';

describe('ConfGlobalesComponent', () => {
  let component: ConfGlobalesComponent;
  let fixture: ComponentFixture<ConfGlobalesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfGlobalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
