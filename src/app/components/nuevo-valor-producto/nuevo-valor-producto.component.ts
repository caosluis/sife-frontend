//Importamos el componente de formulario de verificacion
import { VerificaValorProductoComponent } from "../nuevo-valor-producto/verifica-valor-producto/verifica-valor-producto.component";
//Importamos el componente de formulario solicitud
import { SolicitudComponent } from "../nuevo-valor-producto/solicitud/solicitud.component";
import { NuevoValorProductoService } from "./../../services/nuevo-valor-producto.service";
import { NotificationService } from "../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
//Importamos los componentes de CUIS/Empresa
import { Cuis } from "../../models/cuis";
import { CuisService } from "../../services/cuis.service";
//Importamos el modelo y servicio de Sucursal
import { SucursalService } from "../../services/sucursal.service";
import { Sucursal } from "../../models/sucursal";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-nuevo-valor-producto",
  templateUrl: "./nuevo-valor-producto.component.html",
  styleUrls: ["./nuevo-valor-producto.component.css"],
})
export class NuevoValorProductoComponent implements OnInit {
  displayedColumns: string[] = [
    "cuis",
    "codigoSucursal",
    "descripcion",
    "codigoSolicitud",
    "fecha",
    "fechaActualizacion",
    "codigoMensaje",
    "Mensaje",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  contador = 1;
  // Datasource de Empresa y sucursales
  selectorcuis: Cuis[] = [];
  selectorSucursal: Sucursal[] = [];
  UsuarioActual: any;
  empresaSeleccionada: any;
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private service: NuevoValorProductoService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private cuisService: CuisService,
    private sucursalService: SucursalService,
    private socket: Socket
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    //Inicializamos los datos de Empresa y sucursal
    this.cuisService.sife_cuis_get().then((data) => {
      this.selectorcuis = data;
    });
    this.sucursalService
      .sife_sucursal_get(this.empresaSeleccionada)
      .then((data) => {
        this.selectorSucursal = data;
      });
    this.getAllNuevoValorProducto();
    // Escuchadores Socket IO
    this.socket.on(
      "/Siferecepcionsolicitudnuevovalorproducto/POST",
      (row_obj) => {
        console.log(row_obj);
        var verifica = 0;
        let nombre;
        this.selectorcuis.filter((value, key) => {
          if (row_obj.cuis == value.cuis) {
            nombre = value.nombre;
          }
        });
        var dt = this.dataSource.data;
        dt = dt.filter((value, key) => {
          if (value.id == row_obj.id) {
            value.codigoMensaje = row_obj.codigoMensaje;
            value.Mensaje = row_obj.Mensaje;
            value.fechaActualizacion = row_obj.fechaActualizacion;
            value.nombre = nombre;
            verifica++;
          }
          this.dataSource.data = dt;
          return true;
        });
        if (verifica == 0) {
          this.addRowData(row_obj);
          this.notificationService.success("Solicitud enviada exitosamente");
        }
      }
    );
    this.socket.on(
      "/Siferecepcionsolicitudnuevovalorproducto/DELETE",
      (row_obj) => {
        this.deleteRowData(row_obj);
      }
    );
  }
  // Metodos open dialogo (Modal) para formulario de solicitud
  openDialog(action, obj) {
    const dialogRef = this.dialog.open(SolicitudComponent, {
      width: "50%",
      data: {
        obj: obj,
        action: action,
        empresas: this.selectorcuis,
        sucursales: this.selectorSucursal,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result.data.respuesta);
      if (result.event == "Crear") {
        //this.addRowData(result.data.respuesta);
      }
    });
  }
  // Metodos open dialogo (Modal) para verificar codigo solicitud
  openDialogVerifica(action, obj) {
    const dialogRef = this.dialog.open(VerificaValorProductoComponent, {
      width: "40%",
      data: { obj: obj, action: action },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result.event == "Verificar") {
      }
    });
  }
  // Metodos get, add. delete y oninit
  ngOnInit() {}
  getAllNuevoValorProducto() {
    this.service.getAllNuevoValorProducto().subscribe((data) => {
      //console.log(data);
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
  updateRowData() {
    let row_obj = {
      codigoAmbiente: 2,
      codigoSistema: "72C3D617CF6",
      codigoSucursal: 3,
      cuis: "6DA82896",
      descripcion: "a123112312312312312312sd",
      id: 7,
      nit: "1020343027",
    };
    const dt = this.dataSource.data;
    this.dataSource.data = dt.filter((value, key) => {
      if (value.id == row_obj.id) {
        value.descripcion = row_obj.descripcion;
      }
      return true;
    });
  }
}
