import { AuthDService } from '../../services/auth-d.service';
import { JwtResponseI } from '../../models/jwt-response';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-inicio-profesores',
  templateUrl: './inicio-profesores.component.html',
})
export class InicioProfesoresComponent implements OnInit {

  public nombreApellidoDocente: string;

  constructor(private AuthDService: AuthDService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();
    this.nombreApellidoDocente = this.AuthDService.getnombreApellidoDocente();
  }

  comprobacionLogin(){
    if (this.AuthDService.getIdDocente()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
