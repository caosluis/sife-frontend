import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map, tap } from "rxjs/operators";
import * as _ from "lodash";
import * as glob from "../global";
import { Subject } from "rxjs";
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: "root",
})
export class ProductosService {
  public _refresh$ = new Subject<void>();
  //baseurl = "http://hanlpzdk03.hansa.com.bo:35/api/sife_productos/";
  //base_urlView = "http://hanlpzdk03.hansa.com.bo:35/api/";

  baseurl = glob.host + glob.port + "/api/sife_productos/";
  base_urlView = glob.host + glob.port + "/api/";

  constructor(private http: HttpClient) { }
  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });

  form: FormGroup = new FormGroup({
    IdProducto: new FormControl(null),
    Producto: new FormControl(""),
    IdProdFabrica: new FormControl(""),
    IdProdAS400: new FormControl(""),
    PrdBloqueado: new FormControl(""),
    IdProdCons: new FormControl(""),
    IdProdSBO: new FormControl(""),
    IdFamilia: new FormControl(""),
    IdGrupo: new FormControl(""),
    IdSubGrupo: new FormControl(""),
    IdSecProducto: new FormControl(""),
    IdDivision: new FormControl(""),
    IdTipoMaterial: new FormControl(""),
    UMBase: new FormControl(""),
    IdSector: new FormControl(""),
    PesoBruto: new FormControl(""),
    PesoNeto: new FormControl(""),
    UnidadPeso: new FormControl(""),
    TipoNumeroEAN: new FormControl(""),
    NumeroCodigoBarra: new FormControl(""),
    LongitudProducto: new FormControl(""),
    AnchoProducto: new FormControl(""),
    AlturaProducto: new FormControl(""),
    UnidadLongitud: new FormControl(""),
    Sujeto_Lote: new FormControl(""),
    catalogo: new FormControl(""),
    nandina: new FormControl(""),
    estadoHomologado: new FormControl(""),
  });
  // Get de filtro general
  sife_productos_get(Empresa, IdDivision, IdSecProducto, IdFamilia, IdGrupo, IdSubGrupo, Estado, EstadoActivo) {
    console.log(Empresa, IdDivision, IdSecProducto, IdFamilia, IdGrupo, IdSubGrupo, Estado, EstadoActivo);
    
    if (EstadoActivo == "Todos") {
      if (IdGrupo == "Todos") {
        if (IdSubGrupo == "Todos") {
          if (Estado == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{"nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '"}}';
              console.log(url_api);
              
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "Homologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{"nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia +
              '","codigoClasificador":{"neq":null},"codigoActividad":{"neq":null},"codigoCatalogo":{"neq":null}}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "NoHomologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where": {"and":[{"and":[{"nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '"}]},{"or":[{"codigoClasificador": null,"codigoActividad": null, "codigoCatalogo": null}]}]}}';
            return this.http.get<any[]>(url_api).toPromise();
          }
        } else {
          if (Estado == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{"nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '","IdSubGrupo":"' + IdSubGrupo +
              '"}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "Homologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{"nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '","IdSubGrupo":"' + IdSubGrupo +
              '","codigoClasificador":{"neq":null},"codigoActividad":{"neq":null},"codigoCatalogo":{"neq":null}}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "NoHomologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter= {"where": {"and":[{"and":[{"nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '","IdSubGrupo":"' + IdSubGrupo + '"}]},{"or":[{"codigoClasificador": null,"codigoActividad": null, "codigoCatalogo": null}]}]}}';


            return this.http.get<any[]>(url_api).toPromise();
          }
        }
      } else {
        if (IdSubGrupo == "Todos") {
          if (Estado == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{"nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdGrupo":"' +
              IdGrupo +
              '"}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "Homologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{"nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdGrupo":"' +
              IdGrupo +
              '","codigoClasificador":{"neq":null},"codigoActividad":{"neq":null},"codigoCatalogo":{"neq":null}}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "NoHomologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where": {"and":[{"and":[{"nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '","IdGrupo":"' + IdGrupo + '"}]},{"or":[{"codigoClasificador": null,"codigoActividad": null, "codigoCatalogo": null}]}]}}';

            return this.http.get<any[]>(url_api).toPromise();
          }
        } else {
          if (Estado == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{"nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdGrupo":"' +
              IdGrupo +
              '","IdSubGrupo":"' +
              IdSubGrupo +
              '"}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "Homologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{"nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdGrupo":"' +
              IdGrupo +
              '","IdSubGrupo":"' +
              IdSubGrupo +
              '","codigoClasificador":{"neq":null},"codigoActividad":{"neq":null},"codigoCatalogo":{"neq":null}}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "NoHomologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={ "where": { "and": [{ "and": [{ "nit":"' + Empresa + '", "IdDivision": "' + IdDivision + '", "IdSecProducto": "' + IdSecProducto + '", "IdFamilia": "' + IdFamilia + '", "IdGrupo": "' + IdGrupo + '", "IdSubGrupo": "' + IdSubGrupo + '" }] }, { "or": [{ "codigoClasificador": null, "codigoActividad": null, "codigoCatalogo": null }] }] } }';

            return this.http.get<any[]>(url_api).toPromise();
          }
        }
      }
    } else {
      if (IdGrupo == "Todos") {
        if (IdSubGrupo == "Todos") {
          if (Estado == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{ "nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","estado":"' +
              EstadoActivo +
              '"}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "Homologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{ "nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","estado":"' +
              EstadoActivo +
              '","codigoClasificador":{"neq":null},"codigoActividad":{"neq":null},"codigoCatalogo":{"neq":null}}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "NoHomologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where": {"and":[{"and":[{ "nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '","estado":"' + EstadoActivo + '"}]},{"or":[{"codigoClasificador": null,"codigoActividad": null, "codigoCatalogo": null}]}]}}';
            return this.http.get<any[]>(url_api).toPromise();
          }
        } else {
          if (Estado == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{ "nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdSubGrupo":"' +
              IdSubGrupo +
              '","estado":"' +
              EstadoActivo +
              '"}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "Homologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{ "nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdSubGrupo":"' +
              IdSubGrupo +
              '","estado":"' +
              EstadoActivo +
              '","codigoClasificador":{"neq":null},"codigoActividad":{"neq":null},"codigoCatalogo":{"neq":null}}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "NoHomologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where": {"and":[{"and":[{ "nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '","IdSubGrupo":"' + IdSubGrupo + '","estado":"' + EstadoActivo + '"}]},{"or":[{"codigoClasificador": null,"codigoActividad": null, "codigoCatalogo": null}]}]}}';

            return this.http.get<any[]>(url_api).toPromise();
          }
        }
      } else {
        if (IdSubGrupo == "Todos") {
          if (Estado == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{ "nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdGrupo":"' +
              IdGrupo +
              '","estado":"' +
              EstadoActivo +
              '"}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "Homologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{ "nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdGrupo":"' +
              IdGrupo +
              '","estado":"' +
              EstadoActivo +
              '","codigoClasificador":{"neq":null},"codigoActividad":{"neq":null},"codigoCatalogo":{"neq":null}}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "NoHomologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where": {"and":[{"and":[{ "nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '","IdGrupo":"' + IdGrupo + '","estado":"' + EstadoActivo + '"}]},{"or":[{"codigoClasificador": null,"codigoActividad": null, "codigoCatalogo": null}]}]}}';



            return this.http.get<any[]>(url_api).toPromise();
          }
        } else {
          if (Estado == "Todos") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{ "nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdGrupo":"' +
              IdGrupo +
              '","IdSubGrupo":"' +
              IdSubGrupo +
              '","estado":"' +
              EstadoActivo +
              '"}}';

            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "Homologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where":{ "nit":"' + Empresa + '", "IdDivision":"' +
              IdDivision +
              '","IdSecProducto":"' +
              IdSecProducto +
              '","IdFamilia":"' +
              IdFamilia +
              '","IdGrupo":"' +
              IdGrupo +
              '","IdSubGrupo":"' +
              IdSubGrupo +
              '","estado":"' +
              EstadoActivo +
              '","codigoClasificador":{"neq":null},"codigoActividad":{"neq":null},"codigoCatalogo":{"neq":null}}}';
            return this.http.get<any[]>(url_api).toPromise();
          } else if (Estado == "NoHomologados") {
            const url_api =
              glob.host +
              
              glob.port +
              '/api/sife_productos?filter={"where": {"and":[{"and":[{ "nit":"' + Empresa + '", "IdDivision":"' + IdDivision + '","IdSecProducto":"' + IdSecProducto + '","IdFamilia":"' + IdFamilia + '","IdGrupo":"' + IdGrupo + '","IdSubGrupo":"' + IdSubGrupo + '","estado":"' + EstadoActivo + '"}]},{"or":[{"codigoClasificador": null,"codigoActividad": null, "codigoCatalogo": null}]}]}}';
            return this.http.get<any[]>(url_api).toPromise();
          }
        }
      }
    }
  }

  sife_productos_get_one(idproducto) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_productos?filter={"where":{"IdProducto":"' +
      idproducto +
      '"}}';
    return this.http.get<any>(url_api).toPromise();
  }
  /*
  sife_productos_get_more(arridproducto) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_productos?filter={"where":{"IdProducto":"' +
      idproducto +
      '"}}';
    return this.http.get<any>(url_api).toPromise();
  }*/

  getAllDivisiones() {
    return this.http.get<any>("./assets/divisiones.json").toPromise();
  }
  getAllsector() {
    return this.http.get<any>("./assets/sectores.json").toPromise();
  }
  getAllfamilia() {
    return this.http.get<any>("./assets/familia.json").toPromise();
  }
  getAllgrupo() {
    return this.http.get<any>("./assets/grupo.json").toPromise();
  }
  getAllSubgrupo() {
    return this.http.get<any>("./assets/subgrupo.json").toPromise();
  }

  updateProducto(IdProducto, data) {
    console.log(data);
    const url_api =
      glob.host + glob.port + "/api/sife_productos/" + IdProducto;
    return this.http.patch<any>(url_api, data).pipe(
      tap(() => {
        this._refresh$.next();
      })
    ).toPromise();
  }

  sife_mule_productos_post(productos) {
    var datos_productos = {
      tipo: "homologacion",
      nit: JSON.parse(localStorage.getItem("empresa")),
      usuario: productos.usuario,
      productos: productos,
    };
    const url_api =
      glob.host + glob.port + "/api/sife_dimproducto/respuestadiaria";

    console.log(JSON.stringify(datos_productos));

    return this.http
      .post<any>(url_api, JSON.stringify(datos_productos), {
        headers: this.headers,
      })
      .toPromise();
  }

  sife_productos_patch(IdProducto, data) {
    const url_api =
      glob.host + glob.port + "/api/sife_productos/" + IdProducto;
    return this.http
      .patch<any>(url_api, data, { headers: this.headers })
      .toPromise();
  }
  submitProductos(data) {


    return this.http
      .post<any>(this.baseurl, data, { headers: this.headers })
      .pipe(map((data) => data))
      .toPromise()
      .catch((err: HttpErrorResponse) => {
        if (err.error.error.details[0] != undefined) {
          console.log(
            "Se encontro un error en la Solicitud: \n" +
            err.error.error.details[0].sqlMessage +
            "\n" +
            err.error.error.message
          );
        } else {
          console.log(
            "Se encontro un error en la Solicitud: \n" + err.error.error.message
          );
        }
      });
  }
  updateProductos(data) {
    const IdProducto = data.IdProducto;
    return this.http
      .put<any>(this.baseurl + IdProducto, data, { headers: this.headers })
      .pipe(map((data) => data));
  }
  deletedProductos(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      IdProducto: null,
      Producto: "",
      IdProdFabrica: "",
      IdProdAS400: "",
      PrdBloqueado: "",
      IdProdCons: "",
      IdProdSBO: "",
      IdFamilia: "",
      IdGrupo: "",
      IdSubGrupo: "",
      IdSecProducto: "",
      IdDivision: "",
      IdTipoMaterial: "",
      UMBase: "",
      IdSector: "",
      PesoBruto: "",
      PesoNeto: "",
      UnidadPeso: "",
      TipoNumeroEAN: "",
      NumeroCodigoBarra: "",
      LongitudProducto: "",
      AnchoProducto: "",
      AlturaProducto: "",
      UnidadLongitud: "",
      Sujeto_Lote: "",
      catalogo: "",
      nandina: "",
      estadoHomologado: "",
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data));
  }

  borrarproductos(idproducto) {
    let httpParams = new HttpParams()
    httpParams.set("IdProducto", idproducto);
    let options = { params: httpParams };
    return this.http
      .delete<any>(this.baseurl, options).toPromise()
  }
  BuscarSiExiste(idproducto) {
    const url_api =
      glob.host +
      
      glob.port +
      '/api/sife_productos/' + idproducto + '/exists'
    return this.http.get<any>(url_api).toPromise();

  }
}
