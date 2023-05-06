import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ContingenciasService } from "src/app/services/contingencias.service";
import { RegistroEventoSignificativoComponent } from "./registro-evento-significativo/registro-evento-significativo.component";
import { EventosSignificativosService } from "src/app/services/eventos-significativos.service";
import { Socket } from "ngx-socket-io";

@Component({
  selector: "app-evento-significativo",
  templateUrl: "./evento-significativo.component.html",
  styleUrls: ["./evento-significativo.component.css","./../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class EventoSignificativoComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  empresaSeleccionada: any;
  UsuarioActual: any;
  isLoading = false;
  displayedColumns: string[] = [
    "logo",
    "codigoSucursal",
    "codigoPDV",
    "cuis",
    "codigoMotivoEvento",
    "descripcion",
    "fechaHoraInicioEvento",
    "fechaHoraFinEvento",
    "codigoRecepcionEventoSignificativo",
    "tiporegistro",
    "actions",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    public contingenciasService: ContingenciasService,
    public eventossignificativosService: EventosSignificativosService,
    private socket: Socket
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));

    this.CargarEventoSignificativo();
    this.socket.on("Evento_Significativo", (row_obj) => {
      this.Refresh();
    });
  }

  ngOnInit(): void {}

  CargarEventoSignificativo() {
    this.isLoading = true;
    this.contingenciasService.sife_contingencias_get(this.empresaSeleccionada).then((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  Refresh() {
    this.isLoading = true;
    this.contingenciasService.sife_contingencias_get(this.empresaSeleccionada).then((data) => {
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }
  RegistrarEventoSignificativo(datos_evento) {
    const dialogRef = this.dialog.open(RegistroEventoSignificativoComponent, {
      width: "70%",
      data: datos_evento,
    });
    dialogRef.afterClosed().subscribe();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
