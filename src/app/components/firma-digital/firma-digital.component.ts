import { FirmaDigitalFormComponent } from "./firma-digital-form/firma-digital-form.component";
import { FirmaDigitalService } from "../../services/firma-digital.service";
import { NotificationService } from "../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Socket } from "ngx-socket-io";
import * as moment from "moment";
import { CuisService } from "../../services/cuis.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { FirmaDigitalRevocarComponent } from "./firma-digital-revocar/firma-digital-revocar.component";
@Component({
  selector: "app-firma-digital",
  templateUrl: "./firma-digital.component.html",
  styleUrls: ["./firma-digital.component.css","./../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class FirmaDigitalComponent implements OnInit {
  displayedColumns: string[] = [
    "logo",
    "descripcion", 
    "tipo",
    "revocado",
    "fechaRegistro", 
    "fechaVigencia",       
    "estado",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  cuisList: any[] = [];
  EmpresaSeleccionada: any;
  HoraActual: any;
  HoraVencimiento: any;
  UsuarioActual: any;
  role: any;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public FirmaDigitalService: FirmaDigitalService,
    public dialog: MatDialog,
    private cuisService: CuisService,
    private notificationService: NotificationService,
    private socket: Socket
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.role = this.UsuarioActual.role;
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.HoraActual = new Date();
    this.HoraVencimiento = new Date().setHours(this.HoraActual.getHours() - 1);
    this.getAllFirmaDigital();
    // Escuchadores Socket IO
    this.socket.on("/Sifefirmadigital/POST", (row_obj) => {
      this.Refresh();
      /*       var clave = Object.keys(row_obj);
        var verifica = 0;
        var dt = this.dataSource.data;      
        let nombre;
        dt = dt.filter((value,key)=>{
           var claveValue = Object.keys(value);
          if(value.id == row_obj.id ){
            if( clave.length == claveValue.length - 1){
              this.cuisList.filter((value,key)=>{
                if(row_obj.cuis == value.cuis){
                  nombre = value.nombre;
                }
              });
              value.idUsuario = row_obj.idUsuario;
              value.cuis = row_obj.cuis;
              value.firma = row_obj.firma;
              value.fechaRegistro = row_obj.fechaRegistro;
              value.fechaVigencia = row_obj.fechaVigencia;
              value.estado = row_obj.estado;
              value.tipo = row_obj.tipo;
              value.empresaName=nombre;
            }
            verifica++;
          }
          this.dataSource.data = dt;
          return true;
        });
        if(verifica == 0){
          this.cuisList.filter((value,key)=>{
            if(row_obj.cuis == value.cuis){
              nombre = value.nombre;
            }
          });
          var array ={empresaName:nombre,...row_obj}
          this.addRowData(array);
          this.notificationService.success("Registrado exitosamente");
        } */
    });
    /*  this.socket.on('/Sifefirmadigital/DELETE',(row_obj) => {  
        this.deleteRowData(row_obj)
      }); */
  }
  // Metodos open dialogo (Modal)
  CrearFirma(Firma) {
    const dialogRef = this.dialog.open(FirmaDigitalFormComponent, {
      width: "50%",
      data: Firma,
    });

    dialogRef.afterClosed().subscribe((datos_firma) => {
      if (datos_firma) {
        if (datos_firma.id) {
          var firmaModificar = {
            descripcion: datos_firma.descripcion,
            fechaRegistro: datos_firma.fechaRegistro,
            fechaVigencia: datos_firma.fechaVigencia,
            firma: datos_firma.firma,
            tipo: datos_firma.tipo,
          };
          this.FirmaDigitalService.sife_firmaDigital_patch(
            firmaModificar,
            datos_firma.id
          ).subscribe(
            (data) => {
              this.notificationService.success("Modificación Exitosa");
            },
            (error) => {
              this.notificationService.warn("Modificación Erronea");
            }
          );
        } else {
          var firmaCrear = {
            empresa: this.EmpresaSeleccionada,
            descripcion: datos_firma.descripcion,
            estado: "1",
            fechaRegistro: datos_firma.fechaRegistro,
            fechaVigencia: datos_firma.fechaVigencia,
            firma: datos_firma.firma,
            tipo: datos_firma.tipo,
          };
          this.FirmaDigitalService.sife_firmaDigital_post(firmaCrear).subscribe(
            (data) => {
              this.notificationService.success("Creación Exitosa");
            },
            (error) => {
              this.notificationService.warn("Creación Erronea");
            }
          );
        }
      }
    });
  }
  // Metodos get, add. delete y oninit
  ngOnInit() {
    this.cuisService.sife_cuis_get().then((data) => {
      this.cuisList = data;
    });
  }
  getAllFirmaDigital() {
    this.FirmaDigitalService.getAllFirmaDigital(
      this.EmpresaSeleccionada
    ).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Refresh() {
    this.FirmaDigitalService.getAllFirmaDigital(
      this.EmpresaSeleccionada
    ).subscribe((data) => {
      this.dataSource.data = data;
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
  /*  addRowData(data){
      const dt = this.dataSource.data;
      dt.push(data);
      this.dataSource.data = dt;
    } */
  deleteRowData(row_obj) {
    const dt = this.dataSource.data;
    this.dataSource.data = dt.filter((value, key) => {
      return value.id != row_obj.id;
    });
  }
  /* estadoTrue(id: string) {
    var datos = this.dataSource.data;
    datos = datos.filter((value, key) => {
      if (value.id == id) {
        var valid = value.estado;
        if (valid == null) {
          value.estado = "1";
          var body = { estado: 1 };
          this.FirmaDigitalService.actualizarEstadoFirma(id, body).subscribe(
            (data) => {
              if (data["count"] == 1) {
                this.notificationService.success("Actualizado");
              } else {
                this.notificationService.error("Error al actualizar");
              }
            }
          );
        }
        if (valid == 1) {
          value.estado = "0";
          var body = { estado: 0 };
          this.FirmaDigitalService.actualizarEstadoFirma(id, body).subscribe(
            (data) => {
              if (data["count"] == 1) {
                this.notificationService.warn("Actualizado");
              } else {
                this.notificationService.error("Error al actualizar");
              }
            }
          );
        }
        if (valid == 0) {
          value.estado = "1";
          var body = { estado: 1 };
          this.FirmaDigitalService.actualizarEstadoFirma(id, body).subscribe(
            (data) => {
              if (data["count"] == 1) {
                this.notificationService.success("Actualizado");
              } else {
                this.notificationService.error("Error al actualizar");
              }
            }
          );
        }
      }
      return true;
    });
    this.dataSource.data = datos;
  } */

  estadoCambio(estado, id) {
    if (estado == true) {
      var modificar = { estado: "1" };
      this.FirmaDigitalService.actualizarEstadoFirma(id, modificar).then(
        (data) => {}
      );
    } else if (estado == false) {
      var modificar = { estado: "0" };
      this.FirmaDigitalService.actualizarEstadoFirma(id, modificar).then(
        (data) => {}
      );
    }
  }

  estado(estado) {
    if (estado == "1") {
      return true;
    } else if (estado == "0") {
      return false;
    }
  }

  FechaIndicador(fecha) {
    if (moment(this.HoraVencimiento) > moment(fecha)) {
      return "Vencido";
    } else {
      return "Vigente";
    }
  }
  RevocarFirma(datos_firma) {
    const dialogRef = this.dialog.open(FirmaDigitalRevocarComponent, {
      width: "60%",
      data: datos_firma,
    });

    dialogRef.afterClosed().subscribe((firma) => {
      var CuisSucursal: any;
      if (firma != undefined) {
        for (let i = 0; i < this.cuisList.length; i++) {
          if (
            this.cuisList[i].codigoSucursal == firma.sucursal &&
            this.cuisList[i].nit == firma.empresa
          ) {
            CuisSucursal = this.cuisList[i].cuis;
          }
        }
      }
    });
  }
}
