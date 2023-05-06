import { Component, Inject, OnInit, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  form: FormGroup;
  datos: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DetalleComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  
    ) {
    }


    
  ngOnInit(): void {
    console.log("ACTUALIZACION: "+ this.data);
    
  }

  close(): void {
    this.dialogRef.close();
  }
}
