import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import * as _ from "lodash";
import * as glob from "../../global";
import * as moment from "moment";
import { MatTableDataSource } from "@angular/material/table";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {
  public _refresh$ = new Subject<void>();
  CnfGlobal: Observable<any>;
  public dataSource: MatTableDataSource<any>;
  constructor(private http: HttpClient) {}

  sife_autorizacion_get(empresa){
    const url_api = glob.host + glob.port + '/api/sife_autorizacion?filter={"where":{"nit":"'+empresa+'"},"order":["fechaCreacion DESC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_autorizacion_registro_post(datos){
    const url_api = glob.host + glob.port + "/api/sife_autorizacion";

    return this.http.post<any>(url_api, datos)
    .pipe(
        tap(() => {
            this._refresh$.next();
        })
    )
    .toPromise()
    ;
  }
  sife_autorizacion_registro_modificar(datos, id) {
    const url_api = glob.host + glob.port + "/api/sife_autorizacion/" + id;

    return this.http.patch<any[]>(url_api, datos)
    .pipe(
      tap(() => {
          this._refresh$.next();
      })
    )
    .toPromise();
  }
  sife_autorizacion_registro_existe(empresa) {
    const url_api = glob.host + glob.port + '/api/sife_autorizacion/count?where={"nit":"'+empresa+'","estado":"1"}';

    return this.http.get<any>(url_api).toPromise();
  }
  sife_autorizacion_registro_version(empresa) {

    const url_api = glob.host + glob.port + '/api/sife_autorizacion?filter={"where":{"nit":"'+empresa+'","estado":"1"}}';

    return this.http.get<any>(url_api).toPromise();
  }

}
