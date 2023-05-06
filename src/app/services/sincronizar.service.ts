import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Socket } from "ngx-socket-io";
import { Countsincronizar } from "../models/countsincronizar";
import { Sincronizar } from "../models/sincronizar";
import { map } from "rxjs/operators";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class SincronizarService {
  //base_url = "http://hanlpzdk01.hansa.com.bo:35/api/muleRests/sincronizar";
  //url_api = 'http://hanlpzdk01.hansa.com.bo:35/api/sife_sincronizar';
  //base_urlResic = "http://hanlpzdk01.hansa.com.bo:35/api/muleRests/sincronizarTodo";

  base_url = glob.host +  glob.port + "/api/muleRests/sincronizar";
  url_api = glob.host +  glob.port + "/api/sife_sincronizar";
  base_urlResic =
    glob.host +  glob.port + "/api/muleRests/sincronizarTodo";

  sincronizar = this.socket.fromEvent<Document>("facturasincronizacion");
  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  constructor(private http: HttpClient, private socket: Socket) { }
  getAllSincronizar(empresa) {
    const url =
      glob.host +
      
      glob.port +
      '/api/sife_sincronizar?filter={"where":{"Nit":"' +
      empresa +
      '"}}';
    return this.http.get<any>(url);
  }
  getCountSincronizar(empresa) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_sincronizar/count?where={"Nit":"'+ empresa +'","Estado":0}';
    return this.http.get<Countsincronizar[]>(url_api);
  }
  getCountSincronizados(empresa) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_sincronizar/count?where={"Estado":1,"Nit":"'+ empresa +'"}';
    return this.http.get<Countsincronizar[]>(url_api);
  }
  getCountCatalogos() {
    const url_api = glob.host +  glob.port + "/api/sife_sincronizar/count";
    return this.http.get<Countsincronizar[]>(url_api);
  }
  submitSolSincronizar(data) {
    const url = glob.host +  glob.port + "/api/muleRests/sincronizar";
    /* const url =
      "http://localhost" +  "3000" + "/api/muleRests/sincronizar"; */
    return this.http
      .post<any>(url, data, { headers: this.headers })
      .toPromise();
  }

  resincronizar(datos) {
    const url = glob.host +  glob.port + "/api/muleRests/sincronizarTodo";
    /* const url =
      "http://localhost" +  "3000" + "/api/muleRests/sincronizarTodo"; */
    return this.http.post<any>(url, datos, { headers: this.headers });
  }
  getProductoServ(empresa, servicio) {
    const url = glob.host +  glob.port + '/api/sife_sincronizar' + servicio + '?filter={"where":{"nit":"'+empresa+'"}}';
    return this.http.get<any[]>(url);
  }
  getDocumentoSector(servicio, actividadEconomica) {
    return this.http.get<any[]>(
      this.url_api +
      servicio +
      '?filter={"where":{"codigoCaeb":' +
      actividadEconomica +
      "}}"
    );
  }
  actualizarEstadoCatalogos(codigoClasificador, data, ServicioWeb) {
    if (ServicioWeb == "Actividades") {
      // Homologacion de catalogos actividades CASO ESPECIAL de ACTIVIDADES
      return this.http
        .post(
          this.url_api +
          ServicioWeb +
          '/update?where={"codigoCaeb":"' +
          codigoClasificador +
          '"}',
          data,
          { headers: this.headers }
        )
        .pipe(map((data) => data));
    } else {
      // Homologacion de catalogos
      return this.http
        .post(
          this.url_api +
          ServicioWeb +
          '/update?where={"codigoClasificador":"' +
          codigoClasificador +
          '"}',
          data,
          { headers: this.headers }
        )
        .pipe(map((data) => data));
    }
  }
  buscarCatalogoProducto(codigoProducto) {
    return this.http.get<any[]>(
      this.url_api +
      "ListaProductosServicios" +
      '?filter={"where":{"codigoProducto":' +
      codigoProducto +
      "}}"
    );
  }
  sife_sincronizarParametricaTipoPuntoVenta_get_filter(TipoPuntoVenta) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_sincronizarParametricaTipoPuntoVenta?filter={"where":{"codigoClasificador":"' +
      TipoPuntoVenta.value +
      '"}}';
    return this.http.get<any[]>(url_api).toPromise();
  }
}
