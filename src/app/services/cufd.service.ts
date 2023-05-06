import { UserService } from "./user.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import * as glob from "../global";
import * as moment from "moment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CufdService {
  //baseurl = "http://hanlpzdk01.hansa.com.bo:35/api/view_sife_cufd";
  baseurl = glob.host + glob.port + "/api/view_sife_cufd";
  url = glob.host;
  port = glob.port;

  constructor(private http: HttpClient, private userData: UserService) { }

  form: FormGroup = new FormGroup({
    codigoPDV: new FormControl(null),
    cuis: new FormControl(""),
    cufd: new FormControl(""),
    fechaVigencia: new FormControl(""),
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  getAllCufd(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_cufd?filter={"where":{"nit":"' +
      nit +
      '"}}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  getCufd(cufd: String) {
    return this.http.get<any[]>(
      this.baseurl + `?filter={"where":{"cufd":"` + cufd + `"}}`
    );
  }
  submitCufd(data) {
    return this.http.post<any>(this.baseurl, data).pipe(map((data) => data));
  }
  updateCufd(data) {
    const codigoPDV = data.codigoPDV;
    return this.http
      .put<any>(this.baseurl + codigoPDV, data, { headers: this.headers })
      .pipe(map((data) => data));
  }
  deletedCufd(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      codigoPDV: null,
      cuis: "",
      cufd: "",
      fechaVigencia: "",
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data));
  }
  sife_cufd(fecha, empresa, sucursal, pdv) {
    if (sucursal == "Todas") {
      if (pdv == "Todos") {
        const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd?filter={"where":{"nit":"' +
          empresa +
          '"},"order":["fechaVigencia ASC"]}';
        return this.http.get<any[]>(url_api).toPromise();
      } else {
        const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd?filter={"where":{"nit":"' +
          empresa +
          '","codigoPDV":"' +
          pdv +
          '"},"order":["fechaVigencia ASC"]}';

        return this.http.get<any[]>(url_api).toPromise();
      }
    } else {
      if (pdv == "Todos") {
        const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd?filter={"where":{"nit":"' +
          empresa +
          '","codigoSucursal":"' +
          sucursal +
          '"},"order":["fechaVigencia ASC"]}';

        return this.http.get<any[]>(url_api).toPromise();
      } else {
        const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd?filter={"where":{"nit":"' +
          empresa +
          '","codigoSucursal":"' +
          sucursal +
          '","codigoPDV":"' +
          pdv +
          '"},"order":["fechaVigencia ASC"]}';

        return this.http.get<any[]>(url_api).toPromise();
      }
    }
  }
  sife_cufd_get(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_cufd?filter={"where":{"nit":"' +
      nit +
      '"},"order":["fechaVigencia ASC"]}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_cufd_sincronizas(nit) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_cufd_sincronizas?filter={ "fields": {"fechaSincronizacion": true,"transaccion": true} ,"where":{"nit":"' +
      nit +
      '"}}';
    return this.http.get<any>(url_api).toPromise();
  }

  sife_cufd_mule_solicitacufdmasivo_post(nit) {
    const url_api =
      glob.host + glob.port + "/api/sife_cufd/solicitacufdmasivo";
    /* const url_api = "http://localhost:3000/api/sife_cufd/solicitacufdmasivo"; */
    return this.http
      .post<any>(url_api, {
        nit: nit,
      })
      .toPromise();
  }

  sife_cufd_mule_enviarcufdSAP_post(cufd): Observable<any> {
    const url_api =
      glob.host + glob.port + "/api/sife_cufd/enviarcufdSAP";
    return this.http
      .post<any>(url_api, cufd);
  }

  sife_cufd_sin_envio_contribuyente(nit) {
    const url_api = glob.host + glob.port + '/api/sife_cufd/count?where={"transaccionOrigen":"1","nit":"'+nit+'"}';
    return this.http.get<any>(url_api).toPromise();
  }
  sife_cufd_total(nit) {
    const url_api = glob.host + glob.port + '/api/sife_cufd/count?where={"nit":"'+nit+'"}';
    return this.http.get<any>(url_api).toPromise();
  }
}
