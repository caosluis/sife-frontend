import { Component, OnInit } from "@angular/core";
import { SifeFechaHora } from "src/app/models/sife-fecha-hora";
import { SifeFechaHoraService } from "src/app/services/sife-fecha-hora.service";
import { Socket } from "ngx-socket-io";

@Component({
  selector: "app-indicadorfecha",
  templateUrl: "./indicadorfecha.component.html",
  styleUrls: ["./indicadorfecha.component.css"],
})
export class IndicadorfechaComponent implements OnInit {
  zz;
  horahansa = "";
  horasin = "";
  delt = "";
  fechahora: SifeFechaHora[] = [];

  constructor(private dataApi: SifeFechaHoraService, private socket: Socket) {
    this.socket.on("/Sifefechahora/POST", (data) => {
      // console.log(data);
      this.fechahora = data;
      this.horahansa = this.fechahora["fechaHoraSer"];
      this.horasin = this.fechahora["fechaHora"];
      this.delt = String(this.fechahora["delta"]);
    });
  }
  ngOnInit() {}

  ngAfterViewInit() {
    this.getAllSifefechahora();
  }

  getAllSifefechahora() {
    this.dataApi.getAllSifefechahora().subscribe((data) => {
      this.fechahora = data;
      this.horahansa = this.fechahora[0]["fechaHoraSer"];
      this.horasin = this.fechahora[0]["fechaHora"];
      this.delt = String(this.fechahora[0]["delta"]);
    });
  }
}
