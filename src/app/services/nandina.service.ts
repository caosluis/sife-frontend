
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as glob from "../global";

@Injectable({
  providedIn: 'root'
})
export class NandinaService {
  //baseurl = "http://hanlpzdk01.hansa.com.bo:35/api/sife_sincronizarListaProductosServiciosNandina/";
  baseurl = glob.host+glob.port+"/api/sife_sincronizarListaProductosServiciosNandina/";
  constructor(private http:HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
 idProductosServicios : new FormControl(''),
 nandina : new FormControl(''),
 fecha : new FormControl('')
  });

  headers : HttpHeaders = new HttpHeaders({
    "Content-type":"application/json"
  });
  getAllNandina(idCatalogo){
    return this.http.get<any[]>(this.baseurl+'?filter={"where":{"idProductosServicios":"'+idCatalogo+'"}}')
  }
  submitNandina(data){
    return this.http
    .post<any>(this.baseurl, data)
    .pipe(map(data => data));
  }
  updateNandina(data){
    const id = data.id;
    return this.http
    .put<any>(this.baseurl+id,data,{ headers:this.headers})
    .pipe(map(data =>data));
  }
  deletedNandina(id: string){
    return this.http
    .delete<any>(this.baseurl+id, {headers: this.headers})
    .pipe(map(data => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
 idProductosServicios : '' ,
 nandina : '' ,
 fecha : '' 
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data));
  }
}

  