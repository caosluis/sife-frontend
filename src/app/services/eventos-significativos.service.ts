import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class EventosSignificativosService {
  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  constructor(private http: HttpClient) {}
  sife_evento_significativo_get(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_sincronizarParametricaEventosSignificativos?filter={"where":{"nit":"'+nit+'"},"order":["codigoClasificador ASC"]}';      
    return this.http.get<any[]>(url_api).toPromise();
  }

  sife_registro_evento_significativo_mule_post(evento) {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_sincronizarParametricaEventosSignificativos/registroEventoSignificativo";
    /*  const url_api =
      
      "http://localhost:3000/api/sife_sincronizarParametricaEventosSignificativos/registroEventoSignificativo"; */
    return this.http
      .post<any>(url_api, evento, { headers: this.headers })
      .toPromise();
  }
  sife_consulta_evento_significativo_mule_post(evento) {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_sincronizarParametricaEventosSignificativos/consultaEventoSignificativo";
    /*  const url_api =
      
      "http://localhost:3000/api/sife_sincronizarParametricaEventosSignificativos/registroEventoSignificativo"; */
    return this.http
      .post<any>(url_api, evento, { headers: this.headers })
      .toPromise();
  }
}
