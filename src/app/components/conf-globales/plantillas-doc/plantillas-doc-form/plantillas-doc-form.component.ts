import { Component, OnInit, Inject, Optional } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotificationService } from "../../../../services/notification.service";
import { PlantillasDocService } from "../../../../services/plantillas-doc.service";

@Component({
  selector: "app-plantillas-doc-form",
  templateUrl: "./plantillas-doc-form.component.html",
  styleUrls: ["./plantillas-doc-form.component.css"],
})
export class PlantillasDocFormComponent implements OnInit {
  action: string;
  local_data: any;
  obj: any;
  codigoClasificadors: any;
  cabeceras: any[] = [];
  detalles: any[] = [];
  pies: any[] = [];
  plantilladocList: any;
  constructor(
    public PlantillasDocService: PlantillasDocService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<PlantillasDocFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
    this.action = this.local_data["action"];
    this.obj = this.local_data["obj"];
    this.codigoClasificadors = this.local_data["TipoDocumentoFiscal"];
  }

  ngOnInit() {
    this.PlantillasDocService.sife_sincronizarParametricaTipoDocumentoSector_get().then(
      (data) => {
        this.plantilladocList = data;
      }
    );
    if (this.obj != null) {
      this.obj.codigoClasificador = String(this.obj.codigoClasificador);
      this.PlantillasDocService.populateForm(this.obj);
      if (this.obj.plantilla.cabecera != undefined) {
        this.cabeceras = this.obj.plantilla.cabecera;
      }
      if (this.obj.plantilla.detalle != undefined) {
        this.detalles = this.obj.plantilla.detalle;
      }
      if (this.obj.plantilla.pie != undefined) {
        this.pies = this.obj.plantilla.pie;
      }
    }
  }
  onSavePlantillasDoc() {
    if (!this.PlantillasDocService.form.get("id").value) {
      this.PlantillasDocService.form.patchValue({
        plantilla: {
          cabecera: this.cabeceras,
          detalle: this.detalles,
          pie: this.pies,
        },
        estado: 1,
      });
      this.PlantillasDocService.submitPlantillasDoc(
        this.PlantillasDocService.form.value
      ).subscribe(
        (data) => {
          this.dialogRef.close({ event: this.action, data: data });
          this.notificationService.success("EXITOSO");
          this.PlantillasDocService.form.reset();
        },
        (error) => {
          console.log("CREA" + error);
          this.notificationService.warn("ERROR");
        }
      );
    } else {
      if (this.action == "Actualizar") {
        this.PlantillasDocService.form.patchValue({
          plantilla: {
            cabecera: this.cabeceras,
            detalle: this.detalles,
            pie: this.pies,
          },
        });
        console.log(this.PlantillasDocService.form.get("plantilla").value);

        this.PlantillasDocService.updatePlantillasDoc(
          this.PlantillasDocService.form.value
        ).subscribe((data) => {
          this.dialogRef.close({ event: this.action, data: data });
          this.PlantillasDocService.form.reset();
          this.PlantillasDocService.initializeFormGroup();
          this.notificationService.success("se actualizo exitosamente");
        });
        this.onClose();
      }
      if (this.action == "Eliminar") {
        this.PlantillasDocService.deletedPlantillasDoc(
          this.PlantillasDocService.form.value.id
        ).subscribe((data) => {
          this.dialogRef.close({ event: this.action, data: data });
          this.PlantillasDocService.form.reset();
          this.PlantillasDocService.initializeFormGroup();
          this.notificationService.warn("Se elimino un registro");
        });
        this.onClose();
      }
    }
  }
  onClose() {
    this.PlantillasDocService.form.reset();
    this.PlantillasDocService.initializeFormGroup();
    this.dialogRef.close();
    this.dialogRef.close({ event: "Cancel" });
  }
  seleccionarTipoDoc(codigoClasificador) {
    var tipoDoc;
    this.plantilladocList.filter((value, key) => {
      if (value.codigoClasificador == codigoClasificador.value) {
        tipoDoc = value.descripcion;
      }
    });
    this.PlantillasDocService.form.patchValue({
      TipoDocumentoFiscal: tipoDoc,
    });
  }
  //Funciones de cabecera
  addItem() {
    var posicion = (<HTMLInputElement>document.getElementById("posicion"))
      .value;
    var valores = (<HTMLInputElement>document.getElementById("valor")).value;
    var display = (<HTMLInputElement>document.getElementById("display")).value;
    var dato = { posicion: posicion, clave: valores, label: display };
    this.cabeceras = [...this.cabeceras, dato];
    (<HTMLInputElement>document.getElementById("valor")).value = "";
    (<HTMLInputElement>document.getElementById("display")).value = "";
  }
  deleterItem(clave) {
    this.cabeceras = this.cabeceras.filter((value, key) => {
      return value.clave != clave;
    });
    this.PlantillasDocService.form.patchValue({
      valores: this.cabeceras,
    });
  }
  //Funciones de detalle
  addItemD() {
    var posicion = (<HTMLInputElement>document.getElementById("posicionD"))
      .value;
    var valores = (<HTMLInputElement>document.getElementById("valorD")).value;
    var display = (<HTMLInputElement>document.getElementById("displayD")).value;
    var dato = { posicion: posicion, clave: valores, label: display };
    this.detalles = [...this.detalles, dato];
    (<HTMLInputElement>document.getElementById("valorD")).value = "";
    (<HTMLInputElement>document.getElementById("displayD")).value = "";
  }
  deleterItemD(clave) {
    this.detalles = this.detalles.filter((value, key) => {
      return value.clave != clave;
    });
    this.PlantillasDocService.form.patchValue({
      valores: this.detalles,
    });
  }
  //Funciones de pie
  addItemP() {
    var posicion = (<HTMLInputElement>document.getElementById("posicionP"))
      .value;
    var valores = (<HTMLInputElement>document.getElementById("valorP")).value;
    var display = (<HTMLInputElement>document.getElementById("displayP")).value;
    var dato = { posicion: posicion, clave: valores, label: display };
    this.pies = [...this.pies, dato];
    (<HTMLInputElement>document.getElementById("valorP")).value = "";
    (<HTMLInputElement>document.getElementById("displayP")).value = "";
  }
  deleterItemP(clave) {
    this.pies = this.pies.filter((value, key) => {
      return value.clave != clave;
    });
    this.PlantillasDocService.form.patchValue({
      valores: this.pies,
    });
  }
}
