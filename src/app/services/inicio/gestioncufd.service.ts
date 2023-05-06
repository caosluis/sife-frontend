import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Gestioncufd } from 'src/app/models/inicio/gestioncufd';
import { Observable } from 'rxjs';
import * as glob from "./../../global";

@Injectable({
  providedIn: 'root'
})
export class GestioncufdService {
  gestioncufd = this.socket.fromEvent<Document>('gestioncufd');
  constructor(private http:HttpClient,private socket:Socket) { }
  getAllGestioncufd(empresa){
    //const url_api = 'http://192.168.1.101:35/api/sife_globals';
    const url_api = glob.host+glob.port+'/api/sife_globals?filter={"where":{"nit":"' + empresa + '","Bloquear":"1"},"limit":"4"}';
    return this.http.get<Gestioncufd[]>(url_api)
  }
}