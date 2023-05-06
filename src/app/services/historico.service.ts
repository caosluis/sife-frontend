
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as glob from "../global";

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  //baseurl = "http://hanlpzdk01.hansa.com.bo:35/api/sife_sincronizar_H/";
  //baseurlView = "http://hanlpzdk01.hansa.com.bo:35/api/view_sife_catalogos_hs/";

  baseurl = glob.host+glob.port+"/api/sife_sincronizar_H/";
  baseurlView = glob.host+glob.port+"/api/view_sife_catalogos_hs/";
  constructor(private http:HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
 ServicioWeb : new FormControl(''),
 Estado : new FormControl(''),
 Mensaje : new FormControl(''),
 FechaSincronizacion : new FormControl(''),
 CUIS : new FormControl(''),
 Nit : new FormControl(''),
 codigoAutorizacion : new FormControl(''),
 idUsuario : new FormControl(''),
 codigoError : new FormControl('')
  });

  headers : HttpHeaders = new HttpHeaders({
    "Content-type":"application/json"
  });
  getAllHistorico(){
    return this.http.get<any[]>(this.baseurl)
  }
  getBetweenHistorico(f1,f2){
    return this.http.get<any[]>(this.baseurl+'?filter={"where": {"FechaSincronizacion": {"between": ["'+f1+'","'+f2+'"]}}}')
  }
  getBetweenHistoricoDashB(f1,f2){
    return this.http.get<any[]>(this.baseurlView+'?filter={"where": {"Fecha": {"between": ["'+f1+'","'+f2+'"]}}}')
  }
  submitHistorico(data){
    return this.http
    .post<any>(this.baseurl, data)
    .pipe(map(data => data));
  }
  updateHistorico(data){
    const id = data.id;
    return this.http
    .put<any>(this.baseurl+id,data,{ headers:this.headers})
    .pipe(map(data =>data));
  }
  deletedHistorico(id: string){
    return this.http
    .delete<any>(this.baseurl+id, {headers: this.headers})
    .pipe(map(data => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      ServicioWeb : '' ,
      Estado : '' ,
      Mensaje : '' ,
      FechaSincronizacion : '' ,
      CUIS : '' ,
      Nit : '' ,
      codigoAutorizacion : '' ,
      idUsuario : '' ,
      codigoError : '' 
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data));
  }

}

  