import { Component, OnInit, ViewChild } from "@angular/core";
import { Location } from "@angular/common";
import { NotificationService } from "../../services/notification.service";
import { EditComponent } from "./edit/edit.component";
import { ConfGlobal } from "./../../models/inicio/conf-global";
import { ConfGlobalesService } from "./../../services/conf-globales.service";

//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
const ELEMENT_DATA: ConfGlobal[] = [];

@Component({
  selector: "app-conf-globales",
  templateUrl: "./conf-globales.component.html",
  styleUrls: ["./conf-globales.component.css"],
})
export class ConfGlobalesComponent implements OnInit {
  displayedColumns: string[] = [
    "logo",
    "Grupo",
    "Nombre",
    "Propiedad",
    "Valor",
    "Bloquear",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  bloqueoConfGlobales: any;
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private service: ConfGlobalesService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket
  ) {
    this.getAllConfGlobales();
    // Escuchadores Socket IO
    this.socket.on("/Sifeglobal/POST", (row_obj) => {
      console.log(row_obj);
      var verifica = 0;
      var dt = this.dataSource.data;
      dt = dt.filter((value, key) => {
        if (value.Id == row_obj.Id) {
          value.Grupo = row_obj.Grupo;
          value.Nombre = row_obj.Nombre;
          value.Propiedad = row_obj.Propiedad;
          value.Valor = row_obj.Valor;
          value.Bloquear = row_obj.Bloquear;
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
    this.socket.on("/Sifeglobal/DELETE", (row_obj) => {
      this.deleteRowData(row_obj);
    });
  }
  // Metodos open dialogo (Modal)
  openDialog(action, obj) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: "50%",
      data: { obj: obj, action: action },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.service.form.reset();
      if (result != undefined) {
        if (result.event == "Crear") {
        }
      }
      //console.log(result.data.respuesta);
    });
  }
  // Metodos get, add. delete y oninit
  ngOnInit() {}
  getAllConfGlobales() {
    this.service.getAllConfGlobal().subscribe((data) => {
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
      return value.Id != row_obj.Id;
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
