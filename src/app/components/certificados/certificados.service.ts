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
export class CertificadosService {
  public _refresh$ = new Subject<void>();
  CnfGlobal: Observable<any>;
  public dataSource: MatTableDataSource<any>;
  constructor(
    private http: HttpClient
    ) {}

  sife_certificados_get(){
    const url_api = glob.host + glob.port + '/api/sife_certificados';
    return this.http.get<any[]>(url_api).toPromise();
  }
  
}
