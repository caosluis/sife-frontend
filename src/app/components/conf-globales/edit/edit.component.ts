import { Component, OnInit, Inject, Optional } from "@angular/core";
import { NotificationService } from "../../../services/notification.service";
import { ConfGlobalesService } from "../../../services/conf-globales.service";
import { ConfGlobal } from "./../../../models/inicio/conf-global";
//Servicio de lista desplegable
import { ListasDesplegablesService } from "../../../services/listas-desplegables.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  action: string;
  local_data: any;
  obj: any;
  bloqueoConfGlobales: any;
  constructor(
    public service: ConfGlobalesService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<EditComponent>,
    private serviceLista: ListasDesplegablesService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
    this.action = this.local_data["action"];
    this.obj = this.local_data["obj"];
  }

  ngOnInit() {
    if (this.obj != null) {
      this.service.populateForm(this.obj);
    }
    this.serviceLista.getLista("bloqueoConfGlobales").then((data) => {
      this.bloqueoConfGlobales = data[0]["valores"];
    });
  }
  onSaveConfGlobales() {
    if (this.action == "Crear") {
      this.service.submitConfGlobal(this.service.form.value).subscribe(
        (data) => {
          this.dialogRef.close({ event: this.action, data: data });
          this.notificationService.success("EXITOSO");
          this.service.form.reset();
        },
        (error) => {
          console.log("CREA" + error);
          this.notificationService.warn("ERROR");
        }
      );
    } else if (this.action == "Actualizar") {
      this.service
        .updateConfGlobal(this.service.form.value)
        .subscribe((data) => {
          this.dialogRef.close({ event: this.action, data: data });
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.notificationService.success("se actualizo exitosamente");
        });
      this.onClose();
    } else if (this.action == "Eliminar") {
      this.service
        .deletedConfGlobal(this.service.form.value.Id)
        .subscribe((data) => {
          this.dialogRef.close({ event: this.action, data: data });
          this.service.form.reset();
          this.service.initializeFormGroup();
          this.notificationService.warn("Se elimino un registro");
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
}
