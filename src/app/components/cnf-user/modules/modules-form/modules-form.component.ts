import { Component, OnInit, Inject, Optional } from "@angular/core";
import { NotificationService } from "../../../../services/notification.service";
import { ModulesService } from "../../../../services/modules.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RolesService } from "src/app/services/roles.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-modules-form",
  templateUrl: "./modules-form.component.html",
  styleUrls: ["./modules-form.component.css"],
})
export class ModulesFormComponent implements OnInit {
  formularioModulo: FormGroup;
  checked = true;
  action: string;
  local_data: any;
  obj: any;
  rolesList: any;
  rolescargados: any = [];

  constructor(
    public service: ModulesService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ModulesFormComponent>,
    private rolesService: RolesService,
    private formbuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formularioModulo = this.formbuilder.group({
      id: [],
      nombre_modulo: [],
      url_modulo: [],
      descripcion: [],
      roles_asignados: [],
    });
    if (this.data != null) {
      this.rolescargados = this.data.roles_asignados;
      this.formularioModulo.get("id").setValue(this.data.id);
      this.formularioModulo
        .get("nombre_modulo")
        .setValue(this.data.nombre_modulo);
      this.formularioModulo.get("url_modulo").setValue(this.data.url_modulo);
      this.formularioModulo.get("descripcion").setValue(this.data.descripcion);
    }
    this.rolesService.sife_roles_get().then((data) => {
      this.rolesList = data;
    });
  }

  ngOnInit() {}

  onClose() {
    this.dialogRef.close();
  }
  SeleccionarRole(role) {
    if (this.rolescargados.indexOf(role) === -1) {
      this.rolescargados.push(role);
    } else {
      this.rolescargados = this.rolescargados.filter((data) => data !== role);
    }
  }

  ModuloAcceso(role) {
    if (this.rolescargados != null) {
      if (this.rolescargados.indexOf(role) === -1) {
        return false;
      } else {
        return true;
      }
    }
  }
}
