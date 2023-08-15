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
import { ActividadVisualizaI } from '../../models/actividadVisualizar';
import { ActividadService } from '../../services/actividad.service';
import { AuthDService } from '../../services/auth-d.service';
import { NgForm } from '@angular/forms';
import { MateriaActivaI } from '../../models/materiaActiva';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-modificar-actividad',
  templateUrl: './modificar-actividad.component.html',
  styleUrls: ['./modificar-actividad.component.css']
})
export class ModificarActividadComponent implements OnInit {

  //Elementos de Busqueda de Contenido
  contenidoToSave:contenidoREAI;
  tallerToSave:contenidoREAI;
  retroToSave:contenidoREAI;
  contenidos:contenidoREAI[];
  materia:MateriaI[];
  grado:GradoI[];
  materiaActiva:MateriaActivaI[];
  tipoContenido:TipoContenidoI[];
  materiaSelected:number;
  gradoSelected:number;
  tipoContenidoSelected:number;
  contenidoVisualizar:contenidoREAVisualizarI[];

  //Elementos de Busqueda de Actividad
  actividadToSave:ActividadI;
  actividadToSave2:ActividadI;
  actividad:ActividadI[];
  docente:DocenteI[];
  competencia:CompetenciaI[];
  gradoSelecteA:number;
  gradoSelecteAM:number;
  miMateriaSelectedA:number;
  materiaSelectedA:number;
  materiaSelectedAM:number;
  docenteSelectedA:number;
  competenciaSelectedA:number;
  actividadVisualizar:ActividadVisualizaI[];
  newCont:number;
  newID:number;
  temp:number;

  id_docenteAuth:number;
  id_colegioAuth:number;
  contenidoAct:contenidoREAVisualizarI;
  tallerAct:contenidoREAVisualizarI;
  retroTallerAct:contenidoREAVisualizarI;
  verificationSaveContent:boolean;
  verificationSaveTaller:boolean;
  verificationSaveRetroTaller:boolean;
  verificationSaveActividad:boolean;
  ID_TipoContenido_Taller:number;
  id_docente_ActividadSelected:number;
  contenidoRes:any;
  tallerRes:any;
  retroTallerRes:any;

  correcto1:boolean;
  correcto2:boolean;
  error1:boolean;
  error2:boolean;
  subiendo:boolean;
  temp2:any;
  tallerActivado:boolean;
  evaluacionActivado:boolean;
  tallerDesactivado:boolean;
  evaluacionDesactivado:boolean;
  retroalimentacionActivado:boolean;
  retroalimentacionDesactivado:boolean;
  questionList:any[];
  headersQuestion:any[];
  //headersQuestionOptions:any[];
  questionOptionsList:any[];
  questionOptionsListCorrect:any[];

  clickorigin:boolean=false;
  sh:number =0;
  rowselected:number=-1;
  dictionary = ['A','B','C','D'];
  retroA:string;
  descripcion_Pregunta: string;

  constructor(private AuthDService: AuthDService, private ActividadService: ActividadService, private ContentREAService: ContentREAService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();
    
    this.ID_TipoContenido_Taller = 5;
    this.correcto1 = false;
    this.correcto2 = false;
    this.error1 = false;
    this.error2 = false;
    this.tallerActivado = false;
    this.evaluacionActivado = false;
    this.retroalimentacionActivado = false;
    this.tallerDesactivado = false;
    this.evaluacionDesactivado = false;
    this.retroalimentacionDesactivado = false;

    this.getOptions();
    this.getContenidos();
    this.getActividades();
    this.ActividadService.selectedActividad = new ActividadI();
    this.id_docenteAuth = this.AuthDService.getIdDocente() as number;
    this.id_colegioAuth = this.AuthDService.getIdColegioDocente();
    this.actividadToSave2 = new ActividadI();
    this.contenidoAct = {nombre_CREA:"",cont:0,id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
    this.tallerAct = {nombre_CREA:"",cont:0,id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
    this.retroTallerAct = {nombre_CREA:"",cont:0,id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
    this.verificationSaveContent = false;
    this.verificationSaveTaller = false;
    this.verificationSaveRetroTaller = false;
    this.verificationSaveActividad = false;
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

            if(this.actividadToSave2.id_actividad == this.actividadVisualizar[i].id_actividad){
              this.seccionActivity(this.actividadVisualizar[i]);
            }
          }
          //console.log("actividades visualizar final:", this.actividadVisualizar)
        });
      });
    });
  }

  //Modificar Actividad en Mongo
  onModificarActividad(form: NgForm){
    this.correcto1 = false;
    this.correcto2 = false;
    this.error1 = false;
    this.error2 = true;
    this.subiendo = false;

    //Verificar que han seleccionado una Actividad para modificar
    if (this.verificationSaveActividad == true) {
      this.error2 = false;
      this.subiendo = true;

      //cambiar informacion de contenido en la Actividad al identificar que se a seleccionado un nuevo contenido
      if (this.verificationSaveContent == true) {

        if (this.contenidoToSave.tipo_CREA == 1) {
          this.actividadToSave.video = 1;
          this.actividadToSave.urlvideo = this.contenidoToSave.urlrepositorio;
          this.actividadToSave.documento = 0;
          this.actividadToSave.urldocumento = "no";
          this.actividadToSave.audio = 0;
          this.actividadToSave.urlaudio = "no";
          this.actividadToSave.html = 0;
          this.actividadToSave.urlhtml = "no";
          this.actividadToSave.retroalimentacion = 0;
          this.actividadToSave.urlretrotaller = "no";
        }
        if (this.contenidoToSave.tipo_CREA == 2) {
          this.actividadToSave.video = 0;
          this.actividadToSave.urlvideo = "no";
          this.actividadToSave.documento = 1;
          this.actividadToSave.urldocumento = this.contenidoToSave.urlrepositorio;
          this.actividadToSave.audio = 0;
          this.actividadToSave.urlaudio = "no";
          this.actividadToSave.html = 0;
          this.actividadToSave.urlhtml = "no";
          this.actividadToSave.retroalimentacion = 0;
          this.actividadToSave.urlretrotaller = "no";
        }
        if (this.contenidoToSave.tipo_CREA == 3) {
          this.actividadToSave.video = 0;
          this.actividadToSave.urlvideo = "no";
          this.actividadToSave.documento = 0;
          this.actividadToSave.urldocumento = "no";
          this.actividadToSave.audio = 1;
          this.actividadToSave.urlaudio = this.contenidoToSave.urlrepositorio;
          this.actividadToSave.html = 0;
          this.actividadToSave.urlhtml = "no";
          this.actividadToSave.retroalimentacion = 0;
          this.actividadToSave.urlretrotaller = "no";
        }
        if (this.contenidoToSave.tipo_CREA == 4) {
          this.actividadToSave.video = 0;
          this.actividadToSave.urlvideo = "no";
          this.actividadToSave.documento = 0;
          this.actividadToSave.urldocumento = "no";
          this.actividadToSave.audio = 0;
          this.actividadToSave.urlaudio = "no";
          this.actividadToSave.html = 1;
          this.actividadToSave.urlhtml = this.contenidoToSave.urlrepositorio;
          this.actividadToSave.retroalimentacion = 0;
          this.actividadToSave.urlretrotaller = "no";
        }

        if (this.contenidoToSave.tipo_CREA == 5) {
          this.actividadToSave.video = 0;
          this.actividadToSave.urlvideo = "no";
          this.actividadToSave.documento = 0;
          this.actividadToSave.urldocumento = "no";
          this.actividadToSave.audio = 0;
          this.actividadToSave.urlaudio = "no";
          this.actividadToSave.html = 0;
          this.actividadToSave.urlhtml = "no";
          this.actividadToSave.retroalimentacion = 1;
          this.actividadToSave.urlretrotaller = this.contenidoToSave.urlrepositorio;
        }

        this.actividadToSave.id_contenidoREA = this.contenidoToSave.id_CREA;
      }

      //cambiar informacion de taller en la Actividad al identificar que se a seleccionado un nuevo taller
      if (this.verificationSaveTaller == true) {
        this.actividadToSave.id_taller = this.tallerToSave.id_CREA;
        this.actividadToSave.taller = 1;
        this.actividadToSave.urltaller = this.tallerToSave.urlrepositorio;
      }

      //cambiar informacion de retrotaller en la Actividad al identificar que se a seleccionado un nuevo retrotaller
      if (this.verificationSaveRetroTaller == true) {
        this.actividadToSave.id_retrotaller = this.retroToSave.id_CREA;
        this.actividadToSave.retroalimentacion = 1;
        this.actividadToSave.urlretrotaller = this.retroToSave.urlrepositorio;
      }

      //Verificar si la Actividad es del docente que la esta modificando
      if (this.id_docenteAuth == this.id_docente_ActividadSelected) {

        this.actividadToSave.id_materia = form.value.id_materia;
        this.actividadToSave.id_grado = form.value.id_grado;
        this.actividadToSave.id_materiaActiva = form.value.id_materiaActiva;
        this.actividadToSave.id_competencia = form.value.id_competencia;
        this.actividadToSave.titulo_actividad = form.value.titulo_actividad;
        this.actividadToSave.descripcion_actividad = form.value.descripcion_actividad;
        this.actividadToSave.descripcion_test = form.value.descripcion_test;
        this.actividadToSave.Q1 = form.value.Q1;
        this.actividadToSave.A11 = form.value.A11;
        this.actividadToSave.A12 = form.value.A12;
        this.actividadToSave.A13 = form.value.A13;
        this.actividadToSave.A14 = form.value.A14;
        this.actividadToSave.CA1 = form.value.CA1;
        this.actividadToSave.RQ1 = form.value.retroA1;
        this.actividadToSave.Q2 = form.value.Q2;
        this.actividadToSave.A21 = form.value.A21;
        this.actividadToSave.A22 = form.value.A22;
        this.actividadToSave.A23 = form.value.A23;
        this.actividadToSave.A24 = form.value.A24;
        this.actividadToSave.CA2 = form.value.CA2;
        this.actividadToSave.RQ2 = form.value.retroA2;
        this.actividadToSave.Q3 = form.value.Q3;
        this.actividadToSave.A31 = form.value.A31;
        this.actividadToSave.A32 = form.value.A32;
        this.actividadToSave.A33 = form.value.A33;
        this.actividadToSave.A34 = form.value.A34;
        this.actividadToSave.CA3 = form.value.CA3;
        this.actividadToSave.RQ3 = form.value.retroA3;
        this.actividadToSave.descripcion_evaluacion = form.value.descripcion_evaluacion;
        this.actividadToSave.questions = this.questionList;
       
        //console.log('datosActividadModificada', this.actividadToSave);

        this.ActividadService.uploadActivity(this.actividadToSave).subscribe(res => {
          //window.location.reload();
          //console.log('prueba', this.actividadToSave);
          //console.log(res);
          if (this.verificationSaveContent == true) {
            const contenidoREAViejoInfo = {
              id_CREA: this.contenidoRes.content.id_CREA,
              en_uso: (this.contenidoRes.content.en_uso - 1)
            }
            const contenidoREANuevoInfo = {
              id_CREA: this.contenidoToSave.id_CREA,
              en_uso: (this.contenidoToSave.en_uso + 1)
            }
  
            this.ContentREAService.uploadEstadoContentREA(contenidoREANuevoInfo).subscribe(res => {
              //console.log('nuevo contenido', res);
              this.ContentREAService.uploadEstadoContentREA(contenidoREAViejoInfo).subscribe(res => {
                //console.log('viejo contenido', res);
              });
            });
          }

          if (this.verificationSaveTaller == true) {
            const tallerViejoInfo = {
              id_CREA: this.tallerRes.content.id_CREA,
              en_uso: (this.tallerRes.content.en_uso - 1)
            }
            const tallerNuevoInfo = {
              id_CREA: this.tallerToSave.id_CREA,
              en_uso: (this.tallerToSave.en_uso + 1)
            }
  
            this.ContentREAService.uploadEstadoContentREA(tallerNuevoInfo).subscribe(res => {
              //console.log('nuevo contenido', res);
              this.ContentREAService.uploadEstadoContentREA(tallerViejoInfo).subscribe(res => {
                //console.log('viejo contenido', res);
              });
            });
          }

          if (this.verificationSaveRetroTaller == true) {
            const retroTallerViejoInfo = {
              id_CREA: this.retroTallerRes.content.id_CREA,
              en_uso: (this.retroTallerRes.content.en_uso - 1)
            }
            const retroTallerNuevoInfo = {
              id_CREA: this.retroToSave.id_CREA,
              en_uso: (this.retroToSave.en_uso + 1)
            }
  
            this.ContentREAService.uploadEstadoContentREA(retroTallerNuevoInfo).subscribe(res => {
              //console.log('nuevo contenido', res);
              this.ContentREAService.uploadEstadoContentREA(retroTallerViejoInfo).subscribe(res => {
                //console.log('viejo contenido', res);
              });
            });
          }

          this.correcto1 = true;
          this.correcto2 = false;
          this.error1 = false;
          this.error2 = false;
          this.subiendo = false;
          this.resetForm(form);
        })
      }
      else {

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

          this.actividadToSave.id_actividad = this.newID;
          this.actividadToSave.cont = this.newCont;
          this.actividadToSave.id_docente = this.id_docenteAuth;
          this.actividadToSave.id_colegio = this.id_colegioAuth;
          this.actividadToSave.id_materia = form.value.id_materia;
          this.actividadToSave.id_grado = form.value.id_grado;
          this.actividadToSave.id_materiaActiva = form.value.id_materiaActiva;
          this.actividadToSave.id_competencia = form.value.id_competencia;
          this.actividadToSave.titulo_actividad = form.value.titulo_actividad;
          this.actividadToSave.descripcion_actividad = form.value.descripcion_actividad;
          this.actividadToSave.descripcion_test = form.value.descripcion_test;
          this.actividadToSave.taller = 0;
          this.actividadToSave.retroalimentacion = 0;
          this.actividadToSave.Q1 = form.value.Q1;
          this.actividadToSave.A11 = form.value.A11;
          this.actividadToSave.A12 = form.value.A12;
          this.actividadToSave.A13 = form.value.A13;
          this.actividadToSave.A14 = form.value.A14;
          this.actividadToSave.CA1 = form.value.CA1;
          this.actividadToSave.RQ1 = form.value.retroA1;
          this.actividadToSave.Q2 = form.value.Q2;
          this.actividadToSave.A21 = form.value.A21;
          this.actividadToSave.A22 = form.value.A22;
          this.actividadToSave.A23 = form.value.A23;
          this.actividadToSave.A24 = form.value.A24;
          this.actividadToSave.CA2 = form.value.CA2;
          this.actividadToSave.RQ2 = form.value.retroA2;
          this.actividadToSave.Q3 = form.value.Q3;
          this.actividadToSave.A31 = form.value.A31;
          this.actividadToSave.A32 = form.value.A32;
          this.actividadToSave.A33 = form.value.A33;
          this.actividadToSave.A34 = form.value.A34;
          this.actividadToSave.CA3 = form.value.CA3;
          this.actividadToSave.RQ3 = form.value.retroA3;
          this.actividadToSave.evaluacion = 0;
          this.actividadToSave.descripcion_evaluacion = form.value.descripcion_evaluacion;
          this.actividadToSave.questions=this.questionList;
          //console.log('datosActividadModificada', this.actividadToSave);

          this.ActividadService.createActivity(this.actividadToSave).subscribe(res => {
            //window.location.reload();
            //console.log("Creada nueva Actividad");
            //console.log(res);
            this.temp2 = res;
            
            if(this.temp2.Estado == "Error Crear Actividad"){
              this.correcto1 = false;
              this.correcto2 = false;
              this.error1 = true;
              this.error2 = false;
              this.subiendo = false;
            } else {
              if (this.verificationSaveContent == true) {
                const contenidoREANuevoInfo = {
                  id_CREA: this.contenidoToSave.id_CREA,
                  en_uso: (this.contenidoToSave.en_uso + 1)
                }

                this.ContentREAService.uploadEstadoContentREA(contenidoREANuevoInfo).subscribe(res => {
                  //console.log('nuevo contenido', res);
                });
              }
              else {
                const contenidoREAViejoInfo = {
                  id_CREA: this.contenidoRes.content.id_CREA,
                  en_uso: (this.contenidoRes.content.en_uso + 1)
                }

                this.ContentREAService.uploadEstadoContentREA(contenidoREAViejoInfo).subscribe(res => {
                  //console.log('viejo contenido', res);
                });
              }

              if (this.verificationSaveTaller == true) {
                const tallerNuevoInfo = {
                  id_CREA: this.tallerToSave.id_CREA,
                  en_uso: (this.tallerToSave.en_uso + 1)
                }

                this.ContentREAService.uploadEstadoContentREA(tallerNuevoInfo).subscribe(res => {
                  //console.log('nuevo contenido', res);
                });
              }
              else {
                const tallerViejoInfo = {
                  id_CREA: this.tallerRes.content.id_CREA,
                  en_uso: (this.tallerRes.content.en_uso + 1)
                }

                this.ContentREAService.uploadEstadoContentREA(tallerViejoInfo).subscribe(res => {
                  //console.log('viejo contenido', res);
                });
              }

              if (this.verificationSaveRetroTaller == true) {
                const retroTallerNuevoInfo = {
                  id_CREA: this.retroToSave.id_CREA,
                  en_uso: (this.retroToSave.en_uso + 1)
                }

                this.ContentREAService.uploadEstadoContentREA(retroTallerNuevoInfo).subscribe(res => {
                  //console.log('nuevo contenido', res);
                });
              }
              else {
                const retroTallerViejoInfo = {
                  id_CREA: this.retroTallerRes.content.id_CREA,
                  en_uso: (this.retroTallerRes.content.en_uso + 1)
                }

                this.ContentREAService.uploadEstadoContentREA(retroTallerViejoInfo).subscribe(res => {
                  //console.log('viejo contenido', res);
                });
              }

              this.correcto1 = false;
              this.correcto2 = true;
              this.error1 = false;
              this.error2 = false;
              this.subiendo = false;
              this.resetForm(form);
            }
          });
        });
      }
    }
    else{
      this.resetForm(form);
    }
  }

  //metodo para arreglar
  resetListQuestionsOptions() {
    const letters = ["A", "B", "C", "D"];
    for (let index = 0; index < this.questionOptionsList.length; index++) {
      const element = this.questionOptionsList[index];
      element.id = letters[index]; // Usar las letras en lugar del índice
      this.questionOptionsListCorrect.push({ id: element.id, value: element.question });
    }
  }
  
  getQuetions(){
    this.questionList
  }

  onCrearRespuesta(form: NgForm) {
    let value = this.dictionary[this.questionOptionsList.length];
    let nextItem = this.questionOptionsList.length;
    if(form.value.respuesta11E.length > 0 && this.questionOptionsList.length < 4) {
      this.questionOptionsListCorrect.push({id: this.questionOptionsListCorrect.length, value: value});
      let jona = {id: value, question: form.value.respuesta11E};
      this.questionOptionsList.push(jona);
      form.controls['respuesta11E'].setValue('');
    }
  }

  onCrearAgregarP(form: NgForm) {
    this.clickorigin = false;
    if (form.valid) {
      let nextItem = this.questionList.length + 1;
      let jona = { id: nextItem, question: form.value.descripcion_Pregunta, type: form.value.sh, options: null, correct: null, retro: null };
  
      if (form.value.sh == 0) {
        jona.options = this.questionOptionsList;
        jona.correct = form.value.respuestaCorrectaESelected1; // Asignar la letra de la opción seleccionada
        jona.retro = form.value.retro;
      }
      this.questionList.push(jona);
      this.getQuetions();
      document.getElementById("closeModal").click();
    } else {
      // Faltan campos
    }
  }
  
  onEditP(form: NgForm) {
    if (form.valid) {
      let updatetest = this.questionList.find((x) => x.id === this.rowselected);
      if (updatetest) {
        updatetest = {
          id: this.rowselected,
          question: form.value.descripcion_Pregunta,
          type: form.value.sh,
          options: null,
          correct: null,
          retro: null,
        };
        this.questionList[this.rowselected - 1] = updatetest;
        this.resetListQuestionsOptions();

         //  let nextItem = this.questionList.length + 1;
      //  let jona = {id: nextItem, question: form.value.descripcion_Pregunta, type: form.value.sh, options: null, correct: null};
  
        if (form.value.sh == 0) {
          updatetest.options = this.questionOptionsList;
          updatetest.correct = form.value.respuestaCorrectaESelected1; // Asignar el valor correspondiente del formulario
          updatetest.retro = form.value.retro;
        }
  
        this.getQuetions();
        console.log(this.questionList);
        document.getElementById("closeModal").click();
        this.clickorigin = false;
      } else {
        console.log("");
      }
    } else {
      console.log("El formulario no es válido.");
    }
  }

  deleteQuestion(row) {
    for (let index = 0; index < this.questionList.length; index++) {
      const element = this.questionList[index];
      if(element.id == row.id) {
        this.questionList.splice(index,1);
      }
    }
    for (let index = 0; index < this.questionList.length; index++) {
      const element = this.questionList[index];
      element.id = index + 1;
    }
  }

  deleteQuestionOption(row) {
    this.questionOptionsListCorrect = new Array();
    for (let index = 0; index < this.questionOptionsList.length; index++) {
      const element = this.questionOptionsList[index];
      if(element.id == row.id) {
        this.questionOptionsList.splice(index,1);
      }
    }
    this.resetListQuestionsOptions();
  }

  onClickAddQuestion() {
    this.clickorigin=false;
    this.sh=0;
    this.questionOptionsListCorrect = new Array();
    this.questionOptionsList = new Array();
    this.descripcion_Pregunta = '';
    this.retroA = '';
  }

  editQuestion(form: NgForm, row) {
    this.sh = row.type;
    this.rowselected=row.id;    
    this.clickorigin=true;
    this.questionOptionsListCorrect = new Array();
    this.descripcion_Pregunta = row.question;
    this.retroA = row.retro;
    if(row.options != null) {
      this.questionOptionsList = row.options;
      this.resetListQuestionsOptions();
    } else {
      this.questionOptionsList = new Array();
    }
  }

  //Imprimir datos de la Actividad seleccionanda en el Form 
  getActividadinForm(actividad: ActividadI) {
    this.verificationSaveContent = false;
    this.verificationSaveTaller = false;
    this.verificationSaveRetroTaller = false;
    //console.log(this.retroTallerAct);
    this.headersQuestion = [
      'id',
      'question',
      'Opciones'
    ];
    this.ActividadService.selectedActividad = actividad;
    console.log(actividad);
    this.saveDataActivity(actividad);
    this.questionList=actividad.questions;
    //console.log(actividad.questions);
    this.materiaSelectedAM = this.actividadToSave.id_materia;
    this.gradoSelecteAM = this.actividadToSave.id_grado;
    this.miMateriaSelectedA = this.actividadToSave.id_materiaActiva;
    
    //console.log(this.materiaSelectedAM, this.gradoSelecteAM);
    //console.log(this.ContentREAService.contenidosREA);
    const TallerInfo = {
      id_contenidoREA: this.ActividadService.selectedActividad.id_taller,
    }

    const retroTallerInfo = {
      id_contenidoREA: this.ActividadService.selectedActividad.id_retrotaller,
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

    //Obtener retrotaller original de la actividad
    this.ContentREAService.loadContentREA(retroTallerInfo).subscribe(res =>{
      this.retroTallerRes = res;
      this.retroTallerAct.nombre_CREA = this.retroTallerRes.content.nombre_CREA;
      this.retroTallerAct.descripcion_CREA = this.retroTallerRes.content.descripcion_CREA;
      this.retroTallerAct.id_grado = this.retroTallerRes.content.id_grado;

      for(let x=0; x < this.materia.length ;x++){
        if(this.retroTallerRes.content.id_materia == this.materia[x].id_materia){
          this.retroTallerAct.materia = this.materia[x].nombre_materia;
        }
      }
      for(let y=0; y < this.tipoContenido.length ;y++){
        if(this.retroTallerRes.content.tipo_CREA == this.tipoContenido[y].id_tipoContenido){
          this.retroTallerAct.nombre_tipo_CREA = this.tipoContenido[y].nombre_tipoContenido;
        }
      }
      //console.log(this.retroTallerAct);
      //console.log('contenidoAct', this.contenidoAct);
    })
  }

  //Almacenar info temporal de un ContenidoREA
  saveDataContent(contenidoREAhtml){
    this.contenidoToSave = contenidoREAhtml;
    //console.log("contenido guardado:", this.contenidoToSave);
    if (this.contenidoRes.content.id_CREA != this.contenidoToSave.id_CREA) {
      this.verificationSaveContent = true;
    }
    else{
      this.verificationSaveContent = false;
    }
  }
  //Almacenar info temporal de una Actividad
  saveDataActivity(actividad){
    this.actividadToSave = actividad;
    //console.log("actividad guardada:", this.actividadToSave);
    this.id_docente_ActividadSelected = this.actividadToSave.id_docente;
    this.verificationSaveActividad = true;
  }
  //Almacenar info temporal de un Taller
  saveDataTaller(tallerhtml){
    this.tallerToSave = tallerhtml;
    //console.log("taller guardado:", this.tallerToSave);
    if (this.tallerRes.content.id_CREA != this.tallerToSave.id_CREA) {
      this.verificationSaveTaller = true;
    }
    else{
      this.verificationSaveTaller = false;
    }
    //console.log('bandera',this.verificationSaveTaller)
  }

  saveDataRetroTaller(retrotallerhtml){
    this.retroToSave = retrotallerhtml;
    //console.log("taller guardado:", this.tallerToSave);
    if (this.retroTallerRes.content.id_CREA != this.retroToSave.id_CREA) {
      this.verificationSaveRetroTaller = true;
    }
    else{
      this.verificationSaveRetroTaller = false;
    }
    //console.log('bandera',this.verificationSaveTaller)
  }

  //Almacenar info temporal de una Actividad
  seccionActivity(actividad){
    this.actividadToSave2 = actividad;
    //console.log("actividad guardada:", this.actividadToSave2);

    if(this.actividadToSave2.taller == 1){
      this.tallerActivado = true;
      this.tallerDesactivado = false;
    }
    else{
      this.tallerActivado = false;
      this.tallerDesactivado = true;
    }

    if(this.actividadToSave2.evaluacion == 1){
      this.evaluacionActivado = true;
      this.evaluacionDesactivado = false;
      console.log('entro eva al 1');
    }
    else{
      this.evaluacionActivado = false;
      this.evaluacionDesactivado = true;
      console.log('entro eva al 0');
    }

    if(this.actividadToSave2.retroalimentacion == 1){
      this.retroalimentacionActivado = true;
      this.retroalimentacionDesactivado = false;
      console.log('entro retro al 1');
    }
    else{
      this.retroalimentacionActivado = false;
      this.retroalimentacionDesactivado = true;
      console.log('entro retro al 0');
    }
    //console.log(this.tallerActivado,this.tallerDesactivado,this.evaluacionActivado,this.evaluacionDesactivado);
  }

  //Activar o Desactivar Secciones de la Actividad
  activarTaller(){
    const newSeccionActividad = {
      id_actividad: this.actividadToSave2.id_actividad,
      taller: 1,
      evaluacion: this.actividadToSave2.evaluacion,
      retroalimentacion : this.actividadToSave2.retroalimentacion
    }

    this.ActividadService.uploadSectionsActivity(newSeccionActividad).subscribe(res =>{
      //console.log(res);
      this.getActividades();
    });
  }
  desactivarTaller(){
    const newSeccionActividad = {
      id_actividad: this.actividadToSave2.id_actividad,
      taller: 0,
      evaluacion: this.actividadToSave2.evaluacion,
      retroalimentacion: this.actividadToSave2.retroalimentacion
    }

    this.ActividadService.uploadSectionsActivity(newSeccionActividad).subscribe(res =>{
      //console.log(res);
      this.getActividades();
    });
  }
  activarEvaluacion(){
    const newSeccionActividad = {
      id_actividad: this.actividadToSave2.id_actividad,
      taller: this.actividadToSave2.taller,
      evaluacion: 1,
      retroalimentacion: this.actividadToSave2.retroalimentacion
    }

    this.ActividadService.uploadSectionsActivity(newSeccionActividad).subscribe(res =>{
      //console.log(res);
      this.getActividades();
    });
  }
  desactivarEvaluacion(){
    const newSeccionActividad = {
      id_actividad: this.actividadToSave2.id_actividad,
      taller: this.actividadToSave2.taller,
      evaluacion: 0,
      retroalimentacion : this.actividadToSave2.retroalimentacion
    }

    this.ActividadService.uploadSectionsActivity(newSeccionActividad).subscribe(res =>{
      //console.log(res);
      this.getActividades();
    });
  }

 //Activar o Desactivar Retroalimentacion de la Actividad
    activarRetroalimentacion(){
      const newSeccionActividad = {
        id_actividad: this.actividadToSave2.id_actividad,
        taller: this.actividadToSave2.taller,
        evaluacion: this.actividadToSave2.evaluacion,
        retroalimentacion : 1
      }
  
      this.ActividadService.uploadSectionsActivity(newSeccionActividad).subscribe(res =>{
        //console.log(res);
        this.getActividades();
      });
    }
    desactivarRetroalimentacion(){
      const newSeccionActividad = {
        id_actividad: this.actividadToSave2.id_actividad,
        taller: this.actividadToSave2.taller,
        evaluacion: this.actividadToSave2.evaluacion,
        retroalimentacion : 0
      }
  
      this.ActividadService.uploadSectionsActivity(newSeccionActividad).subscribe(res =>{
        //console.log(res);
        this.getActividades();
      });
    }

  //Resetear pagina
  resetPage(){
    window.location.reload();
  }

  //Resetear formulario
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.getActividades();
      this.getContenidos();
      window.scrollTo(0, 0);
      this.verificationSaveContent = false;
      this.verificationSaveTaller = false;
      this.verificationSaveRetroTaller = false;
      this.verificationSaveActividad = false;
      //this.contenidoToSave = new contenidoREAI();
      this.actividadToSave = new ActividadI();
      //this.tallerToSave = new contenidoREAI();
      this.ActividadService.selectedActividad = new ActividadI();
      this.contenidoAct = {nombre_CREA:"",cont:0,id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
      this.tallerAct = {nombre_CREA:"",cont:0,id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
      this.retroTallerAct = {nombre_CREA:"",cont:0,id_CREA:0,nombre_tipo_CREA:"",id_grado:0,materia:"",descripcion_CREA:""};
      //console.log('reseteo');
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
