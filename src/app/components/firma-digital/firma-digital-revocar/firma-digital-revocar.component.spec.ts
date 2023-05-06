import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaDigitalRevocarComponent } from './firma-digital-revocar.component';

describe('FirmaDigitalRevocarComponent', () => {
  let component: FirmaDigitalRevocarComponent;
  let fixture: ComponentFixture<FirmaDigitalRevocarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmaDigitalRevocarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaDigitalRevocarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
