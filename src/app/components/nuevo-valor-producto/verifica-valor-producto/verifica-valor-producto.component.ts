import { NuevoValorProductoService } from './../../../services/nuevo-valor-producto.service';
import { Component, OnInit ,Inject, Optional} from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { Socket } from 'ngx-socket-io';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-verifica-valor-producto',
  templateUrl: './verifica-valor-producto.component.html',
  styleUrls: ['./verifica-valor-producto.component.css']
})
export class VerificaValorProductoComponent implements OnInit {
  action:string;
  local_data:any;
  obj:any;
  constructor(
              public service: NuevoValorProductoService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<VerificaValorProductoComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any
            ) {
              this.local_data = {...data};
              this.action = this.local_data["action"];
              this.obj = this.local_data["obj"];
              console.log(this.obj);
            }

  ngOnInit() {
    this.service.formVal.patchValue({
      codigoSolicitud:this.obj.codigoSolicitud
    }); 
  }
  onSave(){
    this.service.ValidarNVP(this.service.formVal.value).subscribe(data => {
        if(data["respuesta"]["count"]==1){
          this.notificationService.success("Código valido");
          this.dialogRef.close();
        }
        else{
          this.notificationService.warn("Código no valido");
        }
      },error =>{
          this.notificationService.error("Error de conección");
      })
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
    this.dialogRef.close({event:'Cancel'});
  }
}
