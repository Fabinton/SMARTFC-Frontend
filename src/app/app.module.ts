// RUTAS
import { app_routing } from "./app.routes";

//Componentes

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InicioProfesoresComponent } from './components/inicio-profesores/inicio-profesores.component';
import { CrearActividadComponent } from './components/crear-actividad/crear-actividad.component';
import { BorrarActividadComponent } from './components/borrar-actividad/borrar-actividad.component';
import { ModificarActividadComponent } from './components/modificar-actividad/modificar-actividad.component';
import { SubirContenidoComponent } from './components/subir-contenido/subir-contenido.component';
import { BorrarContenidoComponent } from './components/borrar-contenido/borrar-contenido.component';
import { from } from 'rxjs';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { LoginComponent } from "./components/login/login.component"
import { AuthDService } from './services/auth-d.service';
import { ContentREAService } from './services/content-rea.service';
import { CommonModule } from '@angular/common';
import { FilterContentPipe } from './pipes/filter-content.pipe';
import { FilterCompetenciaPipe } from './pipes/filter-competencia.pipe';
import { FilterActividadPipe } from './pipes/filter-actividad.pipe';
import { ActividadService } from './services/actividad.service';
import { FilterContentDeletePipe } from './pipes/filter-content-delete.pipe';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { InfromacionDocenteComponent } from './components/infromacion-docente/infromacion-docente.component';
import { AdministrarDocenteComponent } from './components/administrar-docente/administrar-docente.component';
import { FilterTableMateriaDocentePipe } from './pipes/filter-table-materia-docente.pipe';
import { FilterActividadDeletePipe } from './pipes/filter-actividad-delete.pipe';

import { InicioAdminComponent } from './components/Admin/inicio-admin/inicio-admin.component';
import { HeaderAdminComponent } from './components/Admin/header-admin/header-admin.component';
import { GestionarCompetenciasAdminComponent } from './components/Admin/gestionar-competencias-admin/gestionar-competencias-admin.component';
import { FilterCompetenciaAdminPipe } from './pipes/filter-competencia-admin.pipe';
import { GestionarUsuariosAdminComponent } from './components/Admin/gestionar-usuarios-admin/gestionar-usuarios-admin.component';
import { FilterDocenteAdminPipe } from './pipes/filter-docente-admin.pipe';
import { FilterEstudiantesAdminPipe } from './pipes/filter-estudiantes-admin.pipe';
import { GestionarColegioAdminComponent } from './components/Admin/gestionar-colegio-admin/gestionar-colegio-admin.component';
import { BusquedaVisitanteComponent } from './components/Visitante/busqueda-visitante/busqueda-visitante.component';
import { HeaderVisitanteComponent } from './components/Visitante/header-visitante/header-visitante.component';
import { FilterColegioAdminPipe } from './pipes/filter-colegio-admin.pipe';
import { FilterMateriaactivaAdminPipe } from './pipes/filter-materiaactiva-admin.pipe';
import { DudasComponent } from './components/dudas/dudas.component';
import { FilterDudaPipe } from './pipes/filter-duda.pipe';
import { MetricasComponent } from './components/metricas/metricas.component';
import { FilterEstudianteMetricasPipe } from './pipes/filter-estudiante-metricas.pipe';
import { FilterMiMateriasPipe } from './pipes/filter-mi-materias.pipe';
import { FilterTallerPipe } from './pipes/filter-taller.pipe';
import { CalificacionComponent } from "./components/index.paginas";
import { ComentariosComponent } from './components/comentarios/comentarios.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InicioProfesoresComponent,
    CrearActividadComponent,
    BorrarActividadComponent,
    ModificarActividadComponent,
    SubirContenidoComponent,
    BorrarContenidoComponent,
    BusquedaComponent,
    LoginComponent,
    FilterContentPipe,
    FilterCompetenciaPipe,
    FilterActividadPipe,
    FilterContentDeletePipe,
    RegistroUsuarioComponent,
    InfromacionDocenteComponent,
    AdministrarDocenteComponent,
    FilterTableMateriaDocentePipe,
    FilterActividadDeletePipe,
    InicioAdminComponent,
    HeaderAdminComponent,
    GestionarCompetenciasAdminComponent,
    FilterCompetenciaAdminPipe,
    GestionarUsuariosAdminComponent,
    FilterDocenteAdminPipe,
    FilterEstudiantesAdminPipe,
    GestionarColegioAdminComponent,
    BusquedaVisitanteComponent,
    HeaderVisitanteComponent,
    FilterColegioAdminPipe,
    FilterMateriaactivaAdminPipe,
    DudasComponent,
    FilterDudaPipe,
    MetricasComponent,
    FilterEstudianteMetricasPipe,
    FilterMiMateriasPipe,
    FilterTallerPipe,
    CalificacionComponent,
    ComentariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    app_routing,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [AuthDService, ContentREAService, ActividadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
