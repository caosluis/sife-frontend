import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NandinaComponent } from './nandina.component';

describe('NandinaComponent', () => {
  let component: NandinaComponent;
  let fixture: ComponentFixture<NandinaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NandinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NandinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
