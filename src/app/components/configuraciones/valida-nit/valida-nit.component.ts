import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from "src/app/services/empresa.service";
import { ValidaNitService } from "./valida-nit.service";

import { debounceTime } from 'rxjs/operators';
import { data } from 'jquery';

@Component({
  selector: 'app-valida-nit',
  templateUrl: './valida-nit.component.html',
  styleUrls: ['./valida-nit.component.css']
})
export class ValidaNitComponent implements OnInit {
  loading: any;
  form: FormGroup;  
  transaccion: any;
  descripcion: any;
  codigo: any;
  constructor(
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private validaNitService: ValidaNitService,
  ) { 
    this.HoraActual = new Date();
    this.buildForm();
  }

  HoraActual: any;

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({      
      nitEmisor: [Number(JSON.parse(localStorage.getItem("empresa"))),Validators.required],
      nitCliente: [0,Validators.required],
    });

    //this.form.valueChanges
    //.pipe(
    //  debounceTime(500)
    //)
    //.subscribe(value => {
    //  console.log(value);
    //});
  }

  save(event: Event) {
    this.loading = true;
    //Evitamos que la pagina se recargue automaticamente con el DOM
    event.preventDefault();
    //Obtenemos los datos a enviar
    const value = this.form.value;
    //Enviamos los datos al servicio
    console.log(value);
    this.validaNitService.sife_validaNit_post(
      value)
      .then((data) => {
      console.log(data);
      this.transaccion = data.respuesta.transaccion;
      this.descripcion = data.respuesta.descripcion;
      this.codigo = data.respuesta.codigo;
      this.loading = false;
       })
       .catch((data)=>{
        console.log("Error no se pudo enviar la informacion");
        this.loading = false;
       });
  }

}
