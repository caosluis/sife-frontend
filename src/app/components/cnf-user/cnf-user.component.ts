import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { RolesService } from "src/app/services/roles.service";

@Component({
  selector: 'app-cnf-user',
  templateUrl: './cnf-user.component.html',
  styleUrls: ['./cnf-user.component.css']
})
export class CnfUserComponent implements OnInit {
  rolesHabilitados: any;
  UsuarioActual: any;
  existeRol: any;
  rolUsuario: any

  constructor(
    public UserService:UserService,
    private rolesService: RolesService,
  ) { 
    this.rolesService.sife_roles_habilitados_json().then((data) => {
      this.rolesHabilitados = data;
      this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
      console.log("UsuarioActual " + this.UsuarioActual.role);

      this.existeRol = this.rolesHabilitados.filter(function(rolesHabilitado) {        
        if(rolesHabilitado.role == '[]'){
          return true;
        }else{
          return false;
        }
      });
    });
  }

  ngOnInit() {
    console.log("RESPUESTA"+JSON.stringify(this.existeRol));
  }

}
