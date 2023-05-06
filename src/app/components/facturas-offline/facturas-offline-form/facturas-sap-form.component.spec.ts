import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FacturasSapFormComponent } from "./facturas-sap-form.component";

describe("FacturasFormComponent", () => {
  let component: FacturasSapFormComponent;
  let fixture: ComponentFixture<FacturasSapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturasSapFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasSapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
