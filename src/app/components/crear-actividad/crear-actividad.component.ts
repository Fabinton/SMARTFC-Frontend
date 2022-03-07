import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ContentREAService } from '../../services/content-rea.service';
import { contenidoREAI } from '../../models/contenidoREA';
import { MateriaI } from '../../models/materia';
import { GradoI } from '../../models/grado';
import { TipoContenidoI } from '../../models/tipoContenido';
import { contenidoREAVisualizarI } from '../../models/contenidoREAVisualizar';
import { CompetenciaI } from '../../models/competencia';
import { ActividadI } from '../../models/actividad';
import { DocenteI } from '../../models/docente';
import { ActividadService } from '../../services/actividad.service';
import { AuthDService } from '../../services/auth-d.service';
import { MateriaActivaI } from '../../models/materiaActiva';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent implements OnInit {

  //Elementos de Busqueda de Contenido
  contenidoToSave:contenidoREAI;
  tallerToSave:contenidoREAI;
  contenidos:contenidoREAI[];
  materia:MateriaI[];
  grado:GradoI[];
  materiaActiva:MateriaActivaI[];
  tipoContenido:TipoContenidoI[];
  materiaSelected:number;
  gradoSelected:number;
  docenteSelected:number;
  tipoContenidoSelected:number;
  contenidoVisualizar:contenidoREAVisualizarI[];

  //Elementos de Creacion de Actividad
  actividadToSave:ActividadI;
  actividad:ActividadI[];
  docente: DocenteI[];
  docenteAuth: DocenteI;
  competencia:CompetenciaI[];
  gradoSelectedA:number;
  miMateriaSelectedA:number;
  materiaSelectedA:number;
  docenteSelectedA:number;
  competenciaSelectedA:number;
  respuestaCorrectaSelected:number;
  newCont:number;
  newID: number;
  temp: number;

  id_docenteAuth:number;
  id_colegioAuth:number;
  videoOpt:number;
  urlvideoOpt:string;
  documentoOpt:number;
  urldocumentoOpt:string;
  audioOpt:number;
  urlaudioOpt:string;
  htmlOpt:number;
  urlhtmlOpt:string;
  respuestaCorrectaTSelected1:number;
  respuestaCorrectaTSelected2:number;
  respuestaCorrectaTSelected3:number;
  ID_TipoContenido_Taller:number;
  correcto:boolean;
  error:boolean;
  error2:boolean;
  subiendo:boolean;
  temp2:any;
  tallerVerificacion:boolean;
  contenidoVerificacion:boolean;

  constructor(private AuthDService: AuthDService, private ActividadService: ActividadService, private ContentREAService: ContentREAService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();
    this.ID_TipoContenido_Taller = 5;
    this.correcto = false;
    this.error = false;
    this.error2 = false;
    this.subiendo = false;

    this.id_docenteAuth = this.AuthDService.getIdDocente();
    this.id_colegioAuth = this.AuthDService.getIdColegioDocente();
    //console.log('prueba', this.id_docenteAuth, this.id_colegioAuth);
    this.getOptions();
    this.getContenidos();
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
    this.AuthDService.loadAllSubjectActives().subscribe(res =>{
      this.materiaActiva = res as MateriaActivaI[];
    });

    this.id_docenteAuth = this.AuthDService.getIdDocente();

    const infoDocente = {
      id_docente: this.id_docenteAuth
    }

    this.AuthDService.loadDocente(infoDocente).subscribe(res =>{
      this.docenteAuth = res as DocenteI;
      //console.log('prueba2', infoDocente)
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

  //Consultar todas las actividades en Mongo
  getActividades(){
    this.ActividadService.allActivities().subscribe(res =>{
      //console.log(res);
      this.ActividadService.actividades = res as ActividadI[];
    });
  }

  //Crear Actividad en Mongo
  onCrearActividad(form: NgForm): void {
    this.correcto = false;
    this.error = false;
    this.error2 = true;
    this.subiendo = false;

    if (this.tallerVerificacion == true && this.contenidoVerificacion == true) {
      this.correcto = false;
      this.error = false;
      this.error2 = false;
      this.subiendo = true;

      this.ActividadService.allActivities().subscribe(res => {
        //console.log(res);
        this.ActividadService.actividades = res as ActividadI[];
        //console.log('Actividades', this.ActividadService.actividades);

        //Crear Cont
        if (this.ActividadService.actividades.length == 0) {
          this.newCont = 1;
        }
        else {
          if (this.ActividadService.actividades.length) {
            this.newCont = 1;
          }
          for (let n = 0; n < this.ActividadService.actividades.length; n++) {
            for (let i = 0; i < this.ActividadService.actividades.length; i++) {
              if (this.ActividadService.actividades[i].id_colegio == this.id_colegioAuth) {
                if (n + 1 == this.ActividadService.actividades[i].cont) {
                  this.newCont = n + 2;
                  this.temp = 0;
                  i = this.ActividadService.actividades.length;
                }
                else {
                  this.newCont = n + 1;
                  this.temp = 1;
                }
              }
            }
            if (this.temp == 1) {
              n = this.ActividadService.actividades.length + 1;
            }
          }
        }

        // ID Actividad
        var idGlobal = "" + this.id_colegioAuth + this.newCont;
        this.newID = parseInt(idGlobal);

        if (this.contenidoToSave.tipo_CREA == 1) {
          this.videoOpt = 1;
          this.urlvideoOpt = this.contenidoToSave.urlrepositorio;
          this.documentoOpt = 0;
          this.urldocumentoOpt = "no";
          this.audioOpt = 0;
          this.urlaudioOpt = "no";
          this.htmlOpt = 0;
          this.urlhtmlOpt = "no";
        }
        if (this.contenidoToSave.tipo_CREA == 2) {
          this.videoOpt = 0;
          this.urlvideoOpt = "no";
          this.documentoOpt = 1;
          this.urldocumentoOpt = this.contenidoToSave.urlrepositorio;
          this.audioOpt = 0;
          this.urlaudioOpt = "no";
          this.htmlOpt = 0;
          this.urlhtmlOpt = "no";
        }
        if (this.contenidoToSave.tipo_CREA == 3) {
          this.videoOpt = 0;
          this.urlvideoOpt = "no";
          this.documentoOpt = 0;
          this.urldocumentoOpt = "no";
          this.audioOpt = 1;
          this.urlaudioOpt = this.contenidoToSave.urlrepositorio;
          this.htmlOpt = 0;
          this.urlhtmlOpt = "no";
        }
        if (this.contenidoToSave.tipo_CREA == 4) {
          this.videoOpt = 0;
          this.urlvideoOpt = "no";
          this.documentoOpt = 0;
          this.urldocumentoOpt = "no";
          this.audioOpt = 0;
          this.urlaudioOpt = "no";
          this.htmlOpt = 1;
          this.urlhtmlOpt = this.contenidoToSave.urlrepositorio;
        }

        //console.log("prueba:", form.value.nombre_actividad);

        const newActividad = {
          //id_CREA: Math.floor((Math.random() * 100) + 1),
          id_actividad: this.newID,
          cont: this.newCont,
          id_colegio: this.id_colegioAuth,
          id_docente: this.id_docenteAuth,
          id_materia: this.materiaSelectedA,
          id_grado: this.gradoSelectedA,
          id_materiaActiva: this.miMateriaSelectedA,
          id_competencia: this.competenciaSelectedA,
          titulo_actividad: form.value.nombre_actividad,
          descripcion_actividad: form.value.descripcion_actividad,
          id_contenidoREA: this.contenidoToSave.id_CREA,
          video: this.videoOpt,
          urlvideo: this.urlvideoOpt,
          documento: this.documentoOpt,
          urldocumento: this.urldocumentoOpt,
          audio: this.audioOpt,
          urlaudio: this.urlaudioOpt,
          html: this.htmlOpt,
          urlhtml: this.urlhtmlOpt,
          id_taller: this.tallerToSave.id_CREA,
          taller: 0,
          urltaller: this.tallerToSave.urlrepositorio,
          descripcion_test: form.value.descripcion_quiz,
          Q1: form.value.preguntaQ1,
          A11: form.value.respuesta11,
          A12: form.value.respuesta12,
          A13: form.value.respuesta13,
          A14: form.value.respuesta14,
          CA1: this.respuestaCorrectaTSelected1,
          Q2: form.value.preguntaQ2,
          A21: form.value.respuesta21,
          A22: form.value.respuesta22,
          A23: form.value.respuesta23,
          A24: form.value.respuesta24,
          CA2: this.respuestaCorrectaTSelected2,
          Q3: form.value.preguntaQ3,
          A31: form.value.respuesta31,
          A32: form.value.respuesta32,
          A33: form.value.respuesta33,
          A34: form.value.respuesta34,
          CA3: this.respuestaCorrectaTSelected3,
          evaluacion: 0,
          descripcion_evaluacion: form.value.descripcion_evaluacion,
          EQ1: form.value.preguntaQ1E,
          EA11: form.value.respuesta11E,
          EA12: form.value.respuesta12E,
          EA13: form.value.respuesta13E,
          EA14: form.value.respuesta14E,
          ECA1: form.value.respuestaCorrectaESelected1,
          EQ2: form.value.preguntaQ2E,
          EA21: form.value.respuesta21E,
          EA22: form.value.respuesta22E,
          EA23: form.value.respuesta23E,
          EA24: form.value.respuesta24E,
          ECA2: form.value.respuestaCorrectaESelected2,
          EQ3: form.value.preguntaQ3E,
          EA31: form.value.respuesta31E,
          EA32: form.value.respuesta32E,
          EA33: form.value.respuesta33E,
          EA34: form.value.respuesta34E,
          ECA3: form.value.respuestaCorrectaESelected3,
          autor: this.AuthDService.getnombreApellidoDocente(),
          id_autor: this.id_docenteAuth
        }

        //console.log('datosActividad', newActividad);

        this.ActividadService.createActivity(newActividad).subscribe(res => {
          //console.log('res',res);
          this.temp2 = res;

          if (this.temp2.Estado == "Error Crear Actividad") {
            this.correcto = false;
            this.error = true;
            this.subiendo = false;
          } else {
            const contenidoREAInfo = {
              id_CREA: this.contenidoToSave.id_CREA,
              en_uso: (this.contenidoToSave.en_uso + 1)
            }
            const tallerInfo = {
              id_CREA: this.tallerToSave.id_CREA,
              en_uso: (this.tallerToSave.en_uso + 1)
            }

            this.ContentREAService.uploadEstadoContentREA(contenidoREAInfo).subscribe(res => {
              //console.log(res);
              this.ContentREAService.uploadEstadoContentREA(tallerInfo).subscribe(res => {
                //console.log(res);
                this.correcto = true;
                this.error = false;
                this.subiendo = false;
                this.resetForm(form);
              });
            });
          }
        });
      });
    }
  }

  //Almacenar info temporal de un Taller
  saveDataTaller(tallerhtml){
    this.tallerToSave = tallerhtml;
    this.tallerVerificacion = true;
    //console.log("taller guardado:", this.tallerToSave);
  }

  //Almacenar info temporal de un ContenidoREA
  saveDataContent(contenidoREAhtml){
    this.contenidoToSave = contenidoREAhtml;
    this.contenidoVerificacion = true;
    //console.log("contenido guardado:", this.contenidoToSave);
  }

  //Resetear pagina
  resetPage(){
    window.location.reload();
  }

  //resetear Formulario
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      window.scrollTo(0, 0);
      this.temp = 0;
    }
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
