import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from "src/app/services/empresa.service";
import { AutorizacionService } from "../autorizacion.service";

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-autorizacion-registro',
  templateUrl: './autorizacion-registro.component.html',
  styleUrls: ['./autorizacion-registro.component.css']
})
export class AutorizacionRegistroComponent implements OnInit {
  loading: any;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AutorizacionRegistroComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private autorizacionService: AutorizacionService,
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({      
      codigoSistema: ['',Validators.required],
      codigoModalidad: ['',Validators.required],     
      codigoAmbiente: ['',Validators.required],  
      nit: [JSON.parse(localStorage.getItem("empresa")),Validators.required],  
      sistema: ['',Validators.required],  
      version: ['',Validators.required],  
      tipoSistema: ['',Validators.required], 
      versionSiat: ['',Validators.required],  
      nroSolicitud: ['',Validators.required],  
    });

    //this.form.valueChanges
    //.pipe(
    //  debounceTime(500)
    //)
    //.subscribe(value => {
    //  console.log(value);
    //});
  }

  close(): void {
    this.dialogRef.close();
  }

  save(event: Event) {
    this.loading = true;
    //Evitamos que la pagina se recargue automaticamente con el DOM
    event.preventDefault();
    //Obtenemos los datos a enviar
    const value = this.form.value;
    //Enviamos los datos al servicio
    console.log(value);
    this.autorizacionService.sife_autorizacion_registro_post(
      value)
      .then((data) => {
      this.dialogRef.close();
      console.log(data);
      //this.transaccion = data.respuesta.ok;
      //this.Respuesta = data.respuesta.descripcion;
      this.loading = false;
       })
       .catch(this.data);
  }

}
