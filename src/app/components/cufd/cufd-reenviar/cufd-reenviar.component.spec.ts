import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CufdReenviarComponent } from './cufd-reenviar.component';

describe('CufdReenviarComponent', () => {
  let component: CufdReenviarComponent;
  let fixture: ComponentFixture<CufdReenviarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CufdReenviarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CufdReenviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
