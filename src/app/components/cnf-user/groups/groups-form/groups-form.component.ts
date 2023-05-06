import { ListasDesplegablesService } from './../../../../services/listas-desplegables.service';
import { CuisService } from './../../../../services/cuis.service';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { GroupsService } from '../../../../services/groups.service';
import { ModulesService } from '../../../../services/modules.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent implements OnInit {
  // Data roles de seguridad
  action: string;
  local_data: any;
  obj: any;
  modulos: any[] = [];
  acls: any[] = [];
  modulo: any;
  acceso: number = 1;
  crear: number = 1;
  editar: number = 1;
  eliminar: number = 1;
  form: FormGroup = new FormGroup({
    id_modulo: new FormControl('')
  });
  // Data cuis
  dataCuis: any[] = []
  // Data user grupo
  dataUser: any[] = []
  constructor(
    public service: GroupsService,
    public uservice: UserService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<GroupsFormComponent>,
    private modulosService: ModulesService,
    private _formBuilder: FormBuilder,
    private serviceModulos: ListasDesplegablesService,
    private cuisS: CuisService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.local_data = { ...data };
    this.action = this.local_data["action"];
    this.obj = this.local_data["obj"];
    // Carga de datos al formulario y listado de ACL
    this.serviceModulos.getLista("componentesRoles").then(data => {
      this.modulos = data[0]["valores"]
    })
    if (this.obj != null) {
      // Inicializar el formulario
      this.service.populateForm(this.obj);
      // Cargando los ACL disponibles
      if (this.obj.ACL != undefined) {
        this.acls = this.obj.ACL
        // Carga de datos de usuarios registrados en el grupo
        this.uservice.getIdGroupUser(this.obj["id"]).subscribe(userGData => {
          console.log(userGData);
          
          this.dataUser = userGData
        })
      }
    }
    // Cargando datos de empresa
    this.cuisS.sife_cuis_get().then(data => {
      this.dataCuis = data
    })
  }

  ngOnInit() {
    // this.service.form = this._formBuilder.group({
    //   id: ['', Validators.required],
    //   nombre_grupo : ['', Validators.required,'disabled'],
    //   descripcion : ['', Validators.required],
    //   estado : ['', Validators.required],
    //   ACL :['', Validators.required]
    // });

  }
  onSaveGroups() {
    if (!this.service.form.get('id').value) {
      if (this.uservice.sesion["nivelAcceso"] == "7faa0d5e-5fb1-4476-94ab-216f5191a341") {
        this.service.form.patchValue({
          tipo: 2,
          cuis: this.uservice.sesion["cuis"]
        })
      }
      this.service.submitGroups(this.service.form.value).subscribe(
        data => {
          this.dialogRef.close({ event: this.action, data: data });
          this.notificationService.success("EXITOSO");
          this.service.form.reset();
        },
        error => { console.log("CREA" + error); this.notificationService.warn("ERROR") }
      );
    }
    else {
      if (this.action == "Actualizar") {
        this.service.updateGroups(this.service.form.value).subscribe(
          data => {
            this.dialogRef.close({ event: this.action, data: data });
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.notificationService.success('se actualizo exitosamente');
          });
        this.onClose();
      }
      if (this.action == "Eliminar") {
        this.service.deletedGroups(this.service.form.value.id).subscribe(
          data => {
            this.dialogRef.close({ event: this.action, data: data });
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.notificationService.warn('Se elimino un registro');
          });
        this.onClose();
      }
    }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
    this.dialogRef.close({ event: 'Cancel' });
  }
  addItemD() {
    var d = { modulo: this.modulo, acceso: this.acceso, crear: this.crear, editar: this.editar, eliminar: this.eliminar }
    this.acls.push(d);
    this.service.form.patchValue({
      ACL: this.acls
    })
    console.log(this.service.form.value);

  }
  selectModulo(modulo) {
    this.modulo = modulo
  }
  checkAcceso() {
    var acceso = this.acceso;
    if (acceso == 0) {
      this.acceso = 1
    } else {
      this.acceso = 0
    }
  }
  checkCrear() {
    var crear = this.crear;
    if (crear == 0) {
      this.crear = 1
    } else {
      this.crear = 0
    }
  }
  checkEditar() {
    var editar = this.editar;
    if (editar == 0) {
      this.editar = 1
    } else {
      this.editar = 0
    }
  }
  checkEliminar() {
    var eliminar = this.eliminar;
    if (eliminar == 0) {
      this.eliminar = 1
    } else {
      this.eliminar = 0
    }
  }
  checkAccesoList(modulo, evento) {
    this.acls.filter((value, key) => {
      if (value.modulo == modulo) {
        var estado = value[evento];
        if (estado == 1) { value[evento] = 0 }
        if (estado == 0) { value[evento] = 1 }
      }
    })
  }

}
