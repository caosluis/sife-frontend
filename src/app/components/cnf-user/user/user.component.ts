//Importamos el componente de formulario
// import { UserFormComponent } from '../../../user/user/user-Form.component';
import { UserFormComponent } from "./user-form/user-form.component";
import { NotificationService } from "../../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "./../../../services/user.service";
import { UserDataService } from "../../../services/user-data.service";
import { CuisService } from "../../../services/cuis.service";

//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { EmpresaService } from "src/app/services/empresa.service";
import { ProductosService } from "src/app/services/productos.service";
import { ListasDesplegablesService } from "src/app/services/listas-desplegables.service";
import { RolesService } from '../../../services/roles.service';
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  // displayedColumns: string[] = ['id','username','email','password','actions']
  displayedColumns: string[] = [
    'logo',
    "empresa",
    "username",
    "role",
    "nombres",
    "apellidos",
    "telefono",
    "division",
    "regional",
    "amercado",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  divisiones: any[] = [];
  sectores: any[] = [];
  empresas: any[] = [];
  regionales: any[] = [];
  empresasIndex: any = {};
  UsuarioActual: any;
  empresaSeleccionada: any;
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public userService: UserService,
    public userdataService: UserDataService,
    public dialog: MatDialog,
    private empresaService: EmpresaService,
    private productosService: ProductosService,
    private listaDesp: ListasDesplegablesService,
    private rolesService: RolesService,
    private socket: Socket
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    // Escuchadores Socket IO
    this.socket.on("/Sifeuserdata/POST", (row_obj) => { });
    this.socket.on("/Sifeuserdata/DELETE", (row_obj) => { });
    this.productosService.getAllDivisiones().then((data) => {
      this.divisiones = data;
    });
    this.productosService.getAllsector().then((data) => {
      this.sectores = data;
    });
    this.listaDesp.getLista("regionalesList").then((data) => {
      this.regionales = data[0]["valores"];
    });
    this.getAllUserData();
  }
  // Metodos open dialogo (Modal)
  Detalle(user) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: "50%",
      data: user,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result.id == "" || result.id == undefined) {
          var user = {
            username: result.username,
            password: result.password,
            email: result.email,
          };
          this.userService.submitUser(user).then((data) => {
            var userdata = {
              id_user: data.id,
              username: data.username,
              role: result.role,
              nombres: result.nombres,
              apellidos: result.apellidos,
              telefono: result.telefono,
              empresa: result.empresa,
              division: result.division,
              regional: result.regional,
              amercado: result.amercado,
            };
            this.userdataService.submitUserData(userdata).then((data) => {
              this.rolesService.sife_user_empresas_post(data.username, result.nit).then(data => {
                this.Refresh();
              })
            });
          });
        } else {
          var userdata = {
            role: result.role,
            nombres: result.nombres,
            apellidos: result.apellidos,
            telefono: result.telefono,
            empresa: result.empresa,
            division: result.division,
            regional: result.regional,
            amercado: result.amercado,
          };
          this.userdataService
            .updateUserData(result.id, userdata)
            .then((data) => {
              this.rolesService.sife_user_empresas_get(result.nombreUsuario).then(data => {


                if (data[0]) {
                  console.log('modifica');

                  this.rolesService.sife_user_empresas_patch(result.nombreUsuario, result.nit).then(data => { this.Refresh(); })
                } else {
                  console.log('inserta');
                  this.rolesService.sife_user_empresas_post(result.nombreUsuario, result.nit).then(data => { this.Refresh(); })
                }
              })

              /* this.rolesService.sife_user_empresas_post(result.nombreUsuario, result.nit).then(data => { }) */


            });
        }
      }
    });
  }

  ngOnInit() { }

  async Refresh() {
    this.userdataService
      .getAllUserData(this.empresaSeleccionada)
      .subscribe((data) => {
        this.dataSource.data = data;
      });
  }

  getAllUserData() {
    this.userdataService
      .getAllUserData(this.empresaSeleccionada)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getEmpresas();
      });
  }
  getEmpresas() {
    this.empresaService.sife_empresa_get().then((data) => {
      this.empresas = data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  EmpresaUsuario(nit) {
    if (this.empresas != undefined) {
      var Empresa = [];
      for (let i = 0; i < this.empresas.length; i++) {
        if (this.empresas[i].nit == nit) {
          Empresa.push(this.empresas[i]);
        }
      }
      if (Empresa[0] != undefined) {
        return Empresa[0].razonSocial;
      }
    }
  }
  DivisionUsuario(division) {
    if (this.divisiones != undefined) {
      var Division = [];
      for (let i = 0; i < this.divisiones.length; i++) {
        if (this.divisiones[i].IdDivision == division) {
          Division.push(this.divisiones[i]);
        }
      }
      if (Division[0] != undefined) {
        return Division[0].DivisionNombre;
      }
    }
  }
  AmercadoUsuario(division, amercado) {
    if (this.sectores != undefined) {
      var Amercado = [];
      for (let i = 0; i < this.sectores.length; i++) {
        if (
          this.sectores[i].IdDivision == division &&
          this.sectores[i].IdSecProducto == amercado
        ) {
          Amercado.push(this.sectores[i]);
        }
      }
      if (Amercado[0] != undefined) {
        return Amercado[0].Sector;
      }
    }
  }
  Regional(regional) {
    if (this.regionales != undefined) {
      var Regionales = [];
      for (let i = 0; i < this.regionales.length; i++) {
        if (this.regionales[i].id == regional) {
          Regionales.push(this.regionales[i]);
        }
      }
      if (Regionales[0] != undefined) {
        return Regionales[0].valor;
      }
    }
  }
}
