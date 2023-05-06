import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlantillasDocFormComponent } from './plantillas-doc-form.component';

describe('PlantillasDocFormComponent', () => {
  let component: PlantillasDocFormComponent;
  let fixture: ComponentFixture<PlantillasDocFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
