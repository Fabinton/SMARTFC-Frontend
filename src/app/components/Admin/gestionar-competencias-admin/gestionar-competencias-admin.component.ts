import { AuthAdminService } from '../../../services/auth-admin.service';
import { CompetenciaI } from '../../../models/competencia';
import { AreaMateriaI } from '../../../models/areaMateria';
import { GradoI } from '../../../models/grado';
import { CompetenciaVisualizarI } from '../../../models/competenciaVisualizar';
import { ColegioI } from '../../../models/colegio';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gestionar-competencias-admin',
  templateUrl: './gestionar-competencias-admin.component.html',
  styleUrls: ['./gestionar-competencias-admin.component.css']
})
export class GestionarCompetenciasAdminComponent implements OnInit {

  grados:GradoI[];
  competencias:CompetenciaI[];
  areasMaterias:AreaMateriaI[];
  competenciasVisualizar:CompetenciaVisualizarI[];
  colegios:ColegioI[];
  competenciaToSave:CompetenciaI;
  areaMateriaToSave:AreaMateriaI;
  newCont:number;
  newID:number;
  temp:number;
  correcto1:boolean;
  correcto2:boolean;
  error1:boolean;
  error2:boolean;
  subiendo:boolean;
  temp2:any;

  constructor(private router: Router, private AuthAdminService: AuthAdminService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();
    
    this.correcto1 = false;
    this.correcto2 = false;
    this.error1 = false;
    this.error2 = false;
    this.subiendo = false;

    this.getOptions();
    this.getCompetencias();
  }

  getOptions(){
    this.AuthAdminService.allGrade().subscribe(res => {
      this.grados = res as GradoI[];
    });
    this.AuthAdminService.loadAllAreaSubjects().subscribe(res => {
      this.areasMaterias = res as AreaMateriaI[];
    });
    this.AuthAdminService.loadAllColegios().subscribe(res => {
      this.colegios = res as ColegioI[];
    });
  }

  getCompetencias() {
    this.AuthAdminService.loadAllAreaSubjects().subscribe(res => {
      this.areasMaterias = res as AreaMateriaI[];

      this.AuthAdminService.allCompetencias().subscribe(res => {
        this.AuthAdminService.Competencias = res as CompetenciaI[];
        this.competenciasVisualizar = res as CompetenciaVisualizarI[];
  
        for (let i = 0; i < this.AuthAdminService.Competencias.length; i++) {
          for (let n = 0; n < this.areasMaterias.length; n++) {
            if (this.AuthAdminService.Competencias[i].id_areaMateria == this.areasMaterias[n].id_areaMateria) {
              this.competenciasVisualizar[i].areaMateria = this.areasMaterias[n].nombre_areaMateria;
            }
          }
        }
        //console.log("actividades visualizar:", this.competenciasVisualizar)
      });
    });
  }

  //Crear Competencia en Mongo
  crearCompetencia(form: NgForm): void {
    this.correcto1 = false;
    this.error1 = false;
    this.subiendo = true;

    this.AuthAdminService.allCompetencias().subscribe(res => {
      this.AuthAdminService.Competencias = res as CompetenciaI[];

      //crear Cont
      if (this.AuthAdminService.Competencias.length == 0) {
        this.newCont = 1;
      }
      else {
        if (this.AuthAdminService.Competencias.length) {
          this.newCont = 1;
        }
        for (let n = 0; n < this.AuthAdminService.Competencias.length; n++) {
          for (let i = 0; i < this.AuthAdminService.Competencias.length; i++) {
            if(this.AuthAdminService.Competencias[i].id_colegio == form.value.id_colegioC){
              if (n + 1 == this.AuthAdminService.Competencias[i].cont) {
                this.newCont = n + 2;
                this.temp = 0;
                i = this.AuthAdminService.Competencias.length;
              }
              else {
                this.newCont = n + 1;
                this.temp = 1;
              }
            }
          }
          if (this.temp == 1) {
            n = this.AuthAdminService.Competencias.length + 1;
          }
        }
      }

      // ID Competencia
      var idGlobal = ""+form.value.id_colegioC+this.newCont;
      this.newID = parseInt(idGlobal);

      const newCompetencia = {
        id_competencia: this.newID,
        cont: this.newCont,
        id_colegio: form.value.id_colegioC,
        nombre_competencia: form.value.nombre_competencia,
        id_areaMateria: form.value.id_areaMateria,
        gradoInicial: form.value.gradoInicial,
        gradoFinal: form.value.gradoFinal
      }
      //console.log('datos NewCompetencia', newCompetencia);
    
      this.AuthAdminService.createCompetencia(newCompetencia).subscribe(res => {
        //console.log(res);
        this.temp2 = res;

        if(this.temp2.Estado == "Error Crear Competencia"){
          this.correcto1 = false;
          this.error1 = true;
          this.subiendo = false;
        } else {
          this.correcto1 = true;
          this.error1 = false;
          this.subiendo = false;
          this.resetForm(form);
          this.getCompetencias();
        }
      });
    });
  }

  //Crear AreaMateria en Mongo
  CrearAreaMateria(form: NgForm): void {
    this.correcto2 = false;
    this.error2 = false;
    this.subiendo = true;

    this.AuthAdminService.loadAllAreaSubjects().subscribe(res => {
      this.AuthAdminService.AreasMaterias = res as AreaMateriaI[];

      //crear Cont
      if (this.AuthAdminService.AreasMaterias.length == 0) {
        this.newCont = 1;
      }
      else {
        if (this.AuthAdminService.AreasMaterias.length) {
          this.newCont = 1;
        }
        for (let n = 0; n < this.AuthAdminService.AreasMaterias.length; n++) {
          for (let i = 0; i < this.AuthAdminService.AreasMaterias.length; i++) {
            if(this.AuthAdminService.AreasMaterias[i].id_colegio == form.value.id_colegioAM){
              if (n + 1 == this.AuthAdminService.AreasMaterias[i].cont) {
                this.newCont = n + 2;
                this.temp = 0;
                i = this.AuthAdminService.AreasMaterias.length;
              }
              else {
                this.newCont = n + 1;
                this.temp = 1;
              }
            }
          }
          if (this.temp == 1) {
            n = this.AuthAdminService.AreasMaterias.length + 1;
          }
        }
      }

      // ID AreaMateria
      var idGlobal = ""+form.value.id_colegioAM+this.newCont;
      this.newID = parseInt(idGlobal);

      const newAreaMateria = {
        id_areaMateria: this.newID,
        cont: this.newCont,
        id_colegio: form.value.id_colegioAM,
        nombre_areaMateria: form.value.nombre_areaMateria
      }
      //console.log('datos NewArea', newAreaMateria);
    
      this.AuthAdminService.createAreaSubject(newAreaMateria).subscribe(res => {
        //console.log(res);
        this.temp2 = res;

        if(this.temp2.Estado == "Error Crear Area"){
          this.correcto2 = false;
          this.error2 = true;
          this.subiendo = false;
        } else {
          this.correcto2 = true;
          this.error2 = false;
          this.subiendo = false;
          this.getOptions();
          this.resetForm(form);
        }
      });
    });
  }

  //Almacenar info temporal de una Competencia
  saveDataCompetencia(competenciahtml){
    this.competenciaToSave = competenciahtml;
    //console.log('actividad guardada:', this.competenciaToSave);
  }
  //Almacenar info temporal de una AreaMAteria
  saveDataAreaMateria(areaMateriahtml){
    this.areaMateriaToSave = areaMateriahtml
    //console.log('actividad guardada:', this.areaMateriaToSave);
  }

  //Eliminar Competencia de Mongo
  deleteCompetencia(){
    //console.log("id para eliminar:", this.competenciaToSave.id_competencia);
    this.AuthAdminService.deleteCompetencia(this.competenciaToSave).subscribe(res =>{
      //console.log(res);
      this.getCompetencias();
      this.competenciaToSave = new CompetenciaI();
    });
    //window.location.reload();
  }
  //Eliminar AreaMateria de Mongo
  deleteAreaMateria(){
    //console.log("id para eliminar:", this.areaMateriaToSave.id_areaMateria);
    this.AuthAdminService.deleteAreaSubject(this.areaMateriaToSave).subscribe(res =>{
      //console.log(res);
      this.AuthAdminService.loadAllAreaSubjects().subscribe(res => {
        this.areasMaterias = res as AreaMateriaI[];
        this.areaMateriaToSave = new AreaMateriaI();
      });
    });
    //window.location.reload();
  }

  //Resetear pagina
  resetPage(){
    window.location.reload();
  }

  //resetear Formulario
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.newID = 1;
      this.temp = 0;
    }
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
