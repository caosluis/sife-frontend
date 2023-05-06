import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import * as _ from "lodash";
import * as glob from "../global";

@Injectable({
  providedIn: 'root'
})
export class QrdireccionService {

  constructor(private http: HttpClient) { }

  sife_qr_direccions_get() {
    const url_api =
      glob.host +
      glob.port +
      '/api/sife_qr_direccions/1';
    return this.http.get<any>(url_api).toPromise();
  }
}
