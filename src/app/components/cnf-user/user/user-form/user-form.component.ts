import { GroupsService } from "./../../../../services/groups.service";
import { UserService } from "./../../../../services/user.service";
import { CuisService } from "./../../../../services/cuis.service";
import { Component, OnInit, Inject, Optional } from "@angular/core";
import { NotificationService } from "../../../../services/notification.service";
import { UserDataService } from "./../../../../services/user-data.service";
import { ProductosService } from "./../../../../services/productos.service";
import { ListasDesplegablesService } from "../../../../services/listas-desplegables.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup } from "@angular/forms";
import { v1 as uuidv1 } from "uuid";
import { EmpresaService } from "src/app/services/empresa.service";
import { RolesService } from "src/app/services/roles.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"],
})
export class UserFormComponent implements OnInit {
  formularioUsuario: FormGroup;
  divisiones: any;
  sectores: any;
  empresas: any;
  empresasSecundarias: any

  divisionSeleccionada: any;
  amercadoSeleccionada: any;
  regionales: any;
  roles: any;

  nombreUsuario: string = ''
  empresaSeleccionada: any;
  UsuarioActual: any;
  rolesHabilitados: any;
  rolSeleccionado: any;
  empresasHabilitadas = []

  constructor(
    public service: UserService,
    public serviceUD: UserDataService,
    private productosService: ProductosService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<UserFormComponent>,
    private dataHansaServ: ProductosService,
    private empresaService: EmpresaService,
    private listaDesp: ListasDesplegablesService,
    private grupos: GroupsService,
    private rolesService: RolesService,
    private formbuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.rolesService.sife_roles_habilitados_json().then((data) => {
      this.rolesHabilitados = data;
    });
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));

    this.divisionSeleccionada = this.UsuarioActual.division
    this.amercadoSeleccionada = this.UsuarioActual.amercado

    this.getDivisiones();
    this.getSectores();
    this.getEmpresa();
    this.getRegional();
    this.getRoles();

    this.formularioUsuario = this.formbuilder.group({
      id: [],
      username: [],
      password: [],
      email: [],
      role: [],
      nombres: [],
      apellidos: [],
      telefono: [],
      empresa: [],
      division: [],
      regional: [],
      amercado: [],
    });
    if (this.data != null) {
      this.nombreUsuario = this.data.username
      this.rolSeleccionado = this.data.role
      this.formularioUsuario.get("id").setValue(this.data.id);
      this.formularioUsuario.get("nombres").setValue(this.data.nombres);
      this.formularioUsuario.get("apellidos").setValue(this.data.apellidos);
      this.formularioUsuario.get("telefono").setValue(this.data.telefono);
      this.formularioUsuario.get("empresa").setValue(this.data.empresa);
      this.formularioUsuario.get("division").setValue(this.data.division);
      this.formularioUsuario.get("regional").setValue(this.data.regional);
      this.formularioUsuario.get("amercado").setValue(this.data.amercado);
      this.rolesService.sife_user_empresas_get(this.data.username).then(data => {
        if (data[0]) {
          this.empresasHabilitadas = data[0].nit
        }
      })
    }
  }


  /*  {
    "username": "prueba",
    "email": "prueba@hotmail",
    "password": "prueba"
  }
   */
  async getDivisiones() {
    await this.productosService.getAllDivisiones().then((data) => {
      this.divisiones = data;
    });
  }
  async getSectores() {
    await this.productosService.getAllsector().then((data) => {
      this.sectores = data;
    });
  }
  getEmpresa() {
    this.empresaService.sife_empresa_get_activos().then((data) => {
      this.empresas = data;
    });
  }
  getRegional() {
    this.listaDesp.getLista("regionalesList").then((data) => {
      this.regionales = data[0]["valores"];
    });
  }
  getRoles() {
    this.rolesService.sife_roles_get().then((data) => {
      this.roles = data;
    });
  }

  HabilitarEmpresa(empresa) {
    if (empresa.checked == true) {
      this.empresasHabilitadas.push(empresa.source.value)
    } else {
      this.empresasHabilitadas.splice(this.empresasHabilitadas.indexOf(empresa.source.value), 1)
    }
  }

  seleccionarRol() {
    this.empresasHabilitadas = []
    this.empresaService.sife_empresa_get_activos().then((data) => {
      this.empresasSecundarias = data.filter((visitas) => !visitas.nit.includes(this.empresaSeleccionada));
    });

  }

  habilitado(empresa) {

    if (this.empresasSecundarias) {
      for (let element of this.empresasHabilitadas) {

        if (empresa == element) {
          return true
        }
      }
    }
  }

  RoleHabilitado(roleActual) {
    if (this.rolesHabilitados) {
      for (let element of this.rolesHabilitados) {
        if (element.role == roleActual) {
          return true
        }
      }
    }
  }

  Habilitado(role) {
    if (role == 'Administrador' || role == 'Sistemas') {
      if (this.RoleHabilitado(this.UsuarioActual.role) == true) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  seleccionarDivision(division) {
    this.productosService.getAllsector().then((data) => {
      this.sectores = data.filter((item) => item.IdDivision == division);
    });
  }

  rolCoorporativo() {
    if (this.rolSeleccionado == 'Coorporativo') {
      return false
    } else {
      return true
    }

  }

  seleccionarPlaceholder(): string {
    if (this.rolSeleccionado == 'Coorporativo') {
      return 'Empresa Principal'
    } else {
      return 'Empresa'
    }
  }

  HabilitarNit(nit) {

  }

  onClose() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.seleccionarRol()
  }
}
