import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacionRegistroComponent } from './autorizacion-registro.component';

describe('AutorizacionRegistroComponent', () => {
  let component: AutorizacionRegistroComponent;
  let fixture: ComponentFixture<AutorizacionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizacionRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
