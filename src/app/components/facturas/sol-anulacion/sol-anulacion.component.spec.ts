import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SolAnulacionComponent } from './sol-anulacion.component';

describe('SolAnulacionComponent', () => {
  let component: SolAnulacionComponent;
  let fixture: ComponentFixture<SolAnulacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolAnulacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolAnulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
