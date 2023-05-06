import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConexionesComponent } from './conexiones.component';

describe('ConexionesComponent', () => {
  let component: ConexionesComponent;
  let fixture: ComponentFixture<ConexionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConexionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConexionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
