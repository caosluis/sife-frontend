import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from "src/app/services/empresa.service";
import { TokenRegistroService } from "./token-registro.service";

import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-token-registro',
  templateUrl: './token-registro.component.html',
  styleUrls: ['./token-registro.component.css']
})
export class TokenRegistroComponent implements OnInit {
  loading: any;
  form: FormGroup;  
  
  fechaRegistro = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    public dialogRef: MatDialogRef<TokenRegistroComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private tokenRegistroService: TokenRegistroService,
  ) {
    this.HoraActual = new Date();
    this.buildForm();
  }

  HoraActual: any;

  ngOnInit(): void {

  }

  private buildForm() {
    this.form = this.formBuilder.group({      
      fechaRegistro: [new Date(),Validators.required],
      fechaVigencia: ['',Validators.required],     
      token: ['',Validators.required],
      nombreKey: ['',Validators.required],
      prefijoToken: ['',Validators.required],  
      descripcion: ['',Validators.required],   
      nit: [JSON.parse(localStorage.getItem("empresa")),Validators.required],  
    });

    //this.form.valueChanges
    //.pipe(
    //  debounceTime(500)
    //)
    //.subscribe(value => {
    //  console.log(value);
    //});
  }
  //Cierra dialog
  onNoClick(): void {
    this.dialogRef.close();
  }
  //Enviado los datos mediante SUBMIT
  save(event: Event) {
    this.loading = true;
    //Evitamos que la pagina se recargue automaticamente con el DOM
    event.preventDefault();
    //Obtenemos los datos a enviar
    const value = this.form.value;
    //Enviamos los datos al servicio
    console.log(value);
    this.tokenRegistroService.sife_tokens_registro_post(
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
