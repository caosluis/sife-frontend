import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorfechahistoricoComponent } from './indicadorfechahistorico.component';

describe('IndicadorfechahistoricoComponent', () => {
  let component: IndicadorfechahistoricoComponent;
  let fixture: ComponentFixture<IndicadorfechahistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicadorfechahistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorfechahistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
