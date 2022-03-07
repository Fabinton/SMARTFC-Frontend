import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ContentREAService } from '../../../services/content-rea.service';
import { contenidoREAI } from '../../../models/contenidoREA';
import { MateriaI } from '../../../models/materia';
import { GradoI } from '../../../models/grado';
import { TipoContenidoI } from '../../../models/tipoContenido';
import { contenidoREAVisualizarI } from '../../../models/contenidoREAVisualizar';
import { CompetenciaI } from '../../../models/competencia';
import { ActividadI } from '../../../models/actividad';
import { DocenteI } from '../../../models/docente';
import { ActividadVisualizaI } from '../../../models/actividadVisualizar';
import { ActividadService } from '../../../services/actividad.service';
import { AuthAdminService } from '../../../services/auth-admin.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-busqueda-visitante',
  templateUrl: './busqueda-visitante.component.html',
  styleUrls: ['./busqueda-visitante.component.css']
})
export class BusquedaVisitanteComponent implements OnInit {

  //Elementos de Busqueda de Contenido
  tallerToSave:contenidoREAI;
  contenidoToSave:contenidoREAI;
  contenidos:contenidoREAI[];
  materia:MateriaI[];
  grado:GradoI[];
  tipoContenido:TipoContenidoI[];
  materiaSelected:number;
  gradoSelected:number;
  docenteSelected:number;
  tipoContenidoSelected:number;
  contenidoVisualizar:contenidoREAVisualizarI[];

  //Elementos de Busqueda de Actividad
  actividadToSave:ActividadI;
  actividad:ActividadI[];
  docente: DocenteI[];
  competencia:CompetenciaI[];
  gradoSelecteA:number;
  materiaSelectedA:number;
  docenteSelectedA:number;
  competenciaSelectedA:number;
  actividadVisualizar:ActividadVisualizaI[];

  contenidoRes:any;
  tallerRes:any;
  ID_TipoContenido_Taller:number;
  contenidoAct:contenidoREAVisualizarI;
  tallerAct:contenidoREAVisualizarI;

  IPServer:string;

  constructor(private ActividadService: ActividadService, private ContentREAService: ContentREAService, private router: Router, private AuthAdminService: AuthAdminService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.ID_TipoContenido_Taller = 5;
    this.IPServer = this.AuthAdminService.loadIPServer();

    this.getOptions();
    this.getContenidos();
    this.getActividades();
    this.contenidoAct = {nombre_CREA:"", cont:0, id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
    this.tallerAct = {nombre_CREA:"",cont:0, id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
  }

  //Obtener los datos de los Options
  getOptions(){
    this.ContentREAService.allSubject().subscribe(res =>{
      this.materia = res as MateriaI[];
    });
    this.ContentREAService.allGrade().subscribe(res =>{
      this.grado = res as GradoI[];
    });
    this.ContentREAService.allType().subscribe(res =>{
      this.tipoContenido = res as TipoContenidoI[];
    });
    this.ActividadService.allCompetencias().subscribe(res =>{
      this.competencia = res as CompetenciaI[];
    });
    this.ActividadService.allDocente().subscribe(res =>{
      this.docente = res as DocenteI[];
    });
  }

  //consultar todos los ContenidosREA y verificar el nombre de la materia y contenido con sus respectivos ID´s
  getContenidos() {
    this.ContentREAService.allSubject().subscribe(res => {
      this.materia = res as MateriaI[];

      this.ContentREAService.allType().subscribe(res => {
        this.tipoContenido = res as TipoContenidoI[];

        this.ContentREAService.allContent().subscribe(res => {
          //console.log(res);
          this.ContentREAService.contenidosREA = res as contenidoREAI[];
          this.contenidoVisualizar = res as contenidoREAVisualizarI[];
          this.contenidoVisualizar.reverse();
          //console.log(this.ContentREAService.contenidosREA.length);

          for (let i = 0; i < this.ContentREAService.contenidosREA.length; i++) {
            for (let n = 0; n < this.tipoContenido.length; n++) {
              if (this.ContentREAService.contenidosREA[i].tipo_CREA == this.tipoContenido[n].id_tipoContenido) {
                this.contenidoVisualizar[i].nombre_tipo_CREA = this.tipoContenido[n].nombre_tipoContenido;
              }
            }
            for (let m = 0; m < this.materia.length; m++) {
              if (this.ContentREAService.contenidosREA[i].id_materia == this.materia[m].id_materia) {
                this.contenidoVisualizar[i].materia = this.materia[m].nombre_materia;
              }
            }
          }
          //console.log("contenido visualizar final:", this.contenidoVisualizar)
        });
      });
    });
  }

  //consultar todos las Actividades y verificar el nombre de la materia, competencia y profesor con sus respectivos ID´s
  getActividades() {
    this.ActividadService.allCompetencias().subscribe(res => {
      this.competencia = res as CompetenciaI[];

      this.ActividadService.allDocente().subscribe(res => {
        this.docente = res as DocenteI[];

        this.ActividadService.allActivities().subscribe(res => {
          //console.log(res);
          this.ActividadService.actividades = res as ActividadI[];
          this.actividadVisualizar = res as ActividadVisualizaI[];
          this.actividadVisualizar.reverse();
          //console.log(this.ActividadService.actividades.length);

          for (let i = 0; i < this.ActividadService.actividades.length; i++) {
            this.actividadVisualizar[i].autor == this.ActividadService.actividades[i].autor;
            for (let n = 0; n < this.competencia.length; n++) {
              if (this.ActividadService.actividades[i].id_competencia == this.competencia[n].id_competencia) {
                this.actividadVisualizar[i].competencia = this.competencia[n].nombre_competencia;
              }
            }
            for (let m = 0; m < this.docente.length; m++) {
              if (this.ActividadService.actividades[i].id_docente == this.docente[m].id_docente) {
                this.actividadVisualizar[i].docente = (this.docente[m].nombre_docente + " " + this.docente[m].apellido_docente);
              }
            }
            for (let p = 0; p < this.materia.length; p++) {
              if (this.ActividadService.actividades[i].id_materia == this.materia[p].id_materia) {
                this.actividadVisualizar[i].materia = this.materia[p].nombre_materia;
              }
            }
          }
          //console.log("actividades visualizar:", this.actividadVisualizar)
        });
      });
    });
  }

  //Imprimir datos de la Actividad seleccionanda en el Modal 
  getActividadinModal(actividad: ActividadI) {
    this.ActividadService.selectedActividad = actividad;
    this.saveDataActivity(actividad);
    //console.log(this.ContentREAService.contenidosREA);
    const TallerInfo = {
      id_contenidoREA: this.ActividadService.selectedActividad.id_taller,
    }

    //Obtener contenido original de la actividad
    this.ContentREAService.loadContentREA(this.ActividadService.selectedActividad).subscribe(res =>{
      this.contenidoRes = res;
      this.contenidoAct.nombre_CREA = this.contenidoRes.content.nombre_CREA;
      this.contenidoAct.descripcion_CREA = this.contenidoRes.content.descripcion_CREA;
      this.contenidoAct.id_grado = this.contenidoRes.content.id_grado;

      for(let x=0; x < this.materia.length ;x++){
        if(this.contenidoRes.content.id_materia == this.materia[x].id_materia){
          this.contenidoAct.materia = this.materia[x].nombre_materia;
        }
      }
      for(let y=0; y < this.tipoContenido.length ;y++){
        if(this.contenidoRes.content.tipo_CREA == this.tipoContenido[y].id_tipoContenido){
          this.contenidoAct.nombre_tipo_CREA = this.tipoContenido[y].nombre_tipoContenido;
        }
      }
      //console.log('contenidoAct', this.contenidoAct);
    })

    //Obtener taller original de la actividad
    this.ContentREAService.loadContentREA(TallerInfo).subscribe(res =>{
      this.tallerRes = res;
      this.tallerAct.nombre_CREA = this.tallerRes.content.nombre_CREA;
      this.tallerAct.descripcion_CREA = this.tallerRes.content.descripcion_CREA;
      this.tallerAct.id_grado = this.tallerRes.content.id_grado;

      for(let x=0; x < this.materia.length ;x++){
        if(this.tallerRes.content.id_materia == this.materia[x].id_materia){
          this.tallerAct.materia = this.materia[x].nombre_materia;
        }
      }
      for(let y=0; y < this.tipoContenido.length ;y++){
        if(this.tallerRes.content.tipo_CREA == this.tipoContenido[y].id_tipoContenido){
          this.tallerAct.nombre_tipo_CREA = this.tipoContenido[y].nombre_tipoContenido;
        }
      }
      //console.log('contenidoAct', this.contenidoAct);
    })
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

  //Almacenar info temporal de un ContenidoREA
  saveDataContent(contenidoREAhtml){
    this.contenidoToSave = contenidoREAhtml;
    //console.log("contenido guardado:", this.contenidoToSave);
  }
  //Almacenar info temporal de una Actividad
  saveDataActivity(actividadhtml){
    this.actividadToSave = actividadhtml;
    //console.log("actividad guardada:", this.actividadToSave);
  }
  //Almacenar info temporal de un Taller
  saveDataTaller(tallerhtml){
    this.tallerToSave = tallerhtml;
    //console.log("taller guardado:", this.tallerToSave);
  }


}
