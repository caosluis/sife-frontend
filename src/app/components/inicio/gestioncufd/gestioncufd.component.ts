import { Component, OnInit, ViewChild } from '@angular/core';
import { GestioncufdService } from 'src/app/services/inicio/gestioncufd.service';
import { Socket } from 'ngx-socket-io';
import { Gestioncufd } from 'src/app/models/inicio/gestioncufd';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-gestioncufd',
  templateUrl: './gestioncufd.component.html',
  styleUrls: ['./gestioncufd.component.css','./../../mat-table-responsive/mat-table-responsive.directive.scss']
})

export class GestioncufdComponent implements OnInit {
  displayedColumns: string[] = [
    "logo",
    "Grupo",
    "Nombre",
    "Bloquear",
  ];
  dataSource: MatTableDataSource<any>;
  gestioncufd:Gestioncufd[] = [];
  empresaSeleccionada: any;
  // displayedColumns: string[] = ['id','grupo','propiedad','valor'];
// Dependencias de paginador Mat table
@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
@ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private dataApi:GestioncufdService, private socket:Socket) {
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.socket.on('/Sifeglobal/POST',(data) => {
      console.log(data);
      this.gestioncufd.push(data)
    });
   }
   getAllGestioncufd(empresa){
    this.dataApi.getAllGestioncufd(empresa).subscribe((data) => {
      //console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.dataApi.getAllGestioncufd(empresa).subscribe(
      data => {
        this.gestioncufd = data;
        //console.log(data);
      });
  }
  ngOnInit() {
    this.getAllGestioncufd(this.empresaSeleccionada);
  }
  
  
}
