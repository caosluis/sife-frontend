import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import * as glob from "../global";
import * as moment from "moment";
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class EmpresaService {
  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    cuis: new FormControl(""),
    nit: new FormControl(""),
    nombre: new FormControl(""),
    estado: new FormControl(""),
  });

  sife_empresa_get() {
    const url_api = glob.host +  glob.port + '/api/sife_empresas?filter={"order":["fechaCreacion DESC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_empresa_get_activos() {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_empresas?filter={"where":{"estado":"Activo"}}';
    return this.http.get<any>(url_api).toPromise();
  }
  sife_empresa_post(empresa) {
    const url_api = glob.host +  glob.port + "/api/sife_empresas";
    return this.http.post<any[]>(url_api, empresa).toPromise();
  }

  sife_empresa_patch(empresa, id) {
    const url_api = glob.host +  glob.port + "/api/sife_empresas/" + id;
    return this.http.patch<any[]>(url_api, empresa).toPromise();
  }

  sife_empresa_excluyendo(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_empresas?filter={"where":{"nit":{"neq":"' +
      nit +
      '"}}}';
    return this.http.get<any>(url_api).toPromise();
  }

  sife_facturaOrigen_get(empresa) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_facturaOrigen?filter={"where":{"nit":"' +
      empresa +
      '"}}';
    return this.http.get<any[]>(url_api).toPromise();
  }

  sife_facturaOrigen_post(facturaOrigen) {
    const url_api = glob.host +  glob.port + "/api/sife_facturaOrigen";
    return this.http.post<any[]>(url_api, facturaOrigen).toPromise();
  }
  sife_facturaOrigen_patch(id, facturaOrigen) {
    const url_api =
      glob.host +  glob.port + "/api/sife_facturaOrigen/" + id;
    return this.http.patch<any[]>(url_api, facturaOrigen).toPromise();
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
}
