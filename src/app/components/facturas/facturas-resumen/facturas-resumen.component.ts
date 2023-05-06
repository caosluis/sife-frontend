import { CufdService } from "./../../../services/cufd.service";
import { FacturasService } from "./../../../services/facturas.service";
import { ListasDesplegablesService } from "./../../../services/listas-desplegables.service";
import { Component, OnInit, ViewChild } from "@angular/core";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
// Import spinner
import { NgxSpinnerService } from "ngx-spinner";
import { PdvService } from "src/app/services/pdv.service";
import { SucursalService } from "src/app/services/sucursal.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import * as moment from "moment";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { CuisService } from "src/app/services/cuis.service";

@Component({
  selector: "app-facturas-resumen",
  templateUrl: "./facturas-resumen.component.html",
  styleUrls: ["./facturas-resumen.component.css","./../../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class FacturasResumenComponent implements OnInit {
  UsuarioActual: any;
  empresaSeleccionada: any;
  panelFacturas: any[];
  estados: any[];
  tipoPDV: any[];
  listaCufd: any;
  cuisList: any;
  pdvList: any;
  sucursalList: any;
  facturas: any;
  kibanaURL: SafeResourceUrl;
  kibanaDate: any;

  displayedColumns: string[] = [
    "Sucursal",
    "Punto de Venta",
    "Recepcionado por SIFE",
    "Enviado a SIN",
    "Factura Exitosa",
    "Factura rechazada",
    "Anulación Confirmada",

    "Factura offline",
    "Evento asignado",
    "Empaquetado",

    //"Evento rechazado",
    "Problema interno SIFE",
    "ErrorConexion con SIN",
  ];
  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private ListDesp: ListasDesplegablesService,
    private serviceFacturas: FacturasService,
    private pdvService: PdvService,
    private sucursalService: SucursalService,
    private CuisService: CuisService,
    private socket: Socket,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));

    this.socket.on("Factura_Entrante", (data) => {
      this.serviceFacturas
        .sife_factura_panel(this.FechaSeleccionada)
        .then((data) => {
          this.panelFacturas = data.Respuesta;
        });
    });
  }
  async ngOnInit() {
    /* this.kibanaURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      "http://docker-qas.hansa.com.bo:41/app/kibana#/dashboard/33360a50-dd94-11eb-9f81-cd97a988a105?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:now-4d%2Fd,to:now-4d%2Fd))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:9,i:c6c44953-8158-4472-b5c3-b6cde290c9e9,w:23,x:0,y:0),id:'831981b0-dd93-11eb-9f81-cd97a988a105',panelIndex:c6c44953-8158-4472-b5c3-b6cde290c9e9,type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:9,i:'233a2d3d-3518-4a9a-a15a-48f5f412c75f',w:10,x:23,y:0),id:d2fb07d0-dd93-11eb-9f81-cd97a988a105,panelIndex:'233a2d3d-3518-4a9a-a15a-48f5f412c75f',type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:9,i:d29f7004-bc39-4537-9739-2852955a022b,w:15,x:33,y:0),id:'734397c0-dd94-11eb-9f81-cd97a988a105',panelIndex:d29f7004-bc39-4537-9739-2852955a022b,type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:8,i:'862b295e-13b7-4ab5-b0a5-61c48d0c9d41',w:23,x:0,y:9),id:'40989000-dda3-11eb-9f81-cd97a988a105',panelIndex:'862b295e-13b7-4ab5-b0a5-61c48d0c9d41',type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:8,i:d450774d-3449-4f48-89b8-b6f3b6664c36,w:10,x:23,y:9),id:d5258b20-dda2-11eb-9f81-cd97a988a105,panelIndex:d450774d-3449-4f48-89b8-b6f3b6664c36,type:visualization,version:'7.5.2'),(embeddableConfig:(params:(sort:(columnIndex:4,direction:asc)),vis:(params:(sort:(columnIndex:4,direction:desc)))),gridData:(h:9,i:d6a53dd9-2213-41bb-b85d-939559a36915,w:33,x:0,y:17),id:'0b9d7200-dd97-11eb-9f81-cd97a988a105',panelIndex:d6a53dd9-2213-41bb-b85d-939559a36915,type:visualization,version:'7.5.2')),query:(language:kuery,query:''),timeRestore:!f,title:d_facturas,viewMode:view)"
    ); */
    this.kibanaURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      "http://docker-qas.hansa.com.bo:5601/s/hbm-integraciones-facturacion/app/kibana#/discover/f24d3460-00fb-11ec-a85d-87b825441440?_g=(refreshInterval:(pause:!t,value:0),time:(from:'2021-08-17T04:00:00.000Z',to:'2021-08-18T04:00:00.000Z'))&_a=(columns:!(_source),filters:!(),index:dc794be0-e97e-11eb-a85d-87b825441440,interval:auto,query:(language:kuery,query:''),sort:!(!(timestamp,desc)))"
    );

    await this.ListDesp.getLista("estadosFactura").then((dt) => {
      this.estados = dt[0]["valores"];
      this.estados.sort((a, b) => a.id - b.id);
    });

    await this.sucursalService
      .sife_sucursal_get(this.empresaSeleccionada)
      .then((data) => {
        this.sucursalList = data;
      });

    await this.pdvService
      .sife_pdv_get(this.empresaSeleccionada)
      .then((data) => {
        this.pdvList = data;
      });

    await this.CuisService.sife_cuis_get_activos(this.empresaSeleccionada).then(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

    await this.serviceFacturas
      .sife_factura_panel(this.FechaSeleccionada)
      .then((data) => {
        this.panelFacturas = data.Respuesta;
      });
  }

  FiltroBuscar(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  SeleccionarFecha(event) {
    this.FechaSeleccionada = event.value;
    this.kibanaDate = moment(this.FechaActual).diff(
      moment(this.FechaSeleccionada),
      "days"
    );
    this.route.params.subscribe((params) => {
      this.kibanaURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        "http://docker-qas.hansa.com.bo:41/app/kibana#/dashboard/33360a50-dd94-11eb-9f81-cd97a988a105?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:now-" +
        this.kibanaDate +
        "d%2Fd,to:now-" +
        this.kibanaDate +
        "d%2Fd))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:9,i:c6c44953-8158-4472-b5c3-b6cde290c9e9,w:23,x:0,y:0),id:'831981b0-dd93-11eb-9f81-cd97a988a105',panelIndex:c6c44953-8158-4472-b5c3-b6cde290c9e9,type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:9,i:'233a2d3d-3518-4a9a-a15a-48f5f412c75f',w:10,x:23,y:0),id:d2fb07d0-dd93-11eb-9f81-cd97a988a105,panelIndex:'233a2d3d-3518-4a9a-a15a-48f5f412c75f',type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:9,i:d29f7004-bc39-4537-9739-2852955a022b,w:15,x:33,y:0),id:'734397c0-dd94-11eb-9f81-cd97a988a105',panelIndex:d29f7004-bc39-4537-9739-2852955a022b,type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:8,i:'862b295e-13b7-4ab5-b0a5-61c48d0c9d41',w:23,x:0,y:9),id:'40989000-dda3-11eb-9f81-cd97a988a105',panelIndex:'862b295e-13b7-4ab5-b0a5-61c48d0c9d41',type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:8,i:d450774d-3449-4f48-89b8-b6f3b6664c36,w:10,x:23,y:9),id:d5258b20-dda2-11eb-9f81-cd97a988a105,panelIndex:d450774d-3449-4f48-89b8-b6f3b6664c36,type:visualization,version:'7.5.2'),(embeddableConfig:(params:(sort:(columnIndex:4,direction:asc)),vis:(params:(sort:(columnIndex:4,direction:desc)))),gridData:(h:9,i:d6a53dd9-2213-41bb-b85d-939559a36915,w:33,x:0,y:17),id:'0b9d7200-dd97-11eb-9f81-cd97a988a105',panelIndex:d6a53dd9-2213-41bb-b85d-939559a36915,type:visualization,version:'7.5.2')),query:(language:kuery,query:''),timeRestore:!f,title:d_facturas,viewMode:view)"
      );
    });

    this.serviceFacturas
      .sife_factura_panel(this.FechaSeleccionada)
      .then((data) => {
        this.panelFacturas = data.Respuesta;
      });
  }
  /* {cuis: "54D61541", estado: 91} */
  EstadoCantidadFacturas(estado, cuis) {
    if (this.panelFacturas != undefined) {
      var facturas;
      for (let element of this.panelFacturas) {
        if (
          element._id.estado == estado &&
          element._id.cuis == cuis
        ) {
          facturas = element.count;
        }
      }
      if (facturas != undefined) {
        return facturas;
      } else {
        return 0;
      }
    }
  }

  Sucursal(sucursal) {
    if (this.sucursalList != undefined) {
      for (let element of this.sucursalList) {
        if (element.codigoSucursal == sucursal) {
          return element.descripcion;
        }
      }
    }
  }
  PDVnombre(pdv) {
    if (this.pdvList != undefined) {
      for (let element of this.pdvList) {
        if (element.codigoPDV == pdv) {
          return element.nombrePuntoVenta;
        }
      }
    }
  }
  PDVtipo(pdv) {
    if (this.pdvList != undefined) {
      for (let element of this.pdvList) {
        if (element.codigoPDV == pdv) {
          return element.valorTipoPuntoVenta;
        }
      }
    }
  }
}
