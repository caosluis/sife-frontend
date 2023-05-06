import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cufd-detail',
  templateUrl: './cufd-detail.component.html',
  styleUrls: ['./cufd-detail.component.css']
})
export class CufdDetailComponent implements OnInit {

  public dialogRef: MatDialogRef<CufdDetailComponent>

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
  }

}
