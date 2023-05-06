import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Socket } from "ngx-socket-io";
import { SifeFechaHoraService } from "src/app/services/sife-fecha-hora.service";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { IndicadorfechahistoricodetalleComponent } from "./indicadorfechahistoricodetalle/indicadorfechahistoricodetalle.component";
import { SolicitarfechaComponent } from "./solicitarfecha/solicitarfecha.component";

@Component({
  selector: "app-indicadorfechahistorico",
  templateUrl: "./indicadorfechahistorico.component.html",
  styleUrls: ["./indicadorfechahistorico.component.css"],
})
export class IndicadorfechahistoricoComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "logo",    
    "fechaHora",    
    "fechaHoraSer",
    "delta",
    "listaCodigosRespuestas",
    "transaccion",
    "actions",
  ];
  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };
  HoraActual: any;
  HoraVencimiento: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private SifeFechaHoraService: SifeFechaHoraService,
    public MatDialog: MatDialog,
    private Socket: Socket
  ) {
    this.HoraActual = new Date();
    this.HoraVencimiento = new Date().setHours(this.HoraActual.getHours() - 1);
  }

  ngOnInit(): void {
    this.CargarFechaHora();
  }
  CargarFechaHora() {
    this.SifeFechaHoraService.sife_FechaHora_get().then((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Refresh() {
    moment(this.FechaSeleccionada.start_time).format("DD");
    if (
      moment(this.FechaActual).format("DD.MM.YYYY") ==
      moment(this.FechaSeleccionada).format("DD.MM.YYYY")
    ) {
      this.SifeFechaHoraService.sife_FechaHora_get().then((data) => {
        this.dataSource.data = data;
      });
    } else {
      this.SifeFechaHoraService.sife_FechaHora_Hs_get(
        this.FechaSeleccionada
      ).then((data) => {
        this.dataSource.data = data;
      });
    }
  }
  SeleccionarFecha(event) {
    this.FechaSeleccionada = event.value;
    this.Refresh();
  }
  detalle(fecha) {
    const dialogRef = this.MatDialog.open(
      IndicadorfechahistoricodetalleComponent,
      {
        width: "50%",
        data: fecha,
      }
    );
    dialogRef.afterClosed().subscribe();
  }
  SolicitarFecha() {
    const dialogRef = this.MatDialog.open(SolicitarfechaComponent, {
      width: "50%",
    });
    dialogRef.afterClosed().subscribe();
  }

  FechaIndicador(fecha) {
    if (moment(this.HoraVencimiento) > moment(fecha)) {
      return "Vencido";
    } else {
      return "Vigente";
    }
  }
}
