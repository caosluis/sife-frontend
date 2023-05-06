import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SifeAutenticacionService } from "src/app/services/sife-autenticacion.service";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AutorizacionDetalleComponent } from "./autorizacion-detalle/autorizacion-detalle.component";
import { AutorizacionRegistroComponent } from "./autorizacion-registro/autorizacion-registro.component";
import { AutorizacionService } from "./autorizacion.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autorizacion',
  templateUrl: './autorizacion.component.html',
  styleUrls: ['./autorizacion.component.css',"./../mat-table-responsive/mat-table-responsive.directive.scss"]
})
export class AutorizacionComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  showButton: boolean = false;
  badge = 2;
  datos_token_conexion: any = [];
  HoraVencimiento: any;
  HoraActual: any;
  displayedColumns: string[] = [
    "logo",
    "modalidad",
    "nit",
    "codigoSistema",
    "codigoModalidad",
    "codigoAmbiente",
    "dependencia",
    "fechaCreacion",
    "version",
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
    public autorizacionService:AutorizacionService,
    public dialog: MatDialog,
    private socket: Socket
  ) {
    this.HoraActual = new Date();
    this.HoraVencimiento = new Date().setHours(this.HoraActual.getHours() - 1);

    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
  }

  ngOnInit(): void {
    this.cargarAutorizacion();
    this.subscription = this.autorizacionService._refresh$.subscribe(()=>{
      console.log("Observable Iniciado");
      this.cargarAutorizacion()
    })  
  }

  //Metodo de filtrado
  applyFilter(filterValue: string) {
    this.autorizacionService.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.autorizacionService.dataSource.paginator) {
      this.autorizacionService.dataSource.paginator.firstPage();
    }
  }

  cargarAutorizacion() {
    this.autorizacionService.sife_autorizacion_get(this.empresaSeleccionada)
    .then((data) =>{
      console.log('los datos son'+data);
      this.autorizacionService.dataSource = new MatTableDataSource(
        data
      );
      this.autorizacionService.dataSource.paginator = this.paginator;
      this.autorizacionService.dataSource.sort = this.sort;
    })
    console.log("LISTADO CARGADO")
  }

  RegistroAutorizacion(){
      const dialogRef = this.dialog.open(AutorizacionRegistroComponent, {
        width: "70%",
      });
  }

  DetalleAutorizacion(element){
      const dialogRef = this.dialog.open(AutorizacionDetalleComponent, {
        width: "70%",
        data: element,
      });
  }

  ActivarDesactivar(datos){
      this.autorizacionService.sife_autorizacion_registro_existe(this.empresaSeleccionada)
      .then((data) =>{
        console.log("DATOS :"+ JSON.stringify(data));
      if(data.count > 0 && datos.estado == "0"){
        alert("Solo puede tener un registro Activo")
      }else{
        if (datos.estado == "1") {
          this.autorizacionService
            .sife_autorizacion_registro_modificar({ estado: "0" }, datos.id)
            .then(() => console.log('exitoso'));
        } else {
          this.autorizacionService
            .sife_autorizacion_registro_modificar({ estado: "1" }, datos.id)
            .then(() => console.log('exitoso'));
        }
      }
      });
  }
  
  ngOnDestroy(){}


}
