import { NandinaComponent } from "./nandina/nandina.component";
import { CatServicioComponent } from "./../sincronizar/cat-servicio/cat-servicio.component";
import { SincronizarService } from "./../../services/sincronizar.service";
import { NgxSpinnerService } from "ngx-spinner";
//Importamos el componente de formulario
import { ProductosFormComponent } from "./productos-form/productos-form.component";
import { ProductosService } from "./../../services/productos.service";
import { NotificationService } from "../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
// inport de xlsx
import * as XLSX from "xlsx";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { UserService } from "src/app/services/user.service";
import { LeyendasFacturaService } from "src/app/services/leyendas-factura.service";
import { Subscription } from "rxjs";

import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css","./../mat-table-responsive/mat-table-responsive.directive.scss"],
})
export class ProductosComponent implements OnInit {

  formControl = new FormControl(['']);
  keywords = new Set([]);

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywords.add(event.value);
      event.chipInput!.clear();

    }
  }

  removeKeyword(keyword: string) {
    this.keywords.delete(keyword);
  }

  subscription: Subscription;
  loading = false;
  Respuesta: any;
  displayedColumns: string[] = [
    "checked",
    "IdProducto",
    "Producto",
    "UMBase",
    "codigoCatalogo",
    "catalogo",
    "codigoActividad",
    "actEconomica",
    "descripcionLeyenda",
    "nandina",
    "estadoHomologado",
    "estado",
    "actions",
  ];

  displayedColumns1: string[] = [
    "IdProducto",
    "Producto",
    "IdFamilia",
    "IdGrupo",
    "IdSubGrupo",
    "IdSecProducto",
    "IdDivision",
    "IdSector",
    "PesoBruto",
    "PesoNeto",
    "UnidadPeso",
    "nit",
    "NoExiste",
  ];

  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;

  formCatalogos: FormGroup = new FormGroup({
    catalogo: new FormControl(""),
    nandina: new FormControl(""),
  });
  divisiones: any;
  sectores: any;
  familias: any;
  grupos: any;
  subgrupos: any;
  ProductosValidados: any = [];
  ProductosExistentes: any = [];
  ProductosNoExistentes: any = [];

  datosUpdate: any = {
    catalogo: "Seleccionar catalogo",
    idCatalogo: null,
    nandina: "Seleccionar nandina",
    unidadMedida: "Seleccionar Unidad medida",
    unidadMedidaCod: null,
    actEconomica: "Seleccionar Actividad",
    actEconomicaCod: null,
  };
  nandinalist: any
  selectAll: any = false;
  catalogoList: any;
  unidadmedidaList: any;
  actividadeconomicaList: any;
  leyendasList: any;
  dataUsuario: any;

  divisionSeleccionada: any;
  sectorSeleccionado: any;
  familiaSeleccionada: any;
  grupoSeleccionado: any;
  subgrupoSeleccionado: any;

  estadoSeleccionado: any = "Todos";
  estadoActivoSeleccionado: any = "Todos";
  estadoActivoActualizarSeleccionado: any;
  IdProducto: any;

  empresaSeleccionada: any;
  usuario: any;
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private productosService: ProductosService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private socket: Socket,
    private sincronizarService: SincronizarService,
    private spinner: NgxSpinnerService,
    public userData: UserService,
    private leyendasfacturaService: LeyendasFacturaService
  ) {
    this.empresaSeleccionada = JSON.parse(localStorage.getItem("empresa"));

    this.dataUsuario = JSON.parse(localStorage.getItem("usuario"));
    this.usuario = this.dataUsuario.username;


    this.leyendasfacturaService.sife_leyendas_get().then((data) => {
      this.leyendasList = data;
    });

    //this.getAllProductos();

    // Escuchadores Socket IO
    /*   this.socket.on("Producto_Ingresa", (row_obj) => {
        this.Refresh();
      });
      this.socket.on("/Sifedimproducto/DELETE", (row_obj) => {
        this.deleteRowData(row_obj);
      }); */
  }
  // Metodos open dialogo (Modal)
  openDialog(action, obj) {
    const dialogRef = this.dialog.open(ProductosFormComponent, {
      width: "50%",
      data: { obj: obj, action: action },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(result.data.respuesta);
      if (result.event == "Crear") {
        //this.addRowData(result.data.respuesta);
      }
    });
  }
  // Metodos get, add. delete y oninit

  async CargarProductos() {
    this.spinner.show();
    if (this.divisionSeleccionada) {
      await this.productosService
        .sife_productos_get(
          this.empresaSeleccionada,
          this.divisionSeleccionada,
          this.sectorSeleccionado,
          this.familiaSeleccionada,
          this.grupoSeleccionado,
          this.subgrupoSeleccionado,
          this.estadoSeleccionado,
          this.estadoActivoSeleccionado
        )
        .then((data) => {
          console.log(data);


          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }
    this.spinner.hide();
  }
  /*  async Refresh() {
     this.spinner.show();
     await this.productosService
       .getAllProductos(
         this.divisionSeleccionada,
         this.sectorSeleccionado,
         this.familiaSeleccionada,
         this.grupoSeleccionado,
         this.subgrupoSeleccionado,
         this.estadoSeleccionado
       )
       .then((data) => {
         this.dataSource.data = data;
       });
     this.spinner.hide();
   } */
  async getDivisiones() {
    await this.productosService.getAllDivisiones().then((data) => {
      if (this.userData.sesion.role == "Sistemas") {
        this.divisiones = data;
      } else {
        this.divisiones = data.filter(
          (item) => item.IdDivision == this.userData.sesion.division
        );
        this.divisionSeleccionada = this.userData.sesion.division;
      }
    });
    /* this.form.get("division").setValue(this.divisionSeleccionada); */
  }

  async getSectores() {
    var sectores = [];
    await this.productosService.getAllsector().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].IdDivision == this.divisionSeleccionada) {
          sectores.push(data[i]);
        }
        this.sectores = sectores;
      }
      if (this.divisionSeleccionada != undefined) {
        this.sectorSeleccionado = sectores[0].IdSecProducto;
      }
    });
  }

  async getFamilia() {
    var familia = [];
    await this.productosService.getAllfamilia().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].IdFamilia.substring(2, 4) == this.sectorSeleccionado &&
          data[i].IdFamilia.substring(0, 2) == this.divisionSeleccionada
        ) {
          familia.push(data[i]);
        }
        this.familias = familia;
      }
      if (this.divisionSeleccionada != undefined) {
        this.familiaSeleccionada = familia[0].IdFamilia;
      }
    });
  }

  async getGrupo() {
    var grupo = [];
    await this.productosService.getAllgrupo().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].IdGrupo.substring(0, 6) == this.familiaSeleccionada) {
          grupo.push(data[i]);
        }
        this.grupos = grupo;
      }
      this.grupoSeleccionado = "Todos"
    });
  }

  async getSubGrupo() {
    await this.productosService.getAllSubgrupo().then((data) => {
      var subgrupo = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].IdSubGrupo.substring(0, 8) == this.grupoSeleccionado) {
          subgrupo.push(data[i]);
        }
        this.subgrupos = subgrupo;
      }
      this.subgrupoSeleccionado = "Todos"
    });
  }

  async SeleccionarDivision(division) {
    this.divisionSeleccionada = division;
    await this.getSectores();
    await this.getFamilia();
    await this.getGrupo();
    await this.getSubGrupo();
    this.CargarProductos();
  }
  async SeleccionarSector(Sector) {
    this.sectorSeleccionado = Sector;
    await this.getFamilia();
    await this.getGrupo();
    await this.getSubGrupo();
    this.CargarProductos();
  }
  async SeleccionarFamilia(Familia) {
    this.familiaSeleccionada = Familia;
    await this.getGrupo();
    await this.getSubGrupo();
    this.CargarProductos();
  }
  async SeleccionarGrupo(Grupo) {
    this.grupoSeleccionado = Grupo;
    await this.getSubGrupo();
    this.CargarProductos();
  }
  async SeleccionarSubGrupo(SubGrupo) {
    this.subgrupoSeleccionado = SubGrupo;
    this.CargarProductos();
  }

  async SeleccionarEstadoHomologacion(Estado) {
    this.estadoSeleccionado = Estado;
    this.CargarProductos();
  }
  async SeleccionarEstado() {
    this.CargarProductos();
  }
  BuscarProducto(IdProducto) {
    this.IdProducto = IdProducto;
    this.productosService.sife_productos_get_one(IdProducto).then((data) => {
      this.dataSource1 = new MatTableDataSource(data);
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
    });
  }

  BuscarVariosProducto(arrIdProducto) {

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
      return value.IdProducto != row_obj.IdProducto;
    });
  }

  CargarListaCatalogo() {
    this.sincronizarService
      .getProductoServ(this.empresaSeleccionada, "ListaProductosServicios")
      .subscribe((data) => {
        this.catalogoList = data;
      });
  }
  CargarListaActividadEconomica() {
    this.sincronizarService.getProductoServ(this.empresaSeleccionada, "Actividades").subscribe((data) => {
      this.actividadeconomicaList = data;
    });
  }
  CargarUnidadMedida() {
    this.sincronizarService
      .getProductoServ(this.empresaSeleccionada, "ParametricaUnidadMedida")
      .subscribe((data) => {
        this.unidadmedidaList = data;
      });
  }

  openCatServicio(IdProducto) {
    const dialogRef = this.dialog.open(CatServicioComponent, {
      width: "95%",
      data: {
        catalogo: this.catalogoList,
        servicio: "ListaProductosServicios",
        componente: "producto",
      },
    });
    //console.log(data);
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result.codigoProducto != undefined) {
          this.nandinalist = result.nandina;
          var body = {
            catalogo: String(result.catalogo),
            codigoCatalogo: String(result.codigoProducto),
            estadoHomologado: 1,
            idCatalogo: String(result.idCatalogo),
            codigoActividad: String(result.codigoActividad),
            nandina: result.nandina[0],
            descripcionLeyenda: this.ActividadEconomicaLeyenda(
              result.codigoActividad
            ),
            nit: this.empresaSeleccionada,
            usuario: this.usuario
          };

          if (IdProducto != null) {
            var productos = [];
            this.productosService
              .updateProducto(IdProducto, body)
              .then((data) => {
                var producto = {
                  IdFamilia: data.IdFamilia,
                  IdGrupo: data.IdGrupo,
                  IdSubGrupo: data.IdSubGrupo,
                  IdSecProducto: data.IdSecProducto,
                  IdDivision: data.IdDivision,
                  Familia: data.Familia,
                  Grupo: data.Grupo,
                  IdProducto: data.IdProducto,
                  estadoHomologado: "1",
                  Sector: data.Sector,
                  SubGrupo: data.SubGrupo,
                  catalogo: data.catalogo,
                  codigoActividad: data.codigoActividad,
                  codigoCatalogo: data.codigoCatalogo,
                  codigoClasificador: data.codigoClasificador,
                  descripcionLeyenda: data.descripcionLeyenda,
                  division: data.division,
                  nandina: data.nandina,
                  nit: this.empresaSeleccionada,
                  usuario: this.usuario
                };
                productos.push(producto);
                this.productosService
                  .sife_mule_productos_post(productos)
                  .then((data) => {
                    /* console.log(data); */
                  });
                this.notificationService.success("Catalogo asignado");
              });
          } else {
            this.nandinalist = result.nandina
            this.datosUpdate.catalogo = String(result.catalogo);
            this.datosUpdate.idCatalogo = String(result.idCatalogo);
            this.datosUpdate.nandina = this.nandinalist[0];
            this.datosUpdate.codigoCatalogo = result.codigoProducto;
            this.datosUpdate.codigoActividad = result.codigoActividad;
          }
        }
      }
    });

  }
  openCatServiciouno(IdProducto) {
    this.sincronizarService
      .getProductoServ(this.empresaSeleccionada, "ListaProductosServicios")
      .subscribe((data) => {
        const dialogRef = this.dialog.open(CatServicioComponent, {
          width: "95%",
          data: {
            catalogo: data,
            servicio: "ListaProductosServicios",
            componente: "producto",
          },
        });
        //console.log(data);
        dialogRef.afterClosed().subscribe((result) => {
          if (result != undefined) {
            if (result.codigoProducto != undefined) {
              this.nandinalist = result.nandina
              var body = {
                catalogo: String(result.catalogo),
                codigoCatalogo: String(result.codigoProducto),
                estadoHomologado: 1,
                idCatalogo: String(result.idCatalogo),
                codigoActividad: String(result.codigoActividad),
                nandina: this.nandinalist[0],
                descripcionLeyenda: this.ActividadEconomicaLeyenda(
                  result.codigoActividad
                ),
                nit: this.empresaSeleccionada,
                usuario: this.usuario
              };
              if (IdProducto != null) {
                var productos = [];
                this.productosService
                  .updateProducto(IdProducto, body)
                  .then((data) => {
                    this.BuscarProducto(IdProducto);
                    var producto = {
                      IdFamilia: data.IdFamilia,
                      IdGrupo: data.IdGrupo,
                      IdSubGrupo: data.IdSubGrupo,
                      IdSecProducto: data.IdSecProducto,
                      IdDivision: data.IdDivision,
                      Familia: data.Familia,
                      Grupo: data.Grupo,
                      IdProducto: data.IdProducto,
                      estadoHomologado: "1",
                      Sector: data.Sector,
                      SubGrupo: data.SubGrupo,
                      catalogo: data.catalogo,
                      codigoActividad: data.codigoActividad,
                      codigoCatalogo: data.codigoCatalogo,
                      codigoClasificador: data.codigoClasificador,
                      descripcionLeyenda: data.descripcionLeyenda,
                      division: data.division,
                      nandina: data.nandina,
                      nit: this.empresaSeleccionada,
                      usuario: this.usuario
                    };
                    productos.push(producto);
                    this.productosService
                      .sife_mule_productos_post(productos)
                      .then((data) => { });
                    this.notificationService.success("Catalogo asignado");
                  });
              } else {
                this.nandinalist = result.nandina
                this.datosUpdate.catalogo = String(result.catalogo);
                this.datosUpdate.idCatalogo = String(result.idCatalogo);
                this.datosUpdate.nandina = this.nandinalist[0];
                this.datosUpdate.codigoCatalogo = result.codigoProducto;
                this.datosUpdate.codigoActividad = result.codigoActividad;
              }
            }
          }
        });
      });
  }
  estadoTrue(IdProducto) {
    var datos = this.dataSource.data;
    datos = datos.filter((value, key) => {
      // Homologacion de catalogos
      if (value.IdProducto == IdProducto) {
        var valid = value.estadoHomologado;
        if (valid == null) {
          value.estadoHomologado = "1";
          var body = {
            estadoHomologado: 1, nit: this.empresaSeleccionada,
            usuario: this.usuario
          };
          this.productosService
            .updateProducto(IdProducto, body)
            .then((data) => {
              if (data["count"] == 1) {
                this.notificationService.success("Actualizado");
              } else {
                this.notificationService.error("Error al actualizar");
              }
            });
        }
        if (valid == 1) {
          value.estadoHomologado = "0";
          var bod = {
            estadoHomologado: 0,
            codigoCatalogo: null,
            catalogo: null,
            codigoProducto: null,
            idCatalogo: null,
            nandina: this.datosUpdate.nandina,
            nit: this.empresaSeleccionada,
            usuario: this.usuario
          };
          this.productosService.updateProducto(IdProducto, bod).then((data) => {
            if (data["count"] == 1) {
              this.notificationService.warn("Actualizado");
              var dt = this.dataSource.data;
              dt = dt.filter((value, key) => {
                if (value.IdProducto == IdProducto) {
                  value.codigoCatalogo = null;
                  value.catalogo = null;
                  value.estadoHomologado = 0;
                  value.idCatalogo = null;
                  value.nandina = null;
                }
                return true;
              });
              this.dataSource.data = dt;
            } else {
              this.notificationService.error("Error al actualizar");
            }
          });
        }
        if (valid == 0) {
          value.estadoHomologado = "1";
          var body = {
            estadoHomologado: 1, nit: this.empresaSeleccionada,
            usuario: this.usuario
          };
          this.productosService
            .updateProducto(IdProducto, body)
            .then((data) => {
              if (data["count"] == 1) {
                this.notificationService.success("Actualizado");
              } else {
                this.notificationService.error("Error al actualizar");
              }
            });
        }
      }
      return true;
    });
    this.dataSource.data = datos;
  }
  selectNandina(data) {
    const dialogRef = this.dialog.open(NandinaComponent, {
      width: "95%",
      data: { idCatalogo: data.idCatalogo, catalogo: data.catalogo },
    });
    //Cierre de Dialog
    dialogRef.afterClosed().subscribe((result) => {
      if (result.nandina) {
        if (data.IdProducto != undefined) {
          var body = {
            nandina: result.nandina, nit: this.empresaSeleccionada,
            usuario: this.usuario
          };
          this.productosService
            .updateProducto(data.IdProducto, body)
            .then((dataS) => {
              var dt = this.dataSource.data;
              dt = dt.filter((value, key) => {
                if (value.IdProducto == data.IdProducto) {
                  value.nandina = result.nandina;
                }
                return true;
              });
              this.dataSource.data = dt;
              this.notificationService.success("Catalogo asignado");
            });
        } else {
          this.nandinalist = result.nandina
          this.datosUpdate.nandina = this.nandinalist[0];
        }
      }
    });
  }
  onFileChange(ev) {
    this.ProductosValidados = []
    this.ProductosExistentes = []
    this.ProductosNoExistentes = []
    var plantilla = []
    /* this.loading = true; */
    if (ev.target.files.length > 0) {
      this.spinner.show();
      let workBook = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = ev.target.files[0];
      reader.onload = async (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, { type: "binary" });
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        var dataString = JSON.stringify(jsonData);

        await this.ExisteServicio(jsonData.Hoja1)
        /* this.ProductosExistentesCount = this.ProductosExistentes.length;
        this.ProductosNoExistentesCount = this.ProductosNoExistentes.length; */
        /* for (let element of jsonData.Hoja1) { */
        for (let i = 0; i < 500; i++) {
          if (jsonData.Hoja1[i]) {
            plantilla.push({
              "IdProducto": jsonData.Hoja1[i].IdProducto,
              "Producto": jsonData.Hoja1[i].Producto,
              "IdProdFabrica": jsonData.Hoja1[i].IdProdFabrica,
              "IdProdConso": jsonData.Hoja1[i].IdProdConso,
              "IdFamilia": jsonData.Hoja1[i].IdFamilia,
              "IdGrupo": jsonData.Hoja1[i].IdGrupo,
              "IdSubGrupo": jsonData.Hoja1[i].IdSubGrupo,
              "IdSecProducto": jsonData.Hoja1[i].IdSecProducto,
              "IdDivision": jsonData.Hoja1[i].IdDivision,
              "IdTipoMaterial": jsonData.Hoja1[i].IdTipoMaterial,
              "IdSector": jsonData.Hoja1[i].IdSector,
              "PesoBruto": jsonData.Hoja1[i].PesoBruto,
              "PesoNeto": jsonData.Hoja1[i].PesoNeto,
              "UnidadPeso": jsonData.Hoja1[i].UnidadPeso,
              "codigoClasificador": null,
              "codigoActividad": null,
              "codigoCatalogo": null,
              "estado": 1,
              "nit": jsonData.Hoja1[i].nit,
              "NoExiste": this.Existe(jsonData.Hoja1[i])
            })
          }
        }
        this.dataSource2 = new MatTableDataSource(plantilla);



        // Vaciado del contenido visible por los filtros
        /*   if(this.dataSource == undefined){
            this.dataSource = new MatTableDataSource([]);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }else{
            this.dataSource.data = []
          } */
        // ----------------------------------------------
        /*     jsonData.Sheet1.filter((data)=>{
            this.sincronizarService.buscarCatalogoProducto(data.codigoCatalogo).subscribe(dt=>{
              var body = {codigoProducto:data.codigoCatalogo,catalogo:dt[0]["descripcionProducto"],idCatalogo:dt[0]["id"],nandina:data.nandina}   
              this.service.PatchProducto(data.IdProducto,body).subscribe(data=>{
                this.dataSource.data = [...this.dataSource.data,data]              
              })
            })
          }) */
        this.spinner.hide();
      };
      reader.readAsBinaryString(file);
    }
  }
  seleccionMultiple() {
    var dt;
    if (this.selectAll == false) {
      dt = this.dataSource.data.filter((value) => {
        value.checked = true;
        return true;
      });
    }
    if (this.selectAll == true) {
      dt = this.dataSource.data.filter((value) => {
        value.checked = false;
        return true;
      });
    }
    this.dataSource.data = dt;
  }
  // Funcion de visualizacion de catalogos tipo de unidad
  openCatUnidadMedida(IdProducto) {

    const dialogRef = this.dialog.open(CatServicioComponent, {
      width: "95%",
      data: {
        catalogo: this.unidadmedidaList,
        servicio: "ParametricaUnidadMedida",
        componente: "TipoUnidad",
        IdProducto: IdProducto,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result != undefined) {
        if (result.codigoUnidadMedida) {
          var body = {
            codigoClasificador: Number(result.codigoUnidadMedida),
            nit: this.empresaSeleccionada,
            usuario: this.usuario
          };
          if (IdProducto != null) {
            var productos = [];
            this.productosService
              .updateProducto(IdProducto, body)
              .then((data) => {
                var producto = {
                  IdFamilia: data.IdFamilia,
                  IdGrupo: data.IdGrupo,
                  IdSubGrupo: data.IdSubGrupo,
                  IdSecProducto: data.IdSecProducto,
                  IdDivision: data.IdDivision,
                  Familia: data.Familia,
                  Grupo: data.Grupo,
                  IdProducto: data.IdProducto,
                  estadoHomologado: "1",
                  Sector: data.Sector,
                  SubGrupo: data.SubGrupo,
                  catalogo: data.catalogo,
                  codigoActividad: data.codigoActividad,
                  codigoCatalogo: data.codigoCatalogo,
                  codigoClasificador: data.codigoClasificador,
                  descripcionLeyenda: data.descripcionLeyenda,
                  division: data.division,
                  nandina: data.nandina,
                  nit: this.empresaSeleccionada,
                  usuario: this.usuario
                };
                productos.push(producto);
                this.productosService
                  .sife_mule_productos_post(productos)
                  .then((data) => { });
                var dt = this.dataSource.data;
                dt = dt.filter((value, key) => {
                  if (value.IdProducto == IdProducto) {
                    value.unidadMedidaCod = result.codigoUnidadMedida;
                    value.unidadMedida = result.unidadMedida;
                  }
                  return true;
                });
                this.dataSource.data = dt;
                this.notificationService.success("Catalogo asignado");
              });
          } else {
            this.datosUpdate.unidadMedida = String(result.unidadMedida);
            this.datosUpdate.unidadMedidaCod = String(
              result.codigoUnidadMedida
            );
          }
        }
      }
    });
  }
  openCatUnidadMedidauno(IdProducto) {
    this.sincronizarService
      .getProductoServ(this.empresaSeleccionada, "ParametricaUnidadMedida")
      .subscribe((data) => {
        const dialogRef = this.dialog.open(CatServicioComponent, {
          width: "95%",
          data: {
            catalogo: data,
            servicio: "ParametricaUnidadMedida",
            componente: "TipoUnidad",
            IdProducto: IdProducto,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          // console.log(result);
          if (result != undefined) {
            if (result.codigoUnidadMedida) {
              var body = {
                codigoClasificador: Number(result.codigoUnidadMedida),
                nit: this.empresaSeleccionada,
                usuario: this.usuario
              };
              if (IdProducto != null) {
                var productos = [];
                this.productosService
                  .updateProducto(IdProducto, body)
                  .then((data) => {
                    this.BuscarProducto(IdProducto);
                    var producto = {
                      IdFamilia: data.IdFamilia,
                      IdGrupo: data.IdGrupo,
                      IdSubGrupo: data.IdSubGrupo,
                      IdSecProducto: data.IdSecProducto,
                      IdDivision: data.IdDivision,
                      Familia: data.Familia,
                      Grupo: data.Grupo,
                      IdProducto: data.IdProducto,
                      estadoHomologado: "1",
                      Sector: data.Sector,
                      SubGrupo: data.SubGrupo,
                      catalogo: data.catalogo,
                      codigoActividad: data.codigoActividad,
                      codigoCatalogo: data.codigoCatalogo,
                      codigoClasificador: data.codigoClasificador,
                      descripcionLeyenda: data.descripcionLeyenda,
                      division: data.division,
                      nandina: data.nandina,
                      nit: this.empresaSeleccionada,
                      usuario: this.usuario
                    };
                    productos.push(producto);
                    this.productosService
                      .sife_mule_productos_post(productos)
                      .then((data) => { });
                    var dt = this.dataSource.data;
                    dt = dt.filter((value, key) => {
                      if (value.IdProducto == IdProducto) {
                        value.unidadMedidaCod = result.codigoUnidadMedida;
                        value.unidadMedida = result.unidadMedida;
                      }
                      return true;
                    });
                    this.dataSource.data = dt;
                    this.notificationService.success("Catalogo asignado");
                  });
              } else {
                this.datosUpdate.unidadMedida = String(result.unidadMedida);
                this.datosUpdate.unidadMedidaCod = String(
                  result.codigoUnidadMedida
                );
              }
            }
          }
        });
      });
  }
  // Funvion visualización de catalogos tipo actividad
  openCatActividadEconomica(IdProducto) {
    this.sincronizarService.getProductoServ(this.empresaSeleccionada, "Actividades").subscribe((data) => {
      const dialogRef = this.dialog.open(CatServicioComponent, {
        width: "95%",
        data: {
          catalogo: data,
          servicio: "Actividades",
          componente: "Actividad",
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result.codigoActividad) {
          var body = {
            actEconomicaCod: Number(result.codigoActividad),
            actEconomica: String(result.actividad),
            nandina: result.nandina[0],
            nit: this.empresaSeleccionada,
            usuario: this.usuario
          };
          if (IdProducto != null) {
            this.productosService
              .updateProducto(IdProducto, body)
              .then((data) => {
                var dt = this.dataSource.data;
                dt = dt.filter((value, key) => {
                  if (value.IdProducto == IdProducto) {
                    value.actEconomicaCod = result.codigoActividad;
                    value.actEconomica = result.actividad;
                  }
                  return true;
                });
                this.dataSource.data = dt;
                this.notificationService.success("Catalogo asignado");
              });
          } else {
            this.datosUpdate.actEconomica = String(result.actividad);
            this.datosUpdate.actEconomicaCod = String(result.codigoActividad);
          }
        }
      });
    });
  }
  // Homologacion masiva
  async HomologacionMasiva() {
    var body = {
      catalogo: this.datosUpdate.catalogo,
      codigoClasificador: Number(this.datosUpdate.unidadMedidaCod),
      codigoCatalogo: Number(this.datosUpdate.codigoCatalogo),
      codigoActividad: Number(this.datosUpdate.codigoActividad),
      nandina: this.datosUpdate.nandina,
      descripcionLeyenda: this.ActividadEconomicaLeyenda(
        this.datosUpdate.codigoActividad
      ),
      nit: this.empresaSeleccionada,
      usuario: this.usuario
    };
    var dt = this.dataSource.data;
    dt = dt.filter((value) => {
      if (value.checked == true) {
        var productos = [];
        this.productosService
          .updateProducto(value.IdProducto, body)
          .then((data) => {
            var producto = {
              IdFamilia: data.IdFamilia,
              IdGrupo: data.IdGrupo,
              IdSubGrupo: data.IdSubGrupo,
              IdSecProducto: data.IdSecProducto,
              IdDivision: data.IdDivision,
              Familia: data.Familia,
              Grupo: data.Grupo,
              IdProducto: data.IdProducto,
              estadoHomologado: "1",
              Sector: data.Sector,
              SubGrupo: data.SubGrupo,
              catalogo: data.catalogo,
              codigoActividad: data.codigoActividad,
              codigoCatalogo: data.codigoCatalogo,
              codigoClasificador: data.codigoClasificador,
              descripcionLeyenda: data.descripcionLeyenda,
              division: data.division,
              nandina: data.nandina,
              nit: this.empresaSeleccionada,
              usuario: this.usuario
            };
            productos.push(producto);
            this.productosService
              .sife_mule_productos_post(productos)
              .then((data) => {
                /* console.log(data); */
              });
            this.CargarProductos();
          });
        this.dataSource.data = dt;
      }
    });
  }

  async ActualizacionMasivaEstado() {
    var body = {
      nit: this.empresaSeleccionada,
      usuario: this.usuario,
      estado: this.estadoActivoActualizarSeleccionado
    };
    var dt = this.dataSource.data;
    dt = dt.filter((value) => {
      if (value.checked == true) {
        var productos = [];
        this.productosService
          .updateProducto(value.IdProducto, body)
          .then((data) => {
            var producto = {
              IdFamilia: data.IdFamilia,
              IdGrupo: data.IdGrupo,
              IdSubGrupo: data.IdSubGrupo,
              IdSecProducto: data.IdSecProducto,
              IdDivision: data.IdDivision,
              Familia: data.Familia,
              Grupo: data.Grupo,
              IdProducto: data.IdProducto,
              estadoHomologado: "1",
              Sector: data.Sector,
              SubGrupo: data.SubGrupo,
              catalogo: data.catalogo,
              codigoActividad: data.codigoActividad,
              codigoCatalogo: data.codigoCatalogo,
              codigoClasificador: data.codigoClasificador,
              descripcionLeyenda: data.descripcionLeyenda,
              division: data.division,
              nandina: data.nandina,
              nit: this.empresaSeleccionada,
              usuario: this.usuario,
              estado: this.estadoActivoActualizarSeleccionado
            };
            productos.push(producto);
            this.productosService
              .sife_mule_productos_post(productos)
              .then((data) => {
                /* console.log(data); */
              });
            this.CargarProductos();
          });
        this.dataSource.data = dt;
      }
    });
  }

  Catalogo(codigoCatalogo: number) {
    if (this.catalogoList != undefined) {
      var catalogo = this.catalogoList.filter(
        (item) => item.codigoProducto == codigoCatalogo
      );
      if (catalogo[0] != undefined) {
        return catalogo[0].descripcionProducto;
      } else {
        return "error";
      }
    }
  }

  UnidadMedida(codigoClasificador) {
    if (this.unidadmedidaList != undefined) {
      var UnidadMedida = this.unidadmedidaList.filter(
        (item) => item.codigoClasificador == codigoClasificador
      );
      if (UnidadMedida[0] != undefined) {
        return UnidadMedida[0].descripcion;
      } else {
        return "Error";
      }
    }
  }

  ActividadEconomica(codigoActividad) {
    if (this.actividadeconomicaList != undefined) {
      var ActividadEconomica = [];
      for (let i = 0; i < this.actividadeconomicaList.length; i++) {
        if (this.actividadeconomicaList[i].codigoCaeb == codigoActividad) {
          ActividadEconomica.push(this.actividadeconomicaList[i]);
        }
      }
      return ActividadEconomica[0].descripcion;

      /* var ActividadEconomica = this.actividadeconomicaList.filter((item) => item.codigoCaeb == codigoActividad)
      return ActividadEconomica[0].descripcion */
    }
  }
  CargarActividadEconomicaLeyendas(codigoActividad) {
    var ListaLeyendas = [];
    for (let element of this.leyendasList) {
      if (element.codigoActividad == codigoActividad) {
        ListaLeyendas.push(element);
      }
    }
    return ListaLeyendas;
  }
  CargarNandina(codigoCatalogo) {
    var ListaNandinas = [];
    for (let element of this.catalogoList) {
      if (element.codigoProducto == codigoCatalogo) {
        for (let nandina of element.nandina) {
          ListaNandinas.push(nandina);
        }
      }
    }
    return ListaNandinas;
  }
  ActividadEconomicaLeyenda(codigoActividad) {
    for (let i = 0; i < this.leyendasList.length; i++) {
      if (this.leyendasList[i].codigoActividad == codigoActividad) {
        return this.leyendasList[i].descripcionLeyenda;
      }
    }
  }
  SeleccionarLeyenda(IdProducto, Leyenda) {
    var LeyendaProducto = { descripcionLeyenda: Leyenda };
    this.productosService
      .sife_productos_patch(IdProducto, LeyendaProducto)
      .then((data) => {
        /* console.log(data); */
      });
  }
  SeleccionarNandina(IdProducto, nandina) {
    var nandinaSeleccionada = { nandina: nandina };
    this.productosService
      .sife_productos_patch(IdProducto, nandinaSeleccionada)
      .then((data) => {
        /* console.log(data); */
      });
  }

  SeleccionarLeyendaUno(IdProducto, Leyenda) {
    var LeyendaProducto = { descripcionLeyenda: Leyenda };
    this.productosService
      .sife_productos_patch(IdProducto, LeyendaProducto)
      .then((data) => {
        this.BuscarProducto(this.IdProducto);
      });
  }

  productoActivo(datosProducto) {
    if (datosProducto.estado != 2) {
      return true
    } else {
      return false
    }
  }

  estadoCambio(estado, IdProducto) {
    if (estado == true) {
      var body = {
        estado: "1"
      }
      this.productosService.updateProducto(IdProducto, body).then((data) => {
        var producto = {
          IdFamilia: data.IdFamilia,
          IdGrupo: data.IdGrupo,
          IdSubGrupo: data.IdSubGrupo,
          IdSecProducto: data.IdSecProducto,
          IdDivision: data.IdDivision,
          Familia: data.Familia,
          Grupo: data.Grupo,
          IdProducto: data.IdProducto,
          Sector: data.Sector,
          SubGrupo: data.SubGrupo,
          catalogo: data.catalogo,
          codigoActividad: data.codigoActividad,
          codigoCatalogo: data.codigoCatalogo,
          codigoClasificador: data.codigoClasificador,
          descripcionLeyenda: data.descripcionLeyenda,
          division: data.division,
          nandina: data.nandina,
          nit: this.empresaSeleccionada,
          usuario: this.usuario
        };
        this.productosService
          .sife_mule_productos_post(producto)
          .then((data) => { });
      })
    } else if (estado == false) {
      var body = {
        estado: "2"
      }
      this.productosService
        .updateProducto(IdProducto, body).then((data) => {
          var producto = {
            IdFamilia: data.IdFamilia,
            IdGrupo: data.IdGrupo,
            IdSubGrupo: data.IdSubGrupo,
            IdSecProducto: data.IdSecProducto,
            IdDivision: data.IdDivision,
            Familia: data.Familia,
            Grupo: data.Grupo,
            IdProducto: data.IdProducto,
            Sector: data.Sector,
            SubGrupo: data.SubGrupo,
            catalogo: data.catalogo,
            codigoActividad: data.codigoActividad,
            codigoCatalogo: data.codigoCatalogo,
            codigoClasificador: data.codigoClasificador,
            descripcionLeyenda: data.descripcionLeyenda,
            division: data.division,
            nandina: data.nandina,
            nit: this.empresaSeleccionada,
            usuario: this.usuario
          };
          this.productosService
            .sife_mule_productos_post(producto)
            .then((data) => { });
        })
    }
  }

  borrarProductos() {
    var datos = []
    this.productosService.borrarproductos(this.IdProducto).then(data => {
      /* console.log(data); */
    })
  }
  async ExisteServicio(Productos) {
    for (let i = 0; i < 500; i++) {
      if (Productos[i]) {
        await this.productosService.BuscarSiExiste(Productos[i].IdProducto).then(data => {
          this.ProductosValidados.push({
            "IdProducto": Productos[i].IdProducto,
            "exists": data.exists
          })
        })
      }
    }
  }

  Existe(Producto) {
    for (let element of this.ProductosValidados) {
      if (element.IdProducto == Producto.IdProducto) {
        if (element.exists == true) {
          this.ProductosExistentes.push({
            "IdProducto": element.IdProducto,
            "Producto": element.Producto,
            "IdProdFabrica": element.IdProdFabrica,
            "IdProdConso": element.IdProdConso,
            "IdFamilia": element.IdFamilia,
            "IdGrupo": element.IdGrupo,
            "IdSubGrupo": element.IdSubGrupo,
            "IdSecProducto": element.IdSecProducto,
            "IdDivision": element.IdDivision,
            "IdTipoMaterial": element.IdTipoMaterial,
            "IdSector": element.IdSector,
            "PesoBruto": element.PesoBruto,
            "PesoNeto": element.PesoNeto,
            "UnidadPeso": element.UnidadPeso,
            "codigoClasificador": null,
            "codigoActividad": null,
            "codigoCatalogo": null,
            "estado": 1,
            "nit": element.nit
          })
          return 'Existe'
        } else {
          this.ProductosNoExistentes.push({
            "IdProducto": element.IdProducto,
            "Producto": element.Producto,
            "IdProdFabrica": element.IdProdFabrica,
            "IdProdConso": element.IdProdConso,
            "IdFamilia": element.IdFamilia,
            "IdGrupo": element.IdGrupo,
            "IdSubGrupo": element.IdSubGrupo,
            "IdSecProducto": element.IdSecProducto,
            "IdDivision": element.IdDivision,
            "IdTipoMaterial": element.IdTipoMaterial,
            "IdSector": element.IdSector,
            "PesoBruto": element.PesoBruto,
            "PesoNeto": element.PesoNeto,
            "UnidadPeso": element.UnidadPeso,
            "codigoClasificador": null,
            "codigoActividad": null,
            "codigoCatalogo": null,
            "estado": 1,
            "nit": element.nit
          })
          return 'No Existe'
        }
      }
    }
  }

  CargarProductosValidos() {
    this.loading = true
    this.productosService
      .submitProductos(JSON.stringify(this.ProductosNoExistentes))
      .then((data) => {
        this.loading = false;
        this.Respuesta = "Se Cargaron los Productos de manera correcta";
        setTimeout(() => {
          this.Respuesta = false
        }, 4000);
      });
  }

  async ngOnInit() {
    await this.getDivisiones();
    await this.getSectores();
    await this.getFamilia();
    await this.getGrupo();
    await this.getSubGrupo();

    this.CargarListaCatalogo();
    this.CargarListaActividadEconomica();
    this.CargarUnidadMedida();
    this.CargarProductos();
    //console.log("INICIANDO DATOS" +this.dataUsuario.division);

    this.subscription = this.productosService._refresh$.subscribe(() => {
      console.log("Observable Iniciado");
      this.CargarProductos();
    })

  }


  ngAfterViewInit() {
  }
}
