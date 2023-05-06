import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HistoricoComponent } from './historico.component';

describe('HistoricoComponent', () => {
  let component: HistoricoComponent;
  let fixture: ComponentFixture<HistoricoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
