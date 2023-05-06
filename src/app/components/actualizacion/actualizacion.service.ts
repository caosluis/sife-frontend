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
export class ActualizacionService {
  public _refresh$ = new Subject<void>();

  public dataSource: MatTableDataSource<any>;
  constructor(private http: HttpClient) {}

  sife_actualizacion_get(){
    const url_api = glob.host + glob.port + '/api/sife_actualizacions?filter={"order":["fechaCreacion DESC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_actualizacion_registro_post(datos){
    const url_api = glob.host + glob.port + "/api/sife_actualizacions";

    return this.http.post<any>(url_api, datos)
    .pipe(
        tap(() => {
            this._refresh$.next();
        })
    )
    .toPromise()
    ;
  }
  sife_actualizacion_registro_modificar(datos, id) {
    const url_api = glob.host + glob.port + "/api/sife_actualizacions/" + id;

    return this.http.patch<any[]>(url_api, datos)
    .pipe(
      tap(() => {
          this._refresh$.next();
      })
    )
    .toPromise();
  }
  sife_actualizacion_registro_existe() {
    const url_api = glob.host + glob.port + '/api/sife_actualizacions/count?where={"estado":"Activo"}';

    return this.http.get<any>(url_api).toPromise();
  }
  sife_actualizacions(datos){
    const url_api = glob.host + glob.port +'/api/sife_actualizacions/actualizasiat';

    return this.http.post<any>(url_api, datos)
    .pipe(
        tap(() => {
            this._refresh$.next();
        })
    )
    .toPromise()
    ;
  }
}
