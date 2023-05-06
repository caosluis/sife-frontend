import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Facturasincronizacion } from "../../../models/facturasincronizacion";
import { SincronizarService } from "../../../services/sincronizar.service";
import { Countsincronizar } from "src/app/models/countsincronizar";
import { SifeFechaHora } from "src/app/models/sife-fecha-hora";
import { ConexionesService } from "src/app/services/conexiones.service";
import { FacturasOfflineService } from "src/app/services/facturas-offline.service";
import { FacturasService } from "src/app/services/facturas.service";
import { CufdService } from "src/app/services/cufd.service";
import { SifeFechaHoraService } from "src/app/services/sife-fecha-hora.service";
import { FacturaElectronicaLoteService } from "src/app/services/factura-electronica-lote.service";

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: "app-indicadores",
  templateUrl: "./indicadores.component.html",
  styleUrls: ["./indicadores.component.css"],
})
export class IndicadoresComponent implements OnInit {
  // INICIO GRAFICOS CON CHART
  public lineChartData: ChartDataSets[] = [
    { data: [1,1,1,1,1,1,1,1,1,1,0,0,0,0] },
  ];
  
  public lineChartLabels: Label[] = ['August'];
    
  public lineChartOptions = {
    responsive: true,
  };
     
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  // FIN GRAFICOS CON CHART

  //FECHA HORA
  horahansa = "";
  horasin = "";
  delt = "";
  fechahora: SifeFechaHora[] = [];
  //
  cont: Countsincronizar[] = [];
  facturasincronizacions: Facturasincronizacion[] = [];
  conexionesData: any;
  Internet: any;
  ServiciosSIN: any;
  fechaActual = new Date();
  totalEnviadosCufd: any;
  totalCufd: any;
  totalCatalogosSincronizados:any;
  // Contadores Sincronización
  c: any;
  sincronizados: any;
  cantCatalogos: any;
  // Contadores errores SAP
  cSap: any;
  // Contadores errores Software

  IndicadorFacturasExitosas: any;
  IndicadorFacturasRechazadas: any;
  IndicadorFacturasEnviadosIN: any;
  1;
  IndicadorFacturasRecibido: any;
  0;
  IndicadorFacturasEventoSignificativo: any;
  5;
  IndicadorFacturasExitosasOffline: any;
  2;
  IndicadorFacturasEmpaquetadosOffline: any;
  9;
  IndicadorFacturasRechazadasOffline: any;
  91;
  IndicadorFacturasOfflineOffline: any;
  4;
  Respuesta: any;
  // Contadores error Hartware
  cHart: any;
  // Contadores error nonecciones
  cConec: any;
  // Contadores error de Facturas
  cFact: any;

  IndicadorLote0: any;
  IndicadorLote1: any;
  IndicadorLote2: any;
  IndicadorLote3: any;
  IndicadorLote5: any;
  IndicadorLote7: any;

  sifefechahora = this.socket.fromEvent<Document>("Sifefechahora");
  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };
  UsuarioActual: any;
  EmpresaSeleccionada: any;
  transaccion: any;
  fechaSincronizacion: any;

  constructor(
    private SincronizarService: SincronizarService,
    private socket: Socket,
    private ConexionesService: ConexionesService,
    private FacturasService: FacturasService,
    private FacturasOfflineService: FacturasOfflineService,
    private CufdService: CufdService,
    private dataApi: SifeFechaHoraService,
    private facturaElectronicaLoteService: FacturaElectronicaLoteService
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));

    this.socket.on("Estado Ingresa", (data) => {
      this.ConexionesService.sife_conexiones_get().then((data) => {
        this.conexionesData = data;
      });
    });

    this.socket.on("Factura_Entrante", (data) => {
      this.CargaCambioEstados();      
    });

    this.socket.on("Factura Offline Ingresa", (data) => {
      this.CargaCambioEstadosOffline();
      this.CargarCambiosLotes();
    });

    this.socket.on("CUFD_Ingresa", (data) => {
      this.CargarCufdSincroniza();
    });

    this.socket.on("/Sifesincronizar/POST", (data) => {
      // console.log(data);
      this.getCountSincronizar();
    });

    this.socket.on("/Sifefechahora/POST", (data) => {
      // console.log(data);
      this.fechahora = data;
      this.horahansa = this.fechahora["fechaHoraSer"];
      this.horasin = this.fechahora["fechaHora"];
      this.delt = String(this.fechahora["delta"]);
      
    });
  }
  /* {"order":"fecha DESC","skip":"0","limit":"10","where":{"fecha": {"between": ["2021-06-10T00:00:00.000Z","2021-06-10T23:59:59.999Z"]}}} */

  async ngOnInit() {
    this.getAllSifefechahora();
    this.CargarCufdEnviadosContribuyentes();
    this.TotalCufdEmpresa();
    this.getProceso();
    this.CargarCambiosLotes();
    this.CargarCufdSincroniza();
    
    await this.ConexionesService.sife_conexiones_get().then((data) => {
      this.conexionesData = data;
    });
    await this.FacturasService.sife_factura_exitosas_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasExitosas = data["count"];
    });
    await this.FacturasService.sife_factura_rechazadas_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasRechazadas = data["count"];
    });
    await this.FacturasService.sife_factura_EnviadosIN_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasEnviadosIN = data["count"];
    });
    await this.FacturasService.sife_factura_Recibido_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasRecibido = data["count"];
    });
    await this.FacturasOfflineService.sife_facturaoffline_exitosas_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasExitosasOffline = data["count"];
    });
    await this.FacturasOfflineService.sife_facturaoffline_rechazadas_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasRechazadasOffline = data["count"];
    });
    await this.FacturasOfflineService.sife_facturaoffline_Empaquetados_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasEmpaquetadosOffline = data["count"];
    });
    await this.FacturasOfflineService.sife_facturaoffline_EventoSignificativo_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasEventoSignificativo = data["count"];
    });
    await this.FacturasOfflineService.sife_facturaoffline_Offline_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasOfflineOffline = data["count"];
    });

    this.getCountSincronizar();
    this.cSap = 0;
    this.cHart = 0;
    this.cConec = 0;
    this.cFact = 0;
    
    // this.getAllSifefechahora();
  }

  async CargaCambioEstados() {
    await this.FacturasService.sife_factura_exitosas_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasExitosas = data["count"];
    });
    await this.FacturasService.sife_factura_rechazadas_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasRechazadas = data["count"];
    });
    await this.FacturasService.sife_factura_EnviadosIN_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasEnviadosIN = data["count"];
    });
    await this.FacturasService.sife_factura_Recibido_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasRecibido = data["count"];
    });   
  }
  async CargarCambiosLotes(){
    await this.facturaElectronicaLoteService.sife_facturaElectronica_lote_cantidadEstado_0(
      this.EmpresaSeleccionada
    ).then((data) => {
      console.log("LOTE COUNT: "+ data);
      
      this.IndicadorLote0 = data["count"];
    });
    await this.facturaElectronicaLoteService.sife_facturaElectronica_lote_cantidadEstado_1(
      this.EmpresaSeleccionada
    ).then((data) => {
      this.IndicadorLote1 = data["count"];
    });
    await this.facturaElectronicaLoteService.sife_facturaElectronica_lote_cantidadEstado_2(
      this.EmpresaSeleccionada
    ).then((data) => {
      this.IndicadorLote2 = data["count"];
    });
    await this.facturaElectronicaLoteService.sife_facturaElectronica_lote_cantidadEstado_3(
      this.EmpresaSeleccionada
    ).then((data) => {
      this.IndicadorLote3 = data["count"];
    });
    await this.facturaElectronicaLoteService.sife_facturaElectronica_lote_cantidadEstado_5(
      this.EmpresaSeleccionada
    ).then((data) => {
      this.IndicadorLote5 = data["count"];
    });
    await this.facturaElectronicaLoteService.sife_facturaElectronica_lote_cantidadEstado_7(
      this.EmpresaSeleccionada
    ).then((data) => {
      this.IndicadorLote7 = data["count"];
    });
  }

  async CargaCambioEstadosOffline() {
    
    await this.FacturasOfflineService.sife_facturaoffline_exitosas_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasExitosasOffline = data["count"];
    });
    await this.FacturasOfflineService.sife_facturaoffline_rechazadas_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasRechazadasOffline = data["count"];
    });
    await this.FacturasOfflineService.sife_facturaoffline_Empaquetados_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasEmpaquetadosOffline = data["count"];
    });
    await this.FacturasOfflineService.sife_facturaoffline_Offline_get_count(
      this.EmpresaSeleccionada,
      this.FechaSeleccionada
    ).then((data) => {
      this.IndicadorFacturasOfflineOffline = data["count"];
    });   
  }
  
  FechaIndicador(grupo) {
    if (this.conexionesData != undefined) {
      var FechaConexion = [];
      for (let i = 0; i < this.conexionesData.length; i++) {
        if (this.conexionesData[i].grupo == grupo) {
          FechaConexion.push(this.conexionesData[i]);
        }
      }
      if (FechaConexion[0] != undefined) {
        return FechaConexion[0].Time;
      }
    }
  }

  EstadoIndicador(grupo) {
    if (this.conexionesData != undefined) {
      var FechaConexion = [];
      for (let i = 0; i < this.conexionesData.length; i++) {
        if (this.conexionesData[i].grupo == grupo) {
          FechaConexion.push(this.conexionesData[i]);
        }
      }
      if (FechaConexion[0] != undefined) {
        return FechaConexion[0].status;
      }
    }
  }
  
  getCountSincronizar() {
    this.SincronizarService.getCountSincronizar(this.EmpresaSeleccionada).subscribe((data) => {      
      this.cont = data;
      this.c = data["count"];
    });

    this.SincronizarService.getCountSincronizados(this.EmpresaSeleccionada).subscribe((data) => {
      //console.log("CANTIDAD SINCRONIZADOS: " + JSON.stringify(data));
      this.totalCatalogosSincronizados = data["count"];
      this.sincronizados = data["count"];
    });

    this.SincronizarService.getCountCatalogos().subscribe((data) => {
      this.cont = data;
      this.cantCatalogos = data["count"];
    });
  }

  getAllSifefechahora() {    
    this.dataApi.getAllSifefechahora().subscribe((data) => {
      this.fechahora = data;
      this.horahansa = this.fechahora[0]["fechaHoraSer"];
      this.horasin = this.fechahora[0]["fechaHora"];
      this.delt = String(this.fechahora[0]["delta"]);
    });
  }

  CargarCufdSincroniza() {
    this.CufdService.sife_cufd_sincronizas(this.EmpresaSeleccionada).then(
      (data) => {
        if (data.length > 0) {
          this.transaccion = data[0].transaccion;
          this.fechaSincronizacion = data[0].fechaSincronizacion;
        }
      }
    );
  }

  CargarCufdEnviadosContribuyentes() {
    this.CufdService.sife_cufd_sin_envio_contribuyente(this.EmpresaSeleccionada).then(
      (data) => {
        this.totalEnviadosCufd = data.count;
        //console.log("TOTAL ENVIADOS A SAP DE CUFDs :" + this.totalEnviadosCufd );
      }
    );
  }

  TotalCufdEmpresa() {
    this.CufdService.sife_cufd_total(this.EmpresaSeleccionada).then(
      (data) => {
        this.totalCufd = data.count;
        //console.log("TOTAL CUFDs :" + this.totalCufd );
      }
    );
  }

  getProceso() {
    this.FacturasOfflineService
      .sife_facturaElectronica_offline_proceso()
      .then((data) => {
        
        this.Respuesta = data[0];
        this.Respuesta = this.Respuesta.fecha;
        console.log("DATOS OBTENIDOS DATA" + JSON.stringify(this.Respuesta))
      })
      .catch();
  }
}
