import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NuevoValorProductoComponent } from './nuevo-valor-producto.component';

describe('NuevoValorProductoComponent', () => {
  let component: NuevoValorProductoComponent;
  let fixture: ComponentFixture<NuevoValorProductoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoValorProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoValorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
