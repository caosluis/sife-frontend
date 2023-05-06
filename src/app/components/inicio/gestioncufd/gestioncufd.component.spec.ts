import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GestioncufdComponent } from './gestioncufd.component';

describe('GestioncufdComponent', () => {
  let component: GestioncufdComponent;
  let fixture: ComponentFixture<GestioncufdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioncufdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioncufdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
