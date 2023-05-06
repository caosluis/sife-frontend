import { CuisService } from "./../../../services/cuis.service";
import { SucursalService } from "./../../../services/sucursal.service";
import { ListasDesplegablesService } from "./../../../services/listas-desplegables.service";

//Importamos el componente de formulario
import { PdvFormComponent } from "./pdv-form/pdv-form.component";
import { NotificationService } from "../../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";

//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { PdvService } from "src/app/services/pdv.service";
import { EmpresaService } from "src/app/services/empresa.service";
import { ConsultaPdvComponent } from "./consulta-pdv/consulta-pdv.component";
import { CierreOperacionesPdvComponent } from "./cierre-operaciones-pdv/cierre-operaciones-pdv.component";
import { CufdService } from "src/app/services/cufd.service";
import { PdvCuisComponent } from "./pdv-cuis/pdv-cuis.component";
import { PdvCufdComponent } from "./pdv-cufd/pdv-cufd.component";
import { CierrePdvComponent } from "./cierre-pdv/cierre-pdv.component";
import { PdvCuisMasivoComponent } from "./pdv-cuis-masivo/pdv-cuis-masivo.component";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-pdv",
  templateUrl: "./pdv.component.html",
  styleUrls: ["./pdv.component.css","./../../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class PdvComponent implements OnInit {
  subscription: Subscription;
  UsuarioActual: any;
  empresaSeleccionada: any;
  sucursalSeleccionada: any = "Todas";
  displayedColumns: string[] = [
    //"Empresa",
    "codigoPDV",
    "nombrePuntoVenta",
    "TipoPuntoVenta",
    "Sucursal",
    "CUIS",
    "VigenciaCUIS",
    //"descripcion_transaccion",
    "estado",
    "CUFD",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  sucursalList: any;
  empresasList: any;
  cuisList: any;
  cufdList: any;
  sucursalesIndex: any = {};
  codigosPuntoVentaIndex: any = {};

  FechaActual = new Date();
  FechaVencimiento = new Date();

  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket,
    private ListasDesp: ListasDesplegablesService,
    private cuisService: CuisService,
    private empresaService: EmpresaService,
    private sucursalService: SucursalService,
    public pdvService: PdvService,
    private cufdService: CufdService
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.CargarPDV();
    this.CargarCuis();
    this.CargarEmpresa();
    this.CargarSucursal();
    this.CargarCUFD();
    this.cuisService.sife_cuis_get().then((data) => {
      this.cuisList = data;
    });
    this.empresaService.sife_empresa_get().then((data) => {
      this.empresasList = data;
    });
    this.ListasDesp.getLista("tipoPundoDeVenta").then((data) => {
      var codigos = data[0]["valores"];
      codigos.filter((value) => {
        this.codigosPuntoVentaIndex = {
          ...this.codigosPuntoVentaIndex,
          [value["id"]]: value["valor"],
        };
      });
      // this.codigosPuntoVenta = data[0][]
    });
    /* this.getAllPdv(); */
    // Escuchadores Socket IO
    this.socket.on("PDV_Ingresa", (row_obj) => {
      this.CargarCuis();
      this.CargarCUFD();
      this.Refresh();
    });
    this.socket.on("Ingresa_Cufd", (row) => {
      this.CargarCUFD();
    });
    this.socket.on("Sucursal_Ingresa", (row_obj) => {
      this.CargarSucursal();
    });
    this.socket.on("Empresa_Ingresa", (row_obj) => {
      this.CargarEmpresa();
    });
    this.socket.on("/Sifecufd/POST", (row_obj) => {
      this.CargarCUFD();
    });
    // Get index cuis
  }
  // Metodos open dialogo (Modal)
  RegistrarPDV(datos_pdv) {
    const dialogRef = this.dialog.open(PdvFormComponent, {
      width: "70%",
      data: datos_pdv,
    });

    dialogRef.afterClosed().subscribe((pdv) => {
      /*if (pdv != undefined) {
        var respuesta;
        this.pdvService.sife_pdv_mule_registrar(pdv).then((data) => {
          respuesta = data;
          this.notificationService.success("PDV Registrado Correctamente");
          console.log(respuesta.Respuesta);
        });
      }*/
    });
  }

  ConsultarPDV(datos_pdv) {
    const dialogRef = this.dialog.open(ConsultaPdvComponent, {
      width: "50%",
      data: datos_pdv,
    });
  }

  CerrarPDV(datos_pdv) {
    const dialogRef = this.dialog.open(CierrePdvComponent, {
      width: "50%",
      data: datos_pdv,
    });
    dialogRef.afterClosed().subscribe((pdv) => {
      if (pdv) {
      }
    });
  }

  CerrarOperacionesPDV(datos_pdv) {
    const dialogRef = this.dialog.open(CierreOperacionesPdvComponent, {
      width: "50%",
      data: datos_pdv,
    });
    dialogRef.afterClosed().subscribe((pdv) => {
      if (pdv != undefined) {
        var respuesta;
        this.pdvService.sife_pdv_mule_cerrar_operaciones(pdv).then((data) => {
          respuesta = data;
          console.log(respuesta.Respuesta);
          this.CargarPDV();
        });
      }
    });
  }
  solicitudCuis(datos_pdv) {
    const dialogRef = this.dialog.open(PdvCuisComponent, {
      width: "30%",
      data: datos_pdv,
    });
    dialogRef.afterClosed().subscribe();
  }
  SolicitarCuisMasivo() {
    const dialogRef = this.dialog.open(PdvCuisMasivoComponent, {
      width: "30%",
    });
    dialogRef.afterClosed().subscribe();
  }
  solicitudCufd(datos_pdv) {
    const dialogRef = this.dialog.open(PdvCufdComponent, {
      width: "30%",
      data: datos_pdv,
    });
    dialogRef.afterClosed().subscribe();
  }

  // Metodos get, add. delete y oninit
  ngOnInit(): void {
    this.FechaVencimiento.setDate(this.FechaActual.getDate() + 5);
    this.subscription = this.pdvService._refresh$.subscribe(()=>{
      console.log("Observable Iniciado");
      this.Refresh()
    }) 
  }
  CargarPDV() {
    this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
      this.pdvService.dataSource = new MatTableDataSource(data);
      this.pdvService.dataSource.paginator = this.paginator;
      this.pdvService.dataSource.sort = this.sort;
    });
  }
  SeleccionarSucursal(sucursal) {
    this.sucursalSeleccionada = sucursal;
    if (sucursal == "Todas") {
      this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
        this.pdvService.dataSource.data = data;
      });
    } else {
      this.pdvService
        .sife_pdv_get_susursal(
          this.empresaSeleccionada,
          this.sucursalSeleccionada
        )
        .then((data) => {
          this.pdvService.dataSource.data = data;
        });
    }
  }
  Refresh() {
    if (this.sucursalSeleccionada == "Todas") {
      this.pdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
        this.pdvService.dataSource.data = data;
      });
    } else {
      this.pdvService
        .sife_pdv_get_susursal(
          this.empresaSeleccionada,
          this.sucursalSeleccionada
        )
        .then((data) => {
          this.pdvService.dataSource.data = data;
        });
    }
  }
  CargarCuis() {
    this.cuisService.sife_cuis_get().then((data) => (this.cuisList = data));
  }
  CargarEmpresa() {
    this.empresaService
      .sife_empresa_get()
      .then((data) => (this.empresasList = data));
  }
  CargarSucursal() {
    this.sucursalService
      .sife_sucursal_get(this.empresaSeleccionada)
      .then((data) => (this.sucursalList = data));
  }
  CargarCUFD() {
    this.cufdService
      .sife_cufd_get(this.empresaSeleccionada)
      .then((data) => (this.cufdList = data));
  }

  CuisPdv(nit, sucursal, pdv, solicitudCuis) {
    if (this.cuisList != undefined) {
      var cuispdv = [];
      if (solicitudCuis != "0") {
        for (let i = 0; i < this.cuisList.length; i++) {
          if (
            this.cuisList[i].nit == nit &&
            this.cuisList[i].codigoSucursal == sucursal &&
            this.cuisList[i].codigoPDV == pdv
          ) {
            cuispdv.push(this.cuisList[i]);
          }
        }
        if (cuispdv[0] != undefined) {
          return cuispdv[0].cuis;
        }
      } else {
        cuispdv = this.cuisList.filter(
          (item) => item.nit == nit && item.codigoSucursal == sucursal
        );
        return cuispdv[0].cuis;
      }
    }
  }
  VigenciaCuisPdv(nit, sucursal, pdv, solicitudCuis) {
    if (this.cuisList != undefined) {
      if (solicitudCuis != "0") {
        var cuispdv = this.cuisList.filter(
          (item) =>
            item.nit == nit &&
            item.codigoSucursal == sucursal &&
            item.codigoPDV == pdv
        );
        if (cuispdv[0] != undefined) {
          return cuispdv[0].cuisVigencia;
        }
      } else {
        var cuispdv = this.cuisList.filter(
          (item) => item.nit == nit && item.codigoSucursal == sucursal
        );
        return cuispdv[0].cuisVigencia;
      }
    }
  }
  EmpresaSucursal(nit) {
    if (this.empresasList != undefined) {
      var empresasucursal = this.empresasList.filter((item) => item.nit == nit);
      return empresasucursal[0].razonSocial;
    }
  }
  SucursalPdv(nit, sucursal) {
    if (this.sucursalList != undefined) {
      var SucursalPdv = this.sucursalList.filter(
        (item) => item.nit == nit && item.codigoSucursal == sucursal
      );
      if (SucursalPdv[0] != undefined) {
        return SucursalPdv[0].descripcion;
      }
    }
  }
  CufdPdv(nit, sucursal, pdv) {
    if (this.cufdList != undefined) {
      var CufdPdv = this.cufdList.filter(
        (item) =>
          item.nit == nit &&
          item.codigoSucursal == sucursal &&
          item.codigoPDV == pdv
      );
      if (CufdPdv[0] != undefined) {
        return "CUFD";
      }
    }
  }
  PdvSolicitarCuis(estado, pdv) {
    if (estado == "1") {
      this.pdvService
        .sife_pdv_patch({ solicitudCuis: "1" }, pdv.id)
        .then(() => this.CargarPDV());
    } else {
      this.pdvService
        .sife_pdv_patch({ solicitudCuis: "0" }, pdv.id)
        .then(() => this.CargarPDV());
    }
  }

  //Metodo de filtrado

  applyFilter(filterValue: string) {
    this.pdvService.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.pdvService.dataSource.paginator) {
      this.pdvService.dataSource.paginator.firstPage();
    }
  }

  informacion(){
    const dialogRef = this.dialog.open(InfoPDV, {
      width: "80%"
    });
    dialogRef.afterClosed().subscribe();
  }
  informacionEmpresaSucursalPdv(){
    const dialogRef = this.dialog.open(InfoEmpresaSucursalPdv, {
      width: "80%"
    });
    dialogRef.afterClosed().subscribe();
  }
}

@Component({
  selector: 'info-puntodeventa',
  templateUrl: './../../informaciones/info-puntodeventa.html',
})

export class InfoPDV {}

@Component({
  selector: 'info-empresa-sucursal-pdv',
  templateUrl: './../../informaciones/info-empresa-sucursal-pdv.html',
})

export class InfoEmpresaSucursalPdv {
  constructor() {}
}