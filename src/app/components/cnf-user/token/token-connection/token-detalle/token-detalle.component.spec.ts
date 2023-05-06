import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDetalleComponent } from './token-detalle.component';

describe('TokenDetalleComponent', () => {
  let component: TokenDetalleComponent;
  let fixture: ComponentFixture<TokenDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
