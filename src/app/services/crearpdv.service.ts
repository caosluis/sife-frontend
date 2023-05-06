import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, throwError } from 'rxjs';
import { Crearpdv } from '../models/crearpdv';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { UserService } from './user.service';
import * as glob from "../global";
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class CrearpdvService {

  //baseurl = `http://hanlpzdk01.hansa.com.bo:35/`;
  baseurl = glob.host + glob.port + '/';
  // base_url2 = 'http://hanlpzdk01.hansa.com.bo:35/api/sife_pdv/';
  // baseurl = `http://hanlpzdk02.hansa.com.bo:400/registroPuntoVenta`;
  crear: Observable<any>;
  PDV: Observable<any>
  public dataSource: MatTableDataSource<any>;
  public idSucursal = 'todo';
  public cuis = 'todo'

  constructor(private http: HttpClient, private userData: UserService) { }
  form: FormGroup = new FormGroup({
    codigoSucursal: new FormControl(''),
    codigoTipoPuntoVenta: new FormControl(''),
    cuis: new FormControl(''),
    descripcion: new FormControl(''),
    nit: new FormControl(''),
    nombrePuntoVenta: new FormControl(''),
    codigoPDV: new FormControl(null)
  });
  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json"
  });
  submitPDV(crear: Crearpdv) {
    var data = {};
    if (this.userData.sesion["nivelAcceso"] == '551eac71-5b53-4785-b96f-4cbaab197012') {
      data = {
        codigoSistemaProveedor: "",
        codigoSucursal: crear.codigoSucursal,
        codigoTipoPuntoVenta: crear.codigoTipoPuntoVenta,
        cuis: crear.cuis,
        descripcion: crear.descripcion,
        nit: crear.nit,
        nombrePuntoVenta: crear.nombrePuntoVenta
      }
    } else if (this.userData.sesion["nivelAcceso"] == '7faa0d5e-5fb1-4476-94ab-216f5191a341') {
      data = {
        codigoSistemaProveedor: "",
        codigoSucursal: crear.codigoSucursal,
        codigoTipoPuntoVenta: crear.codigoTipoPuntoVenta,
        cuis: crear.cuis,
        descripcion: crear.descripcion,
        nit: crear.nit,
        nombrePuntoVenta: crear.nombrePuntoVenta
      }
    }

    return this.http
      .post(this.baseurl + "api/muleRests/registroPuntoVenta", data)
      .pipe(map(data => data));
  }
  getAllPdv() {
    /* if (this.userData.sesion["nivelAcceso"] != '551eac71-5b53-4785-b96f-4cbaab197012') {
      return this.http.get<any[]>(this.baseurl + 'api/sife_pdv?filter={"where":{"cuis":"' + this.userData.sesion["cuis"] + '"}}')
    } else if (this.userData.sesion["nivelAcceso"] == '551eac71-5b53-4785-b96f-4cbaab197012') {
      return this.http.get<any[]>(this.baseurl + 'api/sife_pdv')
    } */
    return this.http.get<any[]>(this.baseurl + 'api/sife_pdv/cargar_sife_pdv').toPromise()
  }
  getAllPdvFilter(idSucursal) {
    return this.http.get<any[]>(this.baseurl + 'api/sife_pdv?filter={"where":{"codigoSucursal":"' + idSucursal + '"}}')
  }
  getPdv(consulta) {
    return this.http.get<Crearpdv[]>(this.baseurl + "api/sife_pdv/" + consulta);
  }
  updatePDV(PDV: Crearpdv) {
    const idPDV = PDV.codigoPDV;
    return this.http
      .put<Crearpdv>(this.baseurl + "api/sife_pdv/" + idPDV, PDV, { headers: this.headers })
      .pipe(map(data => data));
  }
  deletedPDV(id: string) {
    let datoService = { codigoPDV: id };
    return this.http
      .post<Crearpdv>(this.baseurl + "api/muleRests/cierrePuntoVenta", datoService, { headers: this.headers })
      .pipe(map(data => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      codigoSucursal: '',
      codigoTipoPuntoVenta: '',
      cuis: '',
      descripcion: '',
      nit: '',
      nombrePuntoVenta: '',
      codigoPDV: null
    });
  }
  populateForm(PDV: Crearpdv) {
    this.form.setValue(_.omit(PDV, "empresaName", "sucursalName"));
  }
}
