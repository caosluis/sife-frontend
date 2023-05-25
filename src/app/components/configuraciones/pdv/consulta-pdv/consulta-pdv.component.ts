import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { CuisService } from "src/app/services/cuis.service";
import { PdvService } from "src/app/services/pdv.service";
import { SucursalService } from "src/app/services/sucursal.service";

@Component({
  selector: "app-consulta-pdv",
  templateUrl: "./consulta-pdv.component.html",
  styleUrls: ["./consulta-pdv.component.css"],
})
export class ConsultaPdvComponent implements OnInit {
  loading = false;
  transaccion: any;
  descripcion: any;
  Respuesta: any;
  consultaPDV: FormGroup;
  cuis: any;
  EmpresaList: any[] = [];
  SucursalList: any[] = [];
  CuisList: any = [];
  EmpresaSeleccionada: any;
  UsuarioActual: any;
  datos_pdvs: any = [];
  displayedColumns: string[] = [
    "codigoPuntoVenta",
    "nombrePuntoVenta",
    "tipoPuntoVenta",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private fb: FormBuilder,
    private cuisService: CuisService,
    private sucursalService: SucursalService,
    public servicePDV: PdvService,
    public dialogRef: MatDialogRef<ConsultaPdvComponent>
  ) {
    this.EmpresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.sucursalService
      .sife_sucursal_get(this.EmpresaSeleccionada)
      .then((data) => {
        this.SucursalList = data.filter(
          (item) => item.nit == this.EmpresaSeleccionada && item.cuis != null
        );
      });
  }

  ngOnInit(): void {
    this.consultaPDV = this.fb.group({
      cuisCampo: [],
      nitCampo: [],
      codigoSucursalCampo: [],
    });
  }

  SeleccionarSucursal(sucursal, nit) {
    this.cuisService.sife_cuis_get_filter(sucursal, nit).then((data) => {
      console.log(data);
      
      if (data.length > 0) {
        this.cuis = data[0].cuis;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  CargarPDV_SIN(pdv) {
    this.loading = true;
    this.servicePDV.sife_pdv_mule_consultar(pdv).then((data) => {
      this.Respuesta = data;
      if (this.Respuesta.Respuesta.transaccion == "true") {
        if (Array.isArray(this.Respuesta.Respuesta.listaPuntosVentas)) {
          this.datos_pdvs = this.Respuesta.Respuesta.listaPuntosVentas;
          this.transaccion = this.Respuesta.Respuesta.transaccion;          
          this.loading = false;
        } else {
          this.datos_pdvs = [];
          this.datos_pdvs.push(this.Respuesta.Respuesta.listaPuntosVentas);
          this.transaccion = this.Respuesta.Respuesta.transaccion;
          this.loading = false;
        }
      } else {
        this.datos_pdvs = [];
        this.transaccion = this.Respuesta.Respuesta.transaccion;
        this.loading = false;
      }
    });
  }

  ConsultarPDVs(pdv) {
    console.log(JSON.stringify(pdv))
    this.loading = true;
    this.servicePDV.sife_pdv_mule_consultar(pdv)    
    .then((data) => {
      this.Respuesta = data;
      console.log(data);
      if (this.Respuesta.Respuesta.transaccion == "true") {
        if (Array.isArray(this.Respuesta.Respuesta.listaPuntosVentas)) {
          this.datos_pdvs = this.Respuesta.Respuesta.listaPuntosVentas;
          this.transaccion = this.Respuesta.Respuesta.transaccion;
          this.descripcion = this.Respuesta.Respuesta.descripcion;
          this.loading = false;
        } else {
          this.datos_pdvs = [];
          this.datos_pdvs.push(this.Respuesta.Respuesta.listaPuntosVentas);
          this.transaccion = this.Respuesta.Respuesta.transaccion;
          this.descripcion = this.Respuesta.Respuesta.descripcion;
          this.loading = false;
        }
      } else {
        this.datos_pdvs = [];
        this.transaccion = this.Respuesta.Respuesta.transaccion;
        this.descripcion = this.Respuesta.Respuesta.descripcion;
        this.loading = false;
        throw new Error('Oh no!');
      }
    },error => {
      this.descripcion = "Error de conexión al servicio de consulta Punto de Venta SIFE, verifique su conexión de red o consule a su administrador";
      console.error( 'Función de rechazo llamada: ', error );
      this.loading = false;
    });    
  }
}
