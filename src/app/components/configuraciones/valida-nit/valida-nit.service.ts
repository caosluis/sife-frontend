import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import * as _ from "lodash";
import * as glob from "../../../global";
import * as moment from "moment";
import { MatTableDataSource } from "@angular/material/table";
import { tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ValidaNitService {
  public _refresh$ = new Subject<void>();
  CnfGlobal: Observable<any>;
  public dataSource: MatTableDataSource<any>;
  constructor(private http: HttpClient) {}

  sife_validaNit_post(datos) {
    const url_api = glob.host + glob.port + "/api/muleRests/verificarnit";
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
