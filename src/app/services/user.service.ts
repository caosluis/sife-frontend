import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map } from "rxjs/operators";
import * as _ from "lodash";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public sesion: any = null;
  //baseurl = "http://docker.hansa.com.bo:35/api/Users/";
  //baseurlGruposUser = 'http://docker.hansa.com.bo:35/api/sife_user_grupo/'

  baseurl = glob.host_user + glob.port_user + "/api/users/";
  baseurlGruposUser = glob.host + glob.port + "/api/sife_user_grupo/";

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    username: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
  });

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  getAllUser() {
    /*   if (this.sesion["nivelAcceso"] != "551eac71-5b53-4785-b96f-4cbaab197012") {
        var consulta = '?filter={"where":{"cuis":"' + this.sesion + '"}}';
        return this.http.get<any[]>(this.baseurl + consulta);
      }
      if (this.sesion["nivelAcceso"] == "551eac71-5b53-4785-b96f-4cbaab197012") {
        return this.http.get<any[]>(this.baseurl);
      } */
    return this.http.get<any[]>(this.baseurl);
  }
  getUser(id, token) {
    return this.http.get<any[]>(
      this.baseurl +
      '?filter={"where":{"id":"' +
      id +
      '"}}&access_token=' +
      token
    );
  }
  submitUser(data) {
    return this.http
      .post<any>(this.baseurl, data)
      .pipe(map((data) => data))
      .toPromise();
  }
  updateUser(data) {
    const id = data.id;
    if (data.password) {
      return this.http
        .put<any>(this.baseurl + "?access_token=" + this.sesion["id"], data, {
          headers: this.headers,
        })
        .pipe(map((data) => data));
    } else {
      return this.http
        .post<any>(
          this.baseurl +
          'update?where={"id":' +
          id +
          "}&access_token=" +
          this.sesion["id"],
          data,
          { headers: this.headers }
        )
        .pipe(map((data) => data));
    }
  }
  deletedUser(id: string) {
    return this.http
      .delete<any>(this.baseurl + id, { headers: this.headers })
      .pipe(map((data) => data));
  }
  initializeFormGroup() {
    this.form.setValue({
      id: null,
      username: "",
      email: "",
      password: "",
    });
  }
  populateForm(data) {
    data.password = "";
    this.form.setValue(_.omit(data, "realm", "emailVerified"));
  }
  // Funciones inicio de sesion
  login(user, pass) {
    var data = { username: user, password: pass };

    return this.http
      .post<any>(this.baseurl + "login", data, { headers: this.headers })
      .pipe(map((data) => data)).toPromise();
  }
  logoutSesion() {
    return this.http.post(
      this.baseurl + "logout?access_token=" + this.sesion["id"],
      {}
    );
  }
  // Funciones de grupos de usuarios
  getIdGroupUser(idGrupo) {
    return this.http.get<any[]>(
      this.baseurlGruposUser +
      "?filter[include]=sifeUserData&filter[where][id_grupo]=" +
      idGrupo
    );
  }
}
