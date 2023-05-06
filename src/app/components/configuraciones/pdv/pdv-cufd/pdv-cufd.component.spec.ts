import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdvCufdComponent } from './pdv-cufd.component';

describe('PdvCufdComponent', () => {
  let component: PdvCufdComponent;
  let fixture: ComponentFixture<PdvCufdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdvCufdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdvCufdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
