import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListasDesplegablesComponent } from './listas-desplegables.component';

describe('ListasDesplegablesComponent', () => {
  let component: ListasDesplegablesComponent;
  let fixture: ComponentFixture<ListasDesplegablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasDesplegablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasDesplegablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
