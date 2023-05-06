import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { SifeAutenticacionService } from "src/app/services/sife-autenticacion.service";

@Component({
  selector: "app-token-test",
  templateUrl: "./token-test.component.html",
  styleUrls: ["./token-test.component.css"],
})
export class TokenTestComponent implements OnInit {
  loading: any;
  Respuesta: any;
  transaccion: any;
  UsuarioActual: any;
  empresaSeleccionada: any;
  constructor(
    private SifeAutenticacionService: SifeAutenticacionService,
    public dialogRef: MatDialogRef<TokenTestComponent>
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
  }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ProbarServicioToken() {
    this.loading = true;
    this.SifeAutenticacionService.sife_tokens_mule_autenticacion({
      modulo: "PRUEBA",
      wsdl: "Servicio de Prueba",
      nit: this.empresaSeleccionada,
    }).then((data) => {
      console.log(data.respuesta.ok);

      this.transaccion = data.respuesta.ok;
      this.Respuesta = data.respuesta.descripcion;
      this.loading = false;
    });
  }
}
