import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  /* Routing hacia fc.module*/
  /*{path:'', redirectTo:'/components/login', pathMatch:"full"},
  {path:'components', loadChildren: './components/fc.module#FCModule'}*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
