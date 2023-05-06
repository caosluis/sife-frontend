import { NgxSpinnerService } from "ngx-spinner";
import { SucursalService } from "../../services/sucursal.service";
import { ListasDesplegablesService } from "../../services/listas-desplegables.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SincronizarService } from "../../services/sincronizar.service";
//Importamos el componente de formulario
import { FacturasService } from "../../services/facturas.service";
import { NotificationService } from "../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CufdService } from "../../services/cufd.service";
// Cuis service
import { CuisService } from "../../services/cuis.service";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { PdvService } from "src/app/services/pdv.service";
import { FacturasOfflineService } from "src/app/services/facturas-offline.service";
import { FacturasSapFormComponent } from "./facturas-offline-form/facturas-sap-form.component";
import { ContingenciasService } from "src/app/services/contingencias.service";
import { FechaActual } from "src/app/global";
import { FacturaRegularizacionComponent } from "../facturas/factura-regularizacion/factura-regularizacion.component";
import { FacturaConsultaComponent } from "../facturas/factura-consulta/factura-consulta.component";
import { FacturaAnulacionComponent } from "../facturas/factura-anulacion/factura-anulacion.component";
import { FacturaReversionAnulacionComponent } from "../facturas/factura-reversion-anulacion/factura-reversion-anulacion.component";
import { EmpresaService } from "src/app/services/empresa.service";
import { FacturaElectronicaLoteService } from "src/app/services/factura-electronica-lote.service";

@Component({
  selector: "app-facturas-sap",
  templateUrl: "./facturas-sap.component.html",
  styleUrls: ["./facturas-sap.component.css","./../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class FacturasSapComponent implements OnInit {
  UsuarioActual: any;
  LoteActual: any;
  empresaSeleccionada: any;
  loading = false;
  loading1 = false;
  isLoading = true;
  transaccion: any;
  descripcion: any;
  origenList: any;
  origenSeleccionado: any = "Todos";

  displayedColumns: string[] = [
    "logo",
    "Nro. Factura",
    "CUIS",
    "cuf",
    "Punto de Venta",
    "Tipo Documento",
    "Fecha de Emisión",
    "MontoTotal",
    "Codigo Evento",
    "Tipo Evento",
    "Cafc",
    "Lote",
    "numeroArchivo",
    "Estado",
    "actions",
  ];
  IdProducto: any;
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  estados: any[] = [];
  estadosF: any[];
  estadoActual: any = "todas";
  ListaCufd: any = {};
  Sucursales: any[];
  PDVs: any;
  estadoSeleccionado: any = "Todos";
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

  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };
  // Formulario de filtros de estado
  formFiltro: FormGroup = new FormGroup({
    estadosFactura: new FormControl(""),
    sucursales: new FormControl(""),
    pdv: new FormControl(""),
  });
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private FacturasService: FacturasService,
    private facturasofflineService: FacturasOfflineService,
    private facturaelectronicaloteService: FacturaElectronicaLoteService,
    public EmpresaService: EmpresaService,
    private contingenciasService: ContingenciasService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket,
    private LsitasDesp: ListasDesplegablesService,
    private _route: ActivatedRoute,
    private cufdService: CufdService,
    private pdvService: PdvService,
    private SucursalService: SucursalService,
    private spinner: NgxSpinnerService,
    private cuisService: CuisService,
    private catalogoService: SincronizarService,
    private router: Router
  ) {
    this.where = { estado: null };
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.LoteActual = JSON.parse(localStorage.getItem("Lote"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    // this.getAllFacturas();
    // Escuchadores Socket IO
    this.spinner.show();

    this.socket.on("Factura View Entrante", (row_obj) => {});

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
    this.SucursalService.sife_sucursal_get(this.empresaSeleccionada).then(
      (data) => {
        data.filter((value) => {
          this.sucursalesIndex = {
            ...this.sucursalesIndex,
            [value["codigoSucursal"]]: value["descripcion"],
          };
          return true;
        });
      }
    );

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
    this.facturasofflineService
      .getCountFacturas(this.where)
      .subscribe((data) => {
        this.totalRegistros = data["count"];
      });
    this.estadoActual = this._route.snapshot.paramMap.get("estado");
    this.SucursalService.sife_sucursal_get(this.empresaSeleccionada).then(
      (data) => {
        this.Sucursales = data;
      }
    );
    this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
      this.PDVs = data;
    });
    // ---------------------------------------
  }
  Detalle(action, obj) {
    obj = {
      ...obj,
      DocumentoFiscal: this.documentosFiscales[obj.codigoDocumentoFiscal],
      DocumentoSector: this.documentosSector[obj.codigoDocumentoSector],
      sucursal: this.sucursalesIndex[obj["codigoSucursal"]],
      empresa: obj.cuis,
    };
    const dialogRef = this.dialog.open(FacturasSapFormComponent, {
      data: { obj: obj, action: action },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
  AnulacionFactura(factura) {
    if(this.UsuarioActual.role == 'Sistemas' || this.UsuarioActual.role == 'Administrador'){
      const dialogRef = this.dialog.open(FacturaAnulacionComponent, {
        width: "50%",
        data: factura,
      });
      dialogRef.afterClosed().subscribe((datosfactura) => {
        if (datosfactura != undefined) {
          var respuesta;
  
          this.FacturasService.sife_factura_mule_anular(
            datosfactura.motivo,
            datosfactura.factura
          ).then((data) => {
            respuesta = data;
            /* alert(respuesta.Respuesta) */
            this.notificationService.success(respuesta.Respuesta.descripcion);
            console.log(respuesta.Respuesta.descripcion);
            this.facturasofflineService
              .sife_facturaElectronica_offline_get(
                this.empresaSeleccionada,
                this.FechaSeleccionada,
                this.estadoSeleccionado,
                this.tipofacturaSeleccionada,
                this.sucursalSeleccionada,
                this.pdvSeleccionado,
                this.origenSeleccionado
              )
              .then((data) => {
                this.dataSource.data = data;
                this.spinner.hide();
              });
          });
        }
      });
    }else{
      alert("No tiene los permisos para realizar esta acción.");
    }
  }
  // Abrir Modal Reversion Anulacion
  ReversionAnulacionFactura(factura) {
    const dialogRef = this.dialog.open(FacturaReversionAnulacionComponent, {
      width: "50%",
      data: factura,
    });
    dialogRef.afterClosed().subscribe((datosfactura) => {
      this.FacturasService.sife_factura_mule_revertir_anular(
        datosfactura.factura
      ).then((data) => {
        this.facturasofflineService
          .sife_facturaElectronica_offline_get(
            this.empresaSeleccionada,
            this.FechaSeleccionada,
            this.estadoSeleccionado,
            this.tipofacturaSeleccionada,
            this.sucursalSeleccionada,
            this.pdvSeleccionado,
            this.origenSeleccionado
          )
          .then((data) => {
            this.dataSource.data = data;
            this.spinner.hide();
          });
      });
    });
  }
  // Abrir Modal Reversion Anulacion
  RegularizacionFactura(factura) {
    const dialogRef = this.dialog.open(FacturaRegularizacionComponent, {
      width: "50%",
      data: factura,
    });
    dialogRef.afterClosed().subscribe((datosfactura) => {
      if (datosfactura != undefined) {
        var respuesta;

        this.FacturasService.sife_factura_mule_regularizar(
          datosfactura.actividad,
          datosfactura.direccion,
          datosfactura.factura
        ).then((data) => {
          respuesta = data;
          /* alert(respuesta.Respuesta) */
          this.notificationService.success(respuesta.Respuesta.descripcion);
          console.log(respuesta.Respuesta.descripcion);

          this.facturasofflineService
            .sife_facturaElectronica_offline_get(
              this.empresaSeleccionada,
              this.FechaSeleccionada,
              this.estadoSeleccionado,
              this.tipofacturaSeleccionada,
              this.sucursalSeleccionada,
              this.pdvSeleccionado,
              this.origenSeleccionado
            )
            .then((data) => {
              this.dataSource.data = data;
              this.spinner.hide();
            });
        });
      }
    });
  }

  ConsultarFactura(factura) {
    const dialogRef = this.dialog.open(FacturaConsultaComponent, {
      width: "50%",
      data: factura,
    });
    dialogRef.afterClosed().subscribe((datosfactura) => {
      if (datosfactura != undefined) {
      }
    });
  }

  // Metodass get, add. delete y oninit
  async ngOnInit() {
    await this.LsitasDesp.getLista("estadosFactura").then((dt) => {
      this.estadosF = dt[0]["valores"];
      var dat = new Array();
      dt[0]["valores"].forEach((element) => {
        dat[element.id] = element.valor;
      });
      this.estados = dat;

      this.spinner.hide();

      /* this.cargarContingencias_count();
      this.cargarSifeOffline_count();
      this.cargarSifeOffline_sucursal_count();
      this.cargarSifeOffline_pdv_count();
      this.cargarSifeOffline_tipodocumento_count();
      this.cargarsife_facturaElectronica_offline_exitosas_get_count(); */
    });
    if (this.LoteActual) {
      this.FechaActual = {
        start_time: JSON.parse(localStorage.getItem("fechaEmision")),
      };
      this.FechaSeleccionada = JSON.parse(localStorage.getItem("fechaEmision"));
      await this.facturasofflineService
        .sife_facturaElectronica_offline_get(
          this.empresaSeleccionada,
          this.FechaSeleccionada,
          this.estadoSeleccionado,
          this.tipofacturaSeleccionada,
          this.sucursalSeleccionada,
          this.pdvSeleccionado,
          this.origenSeleccionado
        )
        .then((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.spinner.hide();
          this.isLoading = false;
        });
      this.FiltroBuscarInicial(this.LoteActual);
    } else {
      this.facturasofflineService
        .sife_facturaElectronica_offline_get(
          this.empresaSeleccionada,
          this.FechaSeleccionada,
          this.estadoSeleccionado,
          this.tipofacturaSeleccionada,
          this.sucursalSeleccionada,
          this.pdvSeleccionado,
          this.origenSeleccionado
        )
        .then((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.spinner.hide();
          this.isLoading = false;
        });
    }
    this.cargarOrigenFactura();
    localStorage.removeItem("Lote");
    localStorage.removeItem("fechaEmision");
  }

  getAllFacturas() {
    // this.spinner.show();
    this.facturasofflineService.getAllFacturas().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.LsitasDesp.getLista("estadosFactura").then((dt) => {
        this.estadosF = dt[0]["valores"];
        var dat = new Array();
        dt[0]["valores"].forEach((element) => {
          dat[element.id] = element.valor;
        });
        this.estados = dat;
        this.spinner.hide();
        this.isLoading = false;
      });
    });
  }

  cargarContingencias_count() {
    this.contingenciasService
      .sife_contingencias_get_count(FechaActual)
      .then((data) => {
        this.indicadorContingencias = data[0].count;
      });
  }
  cargarSifeOffline_count() {
    this.facturasofflineService.sife_sifeOffline_get().then((data) => {
      this.indicadorTotalesOffline = data.count;
    });
  }
  cargarSifeOffline_sucursal_count() {
    this.facturasofflineService
      .sife_facturaoffline_sucursal_get_count(this.sucursalSeleccionada)
      .then((data) => {
        this.indicadorSucursales = data.count;
      });
  }
  cargarSifeOffline_pdv_count() {
    this.facturasofflineService
      .sife_facturaoffline_pdv_get_count(
        this.sucursalSeleccionada,
        this.pdvSeleccionado
      )
      .then((data) => {
        this.indicadorPDVs = data.count;
      });
  }
  cargarSifeOffline_tipodocumento_count() {
    this.facturasofflineService
      .sife_facturaoffline_tipodocumento_get_count(
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.tipofacturaSeleccionada
      )
      .then((data) => {
        this.indicadorTipoDocumento = data.count;
      });
  }
  cargarsife_facturaElectronica_offline_exitosas_get_count() {
    this.facturasofflineService
      .sife_facturaElectronica_offline_exitosas_get_count(
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.tipofacturaSeleccionada
      )
      .then((data) => {
        this.indicadorFacturaOfflineExitosa = data.count;
      });
  }

  //Metodas de filtrado
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

  buscarFacturas(estado) {
    this.spinner.show();
    if (estado != undefined) {
      if (estado != "todas" && estado != "" && estado != "*") {
        var consultaFacturas =
          '?filter={"where":{"estado":"' + this.estadoActual + '"}}';
        this.facturasofflineService
          .getAllFacturasFiltro(consultaFacturas)
          .subscribe((dato) => {
            this.dataSource = new MatTableDataSource(dato);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.spinner.hide();
          });
      } else {
        this.facturasofflineService.getAllFacturas().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.spinner.hide();
        });
      }
    }
  }
  CargarFacturas() {
    this.spinner.show();
    this.facturasofflineService
      .sife_facturaElectronica_offline_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      )
      .then((data) => {
        this.dataSource.data = data;
        this.spinner.hide();
      });
  }

  SeleccionarSucursal(sucursal) {
    this.isLoading = true;
    this.sucursalSeleccionada = sucursal;
    this.LoteActual = "";
    if (sucursal == "Todas") {
      this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
        this.PDVs = data;
        this.facturasofflineService
          .sife_facturaElectronica_offline_get(
            this.empresaSeleccionada,
            this.FechaSeleccionada,
            this.estadoSeleccionado,
            this.tipofacturaSeleccionada,
            this.sucursalSeleccionada,
            this.pdvSeleccionado,
            this.origenSeleccionado
          )
          .then((data) => {
            this.dataSource.data = data;
            this.cargarSifeOffline_sucursal_count();
            this.cargarSifeOffline_pdv_count();
            this.cargarSifeOffline_tipodocumento_count();
            this.cargarsife_facturaElectronica_offline_exitosas_get_count();
            this.isLoading = false;
          });
      });
    } else {
      this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
        this.PDVs = data.filter((item) => item.codigoSucursal == sucursal);
        this.facturasofflineService
          .sife_facturaElectronica_offline_get(
            this.empresaSeleccionada,
            this.FechaSeleccionada,
            this.estadoSeleccionado,
            this.tipofacturaSeleccionada,
            this.sucursalSeleccionada,
            this.pdvSeleccionado,
            this.origenSeleccionado
          )
          .then((data) => {
            this.dataSource.data = data;
            this.cargarSifeOffline_sucursal_count();
            this.cargarSifeOffline_pdv_count();
            this.cargarSifeOffline_tipodocumento_count();
            this.cargarsife_facturaElectronica_offline_exitosas_get_count();
            this.isLoading = false;
          });
      });
    }
  }

  SeleccionarPDV(pdv) {
    this.isLoading = true;
    this.pdvSeleccionado = pdv;
    this.LoteActual = "";
    if (pdv == "Todos") {
      this.facturasofflineService
        .sife_facturaElectronica_offline_get(
          this.empresaSeleccionada,
          this.FechaSeleccionada,
          this.estadoSeleccionado,
          this.tipofacturaSeleccionada,
          this.sucursalSeleccionada,
          this.pdvSeleccionado,
          this.origenSeleccionado
        )
        .then((data) => {
          this.dataSource.data = data;
          this.cargarSifeOffline_pdv_count();
          this.cargarSifeOffline_tipodocumento_count();
          this.cargarsife_facturaElectronica_offline_exitosas_get_count();
          this.isLoading = false;
        });
    } else {
      this.facturasofflineService
        .sife_facturaElectronica_offline_get(
          this.empresaSeleccionada,
          this.FechaSeleccionada,
          this.estadoSeleccionado,
          this.tipofacturaSeleccionada,
          this.sucursalSeleccionada,
          this.pdvSeleccionado,
          this.origenSeleccionado
        )
        .then((data) => {
          this.dataSource.data = data;
          this.cargarSifeOffline_pdv_count();
          this.cargarSifeOffline_tipodocumento_count();
          this.cargarsife_facturaElectronica_offline_exitosas_get_count();
          this.isLoading = false;
        });
    }
  }

  SeleccionarTipoFactura(TipoFactura) {
    this.isLoading = true;
    this.tipofacturaSeleccionada = TipoFactura;
    this.LoteActual = "";
    this.facturasofflineService
      .sife_facturaElectronica_offline_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      )
      .then((data) => {
        this.dataSource.data = data;
        this.cargarSifeOffline_tipodocumento_count();
        this.cargarsife_facturaElectronica_offline_exitosas_get_count();
        this.isLoading = false;
      });
  }

  SeleccionarEstado(estado) {
    this.isLoading = true;
    this.estadoSeleccionado = estado;
    this.facturasofflineService
      .sife_facturaElectronica_offline_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      )
      .then((data) => {
        this.dataSource.data = data;
        this.cargarSifeOffline_tipodocumento_count();
        this.cargarsife_facturaElectronica_offline_exitosas_get_count();
        this.isLoading = false;
      });
  }

  SeleccionarFecha(event) {
    this.isLoading = true;
    this.FechaSeleccionada = event.value;
    this.LoteActual = "";
    this.facturasofflineService
      .sife_facturaElectronica_offline_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      )
      .then((data) => {
        this.dataSource.data = data;
        this.cargarSifeOffline_tipodocumento_count();
        this.cargarsife_facturaElectronica_offline_exitosas_get_count();
        this.isLoading = false;
      });
  }

  SeleccionarOrigen(origen) {
    this.isLoading = true;
    this.origenSeleccionado = origen;
    this.LoteActual = "";
    this.facturasofflineService
      .sife_facturaElectronica_offline_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      )
      .then((data) => {
        this.dataSource.data = data;
        this.cargarSifeOffline_tipodocumento_count();
        this.cargarsife_facturaElectronica_offline_exitosas_get_count();
        this.isLoading = false;
      });
  }

  Recargar() {
    this.isLoading = true;
    this.loading = true;
    this.facturasofflineService
      .sife_facturaElectronica_offline_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      )
      .then((data) => {
        this.dataSource.data = data;

        this.cargarSifeOffline_tipodocumento_count();
        this.cargarsife_facturaElectronica_offline_exitosas_get_count();
        this.loading = false;
        this.isLoading = false;
      });
  }

  cargarOrigenFactura() {
    this.EmpresaService.sife_facturaOrigen_get(this.empresaSeleccionada).then(
      (data) => {
        this.origenList = data;
      }
    );
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

  Consultar(facturaData) {
    var respuesta;
    this.facturasofflineService
      .sife_factura_mule_consultar(facturaData)
      .then((data) => {
        respuesta = data;
        this.transaccion = respuesta.Respuesta.transaccion;
        this.descripcion = respuesta.Respuesta.descripcion;
        /* this.notificationService.success(respuesta.Respuesta.descripcion);
        console.log(respuesta.Respuesta.transaccion); */
      });
  }

  RedireccionaraLotes(Lote) {
    this.facturaelectronicaloteService
      .sife_facturaElectronica_lote_get_limit(Lote)
      .then((data) => {
        localStorage.setItem("Lote", JSON.stringify(Lote));
        localStorage.setItem("fechaEmision", JSON.stringify(data.fecha));
        this.router.navigate(["/facturas-lote"]);
      });
  }

  NoAnulado(factura) {
    if (
      factura.toString() == "6" ||
      factura.toString() == "7" ||
      factura.toString() == "91"
    ) {
      return "Anulado";
    } else {
      return "NoAnulado";
    }
  }
  Anulado(factura) {
    if (factura.toString() == "6" || factura.toString() == "7") {
      return "Anulado";
    } else {
      return "NoAnulado";
    }
  }
  Valido(factura) {
    if (
      factura.toString() == "2" ||
      factura.toString() == "6" ||
      factura.toString() == "7" ||
      factura.toString() == "8"
    ) {
      return "Valido";
    }
  }
  BuscarFactura(IdProducto) {
    this.IdProducto = IdProducto;
    this.facturasofflineService
      .sife_facturaElectronica_offline_get_one(IdProducto)
      .then((data) => {
        this.dataSource1 = new MatTableDataSource(data);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
      });
  }
}
