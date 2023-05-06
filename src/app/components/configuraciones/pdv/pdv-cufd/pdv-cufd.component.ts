import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PdvService } from "src/app/services/pdv.service";

@Component({
  selector: "app-pdv-cufd",
  templateUrl: "./pdv-cufd.component.html",
  styleUrls: ["./pdv-cufd.component.css"],
})
export class PdvCufdComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PdvCufdComponent>,
    private pdvService: PdvService
  ) {
    if (this.data.codigoPDV == undefined) {
      this.data.codigoPDV = "0";
    }
  }

  ngOnInit(): void {}
  Solicitar(sucursal) {
    this.loading = true;
    this.pdvService.sife_pdv_mule_solicitarCufd(sucursal).then((data) => {
      this.transaccion = data.Respuesta.transaccion;
      this.Respuesta = data;
      this.loading = false;
    });
  }
  onClose() {
    this.dialogRef.close();
  }
}
