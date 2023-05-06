import { Component, OnInit, Inject, Optional, ViewChild } from "@angular/core";
import { NotificationService } from "../../../../services/notification.service";
import { CuisService } from "../../../../services/cuis.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EmpresaService } from "src/app/services/empresa.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { v1 as uuidv1 } from "uuid";
import * as moment from "moment";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-form-cuis",
  templateUrl: "./form-cuis.component.html",
  styleUrls: ["./form-cuis.component.css"],
})
export class FormCuisComponent implements OnInit {
  loading = false;
  Respuesta: any;
  RespuestaGlobal: any;
  formularioEmpresa: FormGroup;
  action: string;
  local_data: any;
  displayedColumns: string[] = [
    "origen",
    "descripcion",
    "nit",
    "nombreCola",
    "fechaCreacion",
    "fechaModificacion",
    "cufPropio",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  id_value: any = "";
  nit_value: any = "";
  razonSocial_value: any = "";

  id_of: any = "";
  origen_of: any = "";
  descripcion_of: any = "";
  nit_of: any = "";
  nombreCola_of: any = "";
  cufPropio_of: any = "";
  panelOpenState: boolean = false;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private EmpresaService: EmpresaService,
    public service: CuisService,
    private formbuilder: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FormCuisComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
    this.action = this.local_data["action"];
    //console.log(this.action);
    if (data.id != undefined) {
      this.id_value = data.id;
      this.nit_value = data.nit;
      this.razonSocial_value = data.razonSocial;
    }
    this.cargarOrigenFactura();
  }

  ngOnInit() {
    this.formularioEmpresa = this.formbuilder.group({
      id: [],
      nit: [],
      razonSocial: [],
    });
    this.obtiene_sife_respuesta_global(this.nit_value);
  }
  onClear() {
    this.EmpresaService.form.reset();
    this.service.initializeFormGroup();
    //this.notificationService.success(':: Submitted successfully');
  }

  registrarFacturaOrigen(origen, descripcion, nombreCola, cufPropio) {
    if (this.id_of == "") {
      const id = uuidv1();
      var crear_facturaOrigen = {
        id: origen,
        origen: origen,
        descripcion: descripcion,
        nit: this.data.nit,
        nombreCola: nombreCola,
        cufPropio: cufPropio,
        fechaCreacion: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        fechaModificacion: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      };
      this.EmpresaService.sife_facturaOrigen_post(crear_facturaOrigen).then(
        (data) => {
          this.cargarOrigenFactura();
          this.vaciarOrigenFactura();
          this.panelOpenState = false;
        }
      );
    } else {
      console.log("modificar");
      var modificar_facturaOrigen = {
        origen: origen,
        descripcion: descripcion,
        nombreCola: nombreCola,
        cufPropio: cufPropio,
        fechaModificacion: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      };
      this.EmpresaService.sife_facturaOrigen_patch(
        this.id_of,
        modificar_facturaOrigen
      ).then((data) => {
        console.log(data);

        this.cargarOrigenFactura();
        this.vaciarOrigenFactura();
        this.panelOpenState = false;
      });
    }
  }
  editarFacturaOrigen(FacturaOrigen) {
    this.id_of = FacturaOrigen.id;
    this.origen_of = FacturaOrigen.origen;
    this.descripcion_of = FacturaOrigen.descripcion;
    this.nit_of = FacturaOrigen.nit;
    this.nombreCola_of = FacturaOrigen.nombreCola;
    this.cufPropio_of = FacturaOrigen.cufPropio;
    this.panelOpenState = true;
  }
  cargarOrigenFactura() {
    this.EmpresaService.sife_facturaOrigen_get(this.data.nit).then((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  vaciarOrigenFactura() {
    this.id_of = "";
    this.origen_of = "";
    this.descripcion_of = "";
    this.nit_of = "";
    this.nombreCola_of = "";
    this.cufPropio_of = "";
  }
  onSavecuis() {
    if (!this.EmpresaService.form.get("id").value) {
      this.EmpresaService.sife_empresa_post(
        this.EmpresaService.form.value
      ).then(
        (data) => {
          this.dialogRef.close({
            event: this.action,
            data: data["respuesta"],
          });
          if (data["respuesta"]["respuesta"] == "true") {
            this.notificationService.success(
              "Empresa registrada exitosamente!!!"
            );
          } else {
            this.notificationService.error(
              "Error al registrar empresa " + data["respuesta"]["respuesta"]
            );
          }
          //this.notificationService.success(data);
          this.EmpresaService.form.reset();
        },
        (error) => {
          this.notificationService.warn(error.error.text);
        }
      );
    } else {
      this.service.updateCuis(this.service.form.value).subscribe((data) => {
        this.dialogRef.close({ event: this.action, data: data });
        //console.log("ACTULIZA");
        this.notificationService.success("EXITOSO");
        this.EmpresaService.form.reset();
      });
      this.EmpresaService.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(":: Submitted successfully");
      this.onClose();
    }
  }
  onClose() {
    this.dialogRef.close();
  }
  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: "Cancel" });
  }

  GuardarCambios(empresa: any) {
    this.loading = true;
    if (!isNaN(empresa.nit)) {
      this.dialogRef.close(empresa);
    } else {
      this.loading = false;
      this.Respuesta = "El Valor de NIT debe ser un número Entero";
    }
  }

  obtiene_sife_respuesta_global(empresa: any){
    this.service.get_sife_respuesta_global(empresa).
    then((data) => {
      console.log('OBTIENE sife_respuesta_global' + JSON.stringify(data));
      console.log(data[0]);
      if(JSON.stringify(data) == '[]'){
        this.RespuestaGlobal = '';
      }else{
        this.RespuestaGlobal = data[0];
      }      
    });
  }
}
