import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import * as _ from "lodash";
import * as glob from "../global";
import { MatTableDataSource } from "@angular/material/table";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PdvService {
  public _refresh$ = new Subject<void>();
  public dataSource: MatTableDataSource<any>;

  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });

  sife_pdv_get(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_pdv?filter={"where":{"nit":"' +
      nit +
      '"},"order":["codigoPDV ASC"]}';
    return this.http.get<any[]>(url_api)    
    .toPromise();
  }
  sife_pdv_get_susursal(nit, sucursal) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_pdv?filter={"where":{"nit":"' +
      nit +
      '","codigoSucursal":"' +
      sucursal +
      '"},"order":["codigoPDV ASC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_pdv_get_activos(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_pdv?filter={"where":{"estado":"Cuis Activo","nit":"' + nit + '"},"order":["codigoPDV ASC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_pdv_get_all(nit, sucursal) {
    console.log(nit +" --- "+ sucursal);
    
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_pdv?filter={"where":{"estado":"Cuis Activo","nit":"' + nit + '", "codigoSucursal":"'+sucursal+'"},"order":["codigoPDV ASC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_pdv_post(pdv) {
    const url_api = glob.host +  glob.port + "/api/sife_pdv";
    return this.http
      .post<any[]>(url_api, pdv)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_pdv_patch(pdv, id) {
    const url_api = glob.host +  glob.port + "/api/sife_pdv/" + id;
    return this.http
      .patch<any[]>(url_api, pdv)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_pdv_mule_registrar(pdv) {
    console.log("DATOS ENVIADOS MULE" + JSON.stringify(pdv));
    
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_pdv/registropdv?PDV=" +
      JSON.stringify(pdv);
    return this.http
      .post<any[]>(url_api, pdv)
      .pipe(tap(() => {this._refresh$.next();}))
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_pdv_mule_consultar(pdv) {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_pdv/consultapdv?PDV=" +
      JSON.stringify(pdv);
    return this.http
      .post<any[]>(url_api, pdv)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_pdv_mule_cerrar(pdv, CuisSucursal) {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_pdv/cierrepdv?PDV=" +
      JSON.stringify(pdv) +
      "&CuisSucursal=" +
      CuisSucursal;
    return this.http
      .post<any>(url_api, pdv)
      .pipe(tap(() => {this._refresh$.next();}))
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_pdv_mule_cerrar_operaciones(pdv) {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_pdv/cierreoperacionessistemas?PDV=" +
      JSON.stringify(pdv);
    /* const url_api = 'http://localhost:3000/api/sife_pdv/cierreoperacionessistemas?PDV='+JSON.stringify(pdv) */
    return this.http
      .post<any>(url_api, pdv)
      .pipe(tap(() => {this._refresh$.next();}))
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_pdv_mule_solicitarCuis(pdv) {
    const url_api =
      glob.host +  glob.port + "/api/sife_pdv/solicitacuispdv";
    return this.http
      .post<any>(url_api, pdv, { headers: this.headers })
      .pipe(tap(() => {this._refresh$.next();}))
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_pdv_mule_solicitarCufd(pdv) {
    const url_api = glob.host +  glob.port + "/api/sife_pdv/solicitacufd";
    return this.http
      .post<any>(url_api, pdv, { headers: this.headers })
      .pipe(tap(() => {this._refresh$.next();}))
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_pdvEstado_get(pdv) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_pdvEstado?filter={"where":{"idPdv":"' +
      pdv +
      '"},"order":["fechaCreacion DESC"]}';
    return this.http.get<any[]>(url_api)
    .toPromise();
  }
  sife_pdv_mule_solicitacuispdvmasivo_post(empresa) {
    const url_api =
      glob.host +  glob.port + "/api/sife_pdv/solicitacuispdvmasivo";
    return this.http
      .post<any>(url_api, empresa, { headers: this.headers })
      .pipe(tap(() => {this._refresh$.next();}))
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
}
