import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CufdHistoricoComponent } from './cufd-historico.component';

describe('CufdHistoricoComponent', () => {
  let component: CufdHistoricoComponent;
  let fixture: ComponentFixture<CufdHistoricoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CufdHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CufdHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
