import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { ModulesService } from "src/app/services/modules.service";
import { UserService } from "src/app/services/user.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  roles: any;
  constructor(
    private router: Router,
    private userS: UserService,
    private moduleService: ModulesService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.userS.sesion;

    if (user) {
      await this.cargarRoles(route);
      //Verificamos si los roles del usuario estan con permisos en la tabla sife_modulo
      //buscamos el rol en el array this.roles si esta en el array devuelve 0 y si no -1
      if (route.data.roles && this.roles.indexOf(user.role) === -1) {
        alert(
          "No tiene permiso para ver este módulo, comuníquese con su administrador para obtener más información."
        );
        // rol no autorizado redireccionamos a la pagina principal
        this.router.navigate(["/"]);
        return false;
      }

      // autorizado entonces duvuelve verdadero
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
  //Obtiene los roles de la tabla sife_modulo
  async cargarRoles(route) {
    await this.moduleService
      .buscarModule(route)
      .then((data) => (
        this.roles = data[0].roles_asignados               
        )
      );
  }
}
