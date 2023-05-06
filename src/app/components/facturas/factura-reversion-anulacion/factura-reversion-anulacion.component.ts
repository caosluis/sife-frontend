import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FacturasService } from "src/app/services/facturas.service";

@Component({
  selector: "app-factura-reversion-anulacion",
  templateUrl: "./factura-reversion-anulacion.component.html",
  styleUrls: ["./factura-reversion-anulacion.component.css"],
})
export class FacturaReversionAnulacionComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;

  constructor(
    private FacturasService: FacturasService,
    public dialogRef: MatDialogRef<FacturaReversionAnulacionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    /* console.log(this.data); */
  }

  ReversionAnulacionFactura(datosfactura) {
    this.loading = true;
    this.FacturasService.sife_factura_mule_revertir_anular(
      datosfactura.factura
    ).then((data) => {
      this.transaccion = data.Respuesta.transaccion;
      this.Respuesta = data;
      this.loading = false;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
