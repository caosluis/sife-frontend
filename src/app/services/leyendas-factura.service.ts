import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class LeyendasFacturaService {
  constructor(private http: HttpClient) {}
  sife_leyendas_get() {
    const url_api =
      glob.host + glob.port + "/api/sife_sincronizarListaLeyendasFactura";
    return this.http.get<any[]>(url_api).toPromise();
  }
}
