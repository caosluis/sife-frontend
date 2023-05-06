import { NotificationService } from "./../../../services/notification.service";
import { Component, OnInit, Inject, Optional } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SincronizarService } from "./../../../services/sincronizar.service";
import { CrearpdvService } from "./../../../services/crearpdv.service";
import { SucursalService } from "./../../../services/sucursal.service";
import { FacturasService } from "./../../../services/facturas.service";
import * as _ from "lodash";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-sol-anulacion",
  templateUrl: "./sol-anulacion.component.html",
  styleUrls: ["./sol-anulacion.component.css"],
})
export class SolAnulacionComponent implements OnInit {
  local_data: any;
  codigoPuntoVentas: any;
  codigoSucursals: any;
  codigoMotivos: any;
  UsuarioActual: any;
  empresaSeleccionada: any;
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<SolAnulacionComponent>,
    private serviceCatalogo: SincronizarService,
    private servicePDV: CrearpdvService,
    private sucursalService: SucursalService,
    private serviceFactura: FacturasService,
    private notifica: NotificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.local_data = {
      codigoDocumentoSector: Number(data["obj"].codigoDocumentoSector),
      codigoMotivo: "",
      codigoPuntoVenta: Number(
        data["obj"].jsonFactura.facturaElectronicaEstandar.cabecera
          .codigoPuntoVenta
      ),
      codigoSucursal: Number(
        data["obj"].jsonFactura.facturaElectronicaEstandar.cabecera
          .codigoSucursal
      ),
      cuf: data["obj"].cuf,
      cufd: data["obj"].jsonFactura.facturaElectronicaEstandar.cabecera.cufd,
      cuis: data["obj"].cuis,
      nit: Number(
        data["obj"].jsonFactura.facturaElectronicaEstandar.cabecera.nitEmisor
      ),
      numeroDocumentoFiscal: Number(
        data["obj"].jsonFactura.facturaElectronicaEstandar.cabecera
          .numeroFactura
      ),
      codigoDocumentoFiscal: Number(data["obj"].codigoDocumentoFiscal),
    };
    this.populateForm(this.local_data);
  }
  form: FormGroup = new FormGroup({
    codigoPuntoVenta: new FormControl({ value: "", disabled: true }),
    codigoSucursal: new FormControl({ value: "", disabled: true }),
    cuf: new FormControl({ value: "", disabled: true }),
    numeroDocumentoFiscal: new FormControl({ value: "", disabled: true }),
    codigoMotivo: new FormControl(Validators.required),
    cufd: new FormControl({ value: "", disabled: true }),
    cuis: new FormControl({ value: "", disabled: true }),
    nit: new FormControl(""),
    codigoDocumentoSector: new FormControl({ value: "", disabled: true }),
  });
  ngOnInit() {
    this.serviceCatalogo
      .getProductoServ(this.empresaSeleccionada, "ParametricaMotivoAnulacion")
      .subscribe((data) => {
        this.codigoMotivos = data;
      });
    this.servicePDV.getAllPdv().then((data) => {
      this.codigoPuntoVentas = data;
    });
    this.sucursalService
      .sife_sucursal_get(this.empresaSeleccionada)
      .then((data) => {
        this.codigoSucursals = data;
      });
  }
  solicita() {
    if (this.form.get("codigoMotivo").value != "") {
      this.local_data.codigoMotivo = Number(
        this.form.get("codigoMotivo").value
      );
      this.serviceFactura
        .solicitudAnulacion(this.local_data)
        .subscribe((data) => {
          var keyR: any[] = Object.keys(data.respuesta);
          if (keyR[0] == "codigoRecepcion") {
            this.notifica.success("Su solicitud fue enviada con exito!");
            this.onClose();
          }
          if (keyR[0] == "error") {
            this.notifica.error(
              String(data.respuesta["error"]).replace("[", "").replace("]", "")
            );
            this.onClose();
          }
        });
    } else {
      this.notifica.warn("Es necesario seleccionar un motivo de anulación!");
    }
  }
  onClose() {
    this.form.reset();
    this.initializeFormGroup();
    this.dialogRef.close();
    this.dialogRef.close({ event: "Cancel" });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data, "codigoDocumentoFiscal"));
  }
  initializeFormGroup() {
    this.form.setValue({
      codigoPuntoVenta: "",
      codigoSucursal: "",
      cuf: "",
      numeroDocumentoFiscal: "",
      codigoMotivo: null,
      cufd: "",
      cuis: "",
      nit: "",
      codigoDocumentoSector: "",
    });
  }
}
