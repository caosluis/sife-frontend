import { Injectable } from "@angular/core";
import * as glob from "../global";
import * as moment from "moment";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, throwError } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FacturaElectronicaLoteService {
  public _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) {}
  
  sife_facturaElectronica_lote_get(empresa, fecha) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_facturaElectronica_lote?filter={"where": {"nit":"' +
      empresa +
      '","fecha": {"between": ["' +
      Fecha +
      'T00:00:00.000Z","' +
      Fecha +
      'T23:59:59.999Z"]}},"order":["fecha DESC"]}';

    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_facturaElectronica_lote_estado_get(idlote) {
    const url_api = glob.host + glob.port + '/api/sife_facturaElectronica_lote_estado?filter={"where":{"idlote":"' + idlote + '"},"order":["fecha DESC"]}';

    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_facturaElectronica_lote_verificar(Lote) {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_facturaElectronica_lote/validapaquete";
    return this.http.post<any>(url_api, Lote).toPromise();
  }
  sife_facturaElectronica_lote_get_limit(Lote) {
    const url_api =
      glob.host +  glob.port + "/api/sife_facturaElectronica_lote/" + Lote;
    return this.http.get<any>(url_api).toPromise();
  }

  sife_offlineregistraeventos(empresa){
    const url_api =
      glob.host +  glob.port + "/api/sife_facturaElectronica_lote/mule/offlineregistraeventos";
    return this.http.post<any>(url_api, empresa).toPromise();
  }

  sife_facturaElectronica_lote_reenvio(Lote) {
    console.log("LOS DATOS SON" + JSON.stringify(Lote))
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_facturaElectronica_lote/mule/offlineenviopaquete";
    return this.http.post<any>(url_api, Lote).toPromise();
  }

  sife_facturaElectronica_lote_estado(dato) {
    console.log("LOS DATOS SON" + JSON.stringify(dato))
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_facturaElectronica_offline_procesos/1";
    return this.http.patch<any>(url_api, dato).pipe(
      tap(() => {
          this._refresh$.next();
      })
    )
    .toPromise();
  }

  sife_facturaElectronica_lote_cantidadEstado_0(empresa){
    const url_api =
      glob.host +  glob.port + '/api/sife_facturaElectronica_lote/count?where={"estado":"0","nit":"'+empresa+'"}';
    return this.http.get<any>(url_api).toPromise();
  }
  sife_facturaElectronica_lote_cantidadEstado_1(empresa){
    const url_api =
      glob.host +  glob.port + '/api/sife_facturaElectronica_lote/count?where={"estado":"1","nit":"'+empresa+'"}';
    return this.http.get<any>(url_api).toPromise();
  }
  sife_facturaElectronica_lote_cantidadEstado_2(empresa){
    const url_api =
      glob.host +  glob.port + '/api/sife_facturaElectronica_lote/count?where={"estado":"2","nit":"'+empresa+'"}';
    return this.http.get<any>(url_api).toPromise();
  }
  sife_facturaElectronica_lote_cantidadEstado_3(empresa){
    const url_api =
      glob.host +  glob.port + '/api/sife_facturaElectronica_lote/count?where={"estado":"3","nit":"'+empresa+'"}';
    return this.http.get<any>(url_api).toPromise();
  }
  sife_facturaElectronica_lote_cantidadEstado_5(empresa){
    const url_api =
      glob.host +  glob.port + '/api/sife_facturaElectronica_lote/count?where={"estado":"5","nit":"'+empresa+'"}';
    return this.http.get<any>(url_api).toPromise();
  }
  sife_facturaElectronica_lote_cantidadEstado_7(empresa){
    const url_api =
      glob.host +  glob.port + '/api/sife_facturaElectronica_lote/count?where={"estado":"7","nit":"'+empresa+'"}';
    return this.http.get<any>(url_api).toPromise();
  }
}
