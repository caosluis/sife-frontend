import { NotificationService } from "./../../services/notification.service";
import { UserDataService } from "./../../services/user-data.service";
import { UserService } from "./../../services/user.service";
import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MediaMatcher } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { NestedTreeControl } from "@angular/cdk/tree";
import { MatTreeNestedDataSource } from "@angular/material/tree";
//Importamos Socket IO
import { Socket } from "ngx-socket-io";
import { RolesService } from "src/app/services/roles.service";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import * as glob from "../../global";

interface Menu {
  name: string;
  SubModulos?: Menu[];
  path?: string;
  icon?: string;
  show?: boolean;
  color?: string;
}

@Component({
  selector: "app-main-menu",
  templateUrl: "./main-menu.component.html",
  styleUrls: ["./main-menu.component.css"],
})
export class MainMenuComponent implements OnInit {
  treeControl = new NestedTreeControl<Menu>((node) => node.SubModulos);
  dataSource = new MatTreeNestedDataSource<Menu>();
  roleList: any;
  version = glob.version; 
  titulo = glob.titulo;
  subtitulo = glob.subtitulo;
  subtitulo2 = glob.subtitulo2;
  Modulos: Menu[];
  colorNavegador = glob.colorNavegador;
  colorNavegador2 = glob.colorNavegador2;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public userData: UserService,
    public roleService: RolesService,
    private userInfo: UserDataService,
    private socket: Socket,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userData.sesion = JSON.parse(localStorage.getItem("usuario"));

    /*     this.socket.on("disconnect", () => {
      setTimeout(() => {
        notificationService.error("No hay conexión al servidor");
        this.logout();
      }, 10000);
    }); */
    this.socket.on("connect", () => {
      notificationService.success("Conexión al servidor iniciada");
    });
  }

  mobileQuery: MediaQueryList;

  hasChild = (_: number, node: Menu) =>
    !!node.SubModulos && node.SubModulos.length > 0;

  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );

  /*   Role(roleID) {
    if (this.roleList != undefined) {
      var role = [];
      for (let i = 0; i < this.roleList.length; i++) {
        if (this.roleList[i].roleID == roleID) {
          role.push(this.roleList[i]);
        }
      }
      if (role[0] != undefined) {
        return role[0].role;
      }
    }
  }
 */
  logout() {
    this.userData.logoutSesion().subscribe(
      () => {
        localStorage.clear();
        this.userData.sesion = null;
      },
      (error) => {
        localStorage.clear();
        this.userData.sesion = null;
      }
    );
  }
  cargarTree() {
    if (this.userData.sesion != undefined) {
      this.roleService
        .sife_roles_get_roleID(this.userData.sesion.role)
        .then((data) => {
          this.dataSource.data = data[0].configuracion.Modulos;
        });
    }
  }
  ngOnInit(): void {
    this.cargarTree();
  }
  showNextComponent() {
    this.cargarTree();
  }
}
