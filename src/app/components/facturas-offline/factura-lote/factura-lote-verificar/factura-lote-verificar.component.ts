import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FacturaElectronicaLoteService } from "src/app/services/factura-electronica-lote.service";

@Component({
  selector: "app-factura-lote-verificar",
  templateUrl: "./factura-lote-verificar.component.html",
  styleUrls: ["./factura-lote-verificar.component.css"],
})
export class FacturaLoteVerificarComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  codigoDescripcion: any;
  datos_observacion: any = [];
  mostrarTabla: any = false;
  displayedColumns: string[] = [
    "advertencia",
    "codigo",
    "descripcion",
    "numeroArchivo",
  ];
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FacturaLoteVerificarComponent>,
    private facturaelectronicaloteService: FacturaElectronicaLoteService
  ) {}

  ngOnInit(): void {}
  VerificarLote() {
    this.loading = true;
    this.facturaelectronicaloteService
      .sife_facturaElectronica_lote_verificar({
        nit: this.data.nit,
        codigoSucursal: this.data.codigoSucursal,
        codigoPuntoVenta: this.data.codigoPuntoVenta,
        codigoRecepcion: this.data.codigoRecepcion,
        tipoFacturaDocumento: this.data.tipoFacturaDocumento,
        codigoDocumentoSector: this.data.codigoDocumentoSector,
        codigoEmision: "2",
      })
      .then((data) => {
        this.Respuesta = data;
        this.transaccion = data.respuesta.transaccion;
        this.codigoDescripcion = data.respuesta.codigoDescripcion;
        if (this.codigoDescripcion == "OBSERVADA") {
          this.mostrarTabla = true;
          if (Array.isArray(this.Respuesta.respuesta.mensajesList)) {
            this.datos_observacion = this.Respuesta.respuesta.mensajesList;
          } else {
            this.datos_observacion = [];
            this.datos_observacion.push(this.Respuesta.respuesta.mensajesList);
          }
        }

        this.loading = false;
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
