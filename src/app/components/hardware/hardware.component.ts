import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as glob from "../../global";

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css']
})
export class HardwareComponent implements OnInit {
  host = glob.host;
  safeSrc: SafeResourceUrl;
   
  constructor(
    private sanitizer: DomSanitizer
  ) {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.host+":41/app/kibana#/dashboard/36f41b30-15a4-11ec-9400-5759b1b7cafe?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-5m%2Cto%3Anow))")
   }

  ngOnInit() {
    
  }

}
