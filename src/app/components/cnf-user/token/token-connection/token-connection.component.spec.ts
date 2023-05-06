import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenConnectionComponent } from './token-connection.component';

describe('TokenConnectionComponent', () => {
  let component: TokenConnectionComponent;
  let fixture: ComponentFixture<TokenConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
