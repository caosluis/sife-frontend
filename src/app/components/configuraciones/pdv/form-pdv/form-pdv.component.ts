import { Sucursal } from "./../../../../models/sucursal";
import { Cuis } from "./../../../../models/cuis";
import { Component, OnInit, Inject, Optional } from "@angular/core";
import { CrearpdvService } from "../../../../services/crearpdv.service";
import { NotificationService } from "../../../../services/notification.service";
import { Crearpdv } from "../../../../models/crearpdv";
import { SucursalService } from "../../../../services/sucursal.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
@Component({
  selector: "app-form-pdv",
  templateUrl: "./form-pdv.component.html",
  styleUrls: ["./form-pdv.component.css"],
})
export class FormPDVComponent implements OnInit {
  action: string;
  local_data: any;
  empresas: any;
  sucursales: any;
  UsuarioActual: any;
  empresaSeleccionada: any;

  constructor(
    public service: CrearpdvService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FormPDVComponent>,
    private sucursalServicio: SucursalService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Crearpdv
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.local_data = { ...data };
    this.action = this.local_data["action"];
    this.empresas = this.local_data["empresas"];
    this.sucursalServicio
      .sife_sucursal_get(this.empresaSeleccionada)
      .then((data) => {
        this.sucursales = data;
      });
    // this.sucursales = this.local_data["sucursales"];
    //console.log(this.action);
  }

  ngOnInit() {}
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(":: Submitted successfully");
  }
  onSavePDV() {
    if (!this.service.form.get("codigoPDV").value) {
      //console.log(this.service.form.value);
      this.service.submitPDV(this.service.form.value).subscribe(
        (data) => {
          this.dialogRef.close({ event: this.action, data: data["respuesta"] });
          //console.log(data);
          //this.notificationService.success("EXITOSO");
          this.service.form.reset();
        },
        (error) => {
          console.log("CREA" + error);
          this.notificationService.warn("ERROR");
        }
      );
    } else {
      this.service
        .deletedPDV(this.service.form.value.codigoPDV)
        .subscribe((data) => {
          console.log(data);
          if (data["respuesta"]["respuesta"] == "true") {
            this.dialogRef.close({
              event: this.action,
              data: data["respuesta"],
            });
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.notificationService.warn("Se elimino correctamente");
          } else {
            this.dialogRef.close({
              event: this.action,
              data: data["respuesta"],
            });
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.notificationService.error(
              "Setienen los siguientes errores," +
                data["respuesta"]["respuesta"]
            );
          }
        });
      this.onClose();
    }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
    this.dialogRef.close({ event: "Cancel" });
  }
  selectNit(data) {
    this.empresas.filter((value, key) => {
      if (value.cuis == data) {
        this.service.form.patchValue({
          nit: value.nit,
        });
      }
    });
  }
}
