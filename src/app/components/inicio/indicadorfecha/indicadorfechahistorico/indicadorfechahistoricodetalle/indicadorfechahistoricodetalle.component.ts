import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-indicadorfechahistoricodetalle",
  templateUrl: "./indicadorfechahistoricodetalle.component.html",
  styleUrls: ["./indicadorfechahistoricodetalle.component.css"],
})
export class IndicadorfechahistoricodetalleComponent implements OnInit {
  public dialogRef: MatDialogRef<IndicadorfechahistoricodetalleComponent>;
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}
