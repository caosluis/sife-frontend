import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FacturasService } from "src/app/services/facturas.service";
import { SincronizarService } from "src/app/services/sincronizar.service";
import { SucursalService } from "src/app/services/sucursal.service";

@Component({
  selector: "app-factura-regularizacion",
  templateUrl: "./factura-regularizacion.component.html",
  styleUrls: ["./factura-regularizacion.component.css"],
})
export class FacturaRegularizacionComponent implements OnInit {
  actividadeconomicaList: any;
  Sucursales: any[];

  loading = false;
  Respuesta: any;
  transaccion: any;
  UsuarioActual: any;
  empresaSeleccionada: any;

  constructor(
    private FacturasService: FacturasService,
    private serviceCatalogo: SincronizarService,
    private sincronizarService: SincronizarService,
    private SucursalService: SucursalService,
    public dialogRef: MatDialogRef<FacturaRegularizacionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.sincronizarService.getProductoServ(this.empresaSeleccionada, "Actividades").subscribe((data) => {
      this.actividadeconomicaList = data;
    });
    this.SucursalService.sife_sucursal_get(this.empresaSeleccionada).then(
      (data) => {
        this.Sucursales = data;
      }
    );
  }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  RegularizacionFactura(datosfactura) {
    this.loading = true;
    this.FacturasService.sife_factura_mule_regularizar(
      datosfactura.actividad,
      datosfactura.direccion,
      datosfactura.factura
    ).then((data) => {
      console.log(data);
      this.transaccion = data.Respuesta.transaccion;
      this.Respuesta = data;
      this.loading = false;
    });
  }
}
