import { Injectable } from "@angular/core";
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
export class CufdsincronizacionService {
  public _refresh$ = new Subject<void>();
  CnfGlobal: Observable<any>;
  public dataSource: MatTableDataSource<any>;
  constructor(private http: HttpClient) {}

  sife_cufd_sincronizacion_get(empresa){
    const url_api = glob.host + glob.port + '/api/sife_cufd_sincronizas?filter={"where":{"nit":"'+empresa+'","order":["fechaCreacion DESC"]}}';
    return this.http.get<any[]>(url_api).toPromise();
  }

  sife_cufd_sincronizacion_get_fecha(empresa,fecha){
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    console.log(Fecha +" "+empresa)
    const url_api = glob.host + glob.port + '/api/sife_cufd_sincroniza_hs?filter={"where":{"nit":"' +empresa +'","fechaSincronizacion":{"between":["' +Fecha +'T00:00:00.000Z","' +Fecha +'T23:59:59.999Z"]}},"order":["fechaSincronizacion DESC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
}
