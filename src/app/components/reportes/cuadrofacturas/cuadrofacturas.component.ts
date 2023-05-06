import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as glob from "../../../global";

@Component({
  selector: 'app-cuadrofacturas',
  templateUrl: './cuadrofacturas.component.html',
  styleUrls: ['./cuadrofacturas.component.css']
})
export class CuadrofacturasComponent implements OnInit {
  host = glob.host;
  safeSrc: SafeResourceUrl;
  empresaSeleccionada: any;
   
  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    //QAS
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.host+":41/app/kibana#/dashboard/33360a50-dd94-11eb-9f81-cd97a988a105?embed=true&_g=(refreshInterval:(pause:!t,value:0),time:(from:now%2Fd,to:now%2Fd))&_a=(description:'',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),panels:!((embeddableConfig:(),gridData:(h:26,i:d29f7004-bc39-4537-9739-2852955a022b,w:15,x:0,y:0),id:'734397c0-dd94-11eb-9f81-cd97a988a105',panelIndex:d29f7004-bc39-4537-9739-2852955a022b,type:visualization,version:'7.5.2'),(embeddableConfig:(title:m_facturas),gridData:(h:9,i:'233a2d3d-3518-4a9a-a15a-48f5f412c75f',w:7,x:15,y:0),id:d2fb07d0-dd93-11eb-9f81-cd97a988a105,panelIndex:'233a2d3d-3518-4a9a-a15a-48f5f412c75f',title:m_facturas,type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:9,i:c6c44953-8158-4472-b5c3-b6cde290c9e9,w:26,x:22,y:0),id:'831981b0-dd93-11eb-9f81-cd97a988a105',panelIndex:c6c44953-8158-4472-b5c3-b6cde290c9e9,type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:9,i:a16d383c-0054-44ad-8f7f-d77be336335a,w:7,x:15,y:9),id:'5edd0700-9fc5-11ec-aa9b-9547488f64a2',panelIndex:a16d383c-0054-44ad-8f7f-d77be336335a,type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:9,i:d905528e-685a-413f-828e-5ef532f8583a,w:26,x:22,y:9),id:'430e75f0-9f1a-11ec-aa9b-9547488f64a2',panelIndex:d905528e-685a-413f-828e-5ef532f8583a,type:visualization,version:'7.5.2'),(embeddableConfig:(),gridData:(h:8,i:'975e7c9e-5ea1-4e23-8ca1-b5a62b798480',w:7,x:15,y:18),id:'1d3315a0-44d6-11ec-bd6f-fb78fc3163b9',panelIndex:'975e7c9e-5ea1-4e23-8ca1-b5a62b798480',type:visualization,version:'7.5.2'),(embeddableConfig:(vis:(colors:('mensaje.codigoEmision+:+2':%233F6833))),gridData:(h:8,i:'127743ee-fdb2-4851-ae0d-2e07e52ed29c',w:26,x:22,y:18),id:'0839eee0-44d5-11ec-bd6f-fb78fc3163b9',panelIndex:'127743ee-fdb2-4851-ae0d-2e07e52ed29c',type:visualization,version:'7.5.2')),query:(language:kuery,query:'mensaje.nitEmisor+:+"+this.empresaSeleccionada+"'),timeRestore:!f,title:d_facturas,viewMode:view)");
    //PRD
    //this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.host+":41/app/kibana#/dashboard/85bd8ee0-94ca-11ec-aa9b-9547488f64a2?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A2000)%2Ctime%3A(from%3Anow%2Fd%2Cto%3Anow%2Fd))");
    
   }

  ngOnInit(): void {
  }

}
