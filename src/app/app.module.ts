import { SucursalFormComponent } from "./components/configuraciones/sucursal/sucursal-form/sucursal-form.component";
import { ChartsModule } from "ng2-charts";
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from "@angular-material-components/datetime-picker";
import {
  MatMomentDateModule,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import { MatTimepickerModule } from "mat-timepicker";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material/core";
import { NgxQRCodeModule } from "@techiediaries/ngx-qrcode";
import { PlantillasDocService } from "./services/plantillas-doc.service";
import { FacturasService } from "./services/facturas.service";
import { ListasDesplegablesService } from "./services/listas-desplegables.service";
import { CufdService } from "./services/cufd.service";
import { SincronizarService } from "./services/sincronizar.service";
import { NuevoValorProductoService } from "./services/nuevo-valor-producto.service";
import { ConfGlobalesService } from "./services/conf-globales.service";
import { BrowserModule } from "@angular/platform-browser";
import { Injector, LOCALE_ID, NgModule } from "@angular/core";

import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainMenuComponent } from "./components/main-menu/main-menu.component";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { CatalogosComponent } from "./components/catalogos/catalogos.component";
import { ConexionesComponent } from "./components/conexiones/conexiones.component";
import { HardwareComponent } from "./components/hardware/hardware.component";
import { SoftwareComponent } from "./components/software/software.component";
import { FacturasSapComponent } from "./components/facturas-offline/facturas-sap.component";
import { ProductosComponent } from "./components/productos/productos.component";
import { FacturasComponent } from "./components/facturas/facturas.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { IndicadoresComponent } from "./components/inicio/indicadores/indicadores.component";

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { ConfiguracionesComponent } from "./components/configuraciones/configuraciones.component";
import { EmpresaComponent } from "./components/configuraciones/empresa/empresa.component";
import { SucursalComponent } from "./components/configuraciones/sucursal/sucursal.component";
import { PdvComponent } from "./components/configuraciones/pdv/pdv.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CrearpdvService } from "./services/crearpdv.service";
import { GestioncufdComponent } from "./components/inicio/gestioncufd/gestioncufd.component";
import { SelectorcuisComponent } from "./components/inicio/selectorcuis/selectorcuis.component";
import { IndicadorfechaComponent } from "./components/inicio/indicadorfecha/indicadorfecha.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SincronizarComponent } from "./components/sincronizar/sincronizar.component";
import { ConfGlobalesComponent } from "./components/conf-globales/conf-globales.component";
import { EditComponent } from "./components/conf-globales/edit/edit.component";
import { SolSincronizaComponent } from "./components/sincronizar/sol-sincroniza/sol-sincroniza.component";
import { FormPDVComponent } from "./components/configuraciones/pdv/form-pdv/form-pdv.component";
import { FormCuisComponent } from "./components/configuraciones/empresa/form-cuis/form-cuis.component";
import { CatServicioComponent } from "./components/sincronizar/cat-servicio/cat-servicio.component";
import { NuevoValorProductoComponent } from "./components/nuevo-valor-producto/nuevo-valor-producto.component";
import { SolicitudComponent } from "./components/nuevo-valor-producto/solicitud/solicitud.component";
import { VerificaValorProductoComponent } from "./components/nuevo-valor-producto/verifica-valor-producto/verifica-valor-producto.component";
import { CufdComponent } from "./components/cufd/cufd.component";
import { CufdFormComponent } from "./components/cufd/cufd-form/cufd-form.component";
import { ListasDesplegablesComponent } from "./components/conf-globales/listas-desplegables/listas-desplegables.component";
import { ListasDesplegablesFormComponent } from "./components/conf-globales/listas-desplegables/listas-desplegables-form/listas-desplegables-form.component";
import { ProductosFormComponent } from "./components/productos/productos-form/productos-form.component";
import { FirmaDigitalComponent } from "./components/firma-digital/firma-digital.component";
import { FirmaDigitalFormComponent } from "./components/firma-digital/firma-digital-form/firma-digital-form.component";
import { NandinaComponent } from "./components/productos/nandina/nandina.component";
import { FacturasFormComponent } from "./components/facturas/facturas-form/facturas-form.component";
import { PlantillasDocComponent } from "./components/conf-globales/plantillas-doc/plantillas-doc.component";
import { PlantillasDocFormComponent } from "./components/conf-globales/plantillas-doc/plantillas-doc-form/plantillas-doc-form.component";
import { HistoricoComponent } from "./components/sincronizar/historico/historico.component";
import { CnfUserComponent } from "./components/cnf-user/cnf-user.component";
import { UserComponent } from "./components/cnf-user/user/user.component";
import { GroupsComponent } from "./components/cnf-user/groups/groups.component";
import { ModulesComponent } from "./components/cnf-user/modules/modules.component";
import { UserFormComponent } from "./components/cnf-user/user/user-form/user-form.component";
import { ModulesFormComponent } from "./components/cnf-user/modules/modules-form/modules-form.component";
import { GroupsFormComponent } from "./components/cnf-user/groups/groups-form/groups-form.component";
import { FacturasResumenComponent } from "./components/facturas/facturas-resumen/facturas-resumen.component";
import { SolAnulacionComponent } from "./components/facturas/sol-anulacion/sol-anulacion.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from "./components/cnf-user/login/login.component";
import { PdvFormComponent } from "./components/configuraciones/pdv/pdv-form/pdv-form.component";
import * as glob from "./global";
import { UserConectionComponent } from "./components/cnf-user/token/user-conection/user-conection.component";
import { UserConnectionVerificationComponent } from "./components/cnf-user/token/user-conection/user-connection-verification/user-connection-verification.component";
import { createCustomElement } from "@angular/elements";
import { CufdHistoricoComponent } from "./components/cufd-historico/cufd-historico.component";
import { TokenComponent } from "./components/cnf-user/token/token.component";
import { TokenConnectionComponent } from "./components/cnf-user/token/token-connection/token-connection.component";
import { ConsultaPdvComponent } from "./components/configuraciones/pdv/consulta-pdv/consulta-pdv.component";
import { CierreOperacionesPdvComponent } from "./components/configuraciones/pdv/cierre-operaciones-pdv/cierre-operaciones-pdv.component";
import { CierreOperacionesSucursalComponent } from "./components/configuraciones/sucursal/cierre-operaciones-sucursal/cierre-operaciones-sucursal.component";
import { TokenDetalleComponent } from "./components/cnf-user/token/token-connection/token-detalle/token-detalle.component";
import { FirmaDigitalRevocarComponent } from "./components/firma-digital/firma-digital-revocar/firma-digital-revocar.component";
import { CufdDetailComponent } from "./components/cufd-historico/cufd-detail/cufd-detail.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { registerLocaleData } from "@angular/common";
import ESP from "@angular/common/locales/es";
import { FacturaAnulacionComponent } from "./components/facturas/factura-anulacion/factura-anulacion.component";
import { FacturaReversionAnulacionComponent } from "./components/facturas/factura-reversion-anulacion/factura-reversion-anulacion.component";
import { FacturaRegularizacionComponent } from "./components/facturas/factura-regularizacion/factura-regularizacion.component";
import { FacturaConsultaComponent } from "./components/facturas/factura-consulta/factura-consulta.component";
import { SucursalCuisComponent } from "./components/configuraciones/sucursal/sucursal-cuis/sucursal-cuis.component";
import { PdvCufdComponent } from "./components/configuraciones/pdv/pdv-cufd/pdv-cufd.component";
import { RolesComponent } from "./components/cnf-user/roles/roles.component";
import { RolesFormComponent } from "./components/cnf-user/roles/roles-form/roles-form.component";
import { TransicionComponent } from "./components/Auxiliares/transicion/transicion.component";
import { PdvCuisComponent } from "./components/configuraciones/pdv/pdv-cuis/pdv-cuis.component";
import { EventoSignificativoComponent } from "./components/evento-significativo/evento-significativo.component";
import { RegistroEventoSignificativoComponent } from "./components/evento-significativo/registro-evento-significativo/registro-evento-significativo.component";
import { FacturasSapFormComponent } from "./components/facturas-offline/facturas-offline-form/facturas-sap-form.component";
import { FacturaLoteComponent } from "./components/facturas-offline/factura-lote/factura-lote.component";
import { FacturaLoteDetalleComponent } from "./components/facturas-offline/factura-lote/factura-lote-detalle/factura-lote-detalle.component";
import { FacturaLoteVerificarComponent } from "./components/facturas-offline/factura-lote/factura-lote-verificar/factura-lote-verificar.component";
import { CierrePdvComponent } from "./components/configuraciones/pdv/cierre-pdv/cierre-pdv.component";
import { CufdRenovarComponent } from './components/cufd/cufd-renovar/cufd-renovar.component';
import { RecargaCatalogosComponent } from './components/sincronizar/recarga-catalogos/recarga-catalogos.component';
import { SaludSistemaComponent } from './components/salud-sistema/salud-sistema.component';
import { IndicadorfechahistoricoComponent } from './components/inicio/indicadorfecha/indicadorfechahistorico/indicadorfechahistorico.component';
import { IndicadorfechahistoricodetalleComponent } from './components/inicio/indicadorfecha/indicadorfechahistorico/indicadorfechahistoricodetalle/indicadorfechahistoricodetalle.component';
import { SolicitarfechaComponent } from './components/inicio/indicadorfecha/indicadorfechahistorico/solicitarfecha/solicitarfecha.component';
import { PdvCuisMasivoComponent } from './components/configuraciones/pdv/pdv-cuis-masivo/pdv-cuis-masivo.component';
import { SucursalCuisMasivoComponent } from './components/configuraciones/sucursal/sucursal-cuis-masivo/sucursal-cuis-masivo.component';
import { TokenTestComponent } from './components/cnf-user/token/token-connection/token-test/token-test.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { TokenRegistroComponent } from './components/cnf-user/token/token-connection/token-registro/token-registro.component';
import { ValidaNitComponent } from './components/configuraciones/valida-nit/valida-nit.component';
import { AutorizacionComponent } from './components/autorizacion/autorizacion.component';
import { AutorizacionRegistroComponent } from './components/autorizacion/autorizacion-registro/autorizacion-registro.component';
import { AutorizacionDetalleComponent } from './components/autorizacion/autorizacion-detalle/autorizacion-detalle.component';
import { UserProfileComponent } from './components/cnf-user/user/user-profile/user-profile.component';
import { FacturaLoteSolicitaComponent } from './components/facturas-offline/factura-lote/factura-lote-solicita/factura-lote-solicita.component';
import { CufdReenviarComponent } from './components/cufd/cufd-reenviar/cufd-reenviar.component';
import { ServiciossifeComponent } from './components/reportes/serviciossife/serviciossife.component';
import { CuadrofacturasComponent } from './components/reportes/cuadrofacturas/cuadrofacturas.component';
import { CufdsincronizacionComponent } from './components/cufd/cufdsincronizacion/cufdsincronizacion.component';
import { AboutComponent } from './components/about/about.component';
import { FacturaLoteReenvioComponent } from './components/facturas-offline/factura-lote/factura-lote-reenvio/factura-lote-reenvio.component';
import { ReporteFacturasComponent } from './components/reportes/reporte-facturas/reporte-facturas.component';
import { CuisComponent } from './components/configuraciones/cuis/cuis.component';
import { CertificadosComponent } from './components/certificados/certificados.component';
import { ActualizacionComponent } from './components/actualizacion/actualizacion.component';
import { RegistroComponent } from './components/actualizacion/registro/registro.component';
import { DetalleComponent } from './components/actualizacion/detalle/detalle.component';
import { MatTableResponsiveModule } from './components/mat-table-responsive/mat-table-responsive.module';
registerLocaleData(ESP, "es");

//const config: SocketIoConfig = { url: 'http://hanlpzdk01.hansa.com.bo:36', options: {} };
const config: SocketIoConfig = {
  url: glob.socket_host +  glob.socket_port,
};

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    CatalogosComponent,
    ConexionesComponent,
    HardwareComponent,
    SoftwareComponent,
    FacturasSapComponent,
    ProductosComponent,
    FacturasComponent,
    InicioComponent,
    IndicadoresComponent,
    ConfiguracionesComponent,
    EmpresaComponent,
    SucursalComponent,
    PdvComponent,
    GestioncufdComponent,
    SelectorcuisComponent,
    IndicadorfechaComponent,
    NavbarComponent,
    SincronizarComponent,
    ConfGlobalesComponent,
    EditComponent,
    SolSincronizaComponent,
    FormPDVComponent,
    FormCuisComponent,
    CatServicioComponent,
    NuevoValorProductoComponent,
    SolicitudComponent,
    VerificaValorProductoComponent,
    CufdComponent,
    CufdFormComponent,
    ListasDesplegablesComponent,
    ListasDesplegablesFormComponent,
    ProductosFormComponent,
    FirmaDigitalComponent,
    FirmaDigitalFormComponent,
    NandinaComponent,
    FacturasFormComponent,
    FacturasSapFormComponent,
    PlantillasDocComponent,
    PlantillasDocFormComponent,
    HistoricoComponent,
    CnfUserComponent,
    UserComponent,
    GroupsComponent,
    ModulesComponent,
    UserFormComponent,
    ModulesFormComponent,
    GroupsFormComponent,
    FacturasResumenComponent,
    SucursalFormComponent,
    SolAnulacionComponent,
    LoginComponent,
    PdvFormComponent,
    UserConectionComponent,
    UserConnectionVerificationComponent,
    CufdHistoricoComponent,
    TokenComponent,
    TokenConnectionComponent,
    ConsultaPdvComponent,
    CierreOperacionesPdvComponent,
    CierreOperacionesSucursalComponent,
    TokenDetalleComponent,
    FirmaDigitalRevocarComponent,
    CufdDetailComponent,
    FacturaAnulacionComponent,
    FacturaReversionAnulacionComponent,
    FacturaRegularizacionComponent,
    FacturaConsultaComponent,
    SucursalCuisComponent,
    PdvCufdComponent,
    PdvCuisComponent,
    RolesComponent,
    RolesFormComponent,
    TransicionComponent,
    EventoSignificativoComponent,
    RegistroEventoSignificativoComponent,
    FacturaLoteComponent,
    FacturaLoteDetalleComponent,
    FacturaLoteVerificarComponent,
    CierrePdvComponent,
    CufdRenovarComponent,
    RecargaCatalogosComponent,
    SaludSistemaComponent,
    IndicadorfechahistoricoComponent,
    IndicadorfechahistoricodetalleComponent,
    SolicitarfechaComponent,
    PdvCuisMasivoComponent,
    SucursalCuisMasivoComponent,
    TokenTestComponent,
    ReportesComponent,
    TokenRegistroComponent,
    ValidaNitComponent,
    AutorizacionComponent,
    AutorizacionRegistroComponent,
    AutorizacionDetalleComponent,
    UserProfileComponent,
    FacturaLoteSolicitaComponent,
    CufdReenviarComponent,
    ServiciossifeComponent,
    CuadrofacturasComponent,
    CufdsincronizacionComponent,
    AboutComponent,
    FacturaLoteReenvioComponent,
    ReporteFacturasComponent,
    CuisComponent,
    CertificadosComponent,
    ActualizacionComponent,
    RegistroComponent,
    DetalleComponent,
  ],
  imports: [
    MatTableResponsiveModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxQRCodeModule,
    ChartsModule,
    NgxSpinnerModule,
    MatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatInputModule,
  ],
  exports: [
    MatTableResponsiveModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    { provide: LOCALE_ID, useValue: "es-ES" },
    CrearpdvService,
    ConfGlobalesService,
    NuevoValorProductoService,
    SincronizarService,
    CufdService,
    ListasDesplegablesService,
    FacturasService,
    PlantillasDocService,
  ],
  entryComponents: [
    EditComponent,
    SolSincronizaComponent,
    FormPDVComponent,
    FormCuisComponent,
    SucursalFormComponent,
    SolSincronizaComponent,
    CatServicioComponent,
    SolicitudComponent,
    VerificaValorProductoComponent,
    CufdFormComponent,
    ListasDesplegablesFormComponent,
    ProductosFormComponent,
    FirmaDigitalFormComponent,
    NandinaComponent,
    FacturasFormComponent,
    PlantillasDocFormComponent,
    UserFormComponent,
    ModulesFormComponent,
    GroupsFormComponent,
    SolAnulacionComponent,
    PdvFormComponent,
    UserConnectionVerificationComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
