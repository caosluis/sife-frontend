import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as glob from "../global";

@Injectable({
  providedIn: 'root'
})
export class TipoMetodoPagoService {

  constructor(private http: HttpClient) { }
  sife_tipo_metodo_pago_get() {
    const url_api = glob.host + glob.port + "/api/sife_sincronizarParametricaTipoMetodoPago";
    return this.http.get<any[]>(url_api).toPromise();
  }
}
