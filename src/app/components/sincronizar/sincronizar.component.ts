import { SincronizarService } from "src/app/services/sincronizar.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { SolSincronizaComponent } from "./sol-sincroniza/sol-sincroniza.component";
import { CatServicioComponent } from "./cat-servicio/cat-servicio.component";
import { Socket } from "ngx-socket-io";
//Importamos los componentes de CUIS/Empresa
import { Cuis } from "../../models/cuis";
import { CuisService } from "../../services/cuis.service";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { RecargaCatalogosComponent } from "./recarga-catalogos/recarga-catalogos.component";

@Component({
  selector: "app-sincronizar",
  templateUrl: "./sincronizar.component.html",
  styleUrls: ["./sincronizar.component.css","./../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class SincronizarComponent implements OnInit {
  UsuarioActual: any;
  EmpresaSeleccionada: any;
  sincronizar: any[] = [];
  action: string;
  local_data: any;
  selectorcuis: Cuis[] = [];
  dataSource: MatTableDataSource<any>;
  loading: boolean;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private dataApi: SincronizarService,
    private socket: Socket,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private cuisService: CuisService
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));

    //Socket IO Que Actualiza o registra los nuevos registros
    this.socket.on("/Sifesincronizar/POST", (data) => {
      var verifica = 0;
      let nombre;
      this.selectorcuis.filter((value, key) => {
        if (data.CUIS == value.cuis) {
          nombre = value.nombre;
        }
      });
      // Si el registro existe lo actualiza
      var dt = this.dataSource.data;
      dt = dt.filter((value, key) => {
        if (value.id == data.id) {
          value.ServicioWeb = data.ServicioWeb;
          value.Estado = data.Estado;
          value.Mensaje = data.Mensaje;
          value.FechaSincronizacion = data.FechaSincronizacion;
          value.CUIS = data.CUIS;
          value.Nit = data.Nit;
          value.codigoAutorizacion = data.codigoAutorizacion;
          value.empresaName = nombre;
          verifica = 1;
          if (data.Estado == 1) {
            this.notificationService.success(data["Mensaje"]);
          } else {
            this.notificationService.error(data["Mensaje"]);
          }
        }
        return true;
      });
      // Verifica si es una actualización
      if (verifica == 1) {
        this.dataSource.data = dt;
      }
      // En caso de no ser actualización añade el registro
      else {
        this.addRowData(data);
        if (data.Estado == 1) {
          this.notificationService.success(data["Mensaje"]);
        } else {
          this.notificationService.error(data["Mensaje"]);
        }
        // actualiza los datos de la tabla
        this.table.renderRows();
      }
    });
    //Socket IO Que elimina los registros
    this.socket.on("/Sifesincronizar/DELETE", (row_obj) => {
      this.deleteRowData(row_obj);
      this.notificationService.warn("Se elimino un registro");
    });
  }
  displayedColumns: string[] = [
    "#",
    "logo",
    "ServicioWeb",
    "Mensaje",
    "Fecha Sincronizacion",
    "Empresa",
    "Estado",
    "actions",
  ];
  openDialog(action, obj) {
    const dialogRef = this.dialog.open(SolSincronizaComponent, {
      width: "50%",
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      // El evento de respuesta esta controlado por Socket IO
    });
  }
  getAllSincronizar() {
    this.dataApi
      .getAllSincronizar(this.EmpresaSeleccionada)
      .subscribe((data) => {
        let empresa;
        let array = data.map((item) => {
          this.selectorcuis.filter((value, key) => {
            if (item.CUIS == value.cuis) {
              empresa = value.nombre;
            }
          });
          return {
            empresaName: empresa,
            ...item,
          };
        });

        this.sincronizar = array;
        this.dataSource = new MatTableDataSource(array);
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
  ngOnInit() {
    this.loading = false;
    this.cuisService.sife_cuis_get().then((data) => {
      this.selectorcuis = data;
    });
    this.getAllSincronizar();
  }
  addRowData(row_obj) {
    let nombre;
    this.selectorcuis.filter((value, key) => {
      if (row_obj.CUIS == value.cuis) {
        nombre = value.nombre;
      }
    });
    let array = { empresaName: nombre, ...row_obj };
    var dt = this.dataSource.data;
    dt.push(array);
    this.dataSource.data = dt;
  }
  deleteRowData(row_obj) {
    var dt = this.dataSource.data;
    dt = dt.filter((value, key) => {
      return value.id != row_obj.id;
    });
    this.dataSource.data = dt;
  }
  openCatServicio(servicio) {
    this.dataApi.getProductoServ(this.EmpresaSeleccionada, servicio).subscribe((data) => {
      const dialogRef = this.dialog.open(CatServicioComponent, {
        width: "95%",
        data: { catalogo: data, servicio: servicio, componente: "sincronizar" },
      });
      //console.log(data);
    });
  }
  RecargarCatalogos() {
    const dialogRef = this.dialog.open(RecargaCatalogosComponent, {
      width: "50%",
    });
    dialogRef.afterClosed().subscribe();
  }
}
