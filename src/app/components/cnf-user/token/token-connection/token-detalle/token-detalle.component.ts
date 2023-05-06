import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-token-detalle",
  templateUrl: "./token-detalle.component.html",
  styleUrls: ["./token-detalle.component.css"],
})
export class TokenDetalleComponent implements OnInit {
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
