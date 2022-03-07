import { AuthAdminService } from '../../../services/auth-admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  IPServer:string;
  cambioCorrecto:boolean;
  cambiando:boolean;

  constructor(private router: Router, private AuthAdminService: AuthAdminService) { }

  ngOnInit() {
    this.IPServer = this.AuthAdminService.loadIPServer();
    this.cambioCorrecto = false;
    this.cambiando = false;
  }

  logOut(){
    this.AuthAdminService.logout();
    this.router.navigateByUrl('/login')
  }

  //Abrir nueva ventana para ver el Manual
  verManual(){
    const urlLoad = 'http://'+this.IPServer+':3000/repositorio/manual.pdf';
    //console.log('urlload', urlLoad);
    window.open(urlLoad, "_blank");
  }

  actualizarContrasena(form: NgForm): void {
    this.cambioCorrecto = false;
    this.cambiando = true;
    const newC = {
      id_admin: this.AuthAdminService.getIdAdmin(),
      contrasena: form.value.contrasena
    }
    this.AuthAdminService.uploadInfoLoginAdmin(newC).subscribe(res =>{
      //console.log(res);
      this.cambioCorrecto = true;
      this.cambiando = false;
    });
  }

}
