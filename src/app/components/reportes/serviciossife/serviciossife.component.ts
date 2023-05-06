import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as glob from "../../../global";

@Component({
  selector: 'app-serviciossife',
  templateUrl: './serviciossife.component.html',
  styleUrls: ['./serviciossife.component.css']
})
export class ServiciossifeComponent implements OnInit {
  host = glob.host;
  safeSrc: SafeResourceUrl;
   
  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.host+":41/app/kibana#/dashboard/1f4ab6b0-25f8-11ec-892e-73e8edbe6933?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-10m%2Cto%3Anow))")
   }

  ngOnInit(): void {
  }

}
