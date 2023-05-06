import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SucursalService } from "src/app/services/sucursal.service";
import { NotificationService } from "../../../../services/notification.service";

@Component({
  selector: "app-cierre-operaciones-sucursal",
  templateUrl: "./cierre-operaciones-sucursal.component.html",
  styleUrls: ["./cierre-operaciones-sucursal.component.css"],
})
export class CierreOperacionesSucursalComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  constructor(
    public SucursalService: SucursalService,
    private notificationService: NotificationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CierreOperacionesSucursalComponent>
  ) {}

  ngOnInit(): void {}
  CerrarOperacionesSucursal() {
    this.loading = true;

    this.SucursalService.sife_sucursal_mule_cerrar_operaciones(this.data).then(
      (data) => {
        this.transaccion = data.Respuesta.transaccion;
        this.Respuesta = data;
        
        if(this.transaccion == 'true'){
          this.notificationService.success("Solicitud realizada con éxito, "+this.Respuesta.Respuesta.descripcion)
          this.dialogRef.close();
        }else{
          this.notificationService.error("Ocurrio un incomveniente, " + this.Respuesta)
          this.loading = false;
        }
      }
    );
  }
  onClose() {
    this.dialogRef.close();
  }
}
