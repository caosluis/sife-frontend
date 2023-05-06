import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndicadoresComponent } from './indicadores.component';

describe('IndicadoresComponent', () => {
  let component: IndicadoresComponent;
  let fixture: ComponentFixture<IndicadoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
