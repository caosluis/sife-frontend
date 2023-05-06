import { Component, Inject, OnInit, Optional, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { ContingenciasService } from "src/app/services/contingencias.service";
import { CufdService } from "src/app/services/cufd.service";
import { CuisService } from "src/app/services/cuis.service";
import { FacturaElectronicaLoteService } from "src/app/services/factura-electronica-lote.service";
import { FacturasOfflineService } from "src/app/services/facturas-offline.service";
import { ListasDesplegablesService } from "src/app/services/listas-desplegables.service";
import { NotificationService } from "src/app/services/notification.service";
import { PdvService } from "src/app/services/pdv.service";
import { SincronizarService } from "src/app/services/sincronizar.service";
import { SucursalService } from "src/app/services/sucursal.service";

@Component({
  selector: "app-factura-lote-detalle",
  templateUrl: "./factura-lote-detalle.component.html",
  styleUrls: ["./factura-lote-detalle.component.css","./../../../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class FacturaLoteDetalleComponent implements OnInit {
  UsuarioActual: any;
  empresaSeleccionada: any;
  loading = true;
  isLoading = true;
  transaccion: any;
  descripcion: any;
  displayedColumns: string[] = [
    "Nro. Factura",
    "CUIS",
    "Sucursal",
    "Punto de Venta",
    "Tipo Documento",
    "Codigo Evento",
    "Fecha de Emisión",
    "Tipo Evento",
    "Lote",
    "Estado",
  ];
  estados: any[] = [];
  estadosF: any[];
  EstadosLote: any[];
  estadoActual: any = "todas";
  ListaCufd: any = {};
  Sucursales: any[];
  PDVs: any;
  tipofacturaSeleccionada: any = "Todos";
  sucursalSeleccionada: any = "Todas";
  pdvSeleccionado: any = "Todos";
  play: Number = 0;
  // Datos indexados
  empresasIndex: any = {};
  sucursalesIndex: any = {};
  documentosFiscales: any = {};
  documentosSector: any = {};
  // **********************************************************
  // variables de compaginado
  rangoRegistros: any = [10, 20, 50, 100, 200];
  salto: any = 0;
  limit: any = this.rangoRegistros[0];
  totalRegistros: any = 0;
  dataRegistros: any = [];
  // variables de filtro
  where: Object = {};
  // ----------------------------------------------------------
  indicadorTotalesOffline: any;
  indicadorSucursales: any;
  indicadorPDVs: any;
  indicadorTipoDocumento: any;
  indicadorContingencias: any;
  indicadorFacturaOfflineExitosa: any;
  // Formulario de filtros de estado
  formFiltro: FormGroup = new FormGroup({
    estadosFactura: new FormControl(""),
    sucursales: new FormControl(""),
    pdv: new FormControl(""),
  });
  facturasLoteList: any;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private FacturasOfflineService: FacturasOfflineService,
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private pdvService: PdvService,
    private SucursalService: SucursalService,
    private spinner: NgxSpinnerService,
    private cuisService: CuisService,
    private LsitasDesp: ListasDesplegablesService,
    private catalogoService: SincronizarService,
    private FacturaElectronicaLoteService: FacturaElectronicaLoteService,
    public dialogRef: MatDialogRef<FacturaLoteDetalleComponent>,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.LsitasDesp.getLista("estadosLote").then((dt) => {
      this.estadosF = dt[0]["valores"];
      var dat = new Array();
      dt[0]["valores"].forEach((element) => {
        dat[element.id] = element.valor;
      });
      this.estados = dat;
    });
    this.cuisService.sife_cuis_get().then((data) => {
      data.filter((value) => {
        this.empresasIndex = {
          ...this.empresasIndex,
          [value["cuis"]]: value["nombre"],
        };
        return true;
      });
    });
    // Get index sucursal
    this.SucursalService.sife_sucursal_get(this.empresaSeleccionada).then((data) => {
      data.filter((value) => {
        this.sucursalesIndex = {
          ...this.sucursalesIndex,
          [value["codigoSucursal"]]: value["descripcion"],
        };
        return true;
      });
    });

    this.catalogoService
      .getProductoServ(this.empresaSeleccionada, "ParametricaTipoDocumentoSector")
      .subscribe((data) => {
        data.filter((value) => {
          this.documentosSector = {
            ...this.documentosSector,
            [value["codigoClasificador"]]: value["descripcion"],
          };
          return true;
        });
      });
    // ***************************************
    this.FacturasOfflineService.getCountFacturas(this.where).subscribe(
      (data) => {
        this.totalRegistros = data["count"];
      }
    );

    this.estadoActual = this._route.snapshot.paramMap.get("estado");
    this.SucursalService.sife_sucursal_get(this.empresaSeleccionada).then(
      (data) => {
        this.Sucursales = data;
      }
    );
    this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
      this.PDVs = data;
    });
  }

  ngOnInit(): void {
    this.FacturasOfflineService.sife_facturaElectronica_offline_detalle_get(
      this.data.id
    ).then((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });

    this.FacturaElectronicaLoteService.sife_facturaElectronica_lote_estado_get(
      this.data.id
    ).then((data) => {
      this.EstadosLote = data;
    });
  }
  PDV(pdv) {
    if (this.PDVs != undefined) {
      var pdvdatos = [];
      for (let i = 0; i < this.PDVs.length; i++) {
        if (this.PDVs[i].cuis == pdv) {
          pdvdatos.push(this.PDVs[i]);
        }
      }
      if (pdvdatos[0] != undefined) {
        return pdvdatos[0].nombrePuntoVenta;
      }
    }
  }
  onClose() {
    this.dialogRef.close();
  }
  Detalle(factura) {}
  RedireccionaraOffline() {
    this.FacturasOfflineService.sife_facturaElectronica_offline_detalle_get_limit(
      this.data.id
    ).then((data) => {
      localStorage.setItem("Lote", JSON.stringify(this.data.id));
      localStorage.setItem(
        "fechaEmision",
        JSON.stringify(data[0].fechaEmision)
      );
      this.router.navigate(["/facturas-sap"]);
    });
  }
}
