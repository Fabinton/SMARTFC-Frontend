import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header-visitante',
  templateUrl: './header-visitante.component.html',
  styleUrls: ['./header-visitante.component.css']
})
export class HeaderVisitanteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  salirBusquedaVisitante(){
    console.log('logout Visitante');
    this.router.navigateByUrl('/login');
  }

}
