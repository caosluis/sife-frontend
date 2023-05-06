import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SincronizarComponent } from './sincronizar.component';

describe('SincronizarComponent', () => {
  let component: SincronizarComponent;
  let fixture: ComponentFixture<SincronizarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SincronizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SincronizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
