import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SifeAutenticacionService } from "src/app/services/sife-autenticacion.service";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { TokenDetalleComponent } from "./token-detalle/token-detalle.component";
import { TokenTestComponent } from "./token-test/token-test.component";
import { TokenRegistroComponent } from "./token-registro/token-registro.component";
import { TokenRegistroService } from "./token-registro/token-registro.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-token-connection",
  templateUrl: "./token-connection.component.html",
  styleUrls: ["./token-connection.component.css","./../../../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class TokenConnectionComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  showButton: boolean = false;
  badge = 2;
  datos_token_conexion: any = [];
  HoraVencimiento: any;
  HoraActual: any;
  displayedColumns: string[] = [
    "logo",
    "descripcion",
    "nombreKey",
    "nit",
    "fechaRegistro",
    "fechaVigencia",
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
    public tokenRegistroService:TokenRegistroService,
    public dialog: MatDialog,
    private socket: Socket
  ) {
    this.HoraActual = new Date();
    this.HoraVencimiento = new Date().setHours(this.HoraActual.getHours() - 1);

    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.socket.on("IngresoToken", (point) => {
      this.cargar_sife_token();
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.cargar_sife_token();
    this.subscription = this.tokenRegistroService._refresh$.subscribe(()=>{
      console.log("Observable Iniciado");
      this.cargar_sife_token()
    })  
  }
  //Metodo de filtrado
  applyFilter(filterValue: string) {
    this.tokenRegistroService.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.tokenRegistroService.dataSource.paginator) {
      this.tokenRegistroService.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy():void{
    this.subscription.unsubscribe();
    console.log('Observable cerrado');
  }
  SeleccionarFecha(event) {
    this.FechaSeleccionada = event.value;
    this.cargar_sife_token();
  }

  cargar_sife_token() {
    /*moment(this.FechaSeleccionada.start_time).format("DD");
    if (
      moment(this.FechaActual).format("DD.MM.YYYY") ==
      moment(this.FechaSeleccionada).format("DD.MM.YYYY")
    ) {
      this.sife_autenticacionsService
        .sife_token_registros(this.empresaSeleccionada, this.FechaSeleccionada)
        .then((data) => {
          this.sife_autenticacionsService.dataSource = new MatTableDataSource(
            data
          );
          this.sife_autenticacionsService.dataSource.paginator = this.paginator;
          this.sife_autenticacionsService.dataSource.sort = this.sort;
        });
    } else {
      this.sife_autenticacionsService
        .sife_token_registros_historico(
          this.empresaSeleccionada,
          this.FechaSeleccionada
        )
        .then((data) => {
          this.sife_autenticacionsService.dataSource = new MatTableDataSource(
            data
          );
          this.sife_autenticacionsService.dataSource.paginator = this.paginator;
          this.sife_autenticacionsService.dataSource.sort = this.sort;
        });
    }*/
    this.tokenRegistroService.sife_tokens_registro_get(this.empresaSeleccionada)
    .then((data) =>{
      console.log('los datos son'+data);
      this.tokenRegistroService.dataSource = new MatTableDataSource(
        data
      );
      this.tokenRegistroService.dataSource.paginator = this.paginator;
      this.tokenRegistroService.dataSource.sort = this.sort;
    })
    console.log("LISTADO CARGADO")
  }

  click_notificacion() {
    this.badge = 0;
  }

  Detalle_Token(datos_token) {
    const dialogRef = this.dialog.open(TokenDetalleComponent, {
      width: "60%",
      data: datos_token,
    });
  }
  ProbarToken() {
    const dialogRef = this.dialog.open(TokenTestComponent, {
      width: "50%",
    });
  }
  RegistroToken(){
    const dialogRef = this.dialog.open(TokenRegistroComponent, {
      width: "60%",
    });
  }
  ActivarDesactivarEmpresa(datos){
    this.tokenRegistroService.sife_tokens_registro_existe(this.empresaSeleccionada)
      .then((data) =>{
        console.log("DATOS :"+ JSON.stringify(data));
      if(data.count > 0 && datos.estado == "0"){
        alert("Solo puede tener un token Activo")
      }else{
        if (datos.estado == "1") {
          this.tokenRegistroService
            .sife_tokens_registro__modificar({ estado: "0" }, datos.id)
            .then(() => console.log('exitoso'));
        } else {
          this.tokenRegistroService
            .sife_tokens_registro__modificar({ estado: "1" }, datos.id)
            .then(() => console.log('exitoso'));
        }  
      }
    })
  }

  FechaIndicador(fecha) {
    if (moment(this.HoraVencimiento) > moment(fecha)) {
      return "Vencido";
    } else {
      return "Vigente";
    }
  }
}
