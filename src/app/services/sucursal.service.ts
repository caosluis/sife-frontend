import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { tap } from "rxjs/operators";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import { UserService } from "./user.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class SucursalService {
  public _refresh$ = new Subject<void>();
  //baseurl = "http://hanlpzdk01.hansa.com.bo:35/api/sife_sucursal/";
  baseurl = glob.host +  glob.port + "/api/sife_sucursal/";
  public dataSource: MatTableDataSource<any>;
  public cuis = "todo";
  constructor(private http: HttpClient, private userData: UserService) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  sife_sucursal_get(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_sucursal?filter={"where":{"nit":"' + nit + '","estado":"Cuis Activo"},"order":["codigoSucursal ASC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_sucursal_tabla_get(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_sucursal?filter={"where":{"nit":"' +
      nit +
      '"},"order":["codigoSucursal ASC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_sucursal_get_activos() {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_sucursal?filter={"where":{"estado":"Activo"}}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_sucursal_get_cuis() {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_sucursal?filter={"where":{"estado":"Activo"}}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  getAllSucursalFilter(cuis) {
    return this.http.get<any[]>(
      this.baseurl + '?filter={"where":{"cuis":"' + cuis + '"}}'
    );
  }
  sife_sucursal_post(data) {
    return this.http
      .post<any>(this.baseurl, data)
      .pipe(tap(() => {this._refresh$.next();}))
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_sucursal_patch(data, id) {
    return this.http
      .patch<any>(this.baseurl + id, data)
      .pipe(tap(() => {this._refresh$.next();}))
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  deletedSucursal(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(tap(() => {this._refresh$.next();}))
      .pipe(map((data) => data))
      .toPromise();
  }

  sife_sucursales_rel_cuis_rel_empresa() {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_sucursal/cargar_sife_cuis_empresa_sucursal";
    return this.http.get<any[]>(url_api).toPromise();
  }

  sife_sucursal_mule_cerrar_operaciones(sucursal) {
    /* const url_api = 'http://localhost:3000/api/sife_sucursal/cierreoperacionessistemas?Sucursal='+JSON.stringify(sucursal) */
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_sucursal/cierreoperacionessistemas?Sucursal=" +
      JSON.stringify(sucursal);
    return this.http.post<any>(url_api, sucursal)
    .pipe(tap(() => {this._refresh$.next();}))
    .toPromise();
  }
  sife_sucursal_mule_solicitarCuis(sucursal) {
    /* const url_api =
      "http://localhost:3000/api/sife_sucursal/solicitacuissucursal" */

    const url_api =
      glob.host +  glob.port + "/api/sife_sucursal/solicitacuissucursal";
    return this.http
      .post<any>(url_api, JSON.stringify(sucursal), { headers: this.headers })
      .pipe(tap(() => {this._refresh$.next();}))
      .toPromise();
  }
  sife_sucursalEstado_get(sucursal) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_sucursalEstado?filter={"where":{"idSucursal":"' +
      sucursal +
      '"},"order":["fechaCreacion DESC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_pdv_mule_solicitacuissucursalmasivo_post(empresa) {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_sucursal/solicitacuissucursalmasivo";
    return this.http
      .post<any>(url_api, empresa, { headers: this.headers })
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
}
