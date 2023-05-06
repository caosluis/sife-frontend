import { SolAnulacionComponent } from "./../sol-anulacion/sol-anulacion.component";
import { SincronizarService } from "src/app/services/sincronizar.service";
import { PlantillasDocService } from "./../../../services/plantillas-doc.service";
import { Component, OnInit, Inject, Optional } from "@angular/core";
import { NotificationService } from "../../../services/notification.service";
import { FacturasService } from "../../../services/facturas.service";
import { ListasDesplegablesService } from "./../../../services/listas-desplegables.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { SucursalService } from "src/app/services/sucursal.service";
import { PdvService } from "src/app/services/pdv.service";
import { EmpresaService } from "src/app/services/empresa.service";
import { TipoMonedaService } from "src/app/services/tipo-moneda.service";
import { MatAccordion } from "@angular/material/expansion";
import { ViewChild } from "@angular/core";
import beautify from "xml-beautifier";

import * as converter from "numero-a-letras";
import { QrdireccionService } from '../../../services/qrdireccion.service';

@Component({
  selector: "app-facturas-form",
  templateUrl: "./facturas-form.component.html",
  styleUrls: ["./facturas-form.component.css"],
})
export class FacturasFormComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  UsuarioActual: any;
  empresaSeleccionada: any;
  nombreRazonSocial: any;
  razonSocialEmisor: any;
  numeroDocumento: any;
  incoterm: any;
  codigoMoneda: any;
  direccionComprador: any;
  puertoDestino: any;
  tipoCambio: any;
  leyenda: any;
  MontoTotal: any;
  MontoTotalOriginal: any;
  MontoTotalLiteral: any;
  MontoTotalOriginalLiteral: any;
  TipoMonedaList: any;
  telefono :any;
  lugarDestino: any;
  costosGastosNacionales: any;
  totalGastosNacionalesFob: any;
  costosGastosInternacionales: any;
  totalGastosInternacionales: any;
  objInformacionAdicional: any;
  numeroDescripcionPaquetesBultos: any;
  informacionAdicional: any;
  codigoCliente: any;

  xmlFacturaFirmada: any;

  action: string;
  local_data: any;
  obj: any;
  xml: any;
  json: any;
  valuesCabecera: any;
  valuesDetalle: any;
  cabecera: any;
  detalle: any;
  codigoDocumentoSector: any;
  plantillaC: any[] = [];
  plantillaC_vista: any[] = [];
  plantillaD: any[] = [];
  plantillaD_vista: any[] = [];
  plantillaP: any[] = [];
  plantillaP_vista: any[] = [];
  actividadEco: any;
  url: any;
  qrcodename: string;
  title = "generate-qrcode";
  elementType: "url" | "canvas" | "img" = "url";
  value: string;
  display = false;
  href: string;
  mensajes: any;
  estados: any[] = [];
  formato: any;
  Empresas: any = [];
  Sucursales: any = [];
  PDVs: any = [];
  SIN_URL: any

  constructor(
    public facturaService: FacturasService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FacturasFormComponent>,
    private plantillasService: PlantillasDocService,
    private DocSectService: SincronizarService,
    private LsitasDesp: ListasDesplegablesService,
    public dialog: MatDialog,
    public sucursalService: SucursalService,
    public pdvService: PdvService,
    public empresaService: EmpresaService,
    public TipoMonedaService: TipoMonedaService,
    private QrdireccionService: QrdireccionService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    JSON.parse(localStorage.getItem("empresa"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.local_data = { ...data };
    this.action = this.local_data["action"];
    this.obj = this.local_data["obj"];
    this.QrdireccionService.sife_qr_direccions_get().then(data => {
      this.SIN_URL = data.qr_direccion
    })
  }

  async ngOnInit() {
    /* FACTURA PREVALORADA */
    if (this.data.obj.DocumentoSector == "FACTURA COMPRA-VENTA") {
      await this.facturaService
        .getFacturaFirma(this.obj["cuf"])
        .then((data) => {
          this.xmlFacturaFirmada = atob(data["xmlFacturaFirmada"]);
          this.obj = { ...this.obj, jsonFactura: data["jsonFactura"] };
          // console.log(this.obj);
          /* if(this.obj != null){this.facturaService.populateForm(this.obj);} */
          this.json = this.obj["jsonFactura"];

          this.valuesCabecera = Object.keys(
            this.obj.jsonFactura.facturaElectronicaCompraVenta.cabecera
          );
          this.cabecera =
            this.obj.jsonFactura.facturaElectronicaCompraVenta.cabecera;
          this.nombreRazonSocial = this.cabecera.nombreRazonSocial;
          this.razonSocialEmisor = this.cabecera.razonSocialEmisor;
          this.numeroDocumento = this.cabecera.numeroDocumento;
          this.codigoMoneda = this.cabecera.codigoMoneda;
          this.leyenda = this.cabecera.leyenda;
          this.MontoTotal = this.cabecera.montoTotal;

          /* this.nombreRazonSocial =  */
          this.valuesDetalle = Object.keys(
            this.obj.jsonFactura.facturaElectronicaCompraVenta.detalle[0]
          );
          this.detalle =
            this.obj.jsonFactura.facturaElectronicaCompraVenta.detalle;

          // Añadimos la desripcion de tipo de actividad economica
          this.DocSectService.getDocumentoSector(
            "Actividades",
            this.obj.jsonFactura.facturaElectronicaCompraVenta.detalle[0]
              .actividadEconomica
          ).subscribe(
            (data) => {
              if (data[0] != undefined) {
                this.actividadEco = data[0]["descripcion"];
                this.cabecera.actividadEconomica = data[0]["descripcion"];
              } else {
                this.actividadEco = "";
                this.cabecera.actividadEconomica = "";
              }
            },
            (error) => {
              console.log(error);
            }
          );
          //Codigo documento sector
          this.codigoDocumentoSector =
            this.obj.jsonFactura.facturaElectronicaCompraVenta.cabecera.codigoDocumentoSector;
          this.plantillasService
            .getPlantillaDoc(this.codigoDocumentoSector)
            .then(
              (data) => {
                if (data[0] != undefined) {
                  // Asignacion de datos detallados segun plantilla
                  this.url = data[0].url_qr;

                  this.value = this.SIN_URL +
                    this.url.substring(0, 7) +
                    this.obj.jsonFactura.facturaElectronicaCompraVenta.cabecera[
                    "nitEmisor"
                    ] +
                    this.url.substring(7, 12) +
                    this.obj.jsonFactura.facturaElectronicaCompraVenta.cabecera[
                    "cuf"
                    ] +
                    this.url.substring(12, 20) +
                    this.obj.jsonFactura.facturaElectronicaCompraVenta.cabecera[
                    "numeroFactura"
                    ];

                  //Generando los datos de cabecera
                  this.plantillaC = data[0].plantilla.cabecera;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);
                  dt = this.plantillaC;
                  dt.filter((valueCabeceraP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valueCabeceraP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valueCabeceraP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaC_vista[valueCabeceraP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  // Genedando los datos de detalle
                  this.plantillaD = data[0].plantilla.detalle;
                  var keysDetalle = Object.keys(this.detalle[0]);
                  dt = this.plantillaD;
                  dt.filter((valueDetalleP) => {
                    keysDetalle.forEach((item) => {
                      if (valueDetalleP.clave == item) {
                        var d = {
                          label: valueDetalleP.label,
                          key: valueDetalleP.clave,
                        };
                        this.plantillaD_vista[valueDetalleP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  //Generando los datos de pie de documento
                  this.plantillaP = data[0].plantilla.pie;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);
                  dt = this.plantillaP;
                  dt.filter((valuePieP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valuePieP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valuePieP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaP_vista[valuePieP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                } else {
                  this.notificationService.warn(
                    "No existen plantillas disponibles para este documento"
                  );
                }
              },
              (error) => {
                this.notificationService.warn("Error de conexión");
              }
            );
          //Cargamos los datos de estado y mensaje de Factura
          this.facturaService
            .getEstadosFactura(this.obj["cuf"])
            .then((data) => {
              data.sort(
                (a, b) =>
                  new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
              );
              this.mensajes = data;
              this.LsitasDesp.getLista("estadosFactura").then((dt) => {
                var dat = new Array();
                dt[0]["valores"].forEach((element) => {
                  dat[element.id] = element.valor;
                });
                this.estados = dat;
              });
            });
          this.display = true;
        });
    } else if (
      this.data.obj.DocumentoSector == "FACTURA DE ALQUILER DE BIENES INMUEBLES"
    ) {
      await this.facturaService
        .getFacturaFirma(this.obj["cuf"])
        .then((data) => {
          this.xmlFacturaFirmada = atob(data["xmlFacturaFirmada"]);
          this.obj = { ...this.obj, jsonFactura: data["jsonFactura"] };
          // console.log(this.obj);
          /* if(this.obj != null){this.facturaService.populateForm(this.obj);} */
          this.json = this.obj["jsonFactura"];
          this.valuesCabecera = Object.keys(
            this.obj.jsonFactura.facturaElectronicaAlquilerBienInmueble.cabecera
          );
          this.cabecera =
            this.obj.jsonFactura.facturaElectronicaAlquilerBienInmueble.cabecera;
          this.nombreRazonSocial = this.cabecera.nombreRazonSocial;
          this.razonSocialEmisor = this.cabecera.razonSocialEmisor;
          this.numeroDocumento = this.cabecera.numeroDocumento;
          this.codigoMoneda = this.cabecera.codigoMoneda;
          this.leyenda = this.cabecera.leyenda;
          this.MontoTotal = this.cabecera.montoTotal;
          this.valuesDetalle = Object.keys(
            this.obj.jsonFactura.facturaElectronicaAlquilerBienInmueble
              .detalle[0]
          );
          this.detalle =
            this.obj.jsonFactura.facturaElectronicaAlquilerBienInmueble.detalle;
          // Añadimos la desripcion de tipo de actividad economica
          this.DocSectService.getDocumentoSector(
            "Actividades",
            this.obj.jsonFactura.facturaElectronicaAlquilerBienInmueble
              .detalle[0].actividadEconomica
          ).subscribe(
            (data) => {
              if (data[0] != undefined) {
                this.actividadEco = data[0]["descripcion"];
                this.cabecera.actividadEconomica = data[0]["descripcion"];
              } else {
                this.actividadEco = "";
                this.cabecera.actividadEconomica = "";
              }
            },
            (error) => {
              console.log(error);
            }
          );
          //Codigo documento sector
          this.codigoDocumentoSector =
            this.obj.jsonFactura.facturaElectronicaAlquilerBienInmueble.cabecera.codigoDocumentoSector;
          this.plantillasService
            .getPlantillaDoc(this.codigoDocumentoSector)
            .then(
              (data) => {
                if (data[0] != undefined) {
                  // Asignacion de datos detallados segun plantilla
                  this.url = data[0].url_qr;
                  this.value = this.SIN_URL +
                    this.url.substring(0, 7) +
                    this.obj.jsonFactura.facturaElectronicaAlquilerBienInmueble
                      .cabecera["nitEmisor"] +
                    this.url.substring(7, 12) +
                    this.obj.jsonFactura.facturaElectronicaAlquilerBienInmueble
                      .cabecera["cuf"] +
                    this.url.substring(12, 20) +
                    this.obj.jsonFactura.facturaElectronicaAlquilerBienInmueble
                      .cabecera["numeroFactura"];
                  //Generando los datos de cabecera
                  this.plantillaC = data[0].plantilla.cabecera;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);
                  dt = this.plantillaC;
                  dt.filter((valueCabeceraP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valueCabeceraP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valueCabeceraP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaC_vista[valueCabeceraP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  // Genedando los datos de detalle
                  this.plantillaD = data[0].plantilla.detalle;
                  var keysDetalle = Object.keys(this.detalle[0]);
                  dt = this.plantillaD;
                  dt.filter((valueDetalleP) => {
                    keysDetalle.forEach((item) => {
                      if (valueDetalleP.clave == item) {
                        var d = {
                          label: valueDetalleP.label,
                          key: valueDetalleP.clave,
                        };
                        this.plantillaD_vista[valueDetalleP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  //Generando los datos de pie de documento
                  this.plantillaP = data[0].plantilla.pie;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);
                  dt = this.plantillaP;
                  dt.filter((valuePieP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valuePieP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valuePieP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaP_vista[valuePieP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                } else {
                  this.notificationService.warn(
                    "No existen plantillas disponibles para este documento"
                  );
                }
              },
              (error) => {
                this.notificationService.warn("Error de conexión");
              }
            );
          //Cargamos los datos de estado y mensaje de Factura
          this.facturaService
            .getEstadosFactura(this.obj["cuf"])
            .then((data) => {
              data.sort(
                (a, b) =>
                  new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
              );
              this.mensajes = data;
              this.LsitasDesp.getLista("estadosFactura").then((dt) => {
                var dat = new Array();
                dt[0]["valores"].forEach((element) => {
                  dat[element.id] = element.valor;
                });
                this.estados = dat;
              });
            });
          this.display = true;
        });
    } else if (
      this.data.obj.DocumentoSector == "FACTURA COMERCIAL DE EXPORTACIÓN"
    ) {
      await this.facturaService
        .getFacturaFirma(this.obj["cuf"])
        .then((data) => {
          this.xmlFacturaFirmada = atob(data["xmlFacturaFirmada"]);
          this.obj = { ...this.obj, jsonFactura: data["jsonFactura"] };
          // console.log(this.obj);
          /* if(this.obj != null){this.facturaService.populateForm(this.obj);} */
          this.json = this.obj["jsonFactura"];

          this.valuesCabecera = Object.keys(
            this.obj.jsonFactura.facturaElectronicaComercialExportacion.cabecera
          );
          this.cabecera =
            this.obj.jsonFactura.facturaElectronicaComercialExportacion.cabecera;
          this.nombreRazonSocial = this.cabecera.nombreRazonSocial;
          this.razonSocialEmisor = this.cabecera.razonSocialEmisor;
          this.numeroDocumento = this.cabecera.numeroDocumento;
          this.incoterm = this.cabecera.incoterm;
          this.codigoMoneda = this.cabecera.codigoMoneda;
          this.direccionComprador = this.cabecera.direccionComprador;
          this.puertoDestino = this.cabecera.puertoDestino;
          this.tipoCambio = this.cabecera.tipoCambio;
          this.costosGastosNacionales = this.cabecera.costosGastosNacionales;

          this.totalGastosNacionalesFob =
            this.cabecera.totalGastosNacionalesFob;
          this.costosGastosInternacionales =
            this.cabecera.costosGastosInternacionales;
          this.totalGastosInternacionales =
            this.cabecera.totalGastosInternacionales;
          this.numeroDescripcionPaquetesBultos =
            this.cabecera.numeroDescripcionPaquetesBultos;
          this.informacionAdicional = this.cabecera.informacionAdicional;
          this.leyenda = this.cabecera.leyenda;
          this.MontoTotal = this.cabecera.montoTotal;

          this.valuesDetalle = Object.keys(
            this.obj.jsonFactura.facturaElectronicaComercialExportacion
              .detalle[0]
          );
          this.detalle =
            this.obj.jsonFactura.facturaElectronicaComercialExportacion.detalle;
          // Añadimos la desripcion de tipo de actividad economica

          this.DocSectService.getDocumentoSector(
            "Actividades",
            this.obj.jsonFactura.facturaElectronicaComercialExportacion
              .detalle[0].actividadEconomica
          ).subscribe(
            (data) => {
              if (data[0] != undefined) {
                this.actividadEco = data[0]["descripcion"];
                this.cabecera.actividadEconomica = data[0]["descripcion"];
              } else {
                this.actividadEco = "";
                this.cabecera.actividadEconomica = "";
              }
            },
            (error) => {
              console.log(error);
            }
          );
          //Codigo documento sector
          this.codigoDocumentoSector =
            this.obj.jsonFactura.facturaElectronicaComercialExportacion.cabecera.codigoDocumentoSector;
          this.plantillasService
            .getPlantillaDoc(this.codigoDocumentoSector)
            .then(
              (data) => {
                if (data[0] != undefined) {
                  // Asignacion de datos detallados segun plantilla
                  this.url = data[0].url_qr;

                  this.value = this.SIN_URL +
                    this.url.substring(0, 7) +
                    this.obj.jsonFactura.facturaElectronicaComercialExportacion
                      .cabecera["nitEmisor"] +
                    this.url.substring(7, 12) +
                    this.obj.jsonFactura.facturaElectronicaComercialExportacion
                      .cabecera["cuf"] +
                    this.url.substring(12, 20) +
                    this.obj.jsonFactura.facturaElectronicaComercialExportacion
                      .cabecera["numeroFactura"];

                  //Generando los datos de cabecera
                  this.plantillaC = data[0].plantilla.cabecera;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);
                  dt = this.plantillaC;
                  dt.filter((valueCabeceraP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valueCabeceraP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valueCabeceraP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaC_vista[valueCabeceraP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  // Genedando los datos de detalle
                  this.plantillaD = data[0].plantilla.detalle;
                  var keysDetalle = Object.keys(this.detalle[0]);
                  dt = this.plantillaD;
                  dt.filter((valueDetalleP) => {
                    keysDetalle.forEach((item) => {
                      if (valueDetalleP.clave == item) {
                        var d = {
                          label: valueDetalleP.label,
                          key: valueDetalleP.clave,
                        };
                        this.plantillaD_vista[valueDetalleP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  //Generando los datos de pie de documento
                  this.plantillaP = data[0].plantilla.pie;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);

                  dt = this.plantillaP;
                  dt.filter((valuePieP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valuePieP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valuePieP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaP_vista[valuePieP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                } else {
                  this.notificationService.warn(
                    "No existen plantillas disponibles para este documento"
                  );
                }
              },
              (error) => {
                this.notificationService.warn("Error de conexión");
              }
            );
          //Cargamos los datos de estado y mensaje de Factura
          this.facturaService
            .getEstadosFactura(this.obj["cuf"])
            .then((data) => {
              data.sort(
                (a, b) =>
                  new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
              );
              this.mensajes = data;
              this.LsitasDesp.getLista("estadosFactura").then((dt) => {
                var dat = new Array();
                dt[0]["valores"].forEach((element) => {
                  dat[element.id] = element.valor;
                });
                this.estados = dat;
              });
            });
          this.display = true;
        });
    } else if (this.data.obj.DocumentoSector == "NOTA DE CRÉDITO-DÉBITO") {
      await this.facturaService
        .getFacturaFirma(this.obj["cuf"])
        .then((data) => {
          this.xmlFacturaFirmada = atob(data["xmlFacturaFirmada"]);
          this.obj = { ...this.obj, jsonFactura: data["jsonFactura"] };

          /* if(this.obj != null){this.facturaService.populateForm(this.obj);} */
          this.json = this.obj["jsonFactura"];

          this.valuesCabecera = Object.keys(
            this.obj.jsonFactura.notaFiscalElectronicaCreditoDebito.cabecera
          );
          this.cabecera =
            this.obj.jsonFactura.notaFiscalElectronicaCreditoDebito.cabecera;
          this.nombreRazonSocial = this.cabecera.nombreRazonSocial;
          this.razonSocialEmisor = this.cabecera.razonSocialEmisor;
          this.numeroDocumento = this.cabecera.numeroDocumento;
          this.codigoMoneda = this.cabecera.codigoMoneda;
          this.leyenda = this.cabecera.leyenda;
          this.MontoTotalOriginal = this.cabecera.montoTotalOriginal;

          this.valuesDetalle = Object.keys(
            this.obj.jsonFactura.notaFiscalElectronicaCreditoDebito.detalle[0]
          );
          this.detalle =
            this.obj.jsonFactura.notaFiscalElectronicaCreditoDebito.detalle;
          // Añadimos la desripcion de tipo de actividad economica

          this.DocSectService.getDocumentoSector(
            "Actividades",
            this.obj.jsonFactura.notaFiscalElectronicaCreditoDebito.detalle[0]
              .actividadEconomica
          ).subscribe(
            (data) => {
              if (data[0] != undefined) {
                this.actividadEco = data[0]["descripcion"];
                this.cabecera.actividadEconomica = data[0]["descripcion"];
              } else {
                this.actividadEco = "";
                this.cabecera.actividadEconomica = "";
              }
            },
            (error) => {
              console.log(error);
            }
          );
          //Codigo documento sector
          this.codigoDocumentoSector =
            this.obj.jsonFactura.notaFiscalElectronicaCreditoDebito.cabecera.codigoDocumentoSector;
          this.plantillasService
            .getPlantillaDoc(this.codigoDocumentoSector)
            .then(
              (data) => {
                if (data[0] != undefined) {
                  // Asignacion de datos detallados segun plantilla
                  this.url = data[0].url_qr;

                  this.value = this.SIN_URL +
                    this.url.substring(0, 7) +
                    this.obj.jsonFactura.notaFiscalElectronicaCreditoDebito
                      .cabecera["nitEmisor"] +
                    this.url.substring(7, 12) +
                    this.obj.jsonFactura.notaFiscalElectronicaCreditoDebito
                      .cabecera["cuf"] +
                    this.url.substring(12, 20) +
                    this.obj.jsonFactura.notaFiscalElectronicaCreditoDebito
                      .cabecera["numeroNotaCreditoDebito"];
                  //Generando los datos de cabecera
                  this.plantillaC = data[0].plantilla.cabecera;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);
                  dt = this.plantillaC;
                  dt.filter((valueCabeceraP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valueCabeceraP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valueCabeceraP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaC_vista[valueCabeceraP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  // Genedando los datos de detalle
                  this.plantillaD = data[0].plantilla.detalle;
                  var keysDetalle = Object.keys(this.detalle[0]);
                  dt = this.plantillaD;
                  dt.filter((valueDetalleP) => {
                    keysDetalle.forEach((item) => {
                      if (valueDetalleP.clave == item) {
                        var d = {
                          label: valueDetalleP.label,
                          key: valueDetalleP.clave,
                        };
                        this.plantillaD_vista[valueDetalleP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  //Generando los datos de pie de documento
                  this.plantillaP = data[0].plantilla.pie;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);

                  dt = this.plantillaP;
                  dt.filter((valuePieP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valuePieP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valuePieP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaP_vista[valuePieP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                } else {
                  this.notificationService.warn(
                    "No existen plantillas disponibles para este documento"
                  );
                }
              },
              (error) => {
                this.notificationService.warn("Error de conexión");
              }
            );
          //Cargamos los datos de estado y mensaje de Factura
          this.facturaService
            .getEstadosFactura(this.obj["cuf"])
            .then((data) => {
              data.sort(
                (a, b) =>
                  new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
              );
              this.mensajes = data;
              this.LsitasDesp.getLista("estadosFactura").then((dt) => {
                var dat = new Array();
                dt[0]["valores"].forEach((element) => {
                  dat[element.id] = element.valor;
                });
                this.estados = dat;
              });
            });
          this.display = true;
        });
    } else if (this.data.obj.DocumentoSector == "FACTURA PREVALORADA") {
      await this.facturaService
        .getFacturaFirma(this.obj["cuf"])
        .then((data) => {
          this.xmlFacturaFirmada = atob(data["xmlFacturaFirmada"]);
          this.obj = { ...this.obj, jsonFactura: data["jsonFactura"] };

          /* if(this.obj != null){this.facturaService.populateForm(this.obj);} */
          this.json = this.obj["jsonFactura"];

          this.valuesCabecera = Object.keys(
            this.obj.jsonFactura.facturaElectronicaPrevalorada.cabecera
          );
          this.cabecera =
            this.obj.jsonFactura.facturaElectronicaPrevalorada.cabecera;
          this.nombreRazonSocial = this.cabecera.nombreRazonSocial;
          this.razonSocialEmisor = this.cabecera.razonSocialEmisor;
          this.numeroDocumento = this.cabecera.numeroDocumento;
          this.codigoMoneda = this.cabecera.codigoMoneda;
          this.leyenda = this.cabecera.leyenda;
          this.MontoTotal = this.cabecera.montoTotal;
          this.valuesDetalle = Object.keys(
            this.obj.jsonFactura.facturaElectronicaPrevalorada.detalle[0]
          );
          this.detalle =
            this.obj.jsonFactura.facturaElectronicaPrevalorada.detalle;
          // Añadimos la desripcion de tipo de actividad economica

          this.DocSectService.getDocumentoSector(
            "Actividades",
            this.obj.jsonFactura.facturaElectronicaPrevalorada.detalle[0]
              .actividadEconomica
          ).subscribe(
            (data) => {
              if (data[0] != undefined) {
                this.actividadEco = data[0]["descripcion"];
                this.cabecera.actividadEconomica = data[0]["descripcion"];
              } else {
                this.actividadEco = "";
                this.cabecera.actividadEconomica = "";
              }
            },
            (error) => {
              console.log(error);
            }
          );
          //Codigo documento sector
          this.codigoDocumentoSector =
            this.obj.jsonFactura.facturaElectronicaPrevalorada.cabecera.codigoDocumentoSector;
          this.plantillasService
            .getPlantillaDoc(this.codigoDocumentoSector)
            .then(
              (data) => {
                if (data[0] != undefined) {
                  // Asignacion de datos detallados segun plantilla
                  this.url = data[0].url_qr;

                  this.value = this.SIN_URL +
                    this.url.substring(0, 7) +
                    this.obj.jsonFactura.facturaElectronicaPrevalorada.cabecera[
                    "nitEmisor"
                    ] +
                    this.url.substring(7, 12) +
                    this.obj.jsonFactura.facturaElectronicaPrevalorada.cabecera[
                    "cuf"
                    ] +
                    this.url.substring(12, 20) +
                    this.obj.jsonFactura.facturaElectronicaPrevalorada.cabecera[
                    "numeroFactura"
                    ];

                  //Generando los datos de cabecera
                  this.plantillaC = data[0].plantilla.cabecera;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);
                  dt = this.plantillaC;
                  dt.filter((valueCabeceraP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valueCabeceraP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valueCabeceraP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaC_vista[valueCabeceraP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  // Genedando los datos de detalle
                  this.plantillaD = data[0].plantilla.detalle;
                  var keysDetalle = Object.keys(this.detalle[0]);
                  dt = this.plantillaD;

                  dt.filter((valueDetalleP) => {
                    keysDetalle.forEach((item) => {
                      if (valueDetalleP.clave == item) {
                        var d = {
                          label: valueDetalleP.label,
                          key: valueDetalleP.clave,
                        };
                        this.plantillaD_vista[valueDetalleP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  //Generando los datos de pie de documento
                  this.plantillaP = data[0].plantilla.pie;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);

                  dt = this.plantillaP;
                  dt.filter((valuePieP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valuePieP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valuePieP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaP_vista[valuePieP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                } else {
                  this.notificationService.warn(
                    "No existen plantillas disponibles para este documento"
                  );
                }
              },
              (error) => {
                this.notificationService.warn("Error de conexión");
              }
            );
          //Cargamos los datos de estado y mensaje de Factura
          this.facturaService
            .getEstadosFactura(this.obj["cuf"])
            .then((data) => {
              data.sort(
                (a, b) =>
                  new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
              );
              this.mensajes = data;
              this.LsitasDesp.getLista("estadosFactura").then((dt) => {
                var dat = new Array();
                dt[0]["valores"].forEach((element) => {
                  dat[element.id] = element.valor;
                });
                this.estados = dat;
              });
            });
          this.display = true;
        });
    } else if (this.data.obj.DocumentoSector == "FACTURA COMERCIAL DE EXPORTACIÓN DE SERVICIOS") {
      await this.facturaService
        .getFacturaFirma(this.obj["cuf"])
        .then((data) => {
          this.xmlFacturaFirmada = atob(data["xmlFacturaFirmada"]);
          this.obj = { ...this.obj, jsonFactura: data["jsonFactura"] };

          /* if(this.obj != null){this.facturaService.populateForm(this.obj);} */
          this.json = this.obj["jsonFactura"];

          this.valuesCabecera = Object.keys(
            this.obj.jsonFactura.facturaElectronicaComercialExportacionServicio.cabecera
          );
            this.cabecera =
              this.obj.jsonFactura.facturaElectronicaComercialExportacionServicio.cabecera;
            this.nombreRazonSocial = this.cabecera.nombreRazonSocial;
            this.razonSocialEmisor = this.cabecera.razonSocialEmisor;
            this.tipoCambio = this.cabecera.tipoCambio;
            this.numeroDocumento = this.cabecera.numeroDocumento;
            this.direccionComprador = this.cabecera.direccionComprador;
            this.codigoCliente = this.cabecera.codigoCliente;
            this.codigoMoneda = this.cabecera.codigoMoneda;
            this.telefono = this.cabecera.telefono;
            this.lugarDestino = this.cabecera.lugarDestino;
            this.objInformacionAdicional = this.cabecera.informacionAdicional;
            this.leyenda = this.cabecera.leyenda;
            this.MontoTotal = this.cabecera.montoTotal;
            this.valuesDetalle = Object.keys(
            this.obj.jsonFactura.facturaElectronicaComercialExportacionServicio.detalle[0]
          );
          this.detalle =
            this.obj.jsonFactura.facturaElectronicaComercialExportacionServicio.detalle;
          // Añadimos la desripcion de tipo de actividad economica

          this.DocSectService.getDocumentoSector(
            "Actividades",
            this.obj.jsonFactura.facturaElectronicaComercialExportacionServicio.detalle[0]
              .actividadEconomica
          ).subscribe(
            (data) => {
              if (data[0] != undefined) {
                this.actividadEco = data[0]["descripcion"];
                this.cabecera.actividadEconomica = data[0]["descripcion"];
              } else {
                this.actividadEco = "";
                this.cabecera.actividadEconomica = "";
              }
            },
            (error) => {
              console.log(error);
            }
          );
          //Codigo documento sector
          this.codigoDocumentoSector =
            this.obj.jsonFactura.facturaElectronicaComercialExportacionServicio.cabecera.codigoDocumentoSector;
          this.plantillasService
            .getPlantillaDoc(this.codigoDocumentoSector)
            .then(
              (data) => {
                if (data[0] != undefined) {
                  // Asignacion de datos detallados segun plantilla
                  this.url = data[0].url_qr;

                  this.value = this.SIN_URL +
                    this.url.substring(0, 7) +
                    this.obj.jsonFactura.facturaElectronicaComercialExportacionServicio.cabecera[
                    "nitEmisor"
                    ] +
                    this.url.substring(7, 12) +
                    this.obj.jsonFactura.facturaElectronicaComercialExportacionServicio.cabecera[
                    "cuf"
                    ] +
                    this.url.substring(12, 20) +
                    this.obj.jsonFactura.facturaElectronicaComercialExportacionServicio.cabecera[
                    "numeroFactura"
                    ];

                  //Generando los datos de cabecera
                  this.plantillaC = data[0].plantilla.cabecera;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);
                  dt = this.plantillaC;
                  dt.filter((valueCabeceraP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valueCabeceraP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valueCabeceraP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaC_vista[valueCabeceraP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  // Genedando los datos de detalle
                  this.plantillaD = data[0].plantilla.detalle;
                  var keysDetalle = Object.keys(this.detalle[0]);
                  dt = this.plantillaD;

                  dt.filter((valueDetalleP) => {
                    keysDetalle.forEach((item) => {
                      if (valueDetalleP.clave == item) {
                        var d = {
                          label: valueDetalleP.label,
                          key: valueDetalleP.clave,
                        };
                        this.plantillaD_vista[valueDetalleP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                  //Generando los datos de pie de documento
                  this.plantillaP = data[0].plantilla.pie;
                  var dt = new Array();
                  var cabecKey = new Array();
                  cabecKey = Object.keys(this.cabecera);

                  dt = this.plantillaP;
                  dt.filter((valuePieP, key) => {
                    //recorriendo los datos de plantilla para comparar con los datos de cabecera factura
                    cabecKey.forEach((item) => {
                      if (valuePieP.clave == item) {
                        //Generando el objeto que se visualizara segun la plantilla
                        var d = {
                          label: valuePieP.label,
                          value: this.cabecera[item],
                          key: item,
                        };
                        // Asignando los datos de factura a un objeto que se visualizara, segun su posicion
                        this.plantillaP_vista[valuePieP.posicion - 1] = d;
                      }
                    });
                  });
                  // --------------------------------------------------------------------------------
                } else {
                  this.notificationService.warn(
                    "No existen plantillas disponibles para este documento"
                  );
                }
              },
              (error) => {
                this.notificationService.warn("Error de conexión");
              }
            );
          //Cargamos los datos de estado y mensaje de Factura
          this.facturaService
            .getEstadosFactura(this.obj["cuf"])
            .then((data) => {
              data.sort(
                (a, b) =>
                  new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
              );
              this.mensajes = data;
              this.LsitasDesp.getLista("estadosFactura").then((dt) => {
                var dat = new Array();
                dt[0]["valores"].forEach((element) => {
                  dat[element.id] = element.valor;
                });
                this.estados = dat;
              });
            });
          this.display = true;
        });
    }
  }

  onSaveFacturas() {
    if (!this.facturaService.form.get("cuf").value) {
      this.facturaService
        .submitFacturas(this.facturaService.form.value)
        .subscribe(
          (data) => {
            this.dialogRef.close({ event: this.action, data: data });
            this.notificationService.success("EXITOSO");
            this.facturaService.form.reset();
          },
          (error) => {
            console.log("CREA" + error);
            this.notificationService.warn("ERROR");
          }
        );
    } else {
      if (this.action == "Anular") {
        this.facturaService
          .updateFacturas(this.facturaService.form.value)
          .subscribe((data) => {
            this.dialogRef.close({ event: this.action, data: data });
            this.facturaService.form.reset();
            this.facturaService.initializeFormGroup();
            this.notificationService.success("se actualizo exitosamente");
          });
        this.onClose();
      }
      if (this.action == "Eliminar") {
        this.facturaService
          .deletedFacturas(this.facturaService.form.value.id)
          .subscribe((data) => {
            this.dialogRef.close({ event: this.action, data: data });
            this.facturaService.form.reset();
            this.facturaService.initializeFormGroup();
            this.notificationService.warn("Se elimino un registro");
          });
        this.onClose();
      }
    }
  }

  // Metodos open dialogo (Modal)
  SolicitudAnula() {
    const dialogRef = this.dialog.open(SolAnulacionComponent, {
      width: "40%",
      data: { obj: this.obj },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result.data.respuesta);
      if (result.event == "Crear") {
        //this.addRowData(result.data.respuesta);
      }
    });
  }
  async CargarEmpresas() {
    await this.empresaService.sife_empresa_get().then((data) => {
      this.Empresas = data;
    });
  }

  ///Cargar filtro Sucursales
  async CargarSucursales() {
    await this.sucursalService
      .sife_sucursal_get(this.empresaSeleccionada)
      .then((data) => {
        this.Sucursales = data;
      });
  }
  ///Cargar filtro PDVs
  async CargarPDV() {
    await this.pdvService
      .sife_pdv_get(this.empresaSeleccionada)
      .then((data) => {
        this.PDVs = data;
      });
  }
  async CargarParametricaTipoMoneda() {
    await this.TipoMonedaService.sife_tipo_moneda_get().then((data) => {
      this.TipoMonedaList = data;
    });
  }

  Empresa(nit) {
    for (let i = 0; i < this.Empresas.length; i++) {
      if (this.Empresas[i].nit == nit) {
        return this.Empresas[i].razonSocial;
      }
    }
  }
  
  Sucursal(clase, nit, codigoSucursal) {
    var sucursal = [];
    for (let i = 0; i < this.Sucursales.length; i++) {
      if (
        this.Sucursales[i].nit == nit &&
        this.Sucursales[i].codigoSucursal == codigoSucursal
      ) {
        sucursal.push(this.Sucursales[i]);
      }
    }
    if (sucursal[0] != undefined) {
      switch (clase) {
        case "descripcion":
          return sucursal[0].descripcion;
        case "direccion":
          return sucursal[0].direccion;
        case "municipio":
          return sucursal[0].muncipio;
      }
    }
  }

  PDV(nit, codigoSucursal, codigoPDV) {
    var pdv = [];
    for (let i = 0; i < this.PDVs.length; i++) {
      if (
        this.PDVs[i].nit == nit &&
        this.PDVs[i].codigoSucursal == codigoSucursal &&
        this.PDVs[i].codigoPDV == codigoPDV
      ) {
        pdv.push(this.PDVs[i]);
      }
    }
    if (pdv[0] != undefined) {
      return pdv[0].nombrePuntoVenta;
    } else {
      return "0";
    }
  }
  Moneda(codigoClasificador) {
    if (this.TipoMonedaList) {
      for (let i = 0; i < this.TipoMonedaList.length; i++) {
        if (this.TipoMonedaList[i].codigoClasificador == codigoClasificador) {
          return this.TipoMonedaList[i].descripcion;
        }
      }
    }
  }
  onClose() {
    this.facturaService.form.reset();
    this.facturaService.initializeFormGroup();
    this.dialogRef.close();
    this.dialogRef.close({ event: "Cancel" });
  }
  async ngAfterViewInit() {
    await this.CargarEmpresas();
    await this.CargarSucursales();
    await this.CargarPDV();
    this.CargarParametricaTipoMoneda();
    this.MontoTotalLiteral = converter.NumerosALetras(this.MontoTotal);
  }
}
