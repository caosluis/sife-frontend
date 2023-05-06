import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Socket } from "ngx-socket-io";
import { SifeFechaHora } from "../models/sife-fecha-hora";
import * as glob from "../global";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class SifeFechaHoraService {
  sifefechahora = this.socket.fromEvent<Document>("sifefechahora");
  constructor(private http: HttpClient, private socket: Socket) {}
  getAllSifefechahora() {
    //const url_api = 'http://192.168.1.101:35/api/sife_FechaHora';
    const url_api = glob.host +  glob.port + "/api/sife_FechaHora";

    return this.http.get<SifeFechaHora[]>(url_api);
  }
  sife_FechaHora_get() {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_FechaHora?filter={"order":["fechaHora ASC"]}';
    return this.http.get<any>(url_api).toPromise();
  }

  sife_FechaHora_Hs_get(fecha) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_FechaHora_Hs?filter={"where":{"fechaHora":{"between":["' +
      Fecha +
      'T00:00:00.000Z","' +
      Fecha +
      'T23:59:59.999Z"]}},"order":["fechaHora ASC"]}';
    return this.http.get<any>(url_api).toPromise();
  }
  sife_mule_FechaHora_post(datos) {
    const url_api =
      glob.host +  glob.port + "/api/sife_FechaHora/solicitafecha";
    return this.http.post<any>(url_api, datos).toPromise();
  }
}
