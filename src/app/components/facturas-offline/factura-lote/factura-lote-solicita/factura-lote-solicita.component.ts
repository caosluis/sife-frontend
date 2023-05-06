import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { FacturaElectronicaLoteService } from "src/app/services/factura-electronica-lote.service";
import { FacturasOfflineService } from "src/app/services/facturas-offline.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-factura-lote-solicita',
  templateUrl: './factura-lote-solicita.component.html',
  styleUrls: ['./factura-lote-solicita.component.css']
})
export class FacturaLoteSolicitaComponent implements OnInit {
  subscription: Subscription;
  loading = false;
  isLoading= false;
  Respuesta: any;
  fechaSincronizacion: any;
  transaccion: any;
  empresaSeleccionada: any;
  estado: any;
  constructor(
    private facturaelectronicaloteService: FacturaElectronicaLoteService,
    private facturasOfflineService: FacturasOfflineService,
    ) {
      this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    }
  ngOnInit(): void {
    this.getProceso();
    this.subscription = this.facturaelectronicaloteService._refresh$.subscribe(()=>{
      console.log("Observable Iniciado");
      this.getProceso()
    })  
  }
  solicitaProceso() {
    this.isLoading = true;
    console.log("envio" + this.empresaSeleccionada);
    var r = confirm("Esta seguro de solicitar el proceso de Lotes offline?!\nPresione Aceptar o Cancelar.\nEl boton que presione se mostrara los resultados en su pantalla.");
    if (r == true) {      
      this.facturaelectronicaloteService
      .sife_offlineregistraeventos({
        nit: this.empresaSeleccionada
      }
      )
      .then((data) => {
        this.Respuesta = data.respuesta;
        console.log("respuesta servicio 2" + JSON.stringify(data.Respuesta))
        this.transaccion = this.Respuesta.transaccion;
        this.isLoading = false;
      })
      .catch();
    } else {
      this.isLoading = false;
    }   
    this.getProceso()
  }

  getProceso() {
    this.isLoading = true;
    this.facturasOfflineService
      .sife_facturaElectronica_offline_proceso()
      .then((data) => {        
        this.Respuesta = data[0];
        this.fechaSincronizacion = data[0].fecha;
        this.estado = data[0].estado;
        //console.log("DATOS OBTENIDOS DATA" + JSON.stringify(this.RespuestaSin))
        this.isLoading = false;
      })
      .catch();
  }

  detenerProcesoLote(dato){
    this.isLoading = true;
    console.log("envio" + dato);
    var r = confirm("Esta seguro de realizar esta acción?");
    if (r == true) {      
      this.facturaelectronicaloteService
      .sife_facturaElectronica_lote_estado({
        estado: dato
      }
      )
      .then((data) => {
        console.log("respuesta de detenerProcesoLote " + JSON.stringify(data))
      })
      .catch();
    } else {
      this.isLoading = false; 
    }   
    this.getProceso()
  }
}
