import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirmaDigitalService } from "../../../services/firma-digital.service";

import { debounceTime } from 'rxjs/operators';


@Component({
  selector: "app-firma-digital-revocar",
  templateUrl: "./firma-digital-revocar.component.html",
  styleUrls: ["./firma-digital-revocar.component.css"],
})
export class FirmaDigitalRevocarComponent implements OnInit {
  loading: any;
  form: FormGroup;
  EmpresaSeleccionada: any;
  fechaActual: any;
  Respuesta: any;
  transaccion:any;
  descripcion:any;
  constructor(
    public dialogRef: MatDialogRef<FirmaDigitalRevocarComponent>,
    public FirmaDigitalService: FirmaDigitalService,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.fechaActual = new Date();
    this.buildForm();
  }

  private buildForm() {    
    this.form = this.formBuilder.group({      
      id: [''],
      razonRevocacion: ['',Validators.required],
      certificado: [this.data.firma,Validators.required],
    });

    //this.form.valueChanges
    //.pipe(
    //  debounceTime(500)
    //)
    //.subscribe(value => {
    //  console.log(value);
    //});
  }

  ngOnInit(): void {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  save(event: Event) {
    console.log("Datos enviados: "+ this.data.id)
    this.loading = true;
    //Evitamos que la pagina se recargue automaticamente con el DOM
    event.preventDefault();
    //Obtenemos los datos a enviar
    const value = this.form.value;
    const id = this.data.id;
    //Enviamos los datos al servicio
    this.FirmaDigitalService.revocaFirma(
      {
        id: ""+ id,
        nit: this.EmpresaSeleccionada,
        razonRevocacion: value.razonRevocacion
      })
      .subscribe((data) => {
      //this.dialogRef.close();
      //this.transaccion = data.respuesta.ok;
      this.Respuesta = data;
      console.log("PETICION EXITOSA DATOS DEVUELTOS : " + JSON.stringify(this.Respuesta));

      this.loading = false;
        this.transaccion = this.Respuesta.respuesta.transaccion;
        this.descripcion = this.Respuesta.respuesta.descripcion;
       }
       ,error => {
        console.log("ERROR EN LA SOLICITUD : " + JSON.stringify(error));
        this.loading = false;
        this.transaccion = 'false'
        this.descripcion = JSON.stringify(error)
        }
      )
      
  }
}
