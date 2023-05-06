
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../../services/notification.service';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  action: string;
  local_data: any;
  obj: any;
  constructor(
    public service: ProductosService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProductosFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.local_data = { ...data };
    this.action = this.local_data["action"];
    this.obj = this.local_data["obj"];
  }

  ngOnInit() {
    if (this.obj != null) { this.service.populateForm(this.obj); }
  }
  onSaveProductos() {
    if (!this.service.form.get('IdProducto').value) {
      this.service.submitProductos(this.service.form.value).then(
        data => {
          this.dialogRef.close({ event: this.action, data: data });
          this.notificationService.success("EXITOSO");
          this.service.form.reset();
        },
        error => { this.notificationService.warn("ERROR") }
      );
    }
    else {
      if (this.action == "Actualizar") {
        this.service.updateProductos(this.service.form.value).subscribe(
          data => {
            this.dialogRef.close({ event: this.action, data: data });
            this.service.form.reset();
            this.service.initializeFormGroup();
            this.notificationService.success('se actualizo exitosamente');
          });
        this.onClose();
      }
      if (this.action == "Eliminar") {
        this.service.deletedProductos(this.service.form.value.id).subscribe(
          data => {
            this.dialogRef.close({ event: this.action, data: data });
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
    this.dialogRef.close({ event: 'Cancel' });
  }
}
