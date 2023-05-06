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
export class UserDataService {
  //baseurl = "http://hanlpzdk01.hansa.com.bo:35/api/sife_user_data/";
  baseurl = glob.host +  glob.port + "/api/sife_user_data/";

  constructor(private http: HttpClient, public service: UserService) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    id_user: new FormControl(""),
    nombre: new FormControl(""),
    apellidos: new FormControl(""),
    telefono: new FormControl(""),
    cuis: new FormControl(""),
    division: new FormControl(""),
    regional: new FormControl(""),
    amercado: new FormControl(""),
    nivelAcceso: new FormControl(""),
    estado: new FormControl(""),
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  getAllUserData(empresa) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_user_data?filter={"where":{"empresa":"' +
      empresa +
      '"}}';

    return this.http.get<any[]>(url_api);
  }
  getUser(idUsuario) {
    return this.http.get<any[]>(
      this.baseurl + '?filter={"where":{"id_user":' + idUsuario + "}}"
    );
  }
  submitUserData(data) {
    return this.http
      .post<any>(this.baseurl, data)
      .pipe(map((data) => data))
      .toPromise();
  }
  updateUserData(id, data) {
    return this.http
      .patch<any>(this.baseurl + id, data, { headers: this.headers })
      .pipe(map((data) => data))
      .toPromise();
  }
  deletedUserData(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      id_user: "",
      nombre: "",
      apellidos: "",
      telefono: "",
      cuis: "",
      division: "",
      regional: "",
      amercado: "",
      nivelAcceso: "",
      estado: "",
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data, "empresaName"));
  }
}
