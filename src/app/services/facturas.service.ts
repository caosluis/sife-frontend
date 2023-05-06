import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import * as glob from "../global";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class FacturasService {
  //baseurl = "http://hanlpzdk01.hansa.com.bo:35/api/sife_facturaElectronica/";
  //base_url = "http://docker.hansa.com.bo:35/api/sife_facturaElectronica_view/";
  //base_urlTablero = "http://docker.hansa.com.bo:35/api/sife_facturaElectronica_fe";
  //base_urlEstado = "http://hanlpzdk01.hansa.com.bo:35/api/sife_facturaElectronica_estado";
  //base_urlAnulacion = "http://hanlpzdk01.hansa.com.bo:35/api/muleRests/facturaElectronicaEstandarAnulacion";
  //base_url_count = "http://docker.hansa.com.bo:35/api/sife_facturaElectronica/count"
  //baseurlFirma = "http://docker.hansa.com.bo:35/api/sife_facturaElectronica_firma/"

  baseurl = glob.host + glob.port + "/api/sife_facturaElectronica/";
  base_url = glob.host + glob.port + "/api/sife_facturaElectronica_view/";
  base_urlTablero =
    glob.host + glob.port + "/api/sife_facturaElectronica_fe";
  base_urlEstado =
    glob.host + glob.port + "/api/sife_facturaElectronica_estado";
  base_urlAnulacion =
    glob.host +
    
    glob.port +
    "/api/muleRests/facturaElectronicaEstandarAnulacion";
  base_url_count =
    glob.host + glob.port + "/api/sife_facturaElectronica/count";
  baseurlFirma =
    glob.host + glob.port + "/api/sife_facturaElectronica_firma/";
  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    cuf: new FormControl(null),
    cuis: new FormControl({ value: "", disabled: true }),
    fecha: new FormControl({ value: "", disabled: true }),
    DocumentoFiscal: new FormControl({ value: "", disabled: true }),
    DocumentoSector: new FormControl({ value: "", disabled: true }),
    sucursal: new FormControl({ value: "", disabled: true }),
    empresa: new FormControl({ value: "", disabled: true }),
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  getAllFacturas() {
    return this.http.get<any[]>(this.base_url);
  }
  // ***********************************************
  sife_facturaElectronica_view_get(
    empresa,
    fecha,
    estadofactura,
    tipofactura,
    sucursal,
    pdv,
    origen
  ) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");

    if (origen == "Todos") {
      if (estadofactura == "Todos") {
        if (tipofactura == "Todos") {
          if (sucursal == "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoPuntoVenta":"' +
              pdv +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","codigoSucursal":"' +
              sucursal +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal == "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","codigoPuntoVenta":"' +
              pdv +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          }
        } else {
          if (sucursal == "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"where":{"nit":"' +
              empresa +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}},"order":"fecha DESC"}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoPuntoVenta":"' +
              pdv +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal == "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","codigoPuntoVenta":"' +
              pdv +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '"}';

            return this.http.get<any[]>(url_api);
          }
        }
      } else {
        if (tipofactura == "Todos") {
          if (sucursal == "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","estado":"' +
              estadofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","estado":"' +
              estadofactura +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoPuntoVenta":"' +
              pdv +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","estado":"' +
              estadofactura +
              '","codigoSucursal":"' +
              sucursal +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal == "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","estado":"' +
              estadofactura +
              '","codigoPuntoVenta":"' +
              pdv +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          }
        } else {
          if (sucursal == "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"where":{"nit":"' +
              empresa +
              '","estado":"' +
              estadofactura +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}},"order":"fecha DESC"}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","estado":"' +
              estadofactura +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoPuntoVenta":"' +
              pdv +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","estado":"' +
              estadofactura +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal == "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","estado":"' +
              estadofactura +
              '","codigoPuntoVenta":"' +
              pdv +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '"}}';

            return this.http.get<any[]>(url_api);
          }
        }
      }
    } else {
      if (estadofactura == "Todos") {
        if (tipofactura == "Todos") {
          if (sucursal == "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoPuntoVenta":"' +
              pdv +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","codigoSucursal":"' +
              sucursal +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal == "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","codigoPuntoVenta":"' +
              pdv +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          }
        } else {
          if (sucursal == "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}},"order":"fecha DESC"}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoPuntoVenta":"' +
              pdv +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal == "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","codigoPuntoVenta":"' +
              pdv +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '"}';

            return this.http.get<any[]>(url_api);
          }
        }
      } else {
        if (tipofactura == "Todos") {
          if (sucursal == "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","estado":"' +
              estadofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","estado":"' +
              estadofactura +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoPuntoVenta":"' +
              pdv +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","estado":"' +
              estadofactura +
              '","codigoSucursal":"' +
              sucursal +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal == "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","estado":"' +
              estadofactura +
              '","codigoPuntoVenta":"' +
              pdv +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          }
        } else {
          if (sucursal == "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","estado":"' +
              estadofactura +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}},"order":"fecha DESC"}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","estado":"' +
              estadofactura +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoPuntoVenta":"' +
              pdv +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';

            return this.http.get<any[]>(url_api);
          } else if (sucursal != "Todas" && pdv == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","estado":"' +
              estadofactura +
              '","codigoSucursal":"' +
              sucursal +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '","fecha": {"between": ["' +
              Fecha +
              'T00:00:00.000Z","' +
              Fecha +
              'T23:59:59.999Z"]}}}';
            return this.http.get<any[]>(url_api);
          } else if (sucursal == "Todas" && pdv != "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_facturaElectronica_view?filter={"order":"fecha DESC","where":{"nit":"' +
              empresa +
              '","origen":"' +
              origen +
              '","estado":"' +
              estadofactura +
              '","codigoPuntoVenta":"' +
              pdv +
              '","codigoDocumentoSector":"' +
              tipofactura +
              '"}}';

            return this.http.get<any[]>(url_api);
          }
        }
      }
    }
  }

  sife_facturaElectronica_view_get_count(
    fecha,
    estadofactura,
    tipofactura,
    sucursal,
    pdv,
    salto,
    limit
  ) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");

    if (estadofactura == "Todos") {
      if (tipofactura == "Todos") {
        if (sucursal == "Todas" && pdv == "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';

          return this.http.get<any[]>(url_api);
        } else if (sucursal != "Todas" && pdv != "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"codigoSucursal":"' +
            sucursal +
            '","codigoPuntoVenta":"' +
            pdv +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';
          return this.http.get<any[]>(url_api);
        } else if (sucursal != "Todas" && pdv == "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"codigoSucursal":"' +
            sucursal +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';
          return this.http.get<any[]>(url_api);
        } else if (sucursal == "Todas" && pdv != "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"codigoPuntoVenta":"' +
            pdv +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';
          return this.http.get<any[]>(url_api);
        }
      } else {
        if (sucursal == "Todas" && pdv == "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"codigoDocumentoSector":"' +
            tipofactura +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';

          return this.http.get<any[]>(url_api);
        } else if (sucursal != "Todas" && pdv != "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"codigoSucursal":"' +
            sucursal +
            '","codigoPuntoVenta":"' +
            pdv +
            '","codigoDocumentoSector":"' +
            tipofactura +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';

          return this.http.get<any[]>(url_api);
        } else if (sucursal != "Todas" && pdv == "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"codigoSucursal":"' +
            sucursal +
            '","codigoDocumentoSector":"' +
            tipofactura +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';
          return this.http.get<any[]>(url_api);
        } else if (sucursal == "Todas" && pdv != "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"codigoPuntoVenta":"' +
            pdv +
            '","codigoDocumentoSector":"' +
            tipofactura +
            '"}';

          return this.http.get<any[]>(url_api);
        }
      }
    } else {
      if (tipofactura == "Todos") {
        if (sucursal == "Todas" && pdv == "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"estado":"' +
            estadofactura +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';

          return this.http.get<any[]>(url_api);
        } else if (sucursal != "Todas" && pdv != "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"estado":"' +
            estadofactura +
            '","codigoSucursal":"' +
            sucursal +
            '","codigoPuntoVenta":"' +
            pdv +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';
          return this.http.get<any[]>(url_api);
        } else if (sucursal != "Todas" && pdv == "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"estado":"' +
            estadofactura +
            '","codigoSucursal":"' +
            sucursal +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';
          return this.http.get<any[]>(url_api);
        } else if (sucursal == "Todas" && pdv != "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"estado":"' +
            estadofactura +
            '","codigoPuntoVenta":"' +
            pdv +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';
          return this.http.get<any[]>(url_api);
        }
      } else {
        if (sucursal == "Todas" && pdv == "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"estado":"' +
            estadofactura +
            '","codigoDocumentoSector":"' +
            tipofactura +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';

          return this.http.get<any[]>(url_api);
        } else if (sucursal != "Todas" && pdv != "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"estado":"' +
            estadofactura +
            '","codigoSucursal":"' +
            sucursal +
            '","codigoPuntoVenta":"' +
            pdv +
            '","codigoDocumentoSector":"' +
            tipofactura +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';

          return this.http.get<any[]>(url_api);
        } else if (sucursal != "Todas" && pdv == "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"estado":"' +
            estadofactura +
            '","codigoSucursal":"' +
            sucursal +
            '","codigoDocumentoSector":"' +
            tipofactura +
            '","fecha": {"between": ["' +
            Fecha +
            'T00:00:00.000Z","' +
            Fecha +
            'T23:59:59.999Z"]}}';
          return this.http.get<any[]>(url_api);
        } else if (sucursal == "Todas" && pdv != "Todos") {
          const url_api =
            glob.host +
            
            glob.port +
            '/api/sife_facturaElectronica_view/count?where={"estado":"' +
            estadofactura +
            '","codigoPuntoVenta":"' +
            pdv +
            '","codigoDocumentoSector":"' +
            tipofactura +
            '"}';

          return this.http.get<any[]>(url_api);
        }
      }
    }
  }

  sife_facturaElectronica_view_get_one(cuf) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_facturaElectronica_view?filter={"where":{"cuf":"' +
      cuf +
      '"}}';

    console.log(url_api);

    return this.http.get<any>(url_api).toPromise();
  }

  getCountFacturas(
    fecha,
    estadofactura,
    tipofactura,
    sucursal,
    pdv,
    salto,
    limit
  ) {
    const url_api =
      glob.host + glob.port + "/api/sife_facturaElectronica_view";

    return this.http.get<any[]>(url_api);
  }
  // -----------------------------------------------
  getAllFacturasTablero(consulta) {
    return this.http.get<any[]>(
      this.base_urlTablero + "?filter=" + JSON.stringify(consulta)
    );
  }
  getAllFacturasFiltro(condicion) {
    return this.http.get<any[]>(this.base_url + condicion);
  }
  getAllFacturasCompletas() {
    return this.http.get<any[]>(this.baseurl);
  }
  getFacturaFirma(cuf) {
    return this.http.get<any[]>(this.baseurlFirma + cuf).toPromise();
  }
  getFactura(cuf) {
    return this.http.get<any[]>(
      this.base_url + '?filter={"where":{"cuf":"' + cuf + '"}}'
    );
  }
  getEstadosFactura(cuf) {
    return this.http
      .get<any[]>(
        this.base_urlEstado + '?filter={"where":{"cuf":"' + cuf + '"}}'
      )
      .toPromise();
  }
  getFacturaCompleta(cuf) {
    return this.http.get<any[]>(
      this.baseurl + '?filter={"where":{"cuf":"' + cuf + '"}}'
    );
  }
  getFacturaEstado(estado) {
    return this.http.get<any[]>(
      this.base_url + '?filter={"where":{"estado":"' + estado + '"}}'
    );
  }
  submitFacturas(data) {
    return this.http.post<any>(this.baseurl, data).pipe(map((data) => data));
  }
  solicitudAnulacion(data) {
    return this.http
      .post<any>(this.base_urlAnulacion, data)
      .pipe(map((data) => data));
  }
  updateFacturas(data) {
    const cuf = data.cuf;
    return this.http
      .put<any>(this.baseurl + cuf, data, { headers: this.headers })
      .pipe(map((data) => data));
  }
  deletedFacturas(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      cuf: null,
      cuis: "",
      fecha: "",
      DocumentoFiscal: "",
      DocumentoSector: "",
      sucursal: "",
      empresa: "",
    });
  }
  populateForm(data) {
    this.form.setValue(
      _.omit(
        data,
        "codigoSucursal",
        "codigoDocumentoFiscal",
        "tipoDocumentoSector",
        "codigoDocumentoSector",
        "codigoExcepcionDocumento",
        "estado",
        "jsonFactura",
        "numeroFactura",
        "cufd",
        "pdv",
        "nit",
        "tipoEmision"
      )
    );
  }
  // Servicio count de registros de facturas
  countFacturas() {
    return this.http.get<any[]>(this.base_url_count);
  }
  getFacturasPag(inicio, fin) {
    return this.http.get<any[]>(
      this.base_url +
        '/?filter={"skip": "' +
        inicio +
        '","limit":"' +
        fin +
        '"}'
    );
  }

  sife_factura_mule_anular(motivo, factura) {
    var AnularFactura = {
      codigoSucursal: factura.codigoSucursal,
      codigoPuntoVenta: factura.codigoPuntoVenta,
      nit: factura.nit,
      codigoMotivo: motivo,
      cuf: factura.cuf,
      codigoDocumentoSector: factura.codigoDocumentoSector,
    };
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_facturaElectronica_view/anulacionfactura?Factura=" +
      JSON.stringify(AnularFactura);
    /* const url_api = 'http://localhost:3000/api/sife_facturaElectronica_view/anulacionfactura?Factura='+JSON.stringify(AnularFactura) */
    return this.http
      .post<any>(url_api, AnularFactura)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }
  sife_factura_mule_revertir_anular(factura) {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_facturaElectronica_view/reversionanulacionfactura";

    return this.http.post<any>(url_api, factura).toPromise();
  }
  sife_factura_mule_regularizar(actividad, direccion, factura) {
    var RegularizarFactura = {
      codigoDocumentoSector: factura.codigoDocumentoSector,
      actividadEconomica: actividad,
      direccion: direccion,
      codigoSucursal: factura.codigoSucursal,
      codigoPuntoVenta: factura.codigoPuntoVenta,
      cuf: factura.cuf,
      nit: factura.nit,
    };

    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_facturaElectronica_view/registroFacturasRegularizacion?Factura=" +
      JSON.stringify(RegularizarFactura);
    /* const url_api = 'http://localhost:3000/api/sife_facturaElectronica_view/registroFacturasRegularizacion?Factura='+JSON.stringify(RegularizarFactura) */
    return this.http
      .post<any>(url_api, RegularizarFactura)
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }

  sife_factura_mule_consultar(factura) {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_facturaElectronica_view/verificacionestadofactura";
    /* const url_api =
      "http://localhost:3000/api/sife_facturaElectronica_view/verificacionestadofactura" */
    return this.http
      .post<any[]>(url_api, factura, { headers: this.headers })
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        alert(
          "Se encontro un error en la Solicitud: \n" + err.error.error.message
        );
      });
  }

  sife_factura_panel(Fecha) {
    var FechaInicial = moment(Fecha).format("YYYY-MM-DD");
    var FechaFinal = moment(Fecha).add(1, "d").format("YYYY-MM-DD");
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_facturaElectronica_fe/PanelFacturas?FechaInicial=" +
      FechaInicial +
      "&FechaFinal=" +
      FechaFinal;
    return this.http.get<any>(url_api).toPromise();
  }

  sife_factura_exitosas_get_count(empresa, fecha) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_facturaElectronica_view/count?where={"nit":"' +
      empresa +
      '","fecha":{"between":["' +
      Fecha +
      'T00:00:00.000Z","' +
      Fecha +
      'T23:59:59.999Z"]},"estado":"2"}';

    return this.http.get<any>(url_api).toPromise();
  }
  sife_factura_rechazadas_get_count(empresa, fecha) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_facturaElectronica_view/count?where={"nit":"' +
      empresa +
      '","fecha":{"between":["' +
      Fecha +
      'T00:00:00.000Z","' +
      Fecha +
      'T23:59:59.999Z"]},"estado":"91"}';

    return this.http.get<any>(url_api).toPromise();
  }
  sife_factura_EnviadosIN_get_count(empresa, fecha) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_facturaElectronica_view/count?where={"nit":"' +
      empresa +
      '","fecha":{"between":["' +
      Fecha +
      'T00:00:00.000Z","' +
      Fecha +
      'T23:59:59.999Z"]},"estado":"1"}';

    return this.http.get<any>(url_api).toPromise();
  }
  sife_factura_Recibido_get_count(empresa, fecha) {
    var Fecha = moment(fecha).format("YYYY-MM-DD");
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_facturaElectronica_view/count?where={"nit":"' +
      empresa +
      '","fecha":{"between":["' +
      Fecha +
      'T00:00:00.000Z","' +
      Fecha +
      'T23:59:59.999Z"]},"estado":"0"}';

    return this.http.get<any>(url_api).toPromise();
  }
}
