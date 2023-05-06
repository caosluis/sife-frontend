//Importamos el componente de formulario
import { HistoricoService } from "../../../services/historico.service";
import { NotificationService } from "../../../services/notification.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
// Chart
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import {
  Label,
  Color,
  SingleDataSet,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from "ng2-charts";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
@Component({
  selector: "app-historico",
  templateUrl: "./historico.component.html",
  styleUrls: ["./historico.component.css"],
})
export class HistoricoComponent implements OnInit {
  displayedColumns: string[] = [
    "ServicioWeb",
    "Mensaje",
    "FechaSincronizacion",
  ];
  dataSource: MatTableDataSource<any>;
  form: FormGroup = new FormGroup({
    f1: new FormControl(new Date()),
    f2: new FormControl(new Date()),
  });
  // Dependencias de paginador Mat table
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // Grafico de barras
  public lineChartData: ChartDataSets[] = [{ data: [0], label: "Catalogo" }];
  public lineChartLabels: Label[] = ["0000-00-00"];

  public lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgba(16, 80, 218, 0.3)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];
  // Grafico de Pie (Torta)
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ["Error", "Correctas"];
  public pieChartData: SingleDataSet = [0, 0];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(
    private service: HistoricoService,
    private notificationService: NotificationService,
    private socket: Socket
  ) {
    // Escuchadores Socket IO
    this.socket.on("/Sifesincronizarh/POST", (row_obj) => {
      var verifica = 0;
      var dt = this.dataSource.data;
      dt = dt.filter((value, key) => {
        if (value.id == row_obj.id) {
          value.ServicioWeb = row_obj.ServicioWeb;
          value.Estado = row_obj.Estado;
          value.Mensaje = row_obj.Mensaje;
          value.FechaSincronizacion = row_obj.FechaSincronizacion;
          value.CUIS = row_obj.CUIS;
          value.Nit = row_obj.Nit;
          value.codigoAutorizacion = row_obj.codigoAutorizacion;
          value.idUsuario = row_obj.idUsuario;
          value.codigoError = row_obj.codigoError;

          verifica++;
        }
        this.dataSource.data = dt;
        return true;
      });
      if (verifica == 0) {
        this.addRowData(row_obj);
        // this.notificationService.success("Registrado exitosamente");
      }
    });
    this.socket.on("/Sifesincronizarh/DELETE", (row_obj) => {
      this.deleteRowData(row_obj);
    });
  }
  // Metodos get, add. delete y oninit
  ngOnInit() {}
  ngAfterViewInit() {
    this.lineChartData = [{ data: [0], label: "Catalogo" }];
    this.lineChartLabels = ["0000-00-00"];

    this.lineChartColors = [
      {
        borderColor: "black",
        backgroundColor: "rgba(16, 80, 218, 0.3)",
      },
    ];
    this.lineChartLegend = true;
    this.lineChartType = "line";
    this.lineChartPlugins = [];
    // Grafico de Pie (Torta)
    this.pieChartOptions = {
      responsive: true,
    };
    this.pieChartLabels = ["Error", "Correctas"];
    this.pieChartData = [0, 0];
    this.pieChartType = "pie";
    this.pieChartLegend = true;
    this.pieChartPlugins = [];

    this.getAllHistorico();
  }
  getAllHistorico() {
    this.service
      .getBetweenHistorico(
        new Date(this.form.value.f1),
        new Date(this.form.value.f2)
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        var correcto = 0,
          error = 0;
        data.filter((value, key) => {
          if (value.Estado == 0) {
            error++;
          } else if (value.Estado == 1) {
            correcto++;
          }
          this.pieChartData = [error, correcto];
          return true;
        });
      });
    this.service
      .getBetweenHistoricoDashB(
        new Date(this.form.value.f1),
        new Date(this.form.value.f2)
      )
      .subscribe((dat) => {
        var fechas = new Array();
        var d = new Array();
        dat.filter((value, key) => {
          fechas.push(value.Fecha.replace("T00:00:00.000Z", ""));
          d.push(value.cantidad);
        });
        this.lineChartLabels = fechas;
        this.lineChartData = [{ data: d, label: "cantidad" }];
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
      return value.id != row_obj.id;
    });
  }
  // updateRowData(row_obj){
  //   const dt = this.dataSource.data;
  //   this.dataSource.data = dt.filter((value,key)=>{
  //     if(value.id == row_obj.id){
  //       value.descripcion = row_obj.descripcion;
  //     }
  //     return true;
  //   });
  // }
}
