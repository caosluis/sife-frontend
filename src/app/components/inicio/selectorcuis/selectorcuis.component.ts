import { UserService } from "./../../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { FirmaDigitalService } from "./../../../services/firma-digital.service";
import { TokenRegistroService } from "./../../../components/cnf-user/token/token-connection/token-registro/token-registro.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmpresaService } from "src/app/services/empresa.service";
import { Router } from "@angular/router";
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: "app-selectorcuis",
  templateUrl: "./selectorcuis.component.html",
  styleUrls: ["./selectorcuis.component.css"],
})
export class SelectorcuisComponent implements OnInit {
  UsuarioActual: any;
  EmpresaSeleccionada: any;
  ModulosActual: any = this.router.url;
  empresaList: any;
  timeLeft: number = 60;
  interval;
  fecha: any;
  candiafirma: any;
  fechatoken: any;
  fechacert: any;
  candiatoken: any;
  candiacert: any;
  cuis: any;
  empresasHabilitadas = []
  EmpresaForm: FormGroup = new FormGroup({
    empresa: new FormControl(""),
  });
  constructor(
    private empresaService: EmpresaService,
    private socket: Socket,
    private serviceFirma: FirmaDigitalService,
    private tokenRegistroService: TokenRegistroService,
    public serviceUs: UserService,
    private rolesService: RolesService,
    private router: Router
  ) {
    this.UsuarioActual = JSON.parse(localStorage.getItem("usuario"));
    localStorage.setItem(
      "empresa",
      JSON.stringify(JSON.parse(localStorage.getItem("usuario")).empresa)
    );
    this.EmpresaSeleccionada = JSON.parse(
      localStorage.getItem("usuario")
    ).empresa;

    this.socket.on("/Sifecuis/POST", (data) => { });
    this.cuis = this.serviceUs.sesion["cuis"];
    this.Cargarfechafirma();
    this.CargarfechaToken();
    this.CargarfechaCert();
    /* setTimeout(() => {
      if (
        this.serviceUs.sesion["nivelAcceso"] !=
        "551eac71-5b53-4785-b96f-4cbaab197012"
      ) {
        this.selectCuis(this.serviceUs.sesion["cuis"]);
      }
    }, 1000); */
    this.rolesService.sife_user_empresas_get(this.UsuarioActual.username).then(data => {
      if (data[0]) {
        this.empresasHabilitadas = data[0].nit
      }
    })
  }
  getAllSelectorEmpresa() {
    this.empresaService.sife_empresa_get_activos().then((data) => {
      console.log(data);
      
      if (this.UsuarioActual.role == "Usuario") {
        this.empresaList = data.filter(
          (item) => item.nit == this.UsuarioActual.empresa
        );
      } else {
        this.empresaList = data;
      }
    });
  }
  ngOnInit() {
    this.getAllSelectorEmpresa();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }
  restaFechas(f1, f2) {
    var fechaini = f1;
    var fechafin = f2;
    var diasdif = fechafin.getTime() - fechaini.getTime();
    var contdias = Math.round(diasdif / (1000 * 60 * 60 * 24));
    return contdias;
  }
  Cargarfechafirma() {
    this.serviceFirma
      .getAllFechaFirmaDigital(this.EmpresaSeleccionada)
      .then((data) => {
        if (data.length > 0) {
          if (
            this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"])) == 1
          ) {
            this.fecha =
              "Firma válida por " +
              this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"])) +
              " día";
            this.candiafirma = this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"]));
          } else {
            this.fecha =
              "Firma válida por " +
              this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"])) +
              " días";
            this.candiafirma = this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"]));
          }
        } else {
          this.fecha = "Firma";
        }
      });
  }
  CargarfechaToken() {
    this.tokenRegistroService
      .sife_tokens_fecha(this.EmpresaSeleccionada)
      .then((data) => {
        if (data.length > 0) {
          if (
            this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"])) == 1
          ) {
            this.fechatoken =
              "Token válido por " +
              this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"])) +
              " día";
            this.candiatoken = this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"]));
          } else {
            this.fechatoken =
              "Token válido por " +
              this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"])) +
              " días";
            this.candiatoken = this.restaFechas(new Date(), new Date(data[0]["fechaVigencia"]));
          }
        } else {
          this.fechatoken = "Token";
        }
      });
  }
  CargarfechaCert() {
    this.tokenRegistroService
      .sife_cert_fecha()
      .then((data) => {
        console.log("FECHA CERT: "+ data)
        if (data.length > 0) {
          if (
            this.restaFechas(new Date(), new Date(data[0]["fechaVencimiento"])) == 1
          ) {
            this.fechacert =
              "Certificado FE válido por " +
              this.restaFechas(new Date(), new Date(data[0]["fechaVencimiento"])) +
              " día";
            this.candiacert = this.restaFechas(new Date(), new Date(data[0]["fechaVencimiento"]));
          } else {
            this.fechacert =
              "Certificado FE válido por " +
              this.restaFechas(new Date(), new Date(data[0]["fechaVencimiento"])) +
              " días";
            this.candiacert = this.restaFechas(new Date(), new Date(data[0]["fechaVencimiento"]));
          }
        } else {
          this.fechacert = "Certificado FE";
        }
      });
  }
  async CambioEmpresa(empresa) {
    localStorage.setItem("empresa", JSON.stringify(empresa));
    this.EmpresaSeleccionada = empresa;
  }

  async seleccionarEmpresa(empresa) {
    var ruta = this.router.url;
    await this.CambioEmpresa(empresa);
    this.Cargarfechafirma();
    this.CargarfechaToken();
    this.CargarfechaCert();
    this.router.navigateByUrl("transicion").then(() => {
      this.router.navigateByUrl(ruta).then();
    });
  }

  habilitado(empresa) {
    if (this.empresasHabilitadas) {
      for (let element of this.empresasHabilitadas) {
        if (empresa == element) {
          return true
        }

      }
    }
  }
}
