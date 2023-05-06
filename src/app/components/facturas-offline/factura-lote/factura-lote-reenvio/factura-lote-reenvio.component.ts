import { Component, Inject, OnInit, Optional} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FacturaElectronicaLoteService } from "src/app/services/factura-electronica-lote.service";
import { FacturasOfflineService } from "src/app/services/facturas-offline.service";


@Component({
  selector: 'app-factura-lote-reenvio',
  templateUrl: './factura-lote-reenvio.component.html',
  styleUrls: ['./factura-lote-reenvio.component.css']
})
export class FacturaLoteReenvioComponent implements OnInit {
  loading = false;
  constructor(
    private FacturasOfflineService: FacturasOfflineService,
    private facturaelectronicaloteService: FacturaElectronicaLoteService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FacturaLoteReenvioComponent>
  ) { }

  ngOnInit(): void {
  }
  //Cierra dialog
  onNoClick(): void {
    this.dialogRef.close();
  }

  Reenviarlote(){
    this.loading = true;
    //Mostrar datos en consola
    console.log({
      nit: this.data.nit,
      codigoSucursal: this.data.codigoSucursal,
      codigoPuntoVenta: this.data.codigoPuntoVenta,
      tipoFacturaDocumento: this.data.tipoFacturaDocumento,
      codigoDocumentoSector: this.data.codigoDocumentoSector,
      archivo: this.data.archivo,
      hashArchivo: this.data.hashArchivo,
      cantidadFacturas: this.data.cantidadFacturas,
      codigoEvento: this.data.codigoEvento,
      codigoEmision: "2",
      idlote: this.data.id,
      cafc: this.data.cafc
    });
    //Enviamos los datos al servicio
    this.facturaelectronicaloteService.sife_facturaElectronica_lote_reenvio(
      {
        nit: ''+this.data.nit,
        codigoSucursal: ''+this.data.codigoSucursal,
        codigoPuntoVenta: ''+this.data.codigoPuntoVenta,
        tipoFacturaDocumento: ''+this.data.tipoFacturaDocumento,
        codigoDocumentoSector: ''+this.data.codigoDocumentoSector,
        archivo: ''+this.data.archivo,
        hashArchivo: ''+this.data.hashArchivo,
        cantidadFacturas: ''+this.data.cantidadFacturas,
        codigoEvento: ''+this.data.codigoEvento,
        codigoEmision: "2",
        idlote: ''+this.data.id,
        cafc: ''+this.data.cafc
      }
      )
      .then((data) => {        
        console.log(data);
        alert("Solicitud realizada con exito, transaccion: " + data);
        //this.Respuesta = data.respuesta.descripcion;
        this.loading = false;
        this.dialogRef.close();
       })
       .catch(this.data);
    
  }
}
