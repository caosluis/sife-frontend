import { Component, OnInit } from "@angular/core";
import { SifeAutenticacionService } from "src/app/services/sife-autenticacion.service";
import { UserConnectionVerificationComponent } from "./user-connection-verification/user-connection-verification.component";
import * as moment from "moment";
import * as glob from "../../../../global";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "src/app/services/notification.service";

/* let datos_usuario_conexion: any = [
  {codigo: 101, descripcion: 'Este es un ejemplo',descripcionUi:'Descripción detallada del mensaje devuelto por el servicio.',estadoId:'Identificador del estado del mensaje, siempre tiene el valor “AC”.',siglaSistema:'Sigla del subsistema al que pertenece el mensaje de aplicación',tipoDestinoId:'Identificador de destino del mensaje,  para servicios web retorna el valor 1078',ok:'Valor que determina la ejecución del servicio, retorna los siguientes valores:false: en caso que el usuario no haya sido autenticado true: en caso que el usuario haya sido autenticado satisfactoriamente', token:'Token JWT generado para el usuario autenticado en caso que las credenciales de acceso sean correctas'}
]; */

@Component({
  selector: "app-user-conection",
  templateUrl: "./user-conection.component.html",
  styleUrls: ["./user-conection.component.css"],
})
export class UserConectionComponent implements OnInit {
  datos_usuario_conexion: any;
  badge = 2;
  displayedColumns: string[] = [
    "nit",
    "login",
    "password",
    "client",
    "ip",
    "tipoClienteId",
    "tipoUsuarioId",
    "fechaCreacion",
    "fechaModificacion",
    "estado",
    "actions",
  ];
  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };
  UsuarioActual: any;
  EmpresaSeleccionada: any;
  constructor(
    private sife_autenticacionsService: SifeAutenticacionService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.cargar_sife_usuarios_conexion();
  }

  cargar_sife_usuarios_conexion() {
    this.sife_autenticacionsService
      .sife_usuarios_conexion(this.EmpresaSeleccionada)
      .then((data) => {
        this.datos_usuario_conexion = data;
      });
  }

  click_notificacion() {
    this.badge = 0;
  }
  VerificarServicio(datos_usuario): void {
    const dialogRef = this.dialog.open(UserConnectionVerificationComponent, {
      maxWidth: "50%",
      width: "50%",
      data: datos_usuario,
    });

    dialogRef.afterClosed().subscribe((usuario_conexion) => {
      if (usuario_conexion != undefined) {
        if (datos_usuario.id != undefined) {
          var modificar = {
            nit: usuario_conexion.nit,
            login: usuario_conexion.login,
            password: usuario_conexion.password,
            client: usuario_conexion.client,
            ip: usuario_conexion.ip,
            tipoClienteId: usuario_conexion.tipoClienteId,
            tipoUsuarioId: usuario_conexion.tipoUsuarioId,
            fechaModificacion: moment(glob.FechaActual).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          };
          this.sife_autenticacionsService
            .sife_usuarios_conexion_modificar(modificar, usuario_conexion.id)
            .then(() => {
              this.cargar_sife_usuarios_conexion();
              this.notificationService.success(
                "Se Modificó de Manera Correcta"
              );
            });
        } else {
          var registrar = {
            nit: usuario_conexion.nit,
            login: usuario_conexion.login,
            password: usuario_conexion.password,
            client: usuario_conexion.client,
            ip: usuario_conexion.ip,
            tipoClienteId: usuario_conexion.tipoClienteId,
            tipoUsuarioId: usuario_conexion.tipoUsuarioId,
            fechaCreacion: moment(glob.FechaActual).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            fechaModificacion: moment(glob.FechaActual).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          };
          this.sife_autenticacionsService
            .sife_usuarios_conexion_registrar(registrar)
            .then(() => {
              this.cargar_sife_usuarios_conexion();
              this.notificationService.success(
                "Se Registró de Manera Correcta"
              );
            });
        }
      }
    });
  }
  estadoCambio(estado, id) {
    var modificar = { estado: estado };
    this.sife_autenticacionsService
      .sife_usuarios_conexion_modificar(modificar, id)
      .then((data) => {});
  }
  estado(estado) {
    if (estado == "true") {
      return true;
    } else if (estado == "false") {
      return false;
    }
  }
}
