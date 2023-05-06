import { ConfGlobal } from './../models/inicio/conf-global';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as glob from "../global";

@Injectable({
  providedIn: 'root'
})
export class ConfGlobalesService {
  //baseurl = `http://hanlpzdk01.hansa.com.bo:35/api/sife_globals/`;
  baseurl = glob.host + glob.port + '/api/sife_globals/';
  CnfGlobal: Observable<any>
  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    Id: new FormControl(null),
    Grupo: new FormControl(''),
    Propiedad: new FormControl(''),
    Valor: new FormControl(''),
    Nombre: new FormControl(''),
    Bloquear: new FormControl('')
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json"
  });
  getAllConfGlobal() {
    return this.http.get<ConfGlobal[]>(this.baseurl)
  }
  submitConfGlobal(CnfGlobal: ConfGlobal) {
    return this.http
      .post<ConfGlobal>(this.baseurl, CnfGlobal)
      .pipe(map(data => data));
  }
  updateConfGlobal(CnfGlobal: ConfGlobal) {
    const idConfGlobal = CnfGlobal.Id;
    return this.http
      .patch<ConfGlobal>(this.baseurl + idConfGlobal, CnfGlobal, { headers: this.headers })
      .pipe(map(data => data));
  }
  deletedConfGlobal(id: string) {
    return this.http
      .delete<ConfGlobal>(this.baseurl + id, { headers: this.headers })
      .pipe(map(data => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      Id: null,
      Grupo: '',
      Propiedad: '',
      Valor: '',
      Nombre: '',
      Bloquear: ''
    });
  }
  populateForm(CnfGlobal: ConfGlobal) {
    this.form.setValue(_.omit(CnfGlobal));
  }
}
