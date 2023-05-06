import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as glob from "../../../global";

@Component({
  selector: 'app-reporte-facturas',
  templateUrl: './reporte-facturas.component.html',
  styleUrls: ['./reporte-facturas.component.css']
})
export class ReporteFacturasComponent implements OnInit {
  host = glob.host;
  safeSrc: SafeResourceUrl;
  empresaSeleccionada: any;
   
  constructor(
    private sanitizer: DomSanitizer
  ) {
    let today = new Date();
    let anio = today.getFullYear();
    let mes = (today.getMonth()+1);
    let mes2: String = mes.toString();
    if(mes2.length == 1){
      mes2 = '0'+mes2;
    }
    let dia = today.getDate();
    let date: string = anio+'-'+mes2+'-'+dia;
    console.log(date) // '2022-2-6'
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    //QAS
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl("http://docker.hansa.com.bo:3001/public/dashboard/4b2ed634-f7e4-4734-861c-d09afb225c82?nit="+this.empresaSeleccionada+"&fecha_inicio="+date+"&fecha_fin="+date);
    //PRD
    //this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.host+":41/app/kibana#/dashboard/85bd8ee0-94ca-11ec-aa9b-9547488f64a2?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A2000)%2Ctime%3A(from%3Anow%2Fd%2Cto%3Anow%2Fd))");
    
   }

  ngOnInit(): void {
  }
}
