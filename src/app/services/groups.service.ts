import { UserService } from './user.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as glob from "../global";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  //baseurl = "http://hanlpzdk01.hansa.com.bo:35/api/sife_grupo/";
  //baseurlUserGroup = "http://docker.hansa.com.bo:35/api/sife_user_grupo/"

  baseurl = glob.host+glob.port+"/api/sife_grupo/";
  baseurlUserGroup = glob.host+glob.port+"/api/sife_user_grupo/"
  constructor(private http: HttpClient, public userS: UserService) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre_grupo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    estado: new FormControl(''),
    ACL: new FormControl(''),
    cuis: new FormControl(''),
    tipo: new FormControl('')
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json"
  });
  getAllGroups() {
    /* if (this.userS.sesion["nivelAcceso"] == "551eac71-5b53-4785-b96f-4cbaab197012") {
      return this.http.get<any[]>(this.baseurl)
    } else if (this.userS.sesion["nivelAcceso"] == "7faa0d5e-5fb1-4476-94ab-216f5191a341") {
      return this.http.get<any[]>(this.baseurl + '?filter={"where":{"cuis":"' + this.userS.sesion["cuis"] + '"}}')
    } */
    return this.http.get<any[]>(this.baseurl)
  }
  submitGroups(data) {
    return this.http
      .post<any>(this.baseurl, data)
      .pipe(map(data => data));
  }
  updateGroups(data) {
    const id = data.id;
    return this.http
      .put<any>(this.baseurl + id, data, { headers: this.headers })
      .pipe(map(data => data));
  }
  deletedGroups(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map(data => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      nombre_grupo: '',
      descripcion: '',
      estado: '',
      ACL: '',
      cuis: '',
      tipo: ''
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data));
  }
  // Funciones para asigacación de usuarios y creación de grupos 
  asignarUserGroup(data) {
    return this.http
      .post<any>(this.baseurlUserGroup, data)
      .pipe(map(data => data));
  }
  estaAsignado(id_user) {
    return this.http.get<any[]>(this.baseurlUserGroup + '?filter={"where":{"id_user":' + id_user + '}}')
  }
  actualizarRelGrupo(data) {
    const id = data.id;
    return this.http
      .put<any>(this.baseurlUserGroup + id, data, { headers: this.headers })
      .pipe(map(data => data));
  }
  deletedRelGroups(id: string) {
    return this.http
      .delete<any>(this.baseurlUserGroup + id, { headers: this.headers })
      .pipe(map(data => data));
  }
}

