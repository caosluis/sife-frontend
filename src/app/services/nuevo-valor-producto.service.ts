import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, throwError } from 'rxjs';
import { Crearpdv } from '../models/crearpdv';
import { map } from 'rxjs/operators'; 
import * as _ from 'lodash';
import * as glob from "../global";

@Injectable({
  providedIn: 'root'
})
export class NuevoValorProductoService {
  //base_url = "http://hanlpzdk01.hansa.com.bo:35/";
  base_url = glob.host+glob.port+"/";
  
  constructor(private http:HttpClient) { }
  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    codigoSucursal: new FormControl(''),
    cuis: new FormControl(''),
    descripcion: new FormControl(''),
    nit: new FormControl(''),
  });
  formVal: FormGroup = new FormGroup({
    codigoSolicitud: new FormControl('')
  });
  headers : HttpHeaders = new HttpHeaders({
    "Content-type":"application/json"
  });
  submitNVP(data){
    let datos = {
      descripcion:data.descripcion,
      idUsuario:"RKANTUTA"
    } 
    return this.http
    .post(this.base_url+"api/muleRests/NuevoValorProducto", datos)
    .pipe(map(data => data));
  }
  ValidarNVP(data){
    let datos = {
      codigoSolicitud:String(data.codigoSolicitud),
      idUsuario:"RKANTUTA"
    } 
    return this.http
    .post(this.base_url+"api/muleRests/validacionSolicitudNuevoValorProducto", datos)
    .pipe(map(data => data));
  }
  getAllNuevoValorProducto(){
    return this.http.get<any[]>(this.base_url+"api/sife_recepcionSolicitudNuevoValorProducto");
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      codigoSucursal: '',
      cuis: '',
      descripcion: '',
      nit:''
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data,'empresaName'));
  }
}
