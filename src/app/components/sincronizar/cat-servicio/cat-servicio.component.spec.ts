import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatServicioComponent } from './cat-servicio.component';

describe('CatServicioComponent', () => {
  let component: CatServicioComponent;
  let fixture: ComponentFixture<CatServicioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
