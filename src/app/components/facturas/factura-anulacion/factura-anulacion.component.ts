import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FacturasService } from "src/app/services/facturas.service";
import { SincronizarService } from "src/app/services/sincronizar.service";

@Component({
  selector: "app-factura-anulacion",
  templateUrl: "./factura-anulacion.component.html",
  styleUrls: ["./factura-anulacion.component.css"],
})
export class FacturaAnulacionComponent implements OnInit {
  MotivoAnulacion: any;
  loading = false;
  Respuesta: any;
  transaccion: any;
  empresaSeleccionada: any;
  constructor(
    private FacturasService: FacturasService,
    private serviceCatalogo: SincronizarService,
    public dialogRef: MatDialogRef<FacturaAnulacionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.serviceCatalogo
      .getProductoServ(this.empresaSeleccionada, "ParametricaMotivoAnulacion")
      .subscribe((data) => {
        this.MotivoAnulacion = data;
      });
  }

  ngOnInit(): void {
    /* console.log(this.data); */
  }

  AnulacionFactura(datosfactura) {
    this.loading = true;
    this.FacturasService.sife_factura_mule_anular(
      datosfactura.motivo,
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
