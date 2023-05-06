import { Component, OnInit, Inject, Optional } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from "src/app/services/empresa.service";
import { ActualizacionService } from "../actualizacion.service";
import { NotificationService } from "../../../services/notification.service";
import * as moment from "moment";

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  color: ThemePalette = 'accent';
  loading: any;
  form: FormGroup;
  checked = true;
  disabled = false;
  transaccion:any;
  FechaActual:any = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

  constructor(
    public dialogRef: MatDialogRef<RegistroComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private empresaService: EmpresaService,
    private formBuilder: FormBuilder,
    private actualizacionService: ActualizacionService,
    private notificationService: NotificationService
  ) { 
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({      
      codigoSistema: ['',Validators.required], 
      version: ['',Validators.required], 

      sucursalCuisCierre: [this.checked],        
      sucursalCopia: [this.checked],  
      sucursalCuisSolicita: [this.checked],  
      pdvCuisCierre: [this.checked],  
      pdvCierre: [this.checked],  
      pdvCrear: [this.checked],  
      pdvCuisSolicita: [this.checked],  
      sincronizarCatalogos: [this.checked],  
      cufdSolicitar: [this.checked],  
      fechaSolicitar: [this.checked],  
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
    value.fechaCreacion = this.FechaActual;
    value.fechaModificacion = this.FechaActual;
    //Enviamos los datos al servicio
    console.log(value);
    var opcion = confirm("Esta seguro de realizar esta acción, no se podra cancelar ni revertir una vez realizada su solicitud.");
    if (opcion == true) {
      this.actualizacionService.sife_actualizacions(
        value)
        .then((data) => {
          console.log("RESPUESTA MULE "+ JSON.stringify(data));
          if(data.respuesta.transaccion == 'true'){
            this.notificationService.success("Envio a servicio de Actualización éxitoso " + data.respuesta.descripcion);

            this.actualizacionService.sife_actualizacion_registro_post(
              value).then((data) => {
                this.notificationService.success("Almacenamiento de datos éxitoso ");
                this.dialogRef.close();
              })

          }else{
            if(data.respuesta.transaccion == null){
              this.notificationService.error("No se pudo realizar la solicitud al servicio, consulte a su administrador.");
              this.loading = false;
            }else{
              this.notificationService.error(data.respuesta.descripcion);
              this.loading = false;
            }
            
          }
          
        })
      /*  
      this.actualizacionService.sife_actualizacion_registro_post(
        value)
        .then((data) => {
        this.notificationService.success("Solicitud realizada con éxito");
        this.dialogRef.close();
        console.log(data);
        //this.transaccion = data.respuesta.ok;
        //this.Respuesta = data.respuesta.descripcion;
        this.loading = false;
         })
         .catch(this.data);*/
    } else {
        
    }
    
  }
}
