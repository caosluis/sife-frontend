import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as glob from "../global";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class ContingenciasService {
  constructor(private http: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  sife_contingencias_get(empresa) {
    const url_api =
      glob.host +      
      glob.port +
      '/api/sife_contingencias?filter={"where":{"nit":"' + empresa + '"},"order":["fechaHoraInicioEvento DESC"]}';
    return this.http.get<any>(url_api).toPromise();
  }
  sife_contingencias_get_count(fecha) {
    let year = moment(fecha).format("YYYY");
    let month = moment(fecha).format("MM");
    let day = moment(fecha).format("D");
    const url_api =
      glob.host +      
      glob.port +
      "/api/sife_contingencias/cantidadContingencias?Year=" +
      year +
      "&Month=" +
      month +
      "&Day=" +
      day;
    return this.http.get<any>(url_api).toPromise();
  }
}
