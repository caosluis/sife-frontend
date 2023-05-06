//Importamos el componente de formulario
import { CufdFormComponent } from "./cufd-form/cufd-form.component";
import { CufdService } from "../../services/cufd.service";
import { Component, OnInit, ViewChild } from "@angular/core";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { SucursalService } from "src/app/services/sucursal.service";
import { PdvService } from "src/app/services/pdv.service";
import { EmpresaService } from "src/app/services/empresa.service";
import * as moment from "moment";
import { CufdRenovarComponent } from "./cufd-renovar/cufd-renovar.component";

@Component({
  selector: "app-cufd",
  templateUrl: "./cufd.component.html",
  styleUrls: ["./cufd.component.css","./../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class CufdComponent implements OnInit {
  HabilitaRenovar: any;
  UsuarioActual: any;
  empresaSeleccionada: any;
  displayedColumns: string[] = [
    "logo",
    "empresa",
    "sucursal",
    "codigoSucursal",
    "nombrePuntoVenta",
    "codigoPDV",
    "fechaVigencia",
    "transaccionOrigen",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  Empresas: any = [];
  Sucursales: any = [];
  PDVs: any = [];
  HoraActual: any;
  HoraVencimiento: any;
  Mostrar = false;
  loading: any = false;
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private CufdService: CufdService,
    public dialog: MatDialog,
    public sucursalService: SucursalService,
    public pdvService: PdvService,
    public empresaService: EmpresaService,
    private socket: Socket
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));
    this.HoraActual = new Date();
    this.HoraVencimiento = new Date().setHours(this.HoraActual.getHours() - 1);

    this.socket.on("Ingresa_Cufd", (row) => {
      this.Refresh();
    });
  }
  // Metodos open dialogo (Modal)
  detalle(cufd) {
    const dialogRef = this.dialog.open(CufdFormComponent, {
      width: "50%",
      data: cufd,
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result.data.respuesta);
      if (result != undefined) {
        //this.addRowData(result.data.respuesta);
      }
    });
  }
  // Metodos get, add. delete y oninit


  CufdRenovar() {
    const dialogRef = this.dialog.open(CufdRenovarComponent, {
      width: "35%",
    });
    dialogRef.afterClosed().subscribe();
  }

  async ngAfterViewInit() {
    await this.CargarEmpresas();
    await this.CargarSucursales();
    await this.CargarPDV();
  }
  getAllCufd() {
    this.CufdService.sife_cufd_get(this.empresaSeleccionada).then((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  //Metodo de filtrado
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Metodos de actualización insercion y eliminación de registros
  addRowData(data) {
    const dt = this.dataSource.data;
    dt.push(data);
    this.dataSource.data = dt;
  }
  deleteRowData(row_obj) {
    const dt = this.dataSource.data;
    this.dataSource.data = dt.filter((value, key) => {
      return value.codigoPDV != row_obj["codigoPDV"];
    });
  }
  Refresh() {
    this.CufdService.sife_cufd_get(this.empresaSeleccionada).then((data) => {
      this.dataSource.data = data;
    });
  }
  async CargarEmpresas() {
    await this.empresaService.sife_empresa_get().then((data) => {
      this.Empresas = data;
    });
  }

  ///Cargar filtro Sucursales
  async CargarSucursales() {
    await this.sucursalService
      .sife_sucursal_get(this.empresaSeleccionada)
      .then((data) => {
        this.Sucursales = data;
      });
  }
  ///Cargar filtro PDVs
  async CargarPDV() {
    await this.pdvService
      .sife_pdv_get(this.empresaSeleccionada)
      .then((data) => {
        this.PDVs = data;
      });
  }
  Empresa(nit) {
    for (let i = 0; i < this.Empresas.length; i++) {
      if (this.Empresas[i].nit == nit) {
        if (this.Empresas[i]) {
          return this.Empresas[i].razonSocial;
        }
      }
    }
  }
  Sucursal(nit, codigoSucursal) {
    for (let i = 0; i < this.Sucursales.length; i++) {
      if (
        this.Sucursales[i].nit == nit &&
        this.Sucursales[i].codigoSucursal == codigoSucursal
      ) {
        if (this.Sucursales[i]) {
          return this.Sucursales[i].descripcion;
        }
      }
    }
  }

  PDV(nit, codigoSucursal, codigoPDV) {
    var pdv = [];
    for (let i = 0; i < this.PDVs.length; i++) {
      if (
        this.PDVs[i].nit == nit &&
        this.PDVs[i].codigoSucursal == codigoSucursal &&
        this.PDVs[i].codigoPDV == codigoPDV
      ) {
        this.PDVs[i].nombrePuntoVenta;
        pdv.push(this.PDVs[i]);
      }
    }
    if (pdv[0] != undefined) {
      return pdv[0].nombrePuntoVenta;
    } else {
      return "0";
    }
  }

  FechaIndicador(fecha) {
    if (moment(this.HoraVencimiento) > moment(fecha)) {
      return "Vencido";
    } else {
      return "Vigente";
    }
  }
  ngOnInit() {
    this.getAllCufd();
  }
}
