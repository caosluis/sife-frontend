import { UserService } from "./user.service";

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class FirmaDigitalService {
  //baseurl = "http://hanlpzdk03.hansa.com.bo:35/api/sife_firmaDigital/";
  baseurl = glob.host + glob.port + "/api/sife_firmaDigital/";
  constructor(private http: HttpClient, private userData: UserService) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    descripcion: new FormControl(null),
    idUsuario: new FormControl(""),
    firma: new FormControl(""),
    empresa: new FormControl(""),
    sucursal: new FormControl(""),
    fechaRegistro: new FormControl(""),
    fechaVigencia: new FormControl(""),
    estado: new FormControl(""),
    tipo: new FormControl(""),
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  getAllFirmaDigital(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_firmaDigital?filter={"where":{"empresa":"' +
      nit +
      '"},"order":"estado DESC"}';
    return this.http.get<any>(url_api);
  }
  getAllFechaFirmaDigital(empresa) {
    const url =
      glob.host +
      
      glob.port +
      '/api/sife_firmaDigital?filter={"where":{"empresa":"' +
      empresa +
      '","estado":"1","tipo":"Firma validada"},"order":"fechaVigencia DESC"}';

    return this.http.get<any>(url).toPromise();
  }
  revocaFirma(data){  
    console.log("Datos a enviar LP: " + JSON.stringify(data));
    
      return this.http
      .post(this.baseurl + "notificaCertificadoRevocado", data)
      .pipe(map(data => data));    
  }
  sife_firmaDigital_post(data) {
    console.log("ENVIO " + data);
    
    return this.http.post<any>(this.baseurl, data).pipe(map((data) => data));
  }
  sife_firmaDigital_patch(data, id) {
    return this.http
      .patch<any>(this.baseurl + id, data, { headers: this.headers })
      .pipe(map((data) => data));
  }
  actualizarEstadoFirma(id, data) {
    const url = glob.host + glob.port + "/api/sife_firmaDigital/" + id;
    return this.http
      .patch<any>(url, data, { headers: this.headers })
      .toPromise();
  }
  deletedFirmaDigital(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      descripcion: "",
      idUsuario: "",
      empresa: "",
      sucursal: "",
      firma: "",
      fechaRegistro: "",
      fechaVigencia: "",
      estado: "",
      tipo: "",
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data, "empresaName"));
  }
}
