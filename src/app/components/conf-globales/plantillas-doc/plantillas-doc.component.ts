//Importamos el componente de formulario
import { PlantillasDocFormComponent } from "./plantillas-doc-form/plantillas-doc-form.component";
import { PlantillasDocService } from "../../../services/plantillas-doc.service";
import { NotificationService } from "../../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { SincronizarService } from "src/app/services/sincronizar.service";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: "app-plantillas-doc",
  templateUrl: "./plantillas-doc.component.html",
  styleUrls: ["./plantillas-doc.component.css"],
})
export class PlantillasDocComponent implements OnInit {
  displayedColumns: string[] = [
    "logo",
    "TipoDocumentoFiscal", 
    "codigoClasificador",
    "estado", 
    "actions"
  ];
  dataSource: MatTableDataSource<any>;
  tipoDocFiscal: any;
  empresaSeleccionada: any;
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private PlantillasDocService: PlantillasDocService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket,
    private serviceTipoDoc: SincronizarService
  ) {
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.getAllPlantillasDoc();
    // Escuchadores Socket IO
    this.socket.on("/Sifeplantilladocumentofiscal/POST", (row_obj) => {
      var verifica = 0;
      var dt = this.dataSource.data;
      if (row_obj.length == dt.length) {
        dt = dt.filter((value, key) => {
          if (value.id == row_obj.id) {
            value.TipoDocumentoFiscal = row_obj.TipoDocumentoFiscal;
            value.codigoClasificador = row_obj.codigoClasificador;
            value.plantilla = row_obj.plantilla;
            value.estado = row_obj.estado;
            value.url_qr = row_obj.url_qr;
            verifica++;
          }
          this.dataSource.data = dt;
          return true;
        });
        if (verifica == 0) {
          this.addRowData(row_obj);
          this.notificationService.success("Registrado exitosamente");
        }
      }
    });
    this.socket.on("/Sifeplantilladocumentofiscal/DELETE", (row_obj) => {
      this.deleteRowData(row_obj);
    });
  }
  // Metodos open dialogo (Modal)
  openDialog(action, obj) {
    const dialogRef = this.dialog.open(PlantillasDocFormComponent, {
      width: "50%",
      data: {
        obj: obj,
        action: action,
        TipoDocumentoFiscal: this.tipoDocFiscal,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.PlantillasDocService.form.reset();
      if (result != undefined) {
        if (result.event == "Crear") {
          //this.addRowData(result.data.respuesta);
        }
      }
      //console.log(result.data.respuesta);
    });
  }
  // Metodos get, add. delete y oninit
  ngOnInit() {
    this.serviceTipoDoc
      .getProductoServ(this.empresaSeleccionada, 
        'ParametricaTipoDocumentoSector?filter={"where":{"homologasap":"1"}}'
      )
      .subscribe((data) => {
        this.tipoDocFiscal = data;
      });
  }
  getAllPlantillasDoc() {
    this.PlantillasDocService.getAllPlantillasDoc().subscribe((data) => {
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
  estadoTrue(data) {
    this.PlantillasDocService.updatePlantillaDoc(data).subscribe((dt) => {
      if (dt["count"] == 1) {
        this.notificationService.success("Actualizado");
        var dat = new Array();
        dat = this.dataSource.data;
        var estado;
        if (data.estado == 0) {
          estado = 1;
        }
        if (data.estado == 1) {
          estado = 0;
        }
        dat = dat.filter((value, key) => {
          if (value.id == data.id) {
            value.estado = estado;
          }
          this.dataSource.data = dat;
          return true;
        });
      }
    });
  }
  // updateRowData(row_obj){
  //   const dt = this.dataSource.data;
  //   this.dataSource.data = dt.filter((value,key)=>{
  //     if(value.id == row_obj.id){
  //       value.descripcion = row_obj.descripcion;
  //     }
  //     return true;
  //   });
  // }
}
