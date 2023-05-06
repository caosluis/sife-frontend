import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import * as _ from "lodash";
import * as glob from "../global";
import * as moment from "moment";
import { MatTableDataSource } from "@angular/material/table";

@Injectable({
  providedIn: "root",
})
export class SifeAutenticacionService {
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
  sife_usuarios_conexion(empresa) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_token_users?filter={"where":{"nit":"' +
      empresa +
      '"}}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_usuarios_conexion_registrar(datos) {
    const url_api = glob.host +  glob.port + "/api/sife_token_users";
    return this.http.post<any[]>(url_api, datos).toPromise();
  }
  sife_usuarios_conexion_modificar(datos, id) {
    const url_api = glob.host +  glob.port + "/api/sife_token_users/" + id;

    return this.http.patch<any[]>(url_api, datos).toPromise();
  }
  sife_tokens_mule_autenticacion(datos) {
    const url_api =
      glob.host +  glob.port + "/api/sife_tokens/autenticacion";

    return this.http.post<any>(url_api, datos).toPromise();
  }
}
