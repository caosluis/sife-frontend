import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { EmpresaService } from "src/app/services/empresa.service";
import { CufdsincronizacionService } from "./cufdsincronizacion.service";
import * as moment from "moment";
import { Subscription } from 'rxjs';
import { CufdRenovarComponent } from "../cufd-renovar/cufd-renovar.component";


@Component({
  selector: 'app-cufdsincronizacion',
  templateUrl: './cufdsincronizacion.component.html',
  styleUrls: ['./cufdsincronizacion.component.css']
})
export class CufdsincronizacionComponent implements OnInit {
  subscription: Subscription;
  transaccion: any;
  displayedColumns: string[] = [
    "logo",
    "servicioWeb",
    "fechaSincronizacion",
    "mensaje",
    "descripcionTransaccion",
    "transaccion",
    "actions"
  ];
  dataSource: MatTableDataSource<any>;
  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };
  Empresas: any = [];
  empresaSeleccionada: any;

  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public cufdsincronizacionService: CufdsincronizacionService,
    public EmpresaService: EmpresaService,
    public MatDialog: MatDialog,
    public dialog: MatDialog,
  ) {
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
  }

  ngOnInit(): void {
    this.cargarCufdSincronizacion();
    this.subscription = this.cufdsincronizacionService._refresh$.subscribe(()=>{
      //console.log("Observable Iniciado");
      this.cargarCufdSincronizacion()
    })
  }

  cargarCufdSincronizacion() {
    this.cufdsincronizacionService.sife_cufd_sincronizacion_get(this.empresaSeleccionada)
    .then((data) =>{            
      if(JSON.stringify(data) == '[]'){
        this.transaccion = '';
      }else{        
        this.transaccion = data[0].transaccion;
      }
      this.cufdsincronizacionService.dataSource = new MatTableDataSource(data);
      this.cufdsincronizacionService.dataSource.paginator = this.paginator;
      this.cufdsincronizacionService.dataSource.sort = this.sort;
    }) 
  }

  SeleccionarFecha(evento){
    this.FechaSeleccionada = evento.value;
    this.cargarCufdSincronizacionfiltro();
  }
  VerHistorialDeHoy(){
    this.cufdsincronizacionService.sife_cufd_sincronizacion_get_fecha(this.empresaSeleccionada,this.FechaActual)
      .then((data) =>{  
        this.cufdsincronizacionService.dataSource = new MatTableDataSource(data);
        this.cufdsincronizacionService.dataSource.paginator = this.paginator;
        this.cufdsincronizacionService.dataSource.sort = this.sort;
      })
  }

  cargarCufdSincronizacionfiltro() {
    moment(this.FechaSeleccionada.start_time).format("DD");
    if (
      moment(this.FechaActual).format("DD.MM.YYYY") ==
      moment(this.FechaSeleccionada).format("DD.MM.YYYY")
    ) {
      this.cargarCufdSincronizacion() 
    } else{
      this.cufdsincronizacionService.sife_cufd_sincronizacion_get_fecha(this.empresaSeleccionada,this.FechaSeleccionada)
      .then((data) =>{  
        this.cufdsincronizacionService.dataSource = new MatTableDataSource(data);
        this.cufdsincronizacionService.dataSource.paginator = this.paginator;
        this.cufdsincronizacionService.dataSource.sort = this.sort;
      })
    }     
  }

  CufdRenovar() {
    const dialogRef = this.dialog.open(CufdRenovarComponent, {
      width: "35%",
    });
    dialogRef.afterClosed().subscribe();
  }

}
