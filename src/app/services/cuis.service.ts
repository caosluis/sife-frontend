import { UserService } from "./user.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import { Cuis } from "./../models/cuis";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class CuisService {
  //baseurl = `http://hanlpzdk01.hansa.com.bo:35/api/sife_cuis/`;
  baseurl = glob.host + glob.port + "/api/sife_cuis/";

  constructor(private http: HttpClient, private userData: UserService) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    cuis: new FormControl(""),
    nit: new FormControl(""),
    nombre: new FormControl(""),
    estado: new FormControl(""),
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  headers2: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  sife_cuis_get() {
    this.baseurl = glob.host + glob.port + '/api/sife_cuis?filter={"order":["cuisVigencia DESC"]}';
    return this.http.get<any[]>(this.baseurl).toPromise();
  }

  sife_cuis_get_activos(nit) {
    const url =
      glob.host +
      
      glob.port +
      '/api/sife_cuis?filter={"where":{"estado":"Cuis Activo","nit":"' +
      nit +
      '"},"order":["cuisVigencia DESC"]}';
    return this.http.get<any>(url).toPromise();
  }

  sife_cuis_get_filter(sucursal, empresa) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_cuis?filter={"where":{"and":[{"codigoSucursal":"' +
      sucursal +
      '","codigoPDV":"0","estado":"Cuis Activo"},{"nit":"' +
      empresa +
      '"}]}}';

    return this.http.get<any[]>(url_api).toPromise();
  }

  submitCuis(cuis: Cuis) {
    //var url = 'http://hanlpzdk01.hansa.com.bo:700/solicitudCuis';
    var datos = {
      codigoSistema: String(0),
      codigoSucursal: String(0),
      nit: String(cuis.nit),
    };
    return this.http
      .post(this.baseurl + "api/muleRests/solicitudCuis", datos, {
        headers: this.headers2,
      })
      .pipe(map((data) => data))
      .toPromise();
  }
  updateCuis(cuis: Cuis) {
    const idCuis = cuis.id;
    return this.http
      .put<Cuis>(this.baseurl + idCuis, cuis, { headers: this.headers })
      .pipe(map((data) => data));
  }
  deletedCuis(id: string) {
    return this.http
      .delete<Cuis>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      cuis: "",
      nit: "",
      nombre: "",
      estado: "",
    });
  }
  populateForm(cuis: Cuis) {
    this.form.setValue(_.omit(cuis, "empresaName"));
  }
  
  get_sife_respuesta_global(nit){
    const url =
    glob.host + glob.port + '/api/sife_respuesta_global?filter={"where":{"nit":"' + nit + '"}}';
    return this.http.get<any>(url).toPromise();
  }
}
