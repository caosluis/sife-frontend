import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VerificaValorProductoComponent } from './verifica-valor-producto.component';

describe('VerificaValorProductoComponent', () => {
  let component: VerificaValorProductoComponent;
  let fixture: ComponentFixture<VerificaValorProductoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificaValorProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificaValorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
