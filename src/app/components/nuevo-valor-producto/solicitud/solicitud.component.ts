import { NuevoValorProductoService } from './../../../services/nuevo-valor-producto.service';
import { Component, OnInit ,Inject, Optional} from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  action:string;
  local_data:any;
  empresas:any;
  sucursales:any;
  constructor(
              public service: NuevoValorProductoService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<SolicitudComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any
            ) {
              this.local_data = {...data};
              this.action = this.local_data["action"];
              this.empresas = this.local_data["empresas"];
              this.sucursales = this.local_data["sucursales"];
              //console.log(this.action);
            }

  ngOnInit() {
  }
  onSave(){
    //console.log(this.service.form.value);
    this.service.submitNVP(this.service.form.value).subscribe(
      data =>{
        this.dialogRef.close({event:this.action,data:data});
        // console.log(data); 
        //this.notificationService.success("EXITOSO");
        this.service.form.reset();
      },
      error => {
        this.notificationService.warn("ERROR");
      }
    );
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
    this.dialogRef.close({event:'Cancel'});
  }
  
}
