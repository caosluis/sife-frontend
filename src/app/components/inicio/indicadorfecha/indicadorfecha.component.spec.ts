import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndicadorfechaComponent } from './indicadorfecha.component';

describe('IndicadorfechaComponent', () => {
  let component: IndicadorfechaComponent;
  let fixture: ComponentFixture<IndicadorfechaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorfechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorfechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
