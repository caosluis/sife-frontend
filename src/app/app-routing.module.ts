import { CnfUserComponent } from "./components/cnf-user/cnf-user.component";
import { HistoricoComponent } from "./components/sincronizar/historico/historico.component";
import { PlantillasDocComponent } from "./components/conf-globales/plantillas-doc/plantillas-doc.component";
import { FirmaDigitalComponent } from "./components/firma-digital/firma-digital.component";
import { ListasDesplegablesComponent } from "./components/conf-globales/listas-desplegables/listas-desplegables.component";
import { NuevoValorProductoComponent } from "./components/nuevo-valor-producto/nuevo-valor-producto.component";
import { ConfGlobalesComponent } from "./components/conf-globales/conf-globales.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CatalogosComponent } from "./components/catalogos/catalogos.component";
import { ConexionesComponent } from "./components/conexiones/conexiones.component";
import { FacturasComponent } from "./components/facturas/facturas.component";
import { FacturasSapComponent } from "./components/facturas-offline/facturas-sap.component";
import { HardwareComponent } from "./components/hardware/hardware.component";
import { ProductosComponent } from "./components/productos/productos.component";
import { SoftwareComponent } from "./components/software/software.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { ConfiguracionesComponent } from "./components/configuraciones/configuraciones.component";
import { EmpresaComponent } from "./components/configuraciones/empresa/empresa.component";
import { SucursalComponent } from "./components/configuraciones/sucursal/sucursal.component";
import { PdvComponent } from "./components/configuraciones/pdv/pdv.component";
import { SincronizarComponent } from "./components/sincronizar/sincronizar.component";
import { UserConectionComponent } from "./components/cnf-user/token/user-conection/user-conection.component";
import { CufdHistoricoComponent } from "./components/cufd-historico/cufd-historico.component";
import { TokenComponent } from "./components/cnf-user/token/token.component";
import { AuthGuard } from "./components/Auxiliares/auth.guard";
import { TransicionComponent } from "./components/Auxiliares/transicion/transicion.component";
import { EventoSignificativoComponent } from "./components/evento-significativo/evento-significativo.component";
import { FacturaLoteComponent } from "./components/facturas-offline/factura-lote/factura-lote.component";
import { SaludSistemaComponent } from "./components/salud-sistema/salud-sistema.component";
import { IndicadorfechaComponent } from "./components/inicio/indicadorfecha/indicadorfecha.component";
import { IndicadorfechahistoricoComponent } from "./components/inicio/indicadorfecha/indicadorfechahistorico/indicadorfechahistorico.component";
import { ValidaNitComponent } from "./components/configuraciones/valida-nit/valida-nit.component";
import { AutorizacionComponent } from "./components/autorizacion/autorizacion.component";
import { UserProfileComponent } from "./components/cnf-user/user/user-profile/user-profile.component";
import { CuadrofacturasComponent } from "./components/reportes/cuadrofacturas/cuadrofacturas.component";
import { ServiciossifeComponent } from "./components/reportes/serviciossife/serviciossife.component";
import { AboutComponent } from "./components/about/about.component";
import { ReporteFacturasComponent } from "./components/reportes/reporte-facturas/reporte-facturas.component";
import { CertificadosComponent } from "./components/certificados/certificados.component";
import { ActualizacionComponent } from "./components/actualizacion/actualizacion.component";

const routes: Routes = [
  { path: "", component: InicioComponent },
  { path: "inicio", component: InicioComponent },
  { path: "autorizacion", component: AutorizacionComponent, canActivate: [AuthGuard] },
  { path: "actualizacion", component: ActualizacionComponent, canActivate: [AuthGuard] },
  { path: "certificados", component: CertificadosComponent, canActivate: [AuthGuard] },
  { path: "perfil", component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: "about", component: AboutComponent},
  {
    path: "catalogos",
    component: CatalogosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "conexiones",
    component: ConexionesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "facturas",
    component: FacturasComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Si"] }
  },
  {
    path: "facturas-sap",
    component: FacturasSapComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Si"] }
  },
  {
    path: "facturas-lote",
    component: FacturaLoteComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Si"] }
  },
  { path: "hardware", component: HardwareComponent, canActivate: [AuthGuard] },
  {
    path: "productos",
    component: ProductosComponent,
    canActivate: [AuthGuard],
  },
  { path: "software", component: SoftwareComponent, canActivate: [AuthGuard] },
  {
    path: "configuraciones",
    component: ConfiguracionesComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Si"] },
  },
  { path: "empresa", 
    component: EmpresaComponent, 
    canActivate: [AuthGuard],
    data: { roles: ["Si"] },
  },
  { path: "sucursal", 
    component: SucursalComponent, 
    canActivate: [AuthGuard],
    data: { roles: ["Si"] }, 
  },
  { path: "pdv", 
    component: PdvComponent, 
    canActivate: [AuthGuard],
    data: { roles: ["Si"] },
  },
  { path: "valida-nit", component: ValidaNitComponent, canActivate: [AuthGuard] },
  {
    path: "sincronizar",
    component: SincronizarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "configuracionesGlobales",
    component: ConfGlobalesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "valorProducto",
    component: NuevoValorProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "listasDesplegables",
    component: ListasDesplegablesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "firmaDigital",
    component: FirmaDigitalComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Si"] },
  },
  {
    path: "plantillasDocumentos",
    component: PlantillasDocComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "historicoCatalogos",
    component: HistoricoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "usuarios",
    component: CnfUserComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Si"] },
  },
  { path: "usuario-conexion", component: UserConectionComponent },
  { path: "cufd-historico", 
    component: CufdHistoricoComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Si"] },
  },
  { path: "token", 
    component: TokenComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Si"] },
   },
  { path: "eventosignificativo", component: EventoSignificativoComponent },
  { path: "serviciosSife", component: ServiciossifeComponent },
  { path: "cuadroFacturas", component: CuadrofacturasComponent },
  { path: "reporteFacturas", component: ReporteFacturasComponent },
  { path: "saludsistema", component: SaludSistemaComponent },
  { path: "transicion", component: TransicionComponent },
  { path: "fechahistorico", component: IndicadorfechahistoricoComponent },
  { path: "**", redirectTo: "" },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
