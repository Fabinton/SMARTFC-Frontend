import { RouterModule, Routes } from '@angular/router';

import {
    InicioProfesoresComponent,
    SubirContenidoComponent,
    BorrarContenidoComponent,
    CrearActividadComponent,
    ModificarActividadComponent,
    BorrarActividadComponent,
    BusquedaComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    InfromacionDocenteComponent,
    AdministrarDocenteComponent,
    InicioAdminComponent,
    GestionarCompetenciasAdminComponent,
    GestionarUsuariosAdminComponent,
    GestionarColegioAdminComponent,
    BusquedaVisitanteComponent,
    DudasComponent,
    MetricasComponent
} from './components/index.paginas';

const app_routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registroProfesor', component: RegistroUsuarioComponent },
    { path: 'inicioProfesores', component: InicioProfesoresComponent },
    { path: 'InformacionProfesor', component: InfromacionDocenteComponent },
    { path: 'AdministrarProfesor', component: AdministrarDocenteComponent },
    { path: 'subirContenido', component: SubirContenidoComponent },
    { path: 'borrarContenido', component: BorrarContenidoComponent },
    { path: 'crearActividad', component: CrearActividadComponent },
    { path: 'modificarActividad', component: ModificarActividadComponent },
    { path: 'borrarActividad', component: BorrarActividadComponent },
    { path: 'busqueda', component: BusquedaComponent },
    { path: 'inicioAdmin', component: InicioAdminComponent },
    { path: 'gestionarCompetenciasAdmin', component: GestionarCompetenciasAdminComponent },
    { path: 'gestionarUsuariosAdmin', component: GestionarUsuariosAdminComponent },
    { path: 'gestionarColegioAdmin', component: GestionarColegioAdminComponent },
    { path: 'busquedaVisitante', component: BusquedaVisitanteComponent },
    { path: 'dudas', component: DudasComponent },
    { path: 'metricas', component: MetricasComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'login'},
    { path: '', pathMatch: 'full', redirectTo: 'login'}
];

export const app_routing = RouterModule.forRoot(app_routes, {useHash:true});