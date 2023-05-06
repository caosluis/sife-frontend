import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CertificadosService } from "./certificados.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {
  subscription: Subscription;
  displayedColumns: string[] = [
    "id",
    "nombre",
    "fechaCreacion",
    "fechaModificacion",
    "fechaVencimiento"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public certificadosService: CertificadosService,
    public dialog: MatDialog,
    private socket: Socket) { }

  ngOnInit(): void {
    this.listaCertificado();
    this.subscription = this.certificadosService._refresh$.subscribe(()=>{
      console.log("Observable Iniciado");
      this.listaCertificado()
    }) 
  }

  listaCertificado() {
    this.certificadosService.sife_certificados_get()
    .then((data) =>{
      console.log('los datos son'+data);
      this.certificadosService.dataSource = new MatTableDataSource(
        data
      );
      this.certificadosService.dataSource.paginator = this.paginator;
      this.certificadosService.dataSource.sort = this.sort;
    })
  }

}
