import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargaCatalogosComponent } from './recarga-catalogos.component';

describe('RecargaCatalogosComponent', () => {
  let component: RecargaCatalogosComponent;
  let fixture: ComponentFixture<RecargaCatalogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecargaCatalogosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecargaCatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
