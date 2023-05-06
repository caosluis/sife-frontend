import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SolSincronizaComponent } from './sol-sincroniza.component';

describe('SolSincronizaComponent', () => {
  let component: SolSincronizaComponent;
  let fixture: ComponentFixture<SolSincronizaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolSincronizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolSincronizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
