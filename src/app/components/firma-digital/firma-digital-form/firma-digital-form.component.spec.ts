import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FirmaDigitalFormComponent } from './firma-digital-form.component';

describe('FirmaDigitalFormComponent', () => {
  let component: FirmaDigitalFormComponent;
  let fixture: ComponentFixture<FirmaDigitalFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaDigitalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaDigitalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
