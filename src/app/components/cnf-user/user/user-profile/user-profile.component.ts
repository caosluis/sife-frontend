import { Component, OnInit } from '@angular/core';
import { GroupsService } from "./../../../../services/groups.service";
import { UserService } from "./../../../../services/user.service";
import { EmpresaService } from "src/app/services/empresa.service";
import { RolesService } from "src/app/services/roles.service";
import { FormBuilder, FormGroup } from "@angular/forms";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  form: FormGroup;
  UsuarioActual: any = [];
  nombre: any;
  rol: any;
  constructor(
    public userService: UserService,
    public groupsService:GroupsService,
    public empresaService:EmpresaService,
    private formBuilder: FormBuilder,
    public rolesService:RolesService
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    
  }

  ngOnInit(): void {
    this.buildForm();
    this.nombre = this.UsuarioActual.nombres + " " +this.UsuarioActual.apellidos
    this.rol = this.UsuarioActual.role
  }

  private buildForm() {
    this.form = this.formBuilder.group({      
      nombres: [{value:this.UsuarioActual.nombres, disabled:true}],
      apellidos: [{value:this.UsuarioActual.apellidos, disabled:true}],     
      telefono: [{value:this.UsuarioActual.telefono, disabled:true}],  
      empresa: [{value:JSON.parse(localStorage.getItem("empresa")), disabled:true}],  
      division: [{value:this.UsuarioActual.division, disabled:true}],
      username: [{value:this.UsuarioActual.username, disabled:true}],  
      email: [{value:this.UsuarioActual.username +"@hansa.com.bo", disabled:true}],  
      role: [{value:this.UsuarioActual.role, disabled:true}], 
      id_user: [{value:'', disabled:true}]
    });

    //this.form.valueChanges
    //.pipe(
    //  debounceTime(500)
    //)
    //.subscribe(value => {
    //  console.log(value);
    //});
  }

  getUsuarios(){
    console.log(this.UsuarioActual);
  }
  
}
