import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuisComponent } from './cuis.component';

describe('CuisComponent', () => {
  let component: CuisComponent;
  let fixture: ComponentFixture<CuisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
