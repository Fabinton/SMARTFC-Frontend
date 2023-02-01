import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { FCRoutingModule } from './fc-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from 'src/app/components/header/header.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { InicioProfesoresComponent } from 'src/app/components/inicio-profesores/inicio-profesores.component';
import { CrearActividadComponent } from 'src/app/components/crear-actividad/crear-actividad.component';
import { BorrarActividadComponent } from 'src/app/components/borrar-actividad/borrar-actividad.component';
import { ModificarActividadComponent } from 'src/app/components/modificar-actividad/modificar-actividad.component';
import { SubirContenidoComponent } from 'src/app/components/subir-contenido/subir-contenido.component';
import { BorrarContenidoComponent } from 'src/app/components/borrar-contenido/borrar-contenido.component';
import { BusquedaComponent } from 'src/app/components/busqueda/busqueda.component';

import { AppComponent } from 'src/app/app.component';
import { from } from 'rxjs';
import { LoginComponent } from './login/login.component';
import { AuthDService } from '../services/auth-d.service';
import { ContentREAService } from '../services/content-rea.service';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';
import { InfromacionDocenteComponent } from './infromacion-docente/infromacion-docente.component';
import { AdministrarDocenteComponent } from './administrar-docente/administrar-docente.component';
import { InicioAdminComponent } from './Admin/inicio-admin/inicio-admin.component';
import { HeaderAdminComponent } from './Admin/header-admin/header-admin.component';
import { ActividadService } from '../services/actividad.service';
import { GestionarCompetenciasAdminComponent } from './Admin/gestionar-competencias-admin/gestionar-competencias-admin.component';
import { GestionarUsuariosAdminComponent } from './Admin/gestionar-usuarios-admin/gestionar-usuarios-admin.component';
import { GestionarColegioAdminComponent } from './Admin/gestionar-colegio-admin/gestionar-colegio-admin.component';
import { BusquedaVisitanteComponent } from './Visitante/busqueda-visitante/busqueda-visitante.component';
import { HeaderVisitanteComponent } from './Visitante/header-visitante/header-visitante.component';
import { DudasComponent } from './dudas/dudas.component';
import { MetricasComponent } from './metricas/metricas.component';
import { CalificacionComponent } from './calificacion/calificacion.component';

@NgModule({
  declarations:[
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
    AuthDService,
    RegistroUsuarioComponent,
    InfromacionDocenteComponent,
    AdministrarDocenteComponent,
    InicioAdminComponent,
    HeaderAdminComponent,
    GestionarCompetenciasAdminComponent,
    GestionarUsuariosAdminComponent,
    GestionarColegioAdminComponent,
    BusquedaVisitanteComponent,
    HeaderVisitanteComponent,
    DudasComponent,
    MetricasComponent,
    CalificacionComponent
  ],
  imports:[
      CommonModule,
      FormsModule,
      FCRoutingModule,
      HttpClientModule
  ],
  providers:[AuthDService, ContentREAService, ActividadService],
  bootstrap: [AppComponent]
})
export class FCModule { }
