import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class ConexionesService {
  constructor(private http: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  sife_conexiones_get() {
    const url_api = glob.host + glob.port + "/api/sife_EstadoServicios";
    return this.http.get<any[]>(url_api).toPromise();
  }
}
