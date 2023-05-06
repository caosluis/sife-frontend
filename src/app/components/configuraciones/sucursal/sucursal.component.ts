import { CrearpdvService } from "./../../../services/crearpdv.service";
//Importamos el componente de formulario
import { SucursalFormComponent } from "./sucursal-form/sucursal-form.component";
import { SucursalService } from "../../../services/sucursal.service";
import { NotificationService } from "../../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CuisService } from "./../../../services/cuis.service";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "moment";
import { EmpresaService } from "src/app/services/empresa.service";
import { CierreOperacionesSucursalComponent } from "./cierre-operaciones-sucursal/cierre-operaciones-sucursal.component";
import { ListasDesplegablesService } from "src/app/services/listas-desplegables.service";
import { SucursalCuisComponent } from "./sucursal-cuis/sucursal-cuis.component";
import { CufdService } from "src/app/services/cufd.service";
import { PdvCufdComponent } from "../pdv/pdv-cufd/pdv-cufd.component";
import { PdvService } from "src/app/services/pdv.service";
import { SucursalCuisMasivoComponent } from "./sucursal-cuis-masivo/sucursal-cuis-masivo.component";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-sucursal",
  templateUrl: "./sucursal.component.html",
  styleUrls: ["./sucursal.component.css","./../../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class SucursalComponent implements OnInit {
  subscription: Subscription;
  UsuarioActual: any;
  empresaSeleccionada: any;
  displayedColumns: string[] = [
    //"empresa",
    "codigoSucursal",
    "direccion",
    //"descripcion",
    "departamento",
    "muncipio",
    "cuis",
    "vigenciaCuis",
    "estado",
    "CUFD",
    "actions",
  ];
  public dataSource: MatTableDataSource<any>;
  empresasList: any;
  cuisList: any;
  cufdList: any;
  departamentos: any[];
  FechaActual = new Date();
  FechaVencimiento = new Date();

  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public cuisService: CuisService,
    public sucursalService: SucursalService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket,
    private empresaService: EmpresaService,
    private CrearpdvService: CrearpdvService,
    public PdvService: PdvService,
    private serviceLista: ListasDesplegablesService,
    private cufdService: CufdService
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.serviceLista.getLista("regionales").then((data) => {
      this.departamentos = data[0]["valores"];
    });
    this.CargarSucursales();
    this.CargarCUFD();
    // Escuchadores Socket IO
    this.socket.on("Sucursal_Ingresa", (row_obj) => {
      this.Refresh();
      this.cuisService.sife_cuis_get().then((data) => {
        this.cuisList = data;
        this.CargarCUFD();
      });
    });
    this.socket.on("Empresa_Ingresa", (row_obj) => {
      this.empresaService.sife_empresa_get().then((data) => {
        this.empresasList = data;
      });
    });
    this.socket.on("Ingresa_Cufd", (row) => {
      this.CargarCUFD();
    });

    this.cuisService.sife_cuis_get().then((data) => {
      this.cuisList = data;
    });
    this.empresaService.sife_empresa_get().then((data) => {
      this.empresasList = data;
    });
  }
  // Metodos open dialogo (Modal)
  openDialog(datos_sucursal) {
    const dialogRef = this.dialog.open(SucursalFormComponent, {
      width: "70%",
      data: datos_sucursal,
    });

    dialogRef.afterClosed().subscribe((sucursal) => {
      if (sucursal != undefined) {
        if (sucursal.id != "") {
          var modificar = {
            nit: this.empresaSeleccionada,
            codigoSucursal: sucursal.codigoSucursal,
            direccion: sucursal.direccion,
            departamento: sucursal.departamento,
            vigencia: moment(sucursal.vigencia).format("YYYY-MM-DD HH:mm:ss"),
            fechaModificacion: moment(this.FechaActual).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            muncipio: sucursal.muncipio,
            descripcion: sucursal.descripcion,
            telefono: sucursal.telefono,
            transaccion: "0",
          };
          this.sucursalService
            .sife_sucursal_patch(modificar, sucursal.id)
            .then(() =>
              this.notificationService.success("Se Modificó de Manera Correcta")
            );
        } else {
          var registrar = {
            nit: this.empresaSeleccionada,
            codigoSucursal: sucursal.codigoSucursal,
            direccion: sucursal.direccion,
            departamento: sucursal.departamento,
            vigencia: moment(sucursal.vigencia).format("YYYY-MM-DD HH:mm:ss"),
            fechaModificacion: moment(this.FechaActual).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            fechaCreacion: moment(this.FechaActual).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            muncipio: sucursal.muncipio,
            descripcion: sucursal.descripcion,
            telefono: sucursal.telefono,
            estado: "Activo",
          };

          this.sucursalService
            .sife_sucursal_post(registrar)
            .then(() =>
              this.notificationService.success("Se Registró de Manera Correcta")
            );
        }
      }
    });
  }
  // Metodos get, add. delete y oninit
  ngOnInit() {
    this.FechaVencimiento.setDate(this.FechaActual.getDate() + 5);
    this.subscription = this.sucursalService._refresh$.subscribe(()=>{
      console.log("Observable Iniciado");
      this.Refresh()
    }) 
  }
  CargarSucursales() {
    this.sucursalService
      .sife_sucursal_tabla_get(this.empresaSeleccionada)
      .then((data) => {
        this.sucursalService.dataSource = new MatTableDataSource(data);
        this.sucursalService.dataSource.paginator = this.paginator;
        this.sucursalService.dataSource.sort = this.sort;
      });
  }
  CargarCUFD() {
    this.cufdService
      .sife_cufd_get(this.empresaSeleccionada)
      .then((data) => (this.cufdList = data));
  }
  Refresh() {
    this.sucursalService
      .sife_sucursal_tabla_get(this.empresaSeleccionada)
      .then((data) => {
        this.sucursalService.dataSource.data = data;
      });
  }

  SolicitarCuisMasivo() {
    const dialogRef = this.dialog.open(SucursalCuisMasivoComponent, {
      width: "30%",
    });
    dialogRef.afterClosed().subscribe();
  }

  ActivarDesactivarSucursal(sucursal) {
    if (sucursal.estado == "Activo") {
      this.sucursalService
        .sife_sucursal_patch({ estado: "Inactivo" }, sucursal.id)
        .then(() => this.CargarSucursales());
    } else {
      this.sucursalService
        .sife_sucursal_patch({ estado: "Activo" }, sucursal.id)
        .then(() => this.CargarSucursales());
    }
  }
  //Metodo de filtrado
  applyFilter(filterValue: string) {
    this.sucursalService.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.sucursalService.dataSource.paginator) {
      this.sucursalService.dataSource.paginator.firstPage();
    }
  }

  // Metodos de actualización insercion y eliminación de registros

  filterPDV(codigoSucursal) {
    this.CrearpdvService.idSucursal = codigoSucursal;
    this.CrearpdvService.getAllPdvFilter(codigoSucursal).subscribe((data) => {
      this.PdvService.dataSource.data = data;
    });
  }
  filtroSucursal() {
    if (this.sucursalService.cuis == "todo") {
      this.sucursalService
        .sife_sucursal_get(this.empresaSeleccionada)
        .then((data) => {
          this.sucursalService.dataSource.data = data;
        });
    } else if (this.sucursalService.cuis != "todo") {
      this.sucursalService
        .getAllSucursalFilter(this.sucursalService.cuis)
        .subscribe((data) => {
          this.sucursalService.dataSource.data = data;
        });
    }
  }

  CerrarOperacionesSucursal(datos_sucursal) {
    const dialogRef = this.dialog.open(CierreOperacionesSucursalComponent, {
      width: "50%",
      data: datos_sucursal,
    });
    dialogRef.afterClosed().subscribe();
  }
  solicitudCuis(datos_sucursal) {
    const dialogRef = this.dialog.open(SucursalCuisComponent, {
      width: "30%",
      data: datos_sucursal,
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
  CuisSucursal(codigoSucursal, nit) {
    if (this.cuisList != undefined) {
      for (let i = 0; i < this.cuisList.length; i++) {
        if (
          this.cuisList[i].codigoSucursal == codigoSucursal &&
          this.cuisList[i].nit == nit
        ) {
          if (this.cuisList[i]) {
            return this.cuisList[i].cuis;
          }
        }
      }
    }
  }

  VigenciaCuisSucursal(codigoSucursal, nit) {
    if (this.cuisList != undefined) {
      for (let i = 0; i < this.cuisList.length; i++) {
        if (
          this.cuisList[i].codigoSucursal == codigoSucursal &&
          this.cuisList[i].nit == nit
        ) {
          if (this.cuisList[i]) {
            return this.cuisList[i].cuisVigencia;
          }
        }
      }
    }
  }
  EmpresaSucursal(nit) {
    if (this.empresasList != undefined) {
      var empresasucursal = this.empresasList.filter((item) => item.nit == nit);
      return empresasucursal[0].razonSocial;
    }
  }
  DepartamentoSucursal(departamento) {
    if (this.departamentos != undefined) {
      var departamentoNombre = this.departamentos.filter(
        (item) => item.id == departamento
      );
      return departamentoNombre[0].valor;
    }
  }
  CufdSucursal(nit: number, sucursal: number, pdv: number) {
    if (this.cufdList != undefined) {
      for (let i = 0; i < this.cufdList.length; i++) {
        if (
          this.cufdList[i].nit == nit &&
          this.cufdList[i].codigoSucursal == sucursal &&
          this.cufdList[i].codigoPDV == pdv
        ) {
          if (this.cufdList[i]) {
            return "CUFD";
          }
        }
      }
    }
  }

  informacion(){
    const dialogRef = this.dialog.open(InfoSucursal, {
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
  selector: 'info-sucursal',
  templateUrl: './../../informaciones/info-sucursal.html',
})

export class InfoSucursal {
  constructor() {}
}

@Component({
  selector: 'info-empresa-sucursal-pdv',
  templateUrl: './../../informaciones/info-empresa-sucursal-pdv.html',
})

export class InfoEmpresaSucursalPdv {
  constructor() {}
}