import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListasDesplegablesFormComponent } from './listas-desplegables-form.component';

describe('ListasDesplegablesFormComponent', () => {
  let component: ListasDesplegablesFormComponent;
  let fixture: ComponentFixture<ListasDesplegablesFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListasDesplegablesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListasDesplegablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
