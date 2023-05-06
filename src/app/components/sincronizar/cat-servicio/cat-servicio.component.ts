import { NotificationService } from "./../../../services/notification.service";
import { Component, OnInit, Inject, Optional, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SincronizarService } from "src/app/services/sincronizar.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-cat-servicio",
  templateUrl: "./cat-servicio.component.html",
  styleUrls: ["./cat-servicio.component.css"],
})
export class CatServicioComponent implements OnInit {
  local_data: any;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  estadosCat: any;
  servicio: any;
  actividadeconomicaList: any;
  EmpresaSeleccionada: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<CatServicioComponent>,
    private notificationService: NotificationService,
    private sincronizarService: SincronizarService,
  ) {
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.CargarListaActividadEconomica();
    this.local_data = data;
    if (this.local_data.catalogo[0]["codigoActividad"]) {
      if (this.local_data.componente == "sincronizar") {
        if (this.local_data.servicio == "ListaActividadesDocumentoSector") {
          this.displayedColumns = [
            "codigoActividad",
            "descripcionActividad",
            "codigoDocumentoSector",
            "tipoDocumentoSector",
            "Fecha",
          ];
        } else if (this.local_data.servicio == "ListaLeyendasFactura") {
          this.displayedColumns = [
            "codigoActividad",
            "descripcionLeyenda",

            "Fecha",
          ];
        } else {
          // Solo homologción de productos
          this.displayedColumns = [
            "codigoActividad",
            "descripcionLeyenda",
            "codigoDocumentoSector",
            "tipoDocumentoSector",
            "Fecha",
          ];
        }
      }
    }

    if (this.local_data.catalogo[0]["codigoProducto"]) {
      // Modifica las columnas visualizadas
      if (this.local_data.componente == "sincronizar") {
        // Solo homologción de productos
        this.displayedColumns = [
          "codigoProducto",
          "descripcionProducto",
          "Fecha",
        ];
      } else {        
        //  Este es el caso de signacion de codigo productos
        this.displayedColumns = [
          "codigoProducto",
          "descripcionProducto",
          "codigoActividad",
          "descripcionActividad",
          "Fecha",
          "selectCodPro",
        ];
      }
    }

    if (this.local_data.catalogo[0]["codigoCaeb"]) {
      // En el caso de que el catalogo sea Actividad economica
      if (this.data.componente == "Actividad") {
        this.displayedColumns = [
          "codigoCaeb",
          "Descripcion",
          "Fecha",
          "selectCodPro",
        ];
      } else {
        this.displayedColumns = [
          "codigoCaeb",
          "Descripcion",
          "Fecha",
          "homologasap",
        ];
      }
    }

    if (this.local_data.catalogo[0]["habilitado"]) {
      this.displayedColumns = [
        "Descripcion",
        "Fecha",
        "habilitado",
        "homologasap",
      ];
    }

    if (this.local_data.catalogo[0]["codigoClasificador"]) {
      // Catalogos regulares
      if (this.data.componente == "TipoUnidad") {
        this.displayedColumns = [
          "CodigoClasificador",
          "Descripcion",
          "Fecha",
          "selectCodPro",
        ];
      } else {
        this.displayedColumns = [
          "CodigoClasificador",
          "Descripcion",
          "Fecha",
          "homologasap",
        ];
      }
    }
    // console.log(this.displayedColumns);

    this.dataSource = new MatTableDataSource(this.local_data.catalogo);
    this.servicio = this.local_data.servicio;
  }

  ngOnInit() {
    this.estadosCat = 0;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onClose() {
    this.dialogRef.close();
    this.dialogRef.close({ event: "Cancel" });
  }
  seleccionarItem(data) {
    if (data.codigoProducto) {
      // Catalogo de productos
      this.dialogRef.close({
        codigoProducto: data.codigoProducto,
        catalogo: data.descripcionProducto,
        idCatalogo: data.id,
        codigoActividad: data.codigoActividad,
        nandina: data.nandina,
      });
    }
    if (data.codigoCaeb) {
      // Catalogo de Actividad economica
      this.dialogRef.close({
        codigoActividad: data.codigoCaeb,
        actividad: data.descripcion,
      });
    }
    if (data.codigoClasificador) {
      // Catalogo de Unidad de medida
      this.dialogRef.close({
        codigoUnidadMedida: data.codigoClasificador,
        unidadMedida: data.descripcion,
      });
    }
  }

  CargarListaActividadEconomica() {
    this.sincronizarService.getProductoServ(this.EmpresaSeleccionada, "Actividades").subscribe((data) => {
      this.actividadeconomicaList = data;
    });
  }

  //Cambio de estados para homologacion de catalogos a SAP
  estadoTrue(codigoClasificador: string) {
    var datos = this.dataSource.data;
    datos = datos.filter((value, key) => {
      // Homologacion de catalogos actividades CASO ESPECIAL de ACTIVIDADES
      if (this.servicio == "Actividades") {
        if (value.codigoCaeb == codigoClasificador) {
          var valid = value.homologasap;
          if (valid == null) {
            value.homologasap = "1";
            var body = { homologasap: 1 };
            this.sincronizarService
              .actualizarEstadoCatalogos(
                codigoClasificador,
                body,
                this.local_data.servicio
              )
              .subscribe((data) => {
                if (data["count"] == 1) {
                  this.notificationService.success("Actualizado");
                } else {
                  this.notificationService.error("Error al actualizar");
                }
              });
          }
          if (valid == 1) {
            value.homologasap = "0";
            var body = { homologasap: 0 };
            this.sincronizarService
              .actualizarEstadoCatalogos(
                codigoClasificador,
                body,
                this.local_data.servicio
              )
              .subscribe((data) => {
                if (data["count"] == 1) {
                  this.notificationService.warn("Actualizado");
                } else {
                  this.notificationService.error("Error al actualizar");
                }
              });
          }
          if (valid == 0) {
            value.homologasap = "1";
            var body = { homologasap: 1 };
            this.sincronizarService
              .actualizarEstadoCatalogos(
                codigoClasificador,
                body,
                this.local_data.servicio
              )
              .subscribe((data) => {
                if (data["count"] == 1) {
                  this.notificationService.success("Actualizado");
                } else {
                  this.notificationService.error("Error al actualizar");
                }
              });
          }
        }
      }
      // Homologacion de catalogos
      else {
        if (value.codigoClasificador == codigoClasificador) {
          var valid = value.homologasap;
          if (valid == null) {
            value.homologasap = "1";
            var body = { homologasap: 1 };
            this.sincronizarService
              .actualizarEstadoCatalogos(
                codigoClasificador,
                body,
                this.local_data.servicio
              )
              .subscribe((data) => {
                if (data["count"] == 1) {
                  this.notificationService.success("Actualizado");
                } else {
                  this.notificationService.error("Error al actualizar");
                }
              });
          }
          if (valid == 1) {
            value.homologasap = "0";
            var body = { homologasap: 0 };
            this.sincronizarService
              .actualizarEstadoCatalogos(
                codigoClasificador,
                body,
                this.local_data.servicio
              )
              .subscribe((data) => {
                if (data["count"] == 1) {
                  this.notificationService.warn("Actualizado");
                } else {
                  this.notificationService.error("Error al actualizar");
                }
              });
          }
          if (valid == 0) {
            value.homologasap = "1";
            var body = { homologasap: 1 };
            this.sincronizarService
              .actualizarEstadoCatalogos(
                codigoClasificador,
                body,
                this.local_data.servicio
              )
              .subscribe((data) => {
                if (data["count"] == 1) {
                  this.notificationService.success("Actualizado");
                } else {
                  this.notificationService.error("Error al actualizar");
                }
              });
          }
        }
      }
      return true;
    });
    this.dataSource.data = datos;
  }
  selectTodo() {
    var estado = this.estadosCat;
    if (estado == 0) {
      this.estadosCat = 1;
    }
    if (estado == 1) {
      this.estadosCat = 0;
    }
  }
  ActividadEconomicaCatalogo(Actividad) {
    if (this.actividadeconomicaList != undefined) {
      var actividadeconomica = this.actividadeconomicaList.filter(
        (item) => item.codigoCaeb == Actividad
      );
      if (actividadeconomica[0] != undefined) {
        return actividadeconomica[0].descripcion;
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
