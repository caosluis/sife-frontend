import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { PdvService } from "src/app/services/pdv.service";

@Component({
  selector: "app-pdv-cuis-masivo",
  templateUrl: "./pdv-cuis-masivo.component.html",
  styleUrls: ["./pdv-cuis-masivo.component.css"],
})
export class PdvCuisMasivoComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  UsuarioActual: any;
  EmpresaSeleccionada: any;
  constructor(
    private PdvService: PdvService,
    public dialogRef: MatDialogRef<PdvCuisMasivoComponent>
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
    this.PdvService.sife_pdv_mule_solicitacuispdvmasivo_post({
      nit: this.EmpresaSeleccionada,
    }).then((data) => {
      this.loading = false;
      this.transaccion = data.Respuesta.transaccion;
      this.Respuesta = data.Respuesta.descripcion;
    });
  }
}
