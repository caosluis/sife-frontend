import { Component, OnInit, Inject, Optional } from "@angular/core";
import { NotificationService } from "../../../services/notification.service";
import { FirmaDigitalService } from "../../../services/firma-digital.service";
//Importamos los componentes de CUIS/Empresa
import { Cuis } from "../../../models/cuis";
import { CuisService } from "./../../../services/cuis.service";
//Servicio de lista desplegable
import { ListasDesplegablesService } from "./../../../services/listas-desplegables.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EmpresaService } from "src/app/services/empresa.service";
import { SucursalService } from "src/app/services/sucursal.service";

@Component({
  selector: "app-firma-digital-form",
  templateUrl: "./firma-digital-form.component.html",
  styleUrls: ["./firma-digital-form.component.css"],
})
export class FirmaDigitalFormComponent implements OnInit {
  action: string;
  local_data: any;
  obj: any;
  cuisList: any[];
  EmpresaList: any;
  sucursalList: any;
  tipoFirmas: any[] = [];
  HoraActual: any;
  EmpresaSeleccionada: any;
  UsuarioActual: any;

  descripcion: any = "";
  estado: any;
  fechaRegistro: any = "";
  fechaVigencia: any = "";
  firma: any = "";
  id: any = "";
  idUsuario: any = "";
  tipo: any = "";

  constructor(
    public FirmaDigitalService: FirmaDigitalService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<FirmaDigitalFormComponent>,
    private empresaService: EmpresaService,
    private sucursalService: SucursalService,
    private serviceLista: ListasDesplegablesService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));

    this.HoraActual = new Date();

    this.empresaService.sife_empresa_get_activos().then((data) => {
      this.EmpresaList = data.filter(
        (item) => item.nit == this.UsuarioActual.empresa
      );
    });
    this.serviceLista.getLista("tiposFirmaDigital").then((data) => {
      this.tipoFirmas = data[0]["valores"];
    });
  }

  ngOnInit() {
    if (this.data) {
      this.descripcion = this.data.descripcion;
      this.estado = this.data.estado;
      this.fechaRegistro = this.data.fechaRegistro;
      this.fechaVigencia = this.data.fechaVigencia;
      this.firma = this.data.firma;
      this.id = this.data.id;
      this.idUsuario = this.data.idUsuario;
      this.tipo = this.data.tipo;
    }
  }
  onSaveFirmaDigital() {
    /* 
    var txt = this.FirmaDigitalService.form.value.firma;
    if (!this.FirmaDigitalService.form.get("id").value) {
      this.FirmaDigitalService.submitFirmaDigital(
        this.FirmaDigitalService.form.value
      ).subscribe(
        (data) => {
          this.dialogRef.close({ event: this.action, data: data });
          this.notificationService.success("EXITOSO");
          this.FirmaDigitalService.form.reset();
        },
        (error) => {
          console.log("Error al crear", error);
          this.notificationService.warn("ERROR");
        }
      );
    } else {
      if (this.action == "Actualizar") {
        this.FirmaDigitalService.updateFirmaDigital(
          this.FirmaDigitalService.form.value
        ).subscribe((data) => {
          this.dialogRef.close({ event: this.action, data: data });
          this.FirmaDigitalService.form.reset();
          this.FirmaDigitalService.initializeFormGroup();
          this.notificationService.success("se actualizo exitosamente");
        });
        this.onClose();
      }
      if (this.action == "Eliminar") {
        this.FirmaDigitalService.deletedFirmaDigital(
          this.FirmaDigitalService.form.value.id
        ).subscribe((data) => {
          this.dialogRef.close({ event: this.action, data: data });
          this.FirmaDigitalService.form.reset();
          this.FirmaDigitalService.initializeFormGroup();
          this.notificationService.warn("Se elimino un registro");
        });
        this.onClose();
      }
    } */
  }

  SeleccionarFechaRegistro(fecha) {
    this.fechaRegistro = fecha.value;
  }

  SeleccionarFechaVigencia(fecha) {
    this.fechaVigencia = fecha.value;
  }

  SeleccionarEmpresa(empresa) {
    this.sucursalService.sife_sucursal_get_activos().then((data) => {
      this.sucursalList = data.filter(
        (item) => item.nit == empresa && item.cuis != null
      );
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onClose() {
    this.FirmaDigitalService.form.reset();
    this.FirmaDigitalService.initializeFormGroup();
    this.dialogRef.close();
    this.dialogRef.close({ event: "Cancel" });
  }
  mostrarTexto(event) {
    var valores = <HTMLInputElement>document.getElementById("fileTxt");
    if (valores.files && valores.files[0]) {
      var myFile = valores.files[0];
      var reader = new FileReader();
      reader.addEventListener("load", (e) => {
        this.firma = reader.result;
        /* this.FirmaDigitalService.form.patchValue({
          firma: reader.result,
        }); */
      });
      var r = reader.readAsBinaryString(myFile);
    }
  }
}
