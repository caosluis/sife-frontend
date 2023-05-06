import { ListasDesplegablesService } from "./../../../../services/listas-desplegables.service";

import { Component, OnInit, Inject, Optional, ViewChild } from "@angular/core";
import { NotificationService } from "../../../../services/notification.service";
import { SucursalService } from "../../../../services/sucursal.service";
import { CuisService } from "./../../../../services/cuis.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SelectorcuisService } from "src/app/services/inicio/selectorcuis.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmpresaService } from "src/app/services/empresa.service";

@Component({
  selector: "app-sucursal-form",
  templateUrl: "./sucursal-form.component.html",
  styleUrls: ["./sucursal-form.component.css"],
})
export class SucursalFormComponent implements OnInit {
  formularioSucursal: FormGroup;
  showFiller = false;
  action: string;
  local_data: any;
  obj: any;
  estados: any[];
  EmpresaList: any[];
  departamentos: any[];
  EmpresaSeleccionada: any;
  UsuarioActual: any;
  loading = false;
  Respuesta: any;
  EstadoSucursal: any;

  constructor(
    private EmpresaService: EmpresaService,
    public SucursalService: SucursalService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<SucursalFormComponent>,
    private serviceLista: ListasDesplegablesService,
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));

    this.local_data = { ...data };
    this.action = this.local_data["action"];
    this.obj = this.local_data["obj"];
    this.serviceLista.getLista("estadosSucursal").then((data) => {
      this.estados = data[0]["valores"];
    });
    this.serviceLista.getLista("regionales").then((data) => {
      this.departamentos = data[0]["valores"];
    });
    this.EmpresaService.sife_empresa_get_activos().then((data) => {
      this.EmpresaList = data.filter(
        (item) => item.nit == this.UsuarioActual.empresa
      );
    });
  }

  ngOnInit() {
    this.SucursalService.sife_sucursalEstado_get(this.data.id).then((data) => {
      this.EstadoSucursal = data;
    });
    this.formularioSucursal = this.fb.group({
      idCampo: [],
      nitCampo: [],
      codigoSucursalCampo: [],
      direccionCampo: [],
      departamentoCampo: [],
      vigenciaCampo: [],
      muncipioCampo: [],
      descripcionCampo: [],
      telefonoCampo: [],
    });

    this.formularioSucursal.get("idCampo").setValue(this.data.id);
    if (this.data.nit != undefined) {
      this.formularioSucursal
        .get("nitCampo")
        .setValue(this.data.nit.toString());
    }
    this.formularioSucursal
      .get("codigoSucursalCampo")
      .setValue(this.data.codigoSucursal);
    this.formularioSucursal.get("direccionCampo").setValue(this.data.direccion);
    this.formularioSucursal
      .get("departamentoCampo")
      .setValue(this.data.departamento);
    this.formularioSucursal.get("vigenciaCampo").setValue(this.data.vigencia);
    this.formularioSucursal.get("muncipioCampo").setValue(this.data.muncipio);
    this.formularioSucursal
      .get("descripcionCampo")
      .setValue(this.data.descripcion);
    this.formularioSucursal.get("telefonoCampo").setValue(this.data.telefono);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose() {
    this.dialogRef.close();
    this.dialogRef.close({ event: "Cancel" });
  }
  GuardarCambios(sucursal: any) {
    this.loading = true;
    if (!isNaN(sucursal.codigoSucursal)) {
      this.dialogRef.close(sucursal);
    } else {
      this.loading = false;
      this.Respuesta = "El Valor de Código Sucursal debe ser un número Entero";
    }
  }
}
