import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class ListasDesplegablesService {
  //baseurl = "http://hanlpzdk01.hansa.com.bo:35/api/sife_listas_desplegable/";
  baseurl = glob.host + glob.port + "/api/sife_listas_desplegable/";
  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl(""),
    valores: new FormControl(""),
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  getAllListasDesplegables() {
    return this.http.get<any[]>(this.baseurl);
  }
  getLista(lista) {
    return this.http
      .get<any[]>(this.baseurl + `?filter={"where":{"nombre":"` + lista + `"}}`)
      .toPromise();
  }

  submitListasDesplegables(data) {
    return this.http.post<any>(this.baseurl, data).pipe(map((data) => data));
  }
  updateListasDesplegables(data) {
    const id = data.id;
    return this.http
      .put<any>(this.baseurl + id, data, { headers: this.headers })
      .pipe(map((data) => data));
  }
  deletedListasDesplegables(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      nombre: "",
      valores: "",
    });
  }
  populateForm(data) {
    this.form.setValue(_.omit(data));
  }
}
