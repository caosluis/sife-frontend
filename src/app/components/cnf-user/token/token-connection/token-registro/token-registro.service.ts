import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import * as _ from "lodash";
import * as glob from "../../../../../global";
import * as moment from "moment";
import { MatTableDataSource } from "@angular/material/table";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TokenRegistroService {
  public _refresh$ = new Subject<void>();
  CnfGlobal: Observable<any>;
  public dataSource: MatTableDataSource<any>;
  constructor(private http: HttpClient) {}

  sife_token_registros(empresa, fecha) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
      glob.host +
    
      glob.port +
      '/api/sife_tokens?filter={"where":{"nit":"' +
      empresa +
      '","fechaCreacion":{"between":["' +
      Fecha +
      'T00:00:00.000Z","' +
      Fecha +
      'T23:59:59.999Z"]}},"order":["fechaCreacion ASC"]}';
    return this.http.get<any>(url_api).toPromise();
  }

  sife_token_registros_historico(empresa, fecha) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
      glob.host +
    
      glob.port +
      '/api/sife_token_hs?filter={"where":{"nit":"' +
      empresa +
      '","fechaCreacion":{"between":["' +
      Fecha +
      'T00:00:00.000Z","' +
      Fecha +
      'T23:59:59.999Z"]}},"order":["fechaCreacion ASC"]}';
    return this.http.get<any>(url_api).toPromise();
  }
 

  sife_tokens_registro__modificar(datos, id) {
    const url_api = glob.host + glob.port + "/api/sife_token_registro/" + id;

    return this.http.patch<any[]>(url_api, datos)
    .pipe(
      tap(() => {
          this._refresh$.next();
      })
    )
    .toPromise();
  }

  sife_tokens_registro_existe(empresa) {
    const url_api = glob.host + glob.port + '/api/sife_token_registro/count?where={"nit":"'+empresa+'","estado":"1"}';

    return this.http.get<any>(url_api).toPromise();
  }

  sife_tokens_registro_post(datos) {
    const url_api = glob.host + glob.port + "/api/sife_token_registro";

    return this.http.post<any>(url_api, datos)
    .pipe(
        tap(() => {
            this._refresh$.next();
        })
    )
    .toPromise()
    ;
  }

  sife_tokens_registro_get(empresa){
    const url_api = glob.host + glob.port + '/api/sife_token_registro?filter={"where":{"nit":"'+empresa+'"},"order":["fechaCreacion DESC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }

  sife_tokens_fecha(empresa) {
    const url =
      glob.host +
    
      glob.port +
      '/api/sife_token_registro?filter={"where":{"nit":"'+empresa +'","estado":"1"},"order":["fechaVigencia DESC"]}';

    return this.http.get<any>(url).toPromise();
  }

  sife_cert_fecha() {
    const url =
      glob.host +
    
      glob.port +
      '/api/sife_certificados?filter={"where":{"id":"1"}}';

    return this.http.get<any>(url).toPromise();
  }
}
