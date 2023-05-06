import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorfechahistoricodetalleComponent } from './indicadorfechahistoricodetalle.component';

describe('IndicadorfechahistoricodetalleComponent', () => {
  let component: IndicadorfechahistoricodetalleComponent;
  let fixture: ComponentFixture<IndicadorfechahistoricodetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadorfechahistoricodetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorfechahistoricodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
