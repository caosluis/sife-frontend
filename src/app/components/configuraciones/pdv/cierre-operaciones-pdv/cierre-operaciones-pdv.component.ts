import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PdvService } from "src/app/services/pdv.service";
import { NotificationService } from "../../../../services/notification.service";

@Component({
  selector: "app-cierre-operaciones-pdv",
  templateUrl: "./cierre-operaciones-pdv.component.html",
  styleUrls: ["./cierre-operaciones-pdv.component.css"],
})
export class CierreOperacionesPdvComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public PdvService: PdvService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<CierreOperacionesPdvComponent>
  ) {}



  ngOnInit(): void {}

  CerrarOperacionesPDV() {
    this.loading = true;
    this.PdvService.sife_pdv_mule_cerrar_operaciones(this.data).then((data) => {
      this.transaccion = data.Respuesta.transaccion;
      this.Respuesta = data;
      if(this.transaccion == "true"){
        this.notificationService.success(data.Respuesta.descripcion);
        this.dialogRef.close();
      }else{
        this.notificationService.error(data.Respuesta.descripcion);
        this.loading = false;        
      }   
    });
  }
  onClose() {
    this.dialogRef.close();
  }
}
