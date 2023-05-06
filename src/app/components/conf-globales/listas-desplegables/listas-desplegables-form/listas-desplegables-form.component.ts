
import { Component, OnInit ,Inject, Optional} from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { ListasDesplegablesService } from '../../../../services/listas-desplegables.service';
import { stringify } from 'querystring';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-listas-desplegables-form',
  templateUrl: './listas-desplegables-form.component.html',
  styleUrls: ['./listas-desplegables-form.component.css']
})
export class ListasDesplegablesFormComponent implements OnInit {

  action:string;
  local_data:any;
  obj:any;
  valores:any[] = [];
  constructor(
            public service: ListasDesplegablesService,
            private notificationService: NotificationService,
            public dialogRef: MatDialogRef<ListasDesplegablesFormComponent>,
            @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
              this.local_data = {...data};
              this.action = this.local_data["action"];
              this.obj = this.local_data["obj"];
              if(this.obj){
                this.valores = this.obj.valores;
              }
            }

  ngOnInit() {
    if(this.obj != null){this.service.populateForm(this.obj);}
  }
  onSaveListasDesplegables(){
    this.valores.sort((a,b)=> a.id - b.id);
    this.service.form.patchValue({
      valores:this.valores
    });
    if (!this.service.form.get('id').value)
        {
          this.service.submitListasDesplegables(this.service.form.value).subscribe(
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
          this.service.updateListasDesplegables(this.service.form.value).subscribe(
            data => {
              this.dialogRef.close({event:this.action,data:data});
              this.service.form.reset();
              this.service.initializeFormGroup();
              this.notificationService.success('se actualizo exitosamente');
            });
            this.onClose();
        }
        if(this.action == "Eliminar"){
          this.service.deletedListasDesplegables(this.service.form.value.id).subscribe(
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
  addItem(){
    var valores = (<HTMLInputElement>document.getElementById("valor")).value;
    var display = (<HTMLInputElement>document.getElementById("display")).value;
    var dato = {id:valores,valor:display}
    this.valores = [dato,...this.valores];
    (<HTMLInputElement>document.getElementById("valor")).value = "";
    (<HTMLInputElement>document.getElementById("display")).value = "";
    this.valores.sort((a,b)=> a.id - b.id);
    this.service.form.patchValue({
      valores:this.valores
    });
    
  }
  deleterItem(id){
    this.valores = this.valores.filter((value,key)=>{
      return value.id != id;
    });
    this.service.form.patchValue({
      valores:this.valores
    });
  }
}
  