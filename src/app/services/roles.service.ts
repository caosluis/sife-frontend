import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import * as glob from "../global";

@Injectable({
  providedIn: "root",
})
export class RolesService {

  headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
  });
  constructor(private http: HttpClient) { }
  sife_roles_get() {
    const url_api = glob.host + glob.port + "/api/sife_roles";
    return this.http.get<any[]>(url_api).toPromise();
  }

  sife_roles_habilitados_json() {
    return this.http.get<any>('./assets/rolesHabilitados.json').toPromise();
  }

  sife_roles_get_roleID(role) {
    const url_api =
      glob.host +

      glob.port +
      '/api/sife_roles/?filter={"where":{"role":"' +
      role +
      '"}}';
    return this.http.get<any[]>(url_api).toPromise();
  }
  sife_roles_patch(roleID, configuracion) {
    const url_api = glob.host + glob.port + "/api/sife_roles/" + roleID;
    return this.http
      .patch<any[]>(url_api, { configuracion: configuracion })
      .toPromise();
  }
  sife_roles_post(role) {
    console.log(role);

    const url_api = glob.host + glob.port + "/api/sife_roles";
    return this.http.post<any[]>(url_api, role).toPromise();
  }
  sife_roles_delete(roleID) {
    const url_api = glob.host + glob.port + "/api/sife_roles/" + roleID;
    return this.http.delete<any[]>(url_api).toPromise();
  }

  sife_user_empresas_get(username) {
    const url_api = glob.host + glob.port + '/api/sife_user_empresas?filter={"where":{"username":"' + username + '"}}'    
    return this.http.get<any>(url_api).toPromise();
  }
  sife_user_empresas_post(username, nit) {
    const url_api = glob.host + glob.port + '/api/sife_user_empresas'
    return this.http.post<any>(url_api, {
      "nit": nit,
      "username": username
    }, { headers: this.headers }).toPromise();
  }
  sife_user_empresas_patch(username, nit) {
    const url_api = glob.host + glob.port + '/api/sife_user_empresas/update?where={"username":"' + username + '"}'
    return this.http.post<any>(url_api, {
      "nit": nit
    }, { headers: this.headers }).toPromise();
  }
}
