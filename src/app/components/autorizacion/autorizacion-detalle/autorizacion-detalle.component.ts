import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-autorizacion-detalle',
  templateUrl: './autorizacion-detalle.component.html',
  styleUrls: ['./autorizacion-detalle.component.css']
})
export class AutorizacionDetalleComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AutorizacionDetalleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
    archivo: any

  ngOnInit(): void {
    this.archivo = "data:application/pdf;base64,"+this.data.archivo
    console.log(this.archivo)
  }
  
  close(): void {
    this.dialogRef.close();
  }
  
}
