import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CufdRenovarComponent } from './cufd-renovar.component';

describe('CufdRenovarComponent', () => {
  let component: CufdRenovarComponent;
  let fixture: ComponentFixture<CufdRenovarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CufdRenovarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CufdRenovarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
