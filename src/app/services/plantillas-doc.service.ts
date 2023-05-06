import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class PlantillasDocService {
  //baseurl = "http://hanlpzdk03.hansa.com.bo:35/api/sife_plantillaDocumentoFiscal/";
  baseurl = glob.host + glob.port + "/api/sife_plantillaDocumentoFiscal/";

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    TipoDocumentoFiscal: new FormControl(""),
    codigoClasificador: new FormControl(""),
    plantilla: new FormControl(""),
    estado: new FormControl(""),
    url_qr: new FormControl(""),
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  getAllPlantillasDoc() {
    return this.http.get<any[]>(this.baseurl);
  }
  getPlantillaDoc(id) {
    return this.http
      .get<any[]>(
        this.baseurl + '?filter={"where":{"codigoClasificador":' + id + "}}"
      )
      .toPromise();
  }
  submitPlantillasDoc(data) {
    return this.http.post<any>(this.baseurl, data).pipe(map((data) => data));
  }
  updatePlantillasDoc(data) {
    const id = data.id;
    return this.http
      .put<any>(this.baseurl + id, data, { headers: this.headers })
      .pipe(map((data) => data));
  }
  updatePlantillaDoc(data) {
    const id = data.id;
    var dt = {};
    if (data.estado == 0) {
      dt = { estado: 1 };
    }
    if (data.estado == 1) {
      dt = { estado: 0 };
    }
    return this.http
      .post<any>(this.baseurl + 'update?where={"id":"' + id + '"}', dt, {
        headers: this.headers,
      })
      .pipe(map((data) => data));
  }
  deletedPlantillasDoc(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      TipoDocumentoFiscal: "",
      codigoClasificador: "",
      plantilla: "",
      estado: "",
      url_qr: "",
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data));
  }
  sife_sincronizarParametricaTipoDocumentoSector_get() {
    const url_api =
      glob.host +
      
      glob.port +
      "/api/sife_sincronizarParametricaTipoDocumentoSector";
    return this.http.get<any[]>(url_api).toPromise();
  }
}
