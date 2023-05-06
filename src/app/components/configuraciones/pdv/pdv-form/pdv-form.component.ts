import { UserService } from "./../../../../services/user.service";
import { SucursalService } from "./../../../../services/sucursal.service";
import { CuisService } from "./../../../../services/cuis.service";
import { SincronizarService } from "./../../../../services/sincronizar.service";

import { Component, OnInit, Inject, Optional } from "@angular/core";
import { NotificationService } from "../../../../services/notification.service";
import { CrearpdvService } from "../../../../services/crearpdv.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EmpresaService } from "src/app/services/empresa.service";
import { PdvService } from "src/app/services/pdv.service";

@Component({
  selector: "app-pdv-form",
  templateUrl: "./pdv-form.component.html",
  styleUrls: ["./pdv-form.component.css"],
})
export class PdvFormComponent implements OnInit {
  formularioPDV: FormGroup;
  action: string;
  local_data: any;
  obj: any;
  EmpresaList: any[] = [];
  SucursalList: any[] = [];
  codigoTipoPuntoVentas: any[] = [];
  CuisList: any = [];
  EmpresaSeleccionada: any;
  UsuarioActual: any;
  solicitudCuisPdv: any = 1;
  EstadoPDV: any;
  loading = false;
  Respuesta: any;
  transaccion: any;
  descripcion: any;

  constructor(
    public service: CrearpdvService,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<PdvFormComponent>,
    private catalogoService: SincronizarService,
    private cuisService: CuisService,
    private empresaService: EmpresaService,
    private sucursalService: SucursalService,
    public pdvService: PdvService,
    public userS: UserService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));

    this.local_data = { ...data };
    this.action = this.local_data["action"];
    this.obj = this.local_data["obj"];

    this.sucursalService
      .sife_sucursal_tabla_get(this.EmpresaSeleccionada)
      .then((data) => {
        this.SucursalList = data;
      });

    if (this.obj != null) {
      this.obj["codigoTipoPuntoVenta"] = Number(
        this.obj["codigoTipoPuntoVenta"]
      );
    }
    // Catalogo tipo de PDV
    this.catalogoService
      .getProductoServ(this.EmpresaSeleccionada, "ParametricaTipoPuntoVenta")
      .subscribe((data) => {
        this.codigoTipoPuntoVentas = data;
      });
    // Lsista de empresas
    this.empresaService.sife_empresa_get_activos().then((data) => {
      this.EmpresaList = data.filter(
        (item) => item.nit == this.UsuarioActual.empresa
      );
    });
    /* this.pdvService.sife_pdvEstado_get("pdv").then((data) => {

    }); */

    this.cuisService.sife_cuis_get().then((data) => {
      this.CuisList = data;
    });
  }

  ngOnInit() {
    this.pdvService.sife_pdvEstado_get(this.data.id).then((data) => {
      this.EstadoPDV = data;
    });

    this.formularioPDV = this.fb.group({
      id: [],
      codigoPDV: [],
      cuis: [],
      nit: [],
      codigoSucursal: [],
      nombrePuntoVenta: [],
      codigoTipoPuntoVenta: [],
      valorTipoPuntoVenta: [],
      descripcion: [],
      telefono: [],
    });
    this.formularioPDV.get("id").setValue(this.data.id);
    this.formularioPDV.get("codigoPDV").setValue(this.data.codigoPDV);
    this.formularioPDV.get("cuis").setValue(this.data.cuis);
    this.formularioPDV.get("nit").setValue(this.data.nit);
    this.formularioPDV.get("codigoSucursal").setValue(this.data.codigoSucursal);
    this.formularioPDV
      .get("nombrePuntoVenta")
      .setValue(this.data.nombrePuntoVenta);
    this.formularioPDV
      .get("codigoTipoPuntoVenta")
      .setValue(this.data.codigoTipoPuntoVenta);
    this.formularioPDV
      .get("valorTipoPuntoVenta")
      .setValue(this.data.valorTipoPuntoVenta);
    this.formularioPDV.get("descripcion").setValue(this.data.descripcion);
    this.formularioPDV.get("telefono").setValue(this.data.telefono);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SeleccionarSucursal(sucursal) {
    var CuisSucursal = [];
    for (let i = 0; i < this.SucursalList.length; i++) {
      if (
        this.SucursalList[i].codigoSucursal == sucursal &&
        this.SucursalList[i].nit == this.EmpresaSeleccionada
      ) {
        CuisSucursal.push(this.SucursalList[i]);
      }
    }
    this.formularioPDV.get("cuis").setValue(CuisSucursal[0].cuis);
  }

  SeleccionaroTipoPuntoVenta(TipoPuntoVenta) {
    this.catalogoService
      .sife_sincronizarParametricaTipoPuntoVenta_get_filter(TipoPuntoVenta)
      .then((data) => {
        this.formularioPDV
          .get("valorTipoPuntoVenta")
          .setValue(data[0].descripcion);
      });
  }

  GuardarCambios(pdv: any) {
    this.loading = true;
    if (pdv.telefono == "") {
      pdv.telefono = 0;
      pdv.usuario = this.UsuarioActual.username;
      console.log("DATOS A GUARDAR DE PDV: " + JSON.stringify(pdv));
      if (pdv != undefined) {
        var respuesta;
        this.pdvService.sife_pdv_mule_registrar(pdv).then((data) => {
          respuesta = data;          
          this.transaccion = respuesta.Respuesta.transaccion;          
          this.descripcion = respuesta.Respuesta.descripcion;
          if(this.transaccion == "true"){
            this.notificationService.success("Punto de Venta registrado correctamente");
            this.dialogRef.close();
          }else{
            this.notificationService.error(this.descripcion);
            this.loading = false;
          }
          console.log(respuesta.Respuesta);
        });
      }
      //this.dialogRef.close(pdv);
    } else {
      pdv.usuario = this.UsuarioActual.username;
      console.log("DATOS A GUARDAR DE PDV: " + JSON.stringify(pdv));
      if (pdv != undefined) {
        var respuesta;
        this.pdvService.sife_pdv_mule_registrar(pdv).then((data) => {
          respuesta = data;
          this.transaccion = respuesta.Respuesta.transaccion;
          this.descripcion = respuesta.Respuesta.descripcion;
          if(this.transaccion == "true"){
            this.notificationService.success("Punto de Venta registrado correctamente");
            this.dialogRef.close();
          }else{
            this.notificationService.error(this.descripcion);
            this.loading = false;
          }
          console.log(respuesta.Respuesta);
        });
      }
      //this.dialogRef.close(pdv);
    }
  }

  VigenciaCuisPdv(cuis) {
    if (this.CuisList != undefined) {
      var cuispdv = this.CuisList.filter((item) => item.cuis == cuis);
      if (cuispdv[0] != undefined) {
        return cuispdv[0].cuisVigencia;
      }
    }
  }
  SolicitarCUIS(solicitar) {
    if (solicitar.checked == true) {
      this.formularioPDV.get("solicitudCuis").setValue(1);
    } else {
      this.formularioPDV.get("solicitudCuis").setValue(0);
    }
  }
  SolicitaCuis(solicita) {
    if (solicita == true) {
      this.solicitudCuisPdv = 1;
    } else {
      this.solicitudCuisPdv = 0;
    }
  }
}
