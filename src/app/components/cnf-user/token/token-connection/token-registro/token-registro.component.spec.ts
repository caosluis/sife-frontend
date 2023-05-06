import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenRegistroComponent } from './token-registro.component';

describe('TokenRegistroComponent', () => {
  let component: TokenRegistroComponent;
  let fixture: ComponentFixture<TokenRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
