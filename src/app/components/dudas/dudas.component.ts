import { GradoI } from '../../models/grado';
import { AuthDService } from '../../services/auth-d.service';
import { MateriaI } from '../../models/materia';
import { ActividadI } from '../../models/actividad';
import { EstuadianteI } from '../../models/estudiante';
import { DudaI } from '../../models/duda';
import { DudaVisualizarI } from '../../models/dudaVisualizar';
import { ActividadService } from '../../services/actividad.service';
import { contenidoREAVisualizarI } from '../../models/contenidoREAVisualizar';
import { contenidoREAI } from '../../models/contenidoREA';
import { ContentREAService } from '../../services/content-rea.service';
import { TipoContenidoI } from '../../models/tipoContenido';
import { AuthAdminService } from '../../services/auth-admin.service';
import { ActividadVisualizaI } from '../../models/actividadVisualizar';
import { CompetenciaI } from '../../models/competencia';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dudas',
  templateUrl: './dudas.component.html',
  styleUrls: ['./dudas.component.css']
})
export class DudasComponent implements OnInit {

  materias:MateriaI[];
  grados:GradoI[];
  tipoContenidos:TipoContenidoI[];
  actividades:ActividadI[];
  estudiantes:EstuadianteI[];
  dudas:DudaI[];
  dudasVisualizar:DudaVisualizarI[];
  competencias:CompetenciaI[];
  dudaToSave:DudaI;
  actividadToSave:ActividadI;
  actividadVisualizar:ActividadVisualizaI;
  id_docenteAuth:number;
  SinROption:number;
  ROption:number;
  correcto1:boolean;
  correcto2:boolean;
  error1:boolean;
  error2:boolean;

  contenidoRes:any;
  tallerRes:any;
  ID_TipoContenido_Taller:number;
  contenidoAct:contenidoREAVisualizarI;
  tallerAct:contenidoREAVisualizarI;
  activityRes:any

  IPServer:string;
  nombre_docenteAuth:string;

  constructor(private router: Router, private AuthDService: AuthDService, private ActividadService: ActividadService, private ContentREAService: ContentREAService, private AuthAdminService: AuthAdminService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();
    
    this.correcto1 = false;
    this.correcto2 = false;
    this.error1 = false;
    this.error2 = false;
    this.SinROption = 0;
    this.ROption = 1;

    this.nombre_docenteAuth = this.AuthDService.getnombreApellidoDocente();
    this.IPServer = this.AuthAdminService.loadIPServer();
    this.id_docenteAuth = this.AuthDService.getIdDocente();
    this.getOptions();
    this.actividadVisualizar = {id_actividad:0,cont:0,titulo_actividad:"",descripcion_actividad:"",materia:"",id_grado:0,competencia:"",docente:"",autor:""}
    this.dudaToSave = {id_duda:0,id_actividad:0,id_estudiante:0,pregunta:"",respuesta:"",estado_duda:0}
    this.contenidoAct = {nombre_CREA:"", cont:0, id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
    this.tallerAct = {nombre_CREA:"",cont:0, id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
  }

  getOptions(){
    this.AuthDService.allGrade().subscribe(res => {
      this.grados = res as GradoI[];
    });
    this.ContentREAService.allType().subscribe(res =>{
      this.tipoContenidos = res as TipoContenidoI[];
    });
    this.ActividadService.allCompetencias().subscribe(res =>{
      this.competencias = res as CompetenciaI[];
    });
    
    this.AuthDService.loadAllEstudiantes().subscribe(res => {
      this.estudiantes = res as EstuadianteI[];

      this.AuthDService.allSubject().subscribe(res => {
        this.materias = res as MateriaI[];
      
        this.AuthDService.allActivities().subscribe(res => {
          this.actividades = res as ActividadI[];
        
          this.AuthDService.loadAllDudas().subscribe(res => {
            this.AuthDService.Dudas = res as DudaI[];
            this.dudasVisualizar = res as DudaVisualizarI[];
            this.dudasVisualizar.reverse();
          
            for (let i = 0; i < this.AuthDService.Dudas.length; i++) {
              for (let n = 0; n < this.estudiantes.length; n++) {
                if (this.AuthDService.Dudas[i].id_estudiante == this.estudiantes[n].id_estudiante) {
                  this.dudasVisualizar[i].estudiante = this.estudiantes[n].nombre_estudiante+" "+this.estudiantes[n].apellido_estudiante;
                  n = this.estudiantes.length;
                }
              }
              for (let s = 0; s < this.actividades.length; s++) {
                if (this.AuthDService.Dudas[i].id_actividad == this.actividades[s].id_actividad) {
                  for(let o = 0; o < this.materias.length; o++){
                    if(this.actividades[s].id_materia == this.materias[o].id_materia){
                      this.dudasVisualizar[i].materia = this.materias[o].nombre_materia;
                      this.dudasVisualizar[i].id_materia = this.materias[o].id_materia;
                    }
                  }
                  this.dudasVisualizar[i].nombre_actividad = this.actividades[s].titulo_actividad;
                  this.dudasVisualizar[i].id_grado = this.actividades[s].id_grado;
                  this.dudasVisualizar[i].id_docente = this.actividades[s].id_docente;
                  s = this.actividades.length;
                }
              }
            }
            //console.log('prueba',this.dudasVisualizar);
          });
        });
      });
    });
  }

  // Ocultar Dudas Resueltas
  ocultarDuda(){
    const estadoDuda = {
      id_duda: this.dudaToSave.id_duda,
      estado_duda: 2
    }
    this.AuthDService.uploadEstadoDuda(estadoDuda).subscribe(res => {
      //console.log(res);
      this.getOptions();
    });
  }

  // Actualizar la Duda con la respuesta y estado de la duda
  responderPregunta(form:NgForm){
    const respuestaDuda = {
      id_duda: this.dudaToSave.id_duda,
      respuesta: form.value.respuesta,
      estado_duda: 1
    }
    this.AuthDService.uploadRespuestaDuda(respuestaDuda).subscribe(res => {
      //console.log(res);
      this.getOptions();
    });
  }

  //Imprimir datos de la Actividad seleccionanda en el Modal 
  getActividadinModal() {
    const IdActividad = {
      id_actividad: this.dudaToSave.id_actividad
    }

    this.ActividadService.loadActivity(IdActividad).subscribe(res => {
      //console.log('res', res);
      this.activityRes = res;
      this.ActividadService.selectedActividad = this.activityRes.activity;
      this.actividadVisualizar = this.activityRes.activity;
      //console.log('prueba', this.ActividadService.selectedActividad);

      for (let n = 0; n < this.competencias.length; n++) {
        if (this.ActividadService.selectedActividad.id_competencia == this.competencias[n].id_competencia) {
          this.actividadVisualizar.competencia = this.competencias[n].nombre_competencia;
        }
      }
      for (let m = 0; m < this.materias.length; m++) {
        if (this.ActividadService.selectedActividad.id_materia == this.materias[m].id_materia) {
          this.actividadVisualizar.materia = this.materias[m].nombre_materia;
        }
      }
      this.actividadVisualizar.docente = this.nombre_docenteAuth;

      const TallerInfo = {
        id_contenidoREA: this.ActividadService.selectedActividad.id_taller,
      }

      //Obtener contenido original de la actividad
      this.ContentREAService.loadContentREA(this.ActividadService.selectedActividad).subscribe(res => {
        this.contenidoRes = res;
        this.contenidoAct.nombre_CREA = this.contenidoRes.content.nombre_CREA;
        this.contenidoAct.descripcion_CREA = this.contenidoRes.content.descripcion_CREA;
        this.contenidoAct.id_grado = this.contenidoRes.content.id_grado;

        for (let x = 0; x < this.materias.length; x++) {
          if (this.contenidoRes.content.id_materia == this.materias[x].id_materia) {
            this.contenidoAct.materia = this.materias[x].nombre_materia;
          }
        }
        for (let y = 0; y < this.tipoContenidos.length; y++) {
          if (this.contenidoRes.content.tipo_CREA == this.tipoContenidos[y].id_tipoContenido) {
            this.contenidoAct.nombre_tipo_CREA = this.tipoContenidos[y].nombre_tipoContenido;
          }
        }
        //console.log('contenidoAct', this.contenidoAct);
      });

      //Obtener taller original de la actividad
      this.ContentREAService.loadContentREA(TallerInfo).subscribe(res => {
        this.tallerRes = res;
        this.tallerAct.nombre_CREA = this.tallerRes.content.nombre_CREA;
        this.tallerAct.descripcion_CREA = this.tallerRes.content.descripcion_CREA;
        this.tallerAct.id_grado = this.tallerRes.content.id_grado;

        for (let x = 0; x < this.materias.length; x++) {
          if (this.tallerRes.content.id_materia == this.materias[x].id_materia) {
            this.tallerAct.materia = this.materias[x].nombre_materia;
          }
        }
        for (let y = 0; y < this.tipoContenidos.length; y++) {
          if (this.tallerRes.content.tipo_CREA == this.tipoContenidos[y].id_tipoContenido) {
            this.tallerAct.nombre_tipo_CREA = this.tipoContenidos[y].nombre_tipoContenido;
          }
        }
        //console.log('contenidoAct', this.contenidoAct);
      });
    });
  }

  //Abrir nueva ventana con el contenido Buscado
  verContenido(contenidoREAhtml){
    const urlcut = contenidoREAhtml.urlrepositorio.substring(41);
    const urlLoad = 'http://'+this.IPServer+':3000/repositorio/'+urlcut;
    //console.log('urlload', urlLoad);
    window.open(urlLoad, "_blank");
  }

  //Abrir nueva ventana con el Contenido de la actividad Buscada
  verContenidoActividad(){
    const urlcut = this.contenidoRes.content.urlrepositorio.substring(41);
    const urlLoad = 'http://'+this.IPServer+':3000/repositorio/'+urlcut;
    //console.log('urlload', urlLoad);
    window.open(urlLoad, "_blank");
  }

  //Abrir nueva ventana con el Taller de la actividad Buscada
  verTallerActividad(){
    const urlcut = this.tallerRes.content.urlrepositorio.substring(41);
    const urlLoad = 'http://'+this.IPServer+':3000/repositorio/'+urlcut;
    //console.log('urlload', urlLoad);
    window.open(urlLoad, "_blank");
  }


  //Almacenar info temporal de una Actividad
  saveDataActivity(actividadhtml){
    this.actividadToSave = actividadhtml;
    //console.log("actividad guardada:", this.actividadToSave);
  }
  //Almacenar info temporal de una Duda
  saveDataDuda(dudahtml){
    this.dudaToSave = dudahtml;
    //console.log('duda guardada:', this.dudaToSave);
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
