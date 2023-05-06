
//Importamos el componente de formulario
import { GroupsFormComponent } from './groups-form/groups-form.component';
import { GroupsService } from '../../../services/groups.service';
import { NotificationService } from '../../../services/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
//Importamos Socket IO
import { Socket } from 'ngx-socket-io';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  displayedColumns: string[] = ['tipo', 'nombre_grupo', 'descripcion', 'actions']
  dataSource: MatTableDataSource<any>;
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private service: GroupsService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket
  ) {
    this.getAllGroups();
    // Escuchadores Socket IO
    this.socket.on('/Sifegrupo/POST', (row_obj) => {
      var verifica = 0;
      var dt = this.dataSource.data;
      dt = dt.filter((value, key) => {
        if (value.id == row_obj.id) {
          value.nombre_grupo = row_obj.nombre_grupo;
          value.descripcion = row_obj.descripcion;
          value.estado = row_obj.estado;
          value.ACL = row_obj.ACL;
          value.cuis = row_obj.cuis;
          value.tipo = row_obj.tipo;
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
    this.socket.on('/Sifegrupo/DELETE', (row_obj) => {
      this.deleteRowData(row_obj)
    });
  }
  // Metodos open dialogo (Modal)
  openDialog(action, obj) {
    const dialogRef = this.dialog.open(GroupsFormComponent, {
      width: '95%',
      data: { "obj": obj, "action": action }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result.data.respuesta);
      if (result.event == 'Crear') {
        //this.addRowData(result.data.respuesta);
      }
    });
  }
  // Metodos get, add. delete y oninit
  ngOnInit() {
  }
  getAllGroups() {
    /* this.service.getAllGroups().subscribe(
      data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    ) */
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

