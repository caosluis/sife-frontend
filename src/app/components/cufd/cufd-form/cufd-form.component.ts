import { Component, OnInit ,Inject, Optional} from '@angular/core';
import { NotificationService } from './../../../services/notification.service';
import { CufdService } from './../../../services/cufd.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cufd-form',
  templateUrl: './cufd-form.component.html',
  styleUrls: ['./cufd-form.component.css']
})
export class CufdFormComponent implements OnInit {

  action:string;
  local_data:any;
  obj:any;
  constructor(
            public service: CufdService,
            private notificationService: NotificationService,
            public dialogRef: MatDialogRef<CufdFormComponent>,
            @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
              this.local_data = {...data};
              this.action = this.local_data["action"];
              this.obj = this.local_data["obj"];
            }

  ngOnInit() {
    if(this.obj != null){this.service.populateForm(this.obj);}
  }
  onSaveCufd(){
    if (!this.service.form.get('codigoPDV').value)
        {
          this.service.submitCufd(this.service.form.value).subscribe(
          data => {
            this.dialogRef.close({event:this.action,data:data});
            this.notificationService.success("EXITOSO");
            this.service.form.reset();
          },
            error => {console.log("CREA"+error); this.notificationService.warn("ERROR")}
          );
        }
      else
      {
        if(this.action == "Actualizar"){
          this.service.updateCufd(this.service.form.value).subscribe(
            data => {
              this.dialogRef.close({event:this.action,data:data});
              this.service.form.reset();
              this.service.initializeFormGroup();
              this.notificationService.success('se actualizo exitosamente');
            });
            this.onClose();
        }
        if(this.action == "Eliminar"){
          this.service.deletedCufd(this.service.form.value.id).subscribe(
            data => {
              this.dialogRef.close({event:this.action,data:data});
              this.service.form.reset();
              this.service.initializeFormGroup();
              this.notificationService.warn('Se elimino un registro');
            });
            this.onClose();
        }
    }
  }
  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
    this.dialogRef.close({event:'Cancel'});
  }
}
  