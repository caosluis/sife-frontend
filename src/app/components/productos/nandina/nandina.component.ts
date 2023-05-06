  //Importamos el componente de formulario
  // import { NandinaFormComponent } from '../nandina/nandina/nandina-Form.component';
  import { NandinaService } from '../../../services/nandina.service';
  import { NotificationService } from '../../../services/notification.service';
  import { Component, OnInit , ViewChild,Inject, Optional } from '@angular/core';
  //Importamos Socket IO
  import { Socket } from 'ngx-socket-io';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  @Component({
    selector: 'app-nandina',
    templateUrl: './nandina.component.html',
    styleUrls: ['./nandina.component.css']
  })
  export class NandinaComponent implements OnInit {
    displayedColumns: string[] = ['nandina','fecha','actions']
    dataSource: MatTableDataSource<any>;
    // action:string;
    local_data:any;
    obj:any;
    catalogo:any;
    // Dependencias de paginador Mat table
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    constructor(
      private service:NandinaService,
      public dialog: MatDialog,
      private notificationService: NotificationService,
      private socket: Socket,
      public dialogRef: MatDialogRef<NandinaComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.local_data = {...data};
      this.obj = this.local_data["idCatalogo"];
      this.catalogo = this.local_data["catalogo"];
      this.getAllNandina();
      // Escuchadores Socket IO
      this.socket.on('/Sifenandina/POST',(row_obj) => {
        // console.log(row_obj);
        var verifica = 0;
        var dt = this.dataSource.data;      
        dt = dt.filter((value,key)=>{
          if(value.id == row_obj.id){
            value.idProductosServicios = row_obj.idProductosServicios;
            value.nandina = row_obj.nandina;
            value.fecha = row_obj.fecha;
            verifica++;
          }
          this.dataSource.data = dt;
          return true;
        });
        if(verifica == 0){
          this.addRowData(row_obj);
          this.notificationService.success("Registrado exitosamente");
        }
      });
      this.socket.on('/Sifenandina/DELETE',(row_obj) => {  
        this.deleteRowData(row_obj)
      });
    }

    // Metodos get, add. delete y oninit
    ngOnInit() {
    }
    getAllNandina(){
      this.service.getAllNandina(this.obj).subscribe(
        data => {
          //console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      )
    }
    //Metodo de filtrado
    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    // Metodos de actualización insercion y eliminación de registros
    addRowData(data){
      const dt = this.dataSource.data;
      dt.push(data);
      this.dataSource.data = dt;
    }
    deleteRowData(row_obj){
      const dt = this.dataSource.data;
      this.dataSource.data = dt.filter((value,key)=>{
        return value.id != row_obj.id;
      });
    }
    onClose() {
      this.dialogRef.close();
      this.dialogRef.close({event:'Cancel'});
    }
    seleccionNandina(nandina){
      this.dialogRef.close({nandina:nandina});
    }
  }

  