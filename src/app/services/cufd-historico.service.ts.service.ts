import { ConfGlobal } from "./../models/inicio/conf-global";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import * as _ from "lodash";
import * as glob from "../global";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class CufdHistoricoService {
  CnfGlobal: Observable<any>;

  constructor(private http: HttpClient) {}

  sife_cufd_historico(fecha, empresa, sucursal, pdv) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    if (sucursal == "Todas") {
      if (pdv == "Todos") {
        const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd_H?filter={"where":{"nit":"' +empresa +'","fechaVigencia":{"between":["' +Fecha +'T00:00:00.000Z","' +Fecha +'T23:59:59.999Z"]}},"order":["fechaVigencia ASC"]}';
        console.log(url_api);
        return this.http.get<any>(url_api).toPromise();
      } else {
        const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd_H?filter={"where":{"nit":"' +
          empresa +
          '","codigoPDV":"' +
          pdv +
          '","fecha":{"between":["' +
          Fecha +
          'T00:00:00.000Z","' +
          Fecha +
          'T23:59:59.999Z"]}},"order":["fechaVigencia ASC"]}';

        return this.http.get<any>(url_api).toPromise();
      }
    } else {
      if (pdv == "Todos") {
        const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd_H?filter={"where":{"nit":"' +
          empresa +
          '","codigoSucursal":"' +
          sucursal +
          '","fechaVigencia":{"between":["' +
          Fecha +
          'T00:00:00.000Z","' +
          Fecha +
          'T23:59:59.999Z"]}},"order":["fechaVigencia ASC"]}';

        return this.http.get<any>(url_api).toPromise();
      } else {
        const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd_H?filter={"where":{"nit":"' +
          empresa +
          '","codigoSucursal":"' +
          sucursal +
          '","codigoPDV":"' +
          pdv +
          '","fechaVigencia":{"between":["' +
          Fecha +
          'T00:00:00.000Z","' +
          Fecha +
          'T23:59:59.999Z"]}},"order":["fechaVigencia ASC"]}';

        return this.http.get<any>(url_api).toPromise();
      }
    }
  }

  sife_obitene_un_cufd_hoy(fecha, empresa, codigoSucursal, codigoPDV) {
    console.log("fecha: " + fecha);
    
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd?filter={"where":{"nit":"' +empresa +'", "codigoSucursal":"' + codigoSucursal +'", "codigoPDV":"' + codigoPDV +'", "fechaCreacion":{"between":["' +Fecha +'T00:00:00.000Z","' +Fecha +'T23:59:59.999Z"]}},"order":["fechaCreacion ASC"]}';
        console.log(url_api);
        return this.http.get<any>(url_api).toPromise();
  }

  sife_obtiene_un_cufdhistorico_hoy(fecha, empresa, codigoSucursal, codigoPDV) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
          glob.host +
          
          glob.port +
          '/api/sife_cufd_H?filter={"where":{"nit":"' +empresa +'", "codigoSucursal":"' + codigoSucursal +'", "codigoPDV":"' + codigoPDV +'", "fechaCreacion":{"between":["' +Fecha +'T00:00:00.000Z","' +Fecha +'T23:59:59.999Z"]}},"order":["fechaCreacion ASC"]}';
        console.log(url_api);
        return this.http.get<any>(url_api).toPromise();
  }
}
