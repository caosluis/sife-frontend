import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FacturasService } from 'src/app/services/facturas.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-factura-consulta',
  templateUrl: './factura-consulta.component.html',
  styleUrls: ['./factura-consulta.component.css']
})
export class FacturaConsultaComponent implements OnInit {

  transaccion: any
  descripcion: any

  constructor(private service: FacturasService,private notificationService: NotificationService,public dialogRef: MatDialogRef<FacturaConsultaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  Consultar(){
    var respuesta       
    this.service.sife_factura_mule_consultar(this.data).then(data=>
      {
        respuesta = data
        this.transaccion=respuesta.Respuesta.transaccion
        this.descripcion=respuesta.Respuesta.descripcion

        /* this.notificationService.success(respuesta.Respuesta.descripcion);
        console.log(respuesta.Respuesta.transaccion); */

    })
  }
}
