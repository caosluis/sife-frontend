import { Component, OnInit, ViewChild } from "@angular/core";
import { ThemePalette } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Socket } from "ngx-socket-io";
import { NotificationService } from "src/app/services/notification.service";
import { RolesService } from "src/app/services/roles.service";
import { RolesFormComponent } from "./roles-form/roles-form.component";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css"],
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = ["id", "Role", "actions"];
  rolesList: any;
  loading = false;
  panelOpenState = false;

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private RolesService: RolesService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket
  ) {
    this.RolesService.sife_roles_get().then((data) => {
      this.rolesList = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.socket.on("Role_Ingresa", (row_obj) => {
      this.Refresh();
    });
  }

  RegistrarRole(role) {
    var roleDatos = {
      role: role,
      configuracion: this.rolesList[0].configuracion,
    };
    this.RolesService.sife_roles_post(roleDatos).then((data) => {
      this.Refresh();
    });
  }

  BorrarRole(roleID, role) {
    this.RolesService.sife_roles_delete(roleID).then((data) => {
      this.Refresh();
    });
  }

  habilitarSubModulo(role_seleccionado, modulo, submodulo) {
    this.rolesList.forEach((role) => {
      if (role.role == role_seleccionado) {
        role.configuracion.Modulos.forEach((parent) => {
          if (parent.name == modulo) {
            var cont_true = 0;
            var cont_false = 0;
            var largo = parent.SubModulos.length;
            parent.SubModulos.forEach((children) => {
              if (children.show == true) {
                cont_true = cont_true + 1;
                if (cont_true > 0) {
                  parent.show = true;
                }
              } else {
                cont_false = cont_false + 1;
                if (cont_false == largo) {
                  parent.show = false;
                }
              }
            });
          }
        });
      }
    });
  }

  someComplete(modulo) {
    /* if (this.Modulos.SubModulos == null) {
      return false;
    }
    return (
      this.Modulos.SubModulos.filter((t) => t.show).length > 0 &&
      !this.allComplete
    ); */
  }

  habilitarModulo(role_seleccionado, modulo) {
    this.rolesList.forEach((role) => {
      if (role.role == role_seleccionado) {
        role.configuracion.Modulos.forEach((parent) => {
          if (parent.name == modulo) {
            parent.SubModulos.forEach((children) => {
              if (parent.show == true) {
                children.show = true;
              } else {
                children.show = false;
              }
            });
          }
        });
      }
    });
  }
  guardarCambios() {
    this.loading = true;
    var count = 0;
    this.rolesList.forEach((element) => {
      count = count + 1;
      if (count == this.rolesList.length) {
        this.RolesService.sife_roles_patch(
          element.roleID,
          element.configuracion
        ).then((data) => {
          this.loading = false;
        });
      } else {
        this.RolesService.sife_roles_patch(
          element.roleID,
          element.configuracion
        ).then((data) => { });
      }
    });
  }
  Refresh() {
    this.RolesService.sife_roles_get().then((data) => {
      this.rolesList = data;
    });
  }
  ngOnInit(): void { }
}
