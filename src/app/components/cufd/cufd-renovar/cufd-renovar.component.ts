import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { CufdService } from "src/app/services/cufd.service";

@Component({
  selector: "app-cufd-renovar",
  templateUrl: "./cufd-renovar.component.html",
  styleUrls: ["./cufd-renovar.component.css"],
})
export class CufdRenovarComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  empresaSeleccionada: any;
  UsuarioActual: any;
  constructor(
    private CufdService: CufdService,
    public dialogRef: MatDialogRef<CufdRenovarComponent>
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
  }


  SolicitarCufdMasivo() {
    this.CufdService.sife_cufd_mule_solicitacufdmasivo_post(
      this.empresaSeleccionada
    ).then((data) => {
      this.transaccion = data.respuesta.transaccion;
      this.Respuesta = data.respuesta.descripcion;
      this.loading = false;
    });
  }
  CargarCufdSincroniza() {
    this.loading = true;
    this.CufdService.sife_cufd_sincronizas(this.empresaSeleccionada).then(
      (data) => {
        if (data.length > 0) {
          this.SolicitarCufdMasivo();
          /* this.transaccion = true;
          this.Respuesta = "what";
          this.loading = false; */
        } else {
          this.transaccion = false;
          this.Respuesta = "La Solicitud ya se está Procesando";
          this.loading = false;
        }
      }
    );
  }
  ngOnInit(): void { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
