import { SincronizarService } from "src/app/services/sincronizar.service";
import { Component, OnInit, Inject, Optional } from "@angular/core";
import * as _ from "lodash";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SucursalService } from "src/app/services/sucursal.service";
import { PdvService } from "src/app/services/pdv.service";

@Component({
  selector: "app-sol-sincroniza",
  templateUrl: "./sol-sincroniza.component.html",
  styleUrls: ["./sol-sincroniza.component.css"],
})
export class SolSincronizaComponent implements OnInit {
  action: string;
  local_data: any;
  datos: any;
  loading: boolean;
  respuesta: any;
  Estado: any;
  UsuarioActual: any;
  empresaSeleccionada: any;
  sucursalSeleccionada: any;
  pdvSeleccionada: any;
  cuisSeleccionado: any;
  sucursalList: any;
  pdvList: any;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private SucursalService: SucursalService,
    private PdvService: PdvService,
    public dialogRef: MatDialogRef<SolSincronizaComponent>,
    private SincronizarService: SincronizarService
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.SucursalService.sife_sucursal_get(this.empresaSeleccionada).then(
      (data) => {
        this.sucursalList = data;
      }
    );
  }

  ngOnInit() {}
  SeleccionarSucursal(sucursal) {
    this.sucursalSeleccionada = sucursal.value;
    this.PdvService.sife_pdv_get_susursal(
      this.empresaSeleccionada,
      this.sucursalSeleccionada
    ).then((data) => {
      this.pdvList = data;
    });
  }
  SeleccionarPDV(pdv) {
    if (pdv.value == 0) {
      this.pdvSeleccionada = pdv.value;
      this.cuisSeleccionado = this.cuisSucursal(this.sucursalSeleccionada);
    } else {
      this.pdvSeleccionada = pdv.value;
      this.cuisSeleccionado = this.cuisPDV(pdv.value);
    }
  }

  cuisPDV(pdv) {
    if (this.pdvList != undefined) {
      for (let i = 0; i < this.pdvList.length; i++) {
        if (this.pdvList[i].codigoPDV == pdv) {
          return this.pdvList[i].cuis;
        }
      }
    }
  }
  cuisSucursal(sucursal) {
    if (this.sucursalList != undefined) {
      for (let i = 0; i < this.sucursalList.length; i++) {
        if (this.sucursalList[i].codigoSucursal == sucursal) {
          return this.sucursalList[i].cuis;
        }
      }
    }
  }
  SolicitarSincronizacion() {
    this.loading = true;
    this.SincronizarService.submitSolSincronizar({
      nit: this.empresaSeleccionada,
      codigoSucursal: this.sucursalSeleccionada,
      codigoPDV: this.pdvSeleccionada,
      id: this.data.id,
      ServicioWeb: this.data.ServicioWeb,
    }).then((data) => {
      this.respuesta = data.respuesta;
      this.Estado = data.respuesta.Estado;
      this.loading = false;
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
