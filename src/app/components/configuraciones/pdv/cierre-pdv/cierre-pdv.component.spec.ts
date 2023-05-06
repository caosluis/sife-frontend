import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierrePdvComponent } from './cierre-pdv.component';

describe('CierrePdvComponent', () => {
  let component: CierrePdvComponent;
  let fixture: ComponentFixture<CierrePdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CierrePdvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CierrePdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
