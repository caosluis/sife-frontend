import { SucursalService } from "./../../../services/sucursal.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "../../../services/notification.service";
import { FormCuisComponent } from "./form-cuis/form-cuis.component";
import { CuisService } from "./../../../services/cuis.service";
import { Socket } from "ngx-socket-io";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EmpresaService } from "src/app/services/empresa.service";
import { v1 as uuidv1 } from "uuid";
import * as moment from "moment";

@Component({
  selector: "app-empresa",
  templateUrl: "./empresa.component.html",
  styleUrls: ["./empresa.component.css","./../../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class EmpresaComponent implements OnInit {
  empresa: any = [];
  displayedColumns: string[] = [
    "logo",
    "Nombre",
    "Nit",
    "principal",
    "fechaCreacion",    
    "Estado",
    "actions",
  ];
  dataSource: MatTableDataSource<any>;
  searchKey: string;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private serviceEmpresa: EmpresaService,
    private cuisService: CuisService,
    private sucursalS: SucursalService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket
  ) {
    this.CargarEmpresas();
    this.socket.on("Empresa_Ingresa", (row_obj) => {
      this.CargarEmpresas();
    });
  }

  openDialog(datos_empresa) {
    const id = uuidv1();
    const dialogRef = this.dialog.open(FormCuisComponent, {
      width: "80%",
      data: datos_empresa,
    });

    dialogRef.afterClosed().subscribe((empresa) => {
      if (empresa != undefined) {
        if (empresa.id != "") {
          var modificar = {
            nit: empresa.nit,
            razonSocial: empresa.razonSocial,
            fechaModificacion: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          };
          this.serviceEmpresa.sife_empresa_patch(modificar, empresa.id).then();
        } else {
          var registrar = {
            id: id,
            nit: empresa.nit,
            razonSocial: empresa.razonSocial,
            estado: "Activo",
            fechaCreacion: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            fechaModificacion: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          };
          this.serviceEmpresa.sife_empresa_post(registrar).then((data) => {});
        }
      }
    });
  }
  ngOnInit() {}
  CargarEmpresas() {
    this.serviceEmpresa.sife_empresa_get().then((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ActivarDesactivarEmpresa(empresa) {
    if (empresa.estado == "Activo") {
      this.serviceEmpresa
        .sife_empresa_patch({ estado: "Inactivo" }, empresa.id)
        .then(() => this.CargarEmpresas());
    } else {
      this.serviceEmpresa
        .sife_empresa_patch({ estado: "Activo" }, empresa.id)
        .then(() => this.CargarEmpresas());
    }
  }
  PriorizarNIt(nit, id) {
    this.serviceEmpresa
      .sife_empresa_patch({ principal: "1" }, id)
      .then((data) => {
        this.serviceEmpresa.sife_empresa_excluyendo(nit).then((data) => {
          data.forEach((element) => {
            this.serviceEmpresa.sife_empresa_patch(
              {
                principal: "0",
                fechaModificacion: moment(new Date()).format(
                  "YYYY-MM-DD HH:mm:ss"
                ),
              },
              element.id
            );
          });
        });
      });
  }

  estado(estado) {
    if (estado == "1") {
      return true;
    } else if (estado == "0") {
      return false;
    }
  }

  onDelete($key) {
    this.cuisService.deletedCuis($key).subscribe((data) => {
      this.notificationService.warn("Se elimino exitosamente!!!");
    });
  }
  onCreate() {
    this.cuisService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(FormCuisComponent, dialogConfig);
  }
  filterSucursal(empresa) {
    this.sucursalS.cuis = empresa;
    this.sucursalS.getAllSucursalFilter(empresa).subscribe((data) => {
      this.sucursalS.dataSource.data = data;
    });
  }
  onEdit(row) {
    this.cuisService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(FormCuisComponent, dialogConfig);
  }
  informacionEmpresa(){
    const dialogRef = this.dialog.open(InfoEmpresa, {
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
  selector: 'info-empresa',
  templateUrl: './../../informaciones/info-empresa.html',
})

export class InfoEmpresa {}

@Component({
  selector: 'info-empresa-sucursal-pdv',
  templateUrl: './../../informaciones/info-empresa-sucursal-pdv.html',
})

export class InfoEmpresaSucursalPdv {
  constructor() {}
}
