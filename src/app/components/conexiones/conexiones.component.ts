import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as glob from "../../global";

@Component({
  selector: "app-conexiones",
  templateUrl: "./conexiones.component.html",
  styleUrls: ["./conexiones.component.css"],
})
export class ConexionesComponent implements OnInit {
  host = glob.host;
  safeSrc: SafeResourceUrl;
   
  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.host+":41/app/kibana#/dashboard/a1cbb460-51f2-11ec-9906-c74ad5acf828?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))")
   }


  ngOnInit() {
   
  }
}

