import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import * as glob from "../../../../../global";
import * as moment from "moment";

@Component({
  selector: "app-user-connection-verification",
  templateUrl: "./user-connection-verification.component.html",
  styleUrls: ["./user-connection-verification.component.css"],
})
export class UserConnectionVerificationComponent implements OnInit {
  fechaActual: any;
  formularioUserConnection: FormGroup;
  UsuarioActual: any;
  empresaSeleccionada: any;
  constructor(
    public dialogRef: MatDialogRef<UserConnectionVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
  }

  ngOnInit() {
    /* this.fechaActual= moment.utc(glob.FechaActual).format('YYYY-MM-DD HH:mm:ss') */
    this.formularioUserConnection = this.fb.group({
      idCampo: [],
      nitCampo: [],
      loginCampo: [null, Validators.required],
      passwordCampo: [null, Validators.required],
      clientCampo: [null, Validators.required],
      ipCampo: [],
      tipoClienteIdCampo: [],
      tipoUsuarioIdCampo: [],
    });
    this.formularioUserConnection.get("idCampo").setValue(this.data.id);
    this.formularioUserConnection.get("nitCampo").setValue(this.data.nit);
    this.formularioUserConnection.get("loginCampo").setValue(this.data.login);
    this.formularioUserConnection
      .get("passwordCampo")
      .setValue(this.data.password);
    this.formularioUserConnection.get("clientCampo").setValue(this.data.client);
    this.formularioUserConnection.get("ipCampo").setValue(this.data.ip);
    this.formularioUserConnection
      .get("tipoClienteIdCampo")
      .setValue(this.data.tipoClienteId);
    this.formularioUserConnection
      .get("tipoUsuarioIdCampo")
      .setValue(this.data.tipoUsuarioId);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getErrorMessage() {
    if (
      this.formularioUserConnection.controls.loginCampo.hasError("required")
    ) {
      return "Debe Ingresar Datos";
    }
    if (
      this.formularioUserConnection.controls.passwordCampo.hasError("required")
    ) {
      return "Debe Ingresar Datos";
    }
    if (
      this.formularioUserConnection.controls.clientCampo.hasError("required")
    ) {
      return "Debe Ingresar Datos";
    }
  }
}
