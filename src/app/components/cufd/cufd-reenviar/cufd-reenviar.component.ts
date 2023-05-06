import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CufdService } from 'src/app/services/cufd.service';

@Component({
  selector: 'app-cufd-reenviar',
  templateUrl: './cufd-reenviar.component.html',
  styleUrls: ['./cufd-reenviar.component.css']
})
export class CufdReenviarComponent implements OnInit {
  loading = false;
  Respuesta: any;
  transaccion: any;
  error: any;
  empresaSeleccionada: any;
  UsuarioActual: any;
  constructor(public dialogRef: MatDialogRef<CufdReenviarComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, private CufdService: CufdService) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
  }
  EnviarCUFDSAP() {
    this.loading = true
    this.data.forEach(element => {
      this.CufdService.sife_cufd_mule_enviarcufdSAP_post({
        cuis: element.cuis,
        cufd: element.cufd,
        nit: element.nit,
        codigoSucursal: element.codigoSucursal,
        codigoPDV: element.codigoPDV,
        fechaVigencia: element.fechaVigencia,
        fechaCreacion: element.fechaCreacion,
        codigoControl: element.codigoControl,
        direccion: element.direccion,
        tipo: "cufd"
      }).subscribe(
        (response) => {
          this.Respuesta = response.respuesta.descripcion;
          this.transaccion = response.respuesta.transaccion;
        },
        (error) => {
          if (error.status == "404") {
            this.Respuesta = "Servicio no Encontrado";
            this.transaccion = "false";
          } else if (error.status == "0") {
            this.Respuesta = "Sin Conexión";
            this.transaccion = "false";
          }
        }
      )
    });
    this.loading = false
  }
  ngOnInit(): void {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
