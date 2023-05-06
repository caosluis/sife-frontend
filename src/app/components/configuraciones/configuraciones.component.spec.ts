import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfiguracionesComponent } from './configuraciones.component';

describe('ConfiguracionesComponent', () => {
  let component: ConfiguracionesComponent;
  let fixture: ComponentFixture<ConfiguracionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
