import { AuthAdminService } from '../../../services/auth-admin.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit {

  constructor(private AuthAdminService: AuthAdminService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();
  }

  comprobacionLogin(){
    if (this.AuthAdminService.getIdAdmin()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
