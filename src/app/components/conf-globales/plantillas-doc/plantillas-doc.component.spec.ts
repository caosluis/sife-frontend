import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlantillasDocComponent } from './plantillas-doc.component';

describe('PlantillasDocComponent', () => {
  let component: PlantillasDocComponent;
  let fixture: ComponentFixture<PlantillasDocComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantillasDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
