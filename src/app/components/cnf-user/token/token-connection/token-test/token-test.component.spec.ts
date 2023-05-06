import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenTestComponent } from './token-test.component';

describe('TokenTestComponent', () => {
  let component: TokenTestComponent;
  let fixture: ComponentFixture<TokenTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
