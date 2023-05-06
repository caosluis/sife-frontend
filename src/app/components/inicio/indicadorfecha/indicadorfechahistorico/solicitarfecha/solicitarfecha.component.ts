import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { PdvService } from "src/app/services/pdv.service";
import { SifeFechaHoraService } from "src/app/services/sife-fecha-hora.service";
import { SucursalService } from "src/app/services/sucursal.service";

@Component({
  selector: "app-solicitarfecha",
  templateUrl: "./solicitarfecha.component.html",
  styleUrls: ["./solicitarfecha.component.css"],
})
export class SolicitarfechaComponent implements OnInit {
  empresaSeleccionada: any;
  UsuarioActual: any;
  sucursalList: any;
  pdvList: any;
  sucursalSeleccionada: any;
  pdvSeleccionada: any;
  cuisSeleccionado: any;
  transaccion: any;
  respuesta: any;
  loading = false;
  constructor(
    private SucursalService: SucursalService,
    private PdvService: PdvService,
    private SifeFechaHoraService: SifeFechaHoraService,
    public dialogRef: MatDialogRef<SolicitarfechaComponent>
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));

    this.SucursalService.sife_sucursal_get(this.empresaSeleccionada).then(
      (data) => {
        this.sucursalList = data;
      }
    );
  }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  SolicitarFecha() {
    this.loading = true;
    this.SifeFechaHoraService.sife_mule_FechaHora_post({
      nit: this.empresaSeleccionada,
      codigoSucursal: this.sucursalSeleccionada,
      codigoPDV: this.pdvSeleccionada,
    }).then((data) => {
      this.loading = false;
      this.respuesta = data.respuesta;
      this.transaccion = data.respuesta.transaccion;
      
    });
  }

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
}
