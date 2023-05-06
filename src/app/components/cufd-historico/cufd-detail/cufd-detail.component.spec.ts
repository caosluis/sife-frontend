import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CufdDetailComponent } from './cufd-detail.component';

describe('CufdDetailComponent', () => {
  let component: CufdDetailComponent;
  let fixture: ComponentFixture<CufdDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CufdDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CufdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
