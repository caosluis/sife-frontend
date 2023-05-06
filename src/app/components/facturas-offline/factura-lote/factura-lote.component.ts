import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FacturaElectronicaLoteService } from "src/app/services/factura-electronica-lote.service";
import { FacturaLoteDetalleComponent } from "./factura-lote-detalle/factura-lote-detalle.component";
import { Socket } from "ngx-socket-io";
import { ListasDesplegablesService } from "src/app/services/listas-desplegables.service";
import { Router } from "@angular/router";
import { FacturaLoteVerificarComponent } from "./factura-lote-verificar/factura-lote-verificar.component";
import { FacturasOfflineService } from "src/app/services/facturas-offline.service";
import { FacturaLoteSolicitaComponent } from "./factura-lote-solicita/factura-lote-solicita.component";
import { FacturaLoteReenvioComponent} from "./factura-lote-reenvio/factura-lote-reenvio.component"

@Component({
  selector: "app-factura-lote",
  templateUrl: "./factura-lote.component.html",
  styleUrls: ["./factura-lote.component.css","./../../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class FacturaLoteComponent implements OnInit {
  Respuesta: any;
  displayedColumns: string[] = [
    "logo",
    "id",
    "cantidadFacturas",
    "codigoEvento",
    "Cafc",
    "fecha",
    "cuis",
    "nit",
    "codigoSucursal",
    "codigoPuntoVenta",
    "codigoDocumentoSector",        
    "codigoRecepcion",
    "estado",
    "descripcionTransaccion",
    "actions",
  ];
  estados: any[] = [];
  estadosF: any[];
  loading = false;
  isLoading = true;
  loading1 = false;
  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };
  empresaSeleccionada: any;
  LoteActual: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private FacturasOfflineService: FacturasOfflineService,
    private facturaelectronicaloteService: FacturaElectronicaLoteService,
    private LsitasDesp: ListasDesplegablesService,
    private facturasOfflineService: FacturasOfflineService,
    public dialog: MatDialog,
    private socket: Socket,
    private router: Router
  ) {
    this.LoteActual = JSON.parse(localStorage.getItem("Lote"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.LsitasDesp.getLista("estadosLote").then((dt) => {
      this.estadosF = dt[0]["valores"];
      var dat = new Array();
      dt[0]["valores"].forEach((element) => {
        dat[element.id] = element.valor;
      });
      this.estados = dat;
    });

    this.facturaelectronicaloteService
      .sife_facturaElectronica_lote_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada
      )
      .then((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.socket.on("Lote_Ingresa", (row_obj) => {
      this.Refresh();
    });
  }

  async ngOnInit() {
    this.getProceso();
    if (this.LoteActual) {
      this.FechaActual = {
        start_time: JSON.parse(localStorage.getItem("fechaEmision")),
      };
      this.FechaSeleccionada = JSON.parse(localStorage.getItem("fechaEmision"));
      await this.facturaelectronicaloteService
        .sife_facturaElectronica_lote_get(
          this.empresaSeleccionada,
          this.FechaSeleccionada
        )
        .then((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        });
      this.FiltroBuscarInicial(this.LoteActual);
    } else {
      this.facturaelectronicaloteService
        .sife_facturaElectronica_lote_get(
          this.empresaSeleccionada,
          this.FechaSeleccionada
        )
        .then((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        });
    }
    localStorage.removeItem("Lote");
    localStorage.removeItem("fechaEmision");
  }
  cargar_facturaElectronica_lote() {
    this.facturaelectronicaloteService
      .sife_facturaElectronica_lote_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada
      )
      .then((data) => {
        this.dataSource.data = data;
        this.isLoading = false;
      });
  }
  SeleccionarFecha(event) {
    this.isLoading = true;
    this.FechaSeleccionada = event.value;
    this.LoteActual = "";
    this.cargar_facturaElectronica_lote();
  }
  Refresh() {
    this.facturaelectronicaloteService
      .sife_facturaElectronica_lote_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada
      )
      .then((data) => {
        this.dataSource.data = data;
      });
  }
  Detalle(lote) {
    const dialogRef = this.dialog.open(FacturaLoteDetalleComponent, {
      data: lote,
    });
  }
  RedireccionaraOffline(Lote) {
    this.FacturasOfflineService.sife_facturaElectronica_offline_detalle_get_limit(
      Lote
    ).then((data) => {
      localStorage.setItem("Lote", JSON.stringify(Lote));
      localStorage.setItem(
        "fechaEmision",
        JSON.stringify(data[0].fechaEmision)
      );
      this.router.navigate(["/facturas-sap"]);
    });
  }

  VerificarLote(Lote) {
    const dialogRef = this.dialog.open(FacturaLoteVerificarComponent, {
      data: Lote,
      width: "70%",
    });
  }
  FiltroBuscar(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  FiltroBuscarInicial(filterValue: string) {
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
  Recargar() {
    this.loading = true;
    this.facturaelectronicaloteService
      .sife_facturaElectronica_lote_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada
      )
      .then((data) => {
        this.dataSource.data = data;
        this.loading = false;
      });
  }
  SolicitaLoteEnvio(){
    const dialogRef = this.dialog.open(FacturaLoteSolicitaComponent, {
      width: "100%",
    });
  }

  ReenvioLote(Lote){
    console.log("Los datos son: "+Lote)
    const dialogRef = this.dialog.open(FacturaLoteReenvioComponent, {
      data: Lote,
      width: "60%",
    });
  }
  
  getProceso() {
    this.isLoading = true;
    this.facturasOfflineService
      .sife_facturaElectronica_offline_proceso()
      .then((data) => {        
        this.Respuesta = data[0];
        this.Respuesta = this.Respuesta.fecha;
        //console.log("DATOS OBTENIDOS DATA" + JSON.stringify(this.Respuesta))
        this.isLoading = false;
      })
      .catch();
  }
}
