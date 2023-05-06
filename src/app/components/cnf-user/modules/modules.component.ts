//Importamos el componente de formulario
import { ModulesFormComponent } from "./modules-form/modules-form.component";
import { ModulesService } from "../../../services/modules.service";
import { NotificationService } from "../../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { RolesService } from "src/app/services/roles.service";
@Component({
  selector: "app-modules",
  templateUrl: "./modules.component.html",
  styleUrls: ["./modules.component.css"],
})
export class ModulesComponent implements OnInit {
  displayedColumns: string[] = [
    "logo",
    "nombre_modulo",
    "url_modulo",
    "descripcion",
    "roles_asignados",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  rolesList: any;
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private moduleService: ModulesService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket,
    private rolesService: RolesService
  ) {
    this.rolesService.sife_roles_get().then((data) => (this.rolesList = data));
    this.getAllModules();
    // Escuchadores Socket IO
    this.socket.on("/Sifemodulo/POST", (row_obj) => {
      var verifica = 0;
      var dt = this.dataSource.data;
      dt = dt.filter((value, key) => {
        if (value.id == row_obj.id) {
          value.nombre_modulo = row_obj.nombre_modulo;
          value.url_modulo = row_obj.url_modulo;
          value.descripcion = row_obj.descripcion;

          verifica++;
        }
        this.dataSource.data = dt;
        return true;
      });
      if (verifica == 0) {
        this.addRowData(row_obj);
        this.notificationService.success("Registrado exitosamente");
      }
    });
    this.socket.on("/Sifemodulo/DELETE", (row_obj) => {
      this.deleteRowData(row_obj);
    });
  }
  // Metodos open dialogo (Modal)
  Modulo(obj) {
    const dialogRef = this.dialog.open(ModulesFormComponent, {
      width: "50%",
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result.id == "" || result.id == undefined) {
          this.moduleService.submitModules(result).then((data) => {
            this.Refresh()
          })
        } else {
        
          this.moduleService.updateModules(result).then((data) => {
            this.Refresh()
          });
        }       
      }
    });
  }
  // Metodos get, add. delete y oninit
  ngOnInit() {}
  getAllModules() {
    this.moduleService.getAllModules().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  //Metodo de filtrado
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Metodos de actualización insercion y eliminación de registros
  addRowData(data) {
    const dt = this.dataSource.data;
    dt.push(data);
    this.dataSource.data = dt;
  }
  deleteRowData(row_obj) {
    const dt = this.dataSource.data;
    this.dataSource.data = dt.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }
  async Refresh() {
    this.moduleService.getAllModules().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  /* [
    { name: "Home", path: "/", icon: "home" },
    {
      name: "Mi Empresa",
      path: "/configuraciones",
      icon: "apartment",
      children: [
        { name: "Empresa", path: "/configuraciones", icon: "storefront" },
        { name: "CUFDs", path: "/cufd-historico", icon: "grid_3x3" },
      ],
    },
    {
      name: "Sincronización",
      children: [
        { name: "Catalogos", path: "/catalogos", icon: "sync" },
        {
          name: "Producto/Servicio",
          path: "/productos",
          icon: "production_quantity_limits",
        },
      ],
    },
    {
      name: "Facturas",
      children: [
        {
          name: "Online",
          path: "/facturas",
          icon: "online_prediction",
        },
        {
          name: "Offline",
          path: "/facturas-sap",
          icon: "error_outline",
        },
        {
          name: "Lote",
          path: "/facturas-lote",
          icon: "error_outline",
        },
        {
          name: "Plantillas",
          path: "/plantillasDocumentos",
          icon: "picture_in_picture",
        },
      ],
    },
    {
      name: "Contingencias",
      children: [
        {
          name: "Conexiones",
          path: "/conexiones",
          icon: "settings_ethernet",
        },
        { name: "ServiciosSIN", path: "/hardware", icon: "cloud_off" },
        {
          name: "Evento Significativo",
          path: "/eventosignificativo",
          icon: "event_note",
        },
      ],
    },
  ]; */

}
