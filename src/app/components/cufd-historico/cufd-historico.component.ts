//Importamos el componente de formulario
import { Component, OnInit, ViewChild } from "@angular/core";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { CufdHistoricoService } from "src/app/services/cufd-historico.service.ts.service";
import { CufdService } from "src/app/services/cufd.service";
import * as moment from "moment";

import { SucursalService } from "src/app/services/sucursal.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PdvService } from "src/app/services/pdv.service";
import { EmpresaService } from "src/app/services/empresa.service";
import { CufdDetailComponent } from "src/app/components/cufd-historico/cufd-detail/cufd-detail.component";
import { CufdRenovarComponent } from "../cufd/cufd-renovar/cufd-renovar.component";
import { CufdReenviarComponent } from "../cufd/cufd-reenviar/cufd-reenviar.component";
import { CufdsincronizacionService } from "./../cufd/cufdsincronizacion/cufdsincronizacion.service";


@Component({
  selector: "app-cufd-historico",
  templateUrl: "./cufd-historico.component.html",
  styleUrls: ["./cufd-historico.component.css"],
})
export class CufdHistoricoComponent implements OnInit {
  displayedColumns: string[] = [
    "logo",
    "cuis",
    "nombrePuntoVenta",
    "codigoPDV",
    "direccion",
    "codigoSucursal",
    "fechaVigencia",
    "codigoControl",
    "transaccionOrigen",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  FechaActual: any = { start_time: new Date() };
  FechaSeleccionada: any = { start_time: new Date() };
  Empresas: any = [];
  Sucursales: any = [];
  PDVs: any = [];
  SucursalSeleccionada: any = "Todas";
  PDVSeleccionada: any = "Todos";
  HoraActual: any;
  HoraVencimiento: any;
  UsuarioActual: any;
  empresaSeleccionada: any;
  FiltroCategory: FormGroup;
  HabilitaRenovar: any;
  transaccion:any;
  totalEnviadosCufd:any;
  totalCufd:any;
  role:any;

  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private CufdService: CufdService,
    private CufdHistoricoService: CufdHistoricoService,
    public SucursalService: SucursalService,
    public PdvService: PdvService,
    public EmpresaService: EmpresaService,
    public MatDialog: MatDialog,
    private Socket: Socket,
    private FormBuilder: FormBuilder,
    public cufdsincronizacionService: CufdsincronizacionService,
  ) {
    this.HoraActual = new Date();
    this.HoraVencimiento = new Date().setHours(this.HoraActual.getHours() - 1);

    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    this.role = this.UsuarioActual.role;
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));

    this.SucursalService.sife_sucursal_get(this.empresaSeleccionada).then(
      (data) => {
        this.Sucursales = data;
      }
    );
    this.PdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
      this.PDVs = data;
    });

    this.Socket.on("/Sifecufd/POST", (row) => { });
    this.Socket.on("/Sifecufd/DELETE", (row_obj) => {
      this.deleteRowData(row_obj);
    });
  }

  // Metodos get, add. delete y oninit

  SeleccionarFecha(event) {
    this.FechaSeleccionada = event.value;
    this.CargarCUFD();
  }

  SeleccionarSucursal(sucursal) {
    this.SucursalSeleccionada = sucursal;
    if (sucursal == "Todas") {
      this.PdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
        this.PDVs = data;
      });

      this.CargarCUFD();
    } else {
      this.PdvService.sife_pdv_get(this.empresaSeleccionada).then((data) => {
        this.PDVs = data.filter((item) => item.codigoSucursal == sucursal);
      });

      this.CargarCUFD();
    }
  }

  async SeleccionarPDV(pdv) {
    this.PDVSeleccionada = pdv;
    this.CargarCUFD();
  }

  ///Cargar filtro Sucursales

  CargarCUFD() {
    moment(this.FechaSeleccionada.start_time).format("DD");
    if (
      moment(this.FechaActual).format("DD.MM.YYYY") ==
      moment(this.FechaSeleccionada).format("DD.MM.YYYY")
    ) {
      this.CufdService.sife_cufd(
        this.FechaSeleccionada,
        this.empresaSeleccionada,
        this.SucursalSeleccionada,
        this.PDVSeleccionada
      ).then((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;        
      });
    } else {
      this.CufdHistoricoService.sife_cufd_historico(
        this.FechaSeleccionada,
        this.empresaSeleccionada,
        this.SucursalSeleccionada,
        this.PDVSeleccionada
      ).then((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  CufdRenovar() {
    const dialogRef = this.MatDialog.open(CufdRenovarComponent, {
      width: "35%",
    });
    dialogRef.afterClosed().subscribe();
  }
  AbrirReenviar(CUFD) {
    if (CUFD == "Todos") {
      const dialogRef = this.MatDialog.open(CufdReenviarComponent, {
        width: "50%",
        data: this.dataSource.data,
      });
    } else {
      const dialogRef = this.MatDialog.open(CufdReenviarComponent, {
        width: "50%",
        data: [CUFD],
      });
    }
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

  Empresa(nit) {
    var empresa = [];
    for (let i = 0; i < this.Empresas.length; i++) {
      if (this.Empresas[i].nit == nit) {
        empresa.push(this.Empresas[i]);
      }
    }
    if (empresa[0] != undefined) {
      return empresa[0].razonSocial;
    }
  }
  Sucursal(nit, codigoSucursal) {
    var sucursal = [];
    for (let i = 0; i < this.Sucursales.length; i++) {
      if (
        this.Sucursales[i].nit == nit &&
        this.Sucursales[i].codigoSucursal == codigoSucursal
      ) {
        sucursal.push(this.Sucursales[i]);
      }
    }
    if (sucursal[0] != undefined) {
      return sucursal[0].descripcion;
    }
  }
  PDV(cuis) {
    var pdv = [];
    for (let i = 0; i < this.PDVs.length; i++) {
      if (this.PDVs[i].cuis == cuis) {
        pdv.push(this.PDVs[i]);
      }
    }
    if (pdv[0]) {
      return pdv[0].nombrePuntoVenta;
    } else {
      return "0";
    }
  }
  detalle(cufd) {
    const dialogRef = this.MatDialog.open(CufdDetailComponent, {
      width: "80%",
      data: cufd,
    });
    dialogRef.afterClosed().subscribe();
  }

  FechaIndicador(fecha) {
    if (moment(this.HoraVencimiento) > moment(fecha)) {
      return "Vencido";
    } else {
      return "Vigente";
    }
  }

  async ngOnInit() {
    this.FiltroCategory = this.FormBuilder.group({
      sucursalCategory: [null, Validators.required],
      pdvCategory: [null, Validators.required],
    });

    this.FiltroCategory.get("sucursalCategory").setValue("Todos");
    this.FiltroCategory.get("pdvCategory").setValue("Todos");
  }

  async ngAfterViewInit() {
    this.CargarCUFD();
    this.cargarCufdSincronizacion();
    this.CargarCufdEnviadosContribuyentes();
    this.TotalCufdEmpresa();
  }

  cargarCufdSincronizacion() {
    this.cufdsincronizacionService.sife_cufd_sincronizacion_get(this.empresaSeleccionada)
    .then((data) =>{                 
      if(JSON.stringify(data) == '[]'){
        this.transaccion = '';
      }else{        
        this.transaccion = data[0].transaccion;
      }
      //this.cufdsincronizacionService.dataSource = new MatTableDataSource(data);
      //this.cufdsincronizacionService.dataSource.paginator = this.paginator;
      //this.cufdsincronizacionService.dataSource.sort = this.sort;
    }) 
  }

  CargarCufdEnviadosContribuyentes() {
    this.CufdService.sife_cufd_sin_envio_contribuyente(this.empresaSeleccionada).then(
      (data) => {
        this.totalEnviadosCufd = data.count;
        console.log("TOTAL ENVIADOS A SAP DE CUFDs :" + this.totalEnviadosCufd );
      }
    );
  }

  TotalCufdEmpresa() {
    this.CufdService.sife_cufd_total(this.empresaSeleccionada).then(
      (data) => {
        this.totalCufd = data.count;
        console.log("TOTAL CUFDs :" + this.totalCufd );
      }
    );
  }
}
