import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { SucursalService } from "src/app/services/sucursal.service";

@Component({
  selector: "app-sucursal-cuis-masivo",
  templateUrl: "./sucursal-cuis-masivo.component.html",
  styleUrls: ["./sucursal-cuis-masivo.component.css"],
})
export class SucursalCuisMasivoComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  UsuarioActual: any;
  EmpresaSeleccionada: any;
  constructor(
    private SucursalService: SucursalService,
    public dialogRef: MatDialogRef<SucursalCuisMasivoComponent>
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
  }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  SolicitarCuisMasivo() {
    this.loading = true;
    this.SucursalService.sife_pdv_mule_solicitacuissucursalmasivo_post({
      nit: this.EmpresaSeleccionada,
    }).then((data) => {
      this.loading = false;
      this.transaccion = data.Respuesta.transaccion;
      this.Respuesta = data.Respuesta.descripcion;
    });
  }
}
