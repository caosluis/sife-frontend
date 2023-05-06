import { Component, OnInit } from '@angular/core';
import { SifeFechaHora } from 'src/app/models/sife-fecha-hora';
import { Socket } from 'ngx-socket-io';
import { SifeFechaHoraService } from 'src/app/services/sife-fecha-hora.service';
import { AutorizacionService } from "../../components/autorizacion/autorizacion.service"

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  fechaActual = new Date();
  FechaActual: any = { start_time: new Date() };
  sifefechahora = this.socket.fromEvent<Document>('Sifefechahora');
  empresaSeleccionada: any;
  versionSife:any ;
  
  constructor(
    private autorizacionService:AutorizacionService,
    private dataApi: SifeFechaHoraService,
    private socket: Socket
    ) {
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
   }
  
  ngOnInit() {
    this.autorizacionService.sife_autorizacion_registro_version(this.empresaSeleccionada)
    .then((data) => {
      console.log("DATOS EMPRESA"+ JSON.stringify(data));
      
      this.versionSife = data[0].version;
    })
  }
  
  
}
