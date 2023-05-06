import { UserDataService } from "./../../../services/user-data.service";
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { UserService } from "./../../../services/user.service";
import { NotificationService } from "./../../../services/notification.service";
import { ActivatedRoute, Router } from "@angular/router";
import * as glob from "../../../global";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loading = false;
  user: any;
  pass: any;
  hide = true;
  titulo = glob.titulo;
  subtitulo = glob.subtitulo;
  ruta = glob.hostPass + glob.portPass;
  @Output() buttonClicked = new EventEmitter();

  constructor(
    private userS: UserService,
    private notificacion: NotificationService,
    private userInfo: UserDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (localStorage.getItem("usuario")) {
      this.userS.sesion = JSON.parse(localStorage.getItem("usuario"));
      this.userS.logoutSesion().subscribe(() => {
        localStorage.clear();
      });
    }
  }

  ngOnInit() {}
  login() {
    // Inicio de sesion
    this.loading = true;
    this.userS.login(this.user, this.pass).then(
      (data) => {
        // Datos del usuario
        this.userInfo.getUser(data["userId"]).subscribe((data2) => {
          delete data2[0]["id"];
          delete data["userId"];
          delete data2[0]["id_user"];
          delete data2[0]["estado"];
          this.userS.sesion = { ...data, ...data2[0] };
          localStorage.setItem("usuario", JSON.stringify(this.userS.sesion));
          const returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
          this.router.navigateByUrl(returnUrl);
          this.notificacion.success("Bienvenido a SIFE");
          this.buttonClicked.emit();
        });
      },
      (error) => {
        this.notificacion.error("Usuario o contraseña incorrectos");
        console.log(error);
        this.loading = false;
      }
    );
  }
}
