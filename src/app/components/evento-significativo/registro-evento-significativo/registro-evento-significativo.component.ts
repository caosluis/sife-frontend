import { Component, Inject, OnInit, Optional, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EmpresaService } from "src/app/services/empresa.service";
import { EventosSignificativosService } from "src/app/services/eventos-significativos.service";
import { PdvService } from "src/app/services/pdv.service";
import { SucursalService } from "src/app/services/sucursal.service";
import { CufdService } from "../../../services/cufd.service";
import { CufdHistoricoService } from "src/app/services/cufd-historico.service.ts.service";
import * as moment from "moment";

@Component({
  selector: "app-registro-evento-significativo",
  templateUrl: "./registro-evento-significativo.component.html",
  styleUrls: ["./registro-evento-significativo.component.css"],
})
export class RegistroEventoSignificativoComponent implements OnInit {
  diacontingencia: string;
  dias: object[] = [
    { valor: '0', nombre: 'Hoy' },
    { valor: '1', nombre: 'Ayer' },
    { valor: '2', nombre: 'Antes de ayer' }
  ];
  formularioRegistroEvento: FormGroup;
  empresasList: any;
  sucursalList: any;
  pdvList: any;
  empresaSeleccionada: any;
  UsuarioActual: any;
  sucursalSeleccionada: any;
  pdvSeleccionada: any;
  respuestaVigenciaCUFD: any;
  fecha: any;
  fechaActual = new Date();
  fechaVigencia: any;
  fechaCreacion: any;
  cufd: any;
  cuis: any;
  bgColor: any;
  colorVigencia: any;

  eventosignificativoList: any;
  FechaInicioEventoSeleccionada: any;
  FechaFinEventoSeleccionada: any;
  loading = false;
  Respuesta: any;
  transaccion: any;
  datos_eventos_significativos: any = [];
  displayedColumns: string[] = [
    "codigoEvento",
    "codigoRecepcionEventoSignificativo",
    "descripcion",
    "fechaFin",
    "fechaInicio",
  ];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private formbuilder: FormBuilder,
    private empresaService: EmpresaService,
    private sucursalService: SucursalService,
    private pdvService: PdvService,
    private eventosignificativoService: EventosSignificativosService,
    public dialogRef: MatDialogRef<RegistroEventoSignificativoComponent>,
    public eventossignificativosService: EventosSignificativosService,
    public cufdService: CufdService,
    public cufdHistoricoService: CufdHistoricoService
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));

    this.formularioRegistroEvento = this.formbuilder.group({
      id: [],
      nit: [],
      sucursal: [],
      pdv: [],
      diacontingencia: [],
      codigoMotivoEvento: [],
      descripcion: [],
      FechaInicioEvento: [],
      FechaFinEvento: [],
    });
    this.formularioRegistroEvento.get("id").setValue(this.data.id);

    this.empresaService.sife_empresa_get_activos().then((data) => {
      this.empresasList = data;
    });
    this.sucursalService
      .sife_sucursal_get(this.empresaSeleccionada)
      .then((data) => {
        this.sucursalList = data.filter(
          (item) => item.nit == this.empresaSeleccionada && item.cuis != null
        );
      });
    this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
      this.pdvList = data;
    });
    this.eventosignificativoService
      .sife_evento_significativo_get(this.empresaSeleccionada)
      .then((data) => {
        this.eventosignificativoList = data;
      });
  }

  ngOnInit(): void { }
  SeleccionarFechaInicioEvento(event) {
    this.FechaInicioEventoSeleccionada = moment(event.value).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
  }
  SeleccionarFechaFinEvento(event) {
    this.FechaFinEventoSeleccionada = moment(event.value).format(
      "YYYY-MM-DDTHH:mm:ss"
    );
  }

  SeleccionarSucursal(sucursal) {
    this.sucursalSeleccionada = sucursal.value;
    this.pdvService.sife_pdv_get_all(this.empresaSeleccionada, this.sucursalSeleccionada).then((data) => {
      this.pdvList = data.filter(
        (item) => item.codigoSucursal == sucursal.value
      );
    });
    this.bgColor = 'font-weight: 500; color:red;';
    this.fechaVigencia = '';
    this.fechaCreacion = '';
    this.cufd = 'Seleccione dia contingencia';
    this.cuis = 'Seleccione dia contingencia';
  }

  SeleccionarPDV() {
    this.bgColor = 'font-weight: 500; color:red;';
    this.fechaVigencia = '';
    this.fechaCreacion = '';
    this.cufd = 'Seleccione dia contingencia';
    this.cuis = 'Seleccione dia contingencia';
  }

  registrarEvento(evento) {
    console.log("INGRESO DE DATOS: " + JSON.stringify(evento));

    this.loading = true;
    var evento_significativo = {
      nit: this.empresaSeleccionada,
      codigoPDV: evento.cuis,
      codigoSucursal: evento.codigoSucursal,
      codigoMotivoEvento: evento.codigoMotivoEvento,
      descripcion: evento.descripcion,
      fechaHoraInicioEvento: evento.FechaInicio,
      fechaHoraFinEvento: evento.FechaFin,
      tiporegistro: evento.tiporegistro,
      diacontingencia: evento.diacontingencia,
      cuis: this.cuis,
      cufd: this.cufd
    };
    console.log("LOS DATOS ENVIADOS A FE SON: " + JSON.stringify(evento_significativo))
    this.eventossignificativosService
      .sife_registro_evento_significativo_mule_post(evento_significativo)
      .then((data) => {
        this.Respuesta = data;
        this.transaccion = data.Respuesta.transaccion;
        this.loading = false;
      });
  }

  consultarEvento(evento) {
    this.loading = true;
    var respuesta;
    var evento_significativo = {
      nit: evento.nit,
      codigoSucursal: evento.codigoSucursal,
      codigoPDV: evento.codigoPDV,
      cuisc: evento.cuis,
      codreg: evento.codigoRecepcionEventoSignificativo,
    };
    this.eventossignificativosService
      .sife_consulta_evento_significativo_mule_post(evento_significativo)
      .then((data) => {
        respuesta = data;

        if (respuesta.Respuesta.transaccion == "true") {
          if (Array.isArray(respuesta.Respuesta.mensaje)) {
            this.datos_eventos_significativos = respuesta.Respuesta.mensaje;
            this.loading = false;
          } else {
            this.datos_eventos_significativos = [];
            this.datos_eventos_significativos.push(respuesta.Respuesta.mensaje);
            this.loading = false;
          }
        } else {
          this.datos_eventos_significativos = [];
          this.loading = false;
          alert("No existen registros con los datos Suministrados");
        }
        this.Respuesta = data;
        this.transaccion = data.Respuesta.transaccion;
        this.loading = false;
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  obtieneCufd(evento, pdv, sucursal, diacontingencia) {
    //this.fecha = 
    console.log("evento.diacontingencia : " + diacontingencia);
    if (diacontingencia == 0) {
      //alert("SUCURSAL CON CUIS : " + pdv + " sucursal: "+ sucursal);
      this.cufdHistoricoService.sife_obitene_un_cufd_hoy(this.fechaActual, this.empresaSeleccionada, sucursal, pdv)
        .then((data) => {
          console.log("DATOS :" + data[0]);
          if (data[0] != undefined || data[0] != '') {
            this.fechaVigencia = data[0].fechaVigencia;
            this.fechaCreacion = data[0].fechaCreacion;
            this.cufd = data[0].cufd;
            this.cuis = data[0].cuis
            this.bgColor = 'background: #fff; color:#333;'
            this.colorVigencia = 'color: green;'
          } else {
            this.fechaVigencia = '';
            this.fechaCreacion = '';
            this.cufd = 'No se encontro el dato';
            this.cuis = 'No se encontro el dato';
            this.bgColor = 'font-weight: 500; color:red;';
          }
        });
    }
    if (diacontingencia == 1) {
      //alert("PDV CON CUIS: " + pdv + " sucursal: "+ sucursal);
      this.fechaActual.setDate(this.fechaActual.getDate() + -1);
      this.cufdHistoricoService.sife_obtiene_un_cufdhistorico_hoy(this.fechaActual, this.empresaSeleccionada, sucursal, pdv)
        .then((data) => {
          console.log("DATOS :" + data[0]);
          if (data[0] != undefined || data[0] != '') {
            this.fechaVigencia = data[0].fechaVigencia;
            this.fechaCreacion = data[0].fechaCreacion;
            this.cufd = data[0].cufd;
            this.cuis = data[0].cuis;
            this.bgColor = 'background: #fff; color:#333; '
            this.colorVigencia = 'color:red;'
          } else {
            this.fechaVigencia = '';
            this.fechaCreacion = '';
            this.cufd = 'No se encontro el dato';
            this.cuis = 'No se encontro el dato';
            this.bgColor = 'font-weight: 500; color:red;';
          }
        });
    }
    if (diacontingencia == 2) {
      //alert("PDV CON CUIS: " + pdv + " sucursal: "+ sucursal);
      this.fechaActual.setDate(this.fechaActual.getDate() + -2);
      this.cufdHistoricoService.sife_obtiene_un_cufdhistorico_hoy(this.fechaActual, this.empresaSeleccionada, sucursal, pdv)
        .then((data) => {
          console.log("DATOS :" + data[0]);
          if (data[0] != undefined || data[0] != '') {
            this.fechaVigencia = data[0].fechaVigencia;
            this.fechaCreacion = data[0].fechaCreacion;
            this.cufd = data[0].cufd;
            this.cuis = data[0].cuis;
            this.bgColor = 'background: #fff; color:#333; '
            this.colorVigencia = 'color:red'
          } else {
            this.fechaVigencia = '';
            this.fechaCreacion = '';
            this.cufd = 'No se encontro el dato';
            this.cuis = 'No se encontro el dato';
            this.bgColor = 'font-weight: 500; color:red;';
          }
        });
    }
    this.fechaActual = new Date();
  }
}
