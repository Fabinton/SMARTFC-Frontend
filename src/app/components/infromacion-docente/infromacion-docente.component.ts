import { AuthDService } from '../../services/auth-d.service';
import { ContentREAService } from '../../services/content-rea.service';
import { DocenteI } from '../../models/docente';
import { ColegioI } from '../../models/colegio';
import { MateriaI } from '../../models/materia';
import { MateriaActivaI } from '../../models/materiaActiva';
import { MateriaActivaVisualizarI } from '../../models/materiaActivaVisualizar';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-infromacion-docente',
  templateUrl: './infromacion-docente.component.html',
  styleUrls: ['./infromacion-docente.component.css']
})
export class InfromacionDocenteComponent implements OnInit {

  public nombreApellidoDocente: string;
  public idDocente: number;
  resDocente: any;
  resColegio: any;
  DocenteInfo: DocenteI;
  ColegioInfo: ColegioI;
  MateriaActivaInfo: MateriaActivaVisualizarI[];
  materia:MateriaI[];

  constructor(private ContentREAService: ContentREAService, private AuthDService: AuthDService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();
    
    this.DocenteInfo = new DocenteI;
    this.ColegioInfo = new ColegioI;

    this.idDocente = this.AuthDService.getIdDocente();
    this.nombreApellidoDocente = this.AuthDService.getnombreApellidoDocente();
    this.getInformacionCompleta();
  }

  getInformacionCompleta(){
    this.idDocente = this.AuthDService.getIdDocente();

    const infoDocente = {
      id_docente: this.idDocente
    }

    this.ContentREAService.allSubject().subscribe(res => {
      this.materia = res as MateriaI[];
      //console.log("1:",this.materia.length);

      this.AuthDService.loadDocente(infoDocente).subscribe(res =>{
        this.resDocente = res as DocenteI;
        this.DocenteInfo = this.resDocente.teacher; 
        //console.log('info docente', this.resDocente);
  
        this.AuthDService.loadColegio(this.resDocente.teacher).subscribe(res =>{
          this.resColegio = res as ColegioI;
          this.ColegioInfo = this.resColegio.school;
          //console.log('info colegio', this.resColegio);
  
          this.AuthDService.loadAllSubjectActives().subscribe(res =>{
            this.AuthDService.MateriasActivas = res as MateriaActivaI[];
            this.MateriaActivaInfo = res as MateriaActivaVisualizarI[];
  
            for (let i = 0; i < this.AuthDService.MateriasActivas.length; i++) {
              for (let m = 0; m < this.materia.length; m++) {
                if (this.AuthDService.MateriasActivas[i].id_materia == this.materia[m].id_materia) {
                  this.MateriaActivaInfo[i].nombre_materia = this.materia[m].nombre_materia;
                }
              }
            }
          });
        });
      });
    });
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
