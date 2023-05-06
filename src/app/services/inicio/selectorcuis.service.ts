import { UserService } from './../user.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { Selectorcuis } from 'src/app/models/inicio/selectorcuis';
import * as glob from "./../../global";

@Injectable({
  providedIn: 'root'
})
export class SelectorcuisService {
  selectorcuis = this.socket.fromEvent<Document>('selectorcuis');
  constructor(private http:HttpClient,private socket:Socket,public userData:UserService) { }
  getAllSelectorEmpresa(){
    /* if(this.userData.sesion["nivelAcceso"]!="551eac71-5b53-4785-b96f-4cbaab197012"){
      const url_api = 'http://192.168.1.101:35/api/sife_cuis/?filter={"where":{"cuis":"'+this.userData.sesion["cuis"]+'"}}';
      const url_api = glob.host+":"+glob.port+'/api/sife_cuis/?filter={"where":{"cuis":"'+this.userData.sesion["cuis"]+'"}}';
      return this.http.get<Selectorcuis[]>(url_api)
    }else if(this.userData.sesion["nivelAcceso"] == "551eac71-5b53-4785-b96f-4cbaab197012"){
      const url_api = 'http://192.168.1.101:35/api/sife_cuis/';
      const url_api = glob.host+":"+glob.port+'/api/sife_cuis/';
      return this.http.get<Selectorcuis[]>(url_api)
    } */
    const url_api = glob.host+glob.port+'/api/sife_empresas/';
    return this.http.get<Selectorcuis[]>(url_api).toPromise()
  }
}
