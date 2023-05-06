import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdvCuisComponent } from './pdv-cuis.component';

describe('PdvCuisComponent', () => {
  let component: PdvCuisComponent;
  let fixture: ComponentFixture<PdvCuisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdvCuisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdvCuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
