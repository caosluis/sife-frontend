import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SifeAutenticacionService } from "src/app/services/sife-autenticacion.service";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DetalleComponent } from "./detalle/detalle.component";
import { RegistroComponent } from "./registro/registro.component";
import { ActualizacionService } from "./actualizacion.service";
import { NotificationService } from "../../services/notification.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actualizacion',
  templateUrl: './actualizacion.component.html',
  styleUrls: ['./actualizacion.component.css',"./../mat-table-responsive/mat-table-responsive.directive.scss"]
})
export class ActualizacionComponent implements OnInit {
  subscription: Subscription;
  showButton: boolean = false;
  badge = 2;
  datos_token_conexion: any = [];
  HoraVencimiento: any;
  HoraActual: any;
  displayedColumns: string[] = [
    "icono",
    "version",
    "codigoSistema",
    "fechaCreacion",
    "fechaModificacion",
    "sincronizarCatalogos",
    "cufdSolicitar",
    "fechaSolicitar",
    "estado",    
    "actions",
  ];
  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };
  UsuarioActual: any;
  empresaSeleccionada: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public sife_autenticacionsService: SifeAutenticacionService,
    public actualizacionService:ActualizacionService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {
    this.HoraActual = new Date();
    this.HoraVencimiento = new Date().setHours(this.HoraActual.getHours() - 1);

    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
  }

  ngOnInit(): void {
    this.listarActualizacion();
    this.subscription = this.actualizacionService._refresh$.subscribe(()=>{
      console.log("Observable Iniciado");
      this.listarActualizacion()
    })  
  }
  listarActualizacion(){
    this.actualizacionService.sife_actualizacion_get()
    .then((data) =>{
      console.log('los datos son'+data);
      this.actualizacionService.dataSource = new MatTableDataSource(
        data
      );
      this.actualizacionService.dataSource.paginator = this.paginator;
      this.actualizacionService.dataSource.sort = this.sort;
    })
    console.log("LISTADO CARGADO")
  }
  Detalle(element){
    const dialogRef = this.dialog.open(DetalleComponent, {
      width: "100%",
      data: element,
    });
  }
  Registro(){
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: "100%",
    });
  }  
  ActivarDesactivar(datos){
    this.actualizacionService.sife_actualizacion_registro_existe()
    .then((data) =>{
      console.log("DATOS :"+ JSON.stringify(data));
    if(data.count > 0 && datos.estado == "Inactivo"){
      alert("Solo puede tener un registro Activo")
    }else{
      if (datos.estado == "Activo") {
        this.actualizacionService
          .sife_actualizacion_registro_modificar({ estado: "Inactivo" }, datos.id)
          .then(() => {
            console.log('Exitoso')
            this.notificationService.success("Actualización realizada con éxito")
            } 
           );
      } else {
        this.actualizacionService
          .sife_actualizacion_registro_modificar({ estado: "Activo" }, datos.id)
          .then(() => {
            console.log('Exitoso')
            this.notificationService.success("Actualización realizada con éxito")
            } 
          );
      }
    }
    });
}
}
