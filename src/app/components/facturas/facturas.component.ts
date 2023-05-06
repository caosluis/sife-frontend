import { NgxSpinnerService } from "ngx-spinner";
import { SucursalService } from "./../../services/sucursal.service";
import { ListasDesplegablesService } from "./../../services/listas-desplegables.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SincronizarService } from "./../../services/sincronizar.service";
//Importamos el componente de formulario
import { FacturasFormComponent } from "./facturas-form/facturas-form.component";
import { FacturasService } from "./../../services/facturas.service";
import { NotificationService } from "../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CufdService } from "./../../services/cufd.service";
// Cuis service
import { CuisService } from "./../../services/cuis.service";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { PdvService } from "src/app/services/pdv.service";
import { FacturaAnulacionComponent } from "./factura-anulacion/factura-anulacion.component";
import { FacturaReversionAnulacionComponent } from "./factura-reversion-anulacion/factura-reversion-anulacion.component";
import { FacturaRegularizacionComponent } from "./factura-regularizacion/factura-regularizacion.component";
import { FacturaConsultaComponent } from "./factura-consulta/factura-consulta.component";
import { EmpresaService } from "src/app/services/empresa.service";
@Component({
  selector: "app-facturas",
  templateUrl: "./facturas.component.html",
  styleUrls: ["./facturas.component.css","./../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class FacturasComponent implements OnInit {
  UsuarioActual: any;
  empresaSeleccionada: any;
  loading = false;
  loading1 = false;
  isLoading = true;
  transaccion: any;
  descripcion: any;
  origenList: any;
  showFiller = true;
  role: any;
  displayedColumns: string[] = [
    "logo",
    "Nro.Factura",
    "CUIS",
    "CUF",
    "PuntodeVenta",
    "Sucursal",
    "TipoDocumento",
    "FechadeEmision",
    "Origen",
    "MontoTotal",
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
  tipofacturaSeleccionada: any = "Todos";
  sucursalSeleccionada: any = "Todas";
  pdvSeleccionado: any = "Todos";
  estadoSeleccionado: any = "Todos";
  origenSeleccionado: any = "Todos";
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
  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };
  // ----------------------------------------------------------

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
    public dialog: MatDialog,
    public EmpresaService: EmpresaService,
    private notificationService: NotificationService,
    private socket: Socket,
    private LsitasDesp: ListasDesplegablesService,
    private _route: ActivatedRoute,
    private cufdService: CufdService,
    private pdvService: PdvService,
    private SucursalService: SucursalService,
    private spinner: NgxSpinnerService,
    private cuisService: CuisService,
    private catalogoService: SincronizarService
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.role = this.UsuarioActual.role;
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));

    /* this.socket.on("Factura View Entrante", (row_obj) => {
      if (this.play == 1) {
        this.FacturasService.sife_facturaElectronica_view_get(
          this.FechaSeleccionada,
          this.estadoSeleccionado,
          this.tipofacturaSeleccionada,
          this.sucursalSeleccionada,
          this.pdvSeleccionado,
          this.origenSeleccionado
        ).subscribe((data) => {
          this.dataRegistros = data;
        });
      }
    }); */

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

    this.estadoActual = this._route.snapshot.paramMap.get("estado");
    this.SucursalService.sife_sucursal_get(this.empresaSeleccionada).then(
      (data) => {
        this.Sucursales = data;
      }
    );
    this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
      this.PDVs = data;
    });

    this.FacturasService.sife_facturaElectronica_view_get(
      this.empresaSeleccionada,
      this.FechaSeleccionada,
      this.estadoSeleccionado,
      this.tipofacturaSeleccionada,
      this.sucursalSeleccionada,
      this.pdvSeleccionado,
      this.origenSeleccionado
    ).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.CargarFacturasCount();
    });
  }

  Detalle(action, obj) {
    obj = {
      ...obj,
      DocumentoFiscal: this.documentosFiscales[obj.codigoDocumentoFiscal],
      DocumentoSector: this.documentosSector[obj.codigoDocumentoSector],
      sucursal: this.sucursalesIndex[obj["codigoSucursal"]],
      empresa: obj.cuis,
      estado: obj.estado,
    };
    const dialogRef = this.dialog.open(FacturasFormComponent, {
      data: { obj: obj, action: action },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result.data.respuesta);
      // if(result.event == 'Crear'){
      //   this.addRowData(result.data.respuesta);
      // }
    });
  }
  // Abrir Modal Anulacion
  AnulacionFactura(factura) {
    if(this.UsuarioActual.role == 'Sistemas' || this.UsuarioActual.role == 'Administrador'){
      const dialogRef = this.dialog.open(FacturaAnulacionComponent, {
        width: "50%",
        data: factura,
      });
      dialogRef.afterClosed().subscribe((datosfactura) => {
        this.FacturasService.sife_facturaElectronica_view_get(
          this.empresaSeleccionada,
          this.FechaSeleccionada,
          this.estadoSeleccionado,
          this.tipofacturaSeleccionada,
          this.sucursalSeleccionada,
          this.pdvSeleccionado,
          this.origenSeleccionado
        ).subscribe((data) => {
          this.dataSource.data = data;
          this.CargarFacturasCount();
        });
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
      this.FacturasService.sife_facturaElectronica_view_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      ).subscribe((data) => {
        this.dataSource.data = data;
        this.CargarFacturasCount();
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
      this.FacturasService.sife_facturaElectronica_view_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      ).subscribe((data) => {
        this.dataSource.data = data;
        this.CargarFacturasCount();
      });
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
  ngOnInit() {
    // console.log(this._route.snapshot.paramMap.get('estado'));

    if (this._route.snapshot.paramMap.get("estado") != "*") {
      this.estadoActual = this._route.snapshot.paramMap.get("estado");
    } else {
      this.estadoActual = "*";
    }
    this.LsitasDesp.getLista("estadosFactura").then((dt) => {
      this.estadosF = dt[0]["valores"];
      var dat = new Array();
      dt[0]["valores"].forEach((element) => {
        dat[element.id] = element.valor;
      });
      this.estados = dat;

      this.buscarFacturas(this.estadoActual);
      this.spinner.hide();
    });
    this.cargarOrigenFactura();
  }
  /*  getAllFacturas() {
    // this.spinner.show();
    this.service.getAllFacturas().subscribe((data) => {
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
      });
    });
  } */
  //Metodas de filtrado
  /* applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } */

  // Metodass de actualización insercion y eliminación de registros

  FiltroBuscar(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buscarFacturas(estado) {
    this.isLoading = true;
    this.spinner.show();
    if (estado != undefined) {
      if (estado != "todas" && estado != "" && estado != "*") {
        var consultaFacturas =
          '?filter={"where":{"estado":"' + this.estadoActual + '"}}';
        this.FacturasService.getAllFacturasFiltro(consultaFacturas).subscribe(
          (dato) => {
            this.dataSource = new MatTableDataSource(dato);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.isLoading = false;
            this.spinner.hide();
          }
        );
      } else {
        this.FacturasService.getAllFacturas().subscribe((data) => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
          this.spinner.hide();
        });
      }
    }
  }
  // ******************************************
  anteriorData() {
    if (this.salto - this.limit >= 0) {
      this.salto = this.salto - this.limit;
      this.FacturasService.sife_facturaElectronica_view_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      ).subscribe((data) => {
        this.dataRegistros = data;
      });
    }
  }
  siguienteData() {
    if (this.salto + this.limit < this.totalRegistros) {
      this.salto = this.salto + this.limit;
      this.FacturasService.sife_facturaElectronica_view_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      ).subscribe((data) => {
        this.dataRegistros = data;
      });
    }
  }
  actualizaRango(limit) {
    this.salto = 0;
    this.limit = limit;
    this.FacturasService.sife_facturaElectronica_view_get(
      this.empresaSeleccionada,
      this.FechaSeleccionada,
      this.estadoSeleccionado,
      this.tipofacturaSeleccionada,
      this.sucursalSeleccionada,
      this.pdvSeleccionado,
      this.origenSeleccionado
    ).subscribe((data) => {
      this.dataRegistros = data;
    });
  }

  SeleccionarSucursal(sucursal) {
    this.isLoading = true;
    this.loading1 = true;
    this.sucursalSeleccionada = sucursal;
    if (sucursal == "Todas") {
      this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
        this.PDVs = data;
        this.FacturasService.sife_facturaElectronica_view_get(
          this.empresaSeleccionada,
          this.FechaSeleccionada,
          this.estadoSeleccionado,
          this.tipofacturaSeleccionada,
          this.sucursalSeleccionada,
          this.pdvSeleccionado,
          this.origenSeleccionado
        ).subscribe((data) => {
          this.dataSource.data = data;
          this.CargarFacturasCount();
          this.loading1 = false;
          this.isLoading = false;
        });
      });
    } else {
      this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
        this.PDVs = data.filter((item) => item.codigoSucursal == sucursal);
        this.FacturasService.sife_facturaElectronica_view_get(
          this.empresaSeleccionada,
          this.FechaSeleccionada,
          this.estadoSeleccionado,
          this.tipofacturaSeleccionada,
          this.sucursalSeleccionada,
          this.pdvSeleccionado,
          this.origenSeleccionado
        ).subscribe((data) => {
          this.dataSource.data = data;
          this.CargarFacturasCount();
          this.loading1 = false;
          this.isLoading = false;
        });
      });
    }
  }

  SeleccionarPDV(pdv) {
    this.isLoading = true;
    this.loading1 = true;
    this.pdvSeleccionado = pdv;
    if (pdv == "Todos") {
      this.FacturasService.sife_facturaElectronica_view_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      ).subscribe((data) => {
        this.dataSource.data = data;
        this.CargarFacturasCount();
        this.loading1 = false;
        this.isLoading = false;
      });
    } else {
      this.FacturasService.sife_facturaElectronica_view_get(
        this.empresaSeleccionada,
        this.FechaSeleccionada,
        this.estadoSeleccionado,
        this.tipofacturaSeleccionada,
        this.sucursalSeleccionada,
        this.pdvSeleccionado,
        this.origenSeleccionado
      ).subscribe((data) => {
        this.dataSource.data = data;
        this.CargarFacturasCount();
        this.loading1 = false;
        this.isLoading = false;
      });
    }
  }

  SeleccionarTipoFactura(TipoFactura) {
    this.isLoading = true;
    this.loading1 = true;
    this.tipofacturaSeleccionada = TipoFactura;
    this.FacturasService.sife_facturaElectronica_view_get(
      this.empresaSeleccionada,
      this.FechaSeleccionada,
      this.estadoSeleccionado,
      this.tipofacturaSeleccionada,
      this.sucursalSeleccionada,
      this.pdvSeleccionado,
      this.origenSeleccionado
    ).subscribe((data) => {
      this.dataSource.data = data;
      this.CargarFacturasCount();
      this.loading1 = false;
      this.isLoading = false;
    });
  }

  SeleccionarFecha(event) {
    this.isLoading = true;
    this.loading1 = true;
    this.FechaSeleccionada = event.value;
    this.FacturasService.sife_facturaElectronica_view_get(
      this.empresaSeleccionada,
      this.FechaSeleccionada,
      this.estadoSeleccionado,
      this.tipofacturaSeleccionada,
      this.sucursalSeleccionada,
      this.pdvSeleccionado,
      this.origenSeleccionado
    ).subscribe((data) => {
      this.dataSource.data = data;
      this.CargarFacturasCount();
      this.loading1 = false;
      this.isLoading = false;
    });
  }

  SeleccionarEstado(estado) {
    this.isLoading = true;
    this.loading1 = true;
    this.estadoSeleccionado = estado;
    this.FacturasService.sife_facturaElectronica_view_get(
      this.empresaSeleccionada,
      this.FechaSeleccionada,
      this.estadoSeleccionado,
      this.tipofacturaSeleccionada,
      this.sucursalSeleccionada,
      this.pdvSeleccionado,
      this.origenSeleccionado
    ).subscribe((data) => {
      this.dataSource.data = data;
      this.CargarFacturasCount();
      this.loading1 = false;
      this.isLoading = false;
    });
  }

  SeleccionarOrigen(origen) {
    this.isLoading = true;
    this.loading1 = true;
    this.origenSeleccionado = origen;
    this.FacturasService.sife_facturaElectronica_view_get(
      this.empresaSeleccionada,
      this.FechaSeleccionada,
      this.estadoSeleccionado,
      this.tipofacturaSeleccionada,
      this.sucursalSeleccionada,
      this.pdvSeleccionado,
      this.origenSeleccionado
    ).subscribe((data) => {
      this.dataSource.data = data;
      this.CargarFacturasCount();
      this.loading1 = false;
      this.isLoading = false;
    });
  }

  CargarFacturasCount() {
    this.FacturasService.sife_facturaElectronica_view_get_count(
      this.FechaSeleccionada,
      this.estadoSeleccionado,
      this.tipofacturaSeleccionada,
      this.sucursalSeleccionada,
      this.pdvSeleccionado,
      this.salto,
      this.limit
    ).subscribe((data) => {
      this.totalRegistros = data["count"];
    });
  }

  Refresh() {
    this.isLoading = true;
    this.FacturasService.sife_facturaElectronica_view_get(
      this.empresaSeleccionada,
      this.FechaSeleccionada,
      this.estadoSeleccionado,
      this.tipofacturaSeleccionada,
      this.sucursalSeleccionada,
      this.pdvSeleccionado,
      this.origenSeleccionado
    ).subscribe((data) => {
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  Recargar() {
    this.isLoading = true;
    this.loading = true;
    this.FacturasService.sife_facturaElectronica_view_get(
      this.empresaSeleccionada,
      this.FechaSeleccionada,
      this.estadoSeleccionado,
      this.tipofacturaSeleccionada,
      this.sucursalSeleccionada,
      this.pdvSeleccionado,
      this.origenSeleccionado
    ).subscribe((data) => {
      this.dataSource.data = data;
      this.isLoading = false;
      this.loading = false;
      /* this.spinner.hide() */
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
  Consultar(facturaData) {
    var respuesta;
    this.FacturasService.sife_factura_mule_consultar(facturaData).then(
      (data) => {
        respuesta = data;
        this.transaccion = respuesta.Respuesta.transaccion;
        this.descripcion = respuesta.Respuesta.descripcion;
        /* this.notificationService.success(respuesta.Respuesta.descripcion);
        console.log(respuesta.Respuesta.transaccion); */
      }
    );
  }
  BuscarFactura(IdProducto) {
    this.IdProducto = IdProducto;
    this.FacturasService.sife_facturaElectronica_view_get_one(IdProducto).then(
      (data) => {
        this.dataSource1 = new MatTableDataSource(data);
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
      }
    );
  }
}
