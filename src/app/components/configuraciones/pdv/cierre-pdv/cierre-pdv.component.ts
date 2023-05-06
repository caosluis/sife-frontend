import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CuisService } from "src/app/services/cuis.service";
import { PdvService } from "src/app/services/pdv.service";

@Component({
  selector: "app-cierre-pdv",
  templateUrl: "./cierre-pdv.component.html",
  styleUrls: ["./cierre-pdv.component.css"],
})
export class CierrePdvComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  cuisList: any;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public pdvService: PdvService,
    private cuisService: CuisService,
    public dialogRef: MatDialogRef<CierrePdvComponent>
  ) {
    this.cuisService.sife_cuis_get().then((data) => {
      this.cuisList = data;
    });
  }

  ngOnInit(): void {}
  CerrarPDV(datos_pdv) {
    this.loading = true;
    var cuis_sucursal;

    cuis_sucursal = this.CuisPdv(
      datos_pdv.nit,
      datos_pdv.codigoSucursal,
      datos_pdv.codigoPDV,
      datos_pdv.solicitudCuis
    );
    this.pdvService
      .sife_pdv_mule_cerrar(datos_pdv, cuis_sucursal)
      .then((data) => {
        this.transaccion = data.Respuesta.transaccion;
        this.Respuesta = data;
        this.loading = false;
      });
  }
  CuisPdv(nit, sucursal, pdv, solicitudCuis) {
    if (this.cuisList != undefined) {
      var cuispdv = [];
      if (solicitudCuis != "0") {
        for (let i = 0; i < this.cuisList.length; i++) {
          if (
            this.cuisList[i].nit == nit &&
            this.cuisList[i].codigoSucursal == sucursal &&
            this.cuisList[i].codigoPDV == pdv
          ) {
            cuispdv.push(this.cuisList[i]);
          }
        }
        if (cuispdv[0] != undefined) {
          return cuispdv[0].cuis;
        }
      } else {
        cuispdv = this.cuisList.filter(
          (item) => item.nit == nit && item.codigoSucursal == sucursal
        );
        return cuispdv[0].cuis;
      }
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
