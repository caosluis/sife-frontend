import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransicionComponent } from './transicion.component';

describe('TransicionComponent', () => {
  let component: TransicionComponent;
  let fixture: ComponentFixture<TransicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
