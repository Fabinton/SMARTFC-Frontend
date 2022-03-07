import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
    InicioProfesoresComponent,
    SubirContenidoComponent,
    BorrarContenidoComponent,
    CrearActividadComponent,
    ModificarActividadComponent,
    BorrarActividadComponent,
    BusquedaComponent,
    LoginComponent
} from 'src/app/components/index.paginas';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'inicioProfesores', component: InicioProfesoresComponent },
    { path: 'subirContenido', component: SubirContenidoComponent },
    { path: 'borrarContenido', component: BorrarContenidoComponent },
    { path: 'crearActividad', component: CrearActividadComponent },
    { path: 'modificarActividad', component: ModificarActividadComponent },
    { path: 'borrarActividad', component: BorrarActividadComponent },
    { path: 'busqueda', component: BusquedaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'inicioProfesores'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FCRoutingModule { }