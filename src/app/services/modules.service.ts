import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class ModulesService {
  //baseurl = "http://hanlpzdk01.hansa.com.bo:35/api/sife_modulo/";
  baseurl = glob.host +  glob.port + "/api/sife_modulo/";
  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre_modulo: new FormControl(""),
    url_modulo: new FormControl(""),
    descripcion: new FormControl(""),
    roles_asignados: new FormControl(""),
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  getAllModules() {
    return this.http.get<any[]>(this.baseurl);
  }
  submitModules(data) {
    return this.http.post<any>(this.baseurl, data).pipe(map((data) => data)).toPromise();
  }
  updateModules(data) {
    const id = data.id;
    return this.http
      .patch<any>(this.baseurl + id, data, { headers: this.headers })
      .pipe(map((data) => data)).toPromise();
  }
  deletedModules(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      nombre_modulo: "",
      url_modulo: "",
      descripcion: "",
      roles_asignados: "",
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data));
  }
  buscarModule(module) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_modulo?filter={"where":{"estado":"' +
      module +
      '"}}';
    return this.http.get<any[]>(url_api).toPromise();
  }
}
