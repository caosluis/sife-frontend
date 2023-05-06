import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludSistemaComponent } from './salud-sistema.component';

describe('SaludSistemaComponent', () => {
  let component: SaludSistemaComponent;
  let fixture: ComponentFixture<SaludSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludSistemaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
