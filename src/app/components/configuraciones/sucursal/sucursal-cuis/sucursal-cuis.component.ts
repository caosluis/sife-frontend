import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SucursalService } from "src/app/services/sucursal.service";
import { NotificationService } from "../../../../services/notification.service";

@Component({
  selector: "app-sucursal-cuis",
  templateUrl: "./sucursal-cuis.component.html",
  styleUrls: ["./sucursal-cuis.component.css"],
})
export class SucursalCuisComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SucursalCuisComponent>,
    private notificationService: NotificationService,
    private sucursalService: SucursalService
  ) {}

  ngOnInit(): void {}
  Solicitar(sucursal) {
    this.loading = true;
    this.sucursalService
      .sife_sucursal_mule_solicitarCuis(sucursal)
      .then((data) => {
        this.Respuesta = data;
        this.loading = false;
        this.transaccion = data.Respuesta.transaccion;
        if(this.transaccion == 'true'){
          this.notificationService.success("Solicitud realizada con éxito, "+this.Respuesta.Respuesta.descripcion)
          this.dialogRef.close(sucursal);
        }else{
          this.notificationService.error("Ocurrio un incomveniente, "+this.Respuesta)
        }
        
      });
  }
  onClose() {
    this.dialogRef.close();
  }
}
