import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

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
import { NgForm, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
})
export class CrearActividadComponent implements OnInit {
  
  //#region Región de variables
  //Elementos de Busqueda de Contenido
  contenidoToSave:contenidoREAI;
  tallerToSave:contenidoREAI;
  retroTallerToSave:contenidoREAI;
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
  uploadedFiles: Array <File>;
  urlFinal:string;
  urlSelected:any;
  contenidoSeleccionado:boolean;
  nombreContenido:String;
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
  retroOpt:number;
  urlretroOpt:string;

  respuestaCorrectaTSelected1:string;
  respuestaCorrectaTSelected2:string;
  respuestaCorrectaTSelected3:string;
  ID_TipoContenido_Taller:number;
  ID_TipoContenido_RetroTaller:number;
  correcto:boolean;
  error:boolean;
  error2:boolean;
  subiendo:boolean;
  temp2:any;
  tallerVerificacion:boolean;
  contenidoVerificacion:boolean;
  retroTallerVerificacion:boolean;
  headersQuestion:any[];
  questionList:any[];
  headersQuestionOptions:any[];
  questionOptionsList:any[];
  questionOptionsListCorrect:any[];
  dictionary:any[];
  clickorigin:boolean=false;
  sh:number =0;
  rowselected:number=-1;

  descripcion_Pregunta: string;
  retroA:string;
  actividadEnviada:boolean = false;
  public mostrarErrores: boolean = false;
  mostrarAlertaEvaluacion: boolean = false;

  //#endregion

  constructor(private AuthDService: AuthDService,private cdr: ChangeDetectorRef ,private ActividadService: ActividadService, private ContentREAService: ContentREAService, private router: Router) { }

  ngOnInit() {
    this.dictionary = ['A','B','C','D'];
    window.scrollTo(0, 0);
    this.comprobacionLogin();
    this.ID_TipoContenido_Taller = 5;
    this.ID_TipoContenido_RetroTaller = 4;
    this.correcto = false;
    this.error = false;
    this.error2 = false;
    this.subiendo = false;
    this.contenidoSeleccionado = false;
    
    this.nombreContenido = '...';
    this.id_docenteAuth = this.AuthDService.getIdDocente();
    this.id_colegioAuth = this.AuthDService.getIdColegioDocente();
    //console.log('prueba', this.id_docenteAuth, this.id_colegioAuth);
    this.getOptions();
    this.getContenidos();
    this.ContentREAService.selectedContenidoREA = new contenidoREAI();
    this.questionOptionsListCorrect = new Array();

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
    this.headersQuestion = [
      'id',
      'Pregunta',
      'Opciones'
    ];
    this.headersQuestionOptions = [
      'id',
      'Respuesta',
      'Opciones'
    ];
    this.questionList = [ ];
    this.questionOptionsList = [ ];
    this.retroA = '';
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

  switchActivado: boolean = false; // Inicialmente desactivado

  onSwitchChange() {
    this.switchActivado = !this.switchActivado; // Cambiar el estado del interruptor
    //console.log("boton es: ", this.switchActivado);
    this.cdr.detectChanges();
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
    this.mostrarErrores = true;
    this.mostrarAlertaEvaluacion = false;

    if (true) {
      this.correcto = false;
      this.error = true;
      this.subiendo = false;

      this.ActividadService.allActivities().subscribe(res => {
        //console.log(res);
        this.ActividadService.actividades = res as ActividadI[];
        console.log('Actividades', this.ActividadService.actividades);

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
          this.retroOpt = 0;
          this.urlretroOpt = "no";
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
          this.retroOpt = 0;
          this.urlretroOpt = "no";
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
          this.retroOpt = 0;
          this.urlretroOpt = "no";
        }
        if (this.contenidoToSave.tipo_CREA == 4) {
          this.videoOpt = 0;
          this.urlvideoOpt = "no";
          this.documentoOpt = 0;
          this.urldocumentoOpt = "no";
          this.audioOpt = 0;
          this.urlaudioOpt = "no";
          this.htmlOpt = 0;
          this.urlhtmlOpt = "no";
          this.retroOpt = 1;
          this.urlretroOpt = this.contenidoToSave.urlrepositorio;
        }

        if (this.contenidoToSave.tipo_CREA == 5) {
          this.videoOpt = 0;
          this.urlvideoOpt = "no";
          this.documentoOpt = 0;
          this.urldocumentoOpt = "no";
          this.audioOpt = 0;
          this.urlaudioOpt = "no";
          this.htmlOpt = 1;
          this.urlhtmlOpt = this.contenidoToSave.urlrepositorio;
          this.retroOpt = 0;
          this.urlretroOpt = "no";
        }

        console.log("prueba:", form.value.nombre_actividad);

        const newActividad:ActividadI = {
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
          // id_retrotaller: this.retroTallerToSave.id_CREA,
          // urlretrotaller: this.retroTallerToSave.urlrepositorio,
          id_retrotaller: this.switchActivado ? this.retroTallerToSave.id_CREA: null,
          urlretrotaller: this.switchActivado ? this.retroTallerToSave.urlrepositorio: "",
          descripcion_test: form.value.descripcion_quiz,
          Q1: form.value.preguntaQ1,
          A11: form.value.respuesta11,
          A12: form.value.respuesta12,
          A13: form.value.respuesta13,
          A14: form.value.respuesta14,
          CA1: this.respuestaCorrectaTSelected1,
          RQ1: form.value.retroA1,
          Q2: form.value.preguntaQ2,
          A21: form.value.respuesta21,
          A22: form.value.respuesta22,
          A23: form.value.respuesta23,
          A24: form.value.respuesta24,
          CA2: this.respuestaCorrectaTSelected2,
          RQ2: form.value.retroA2,
          Q3: form.value.preguntaQ3,
          A31: form.value.respuesta31,
          A32: form.value.respuesta32,
          A33: form.value.respuesta33,
          A34: form.value.respuesta34,
          CA3: this.respuestaCorrectaTSelected3,
          RQ3: form.value.retroA3,
          evaluacion: 0,
          descripcion_evaluacion: form.value.descripcion_evaluacion,
          questions: this.questionList,
          autor: this.AuthDService.getnombreApellidoDocente(),
          id_autor: this.id_docenteAuth,
          retroalimentacion: 0,
        }
        //console.log('datosActividad', newActividad);
 
        // Validacion Taller
        if (this.tallerToSave.id_CREA != null) {
          this.error2 = false;
        }
        
        // Validacion Evaluación
        if (this.questionList.length > 0) {
          // El campo de evaluación está vacío, muestra la alerta
          this.mostrarAlertaEvaluacion = false;
          this.ActividadService.createActivity(newActividad).subscribe(res => {
            console.log('res',res);
            this.temp2 = res;
  
            if (this.temp2.Estado == "Error Crear Actividad") {
              this.correcto = false;
              this.error = true;
              this.subiendo = false;
            } else {
              const contenidoREAInfo = {
                id_CREA: this.contenidoToSave.id_CREA,
                en_uso: (this.contenidoToSave.en_uso + 1)
              };
              const tallerInfo = {
                id_CREA: this.tallerToSave.id_CREA,
                en_uso: (this.tallerToSave.en_uso + 1)
              };
            
              // Verificamos si switchActivado es true y retroTallerToSave tiene un valor
              if (this.switchActivado && this.retroTallerToSave) {
                const retrotallerInfo = {
                  id_CREA: this.retroTallerToSave.id_CREA,
                  en_uso: (this.retroTallerToSave.en_uso + 1)
                };
            
                // Actualizamos retrotallerInfo solo si se cumplen las condiciones
                this.ContentREAService.uploadEstadoContentREA(retrotallerInfo).subscribe(res => {
                  console.log(res);
                });
              }
            
              // Actualizamos contenidoREAInfo y tallerInfo
              this.ContentREAService.uploadEstadoContentREA(contenidoREAInfo).subscribe(res => {
                console.log(res);
                this.ContentREAService.uploadEstadoContentREA(tallerInfo).subscribe(res => {
                  console.log(res);
                  this.correcto = true;
                  this.error = false;
                  this.subiendo = false;
                  this.mostrarErrores = false;
                  this.actividadEnviada = true;
                  this.resetForm(form);
                });
              });
            }
            
          });
        } else {
            // El campo de evaluación no está vacío, continuar con la creación de la actividad
            this.mostrarAlertaEvaluacion = true;      
        }
      });
    }
  }

  // Agregar Contenido Nuevo
  //Cargar archivo a subir
  onFileChange(e){
    this.correcto = false;
    this.error = true;
    //console.log('archivo', e)
    this.uploadedFiles = e.target.files;
    this.nombreContenido = e.target.files[0].name;
    this.contenidoSeleccionado = true;
  }

  //Funcion leer y subir informacion y archivo del formulario a Mongo
  onSubirContenido(form: NgForm):void{
    this.correcto = false;
    this.error = false;
    this.error2 = true;
    this.subiendo = false;
    
    //console.log('urlFinal', this.urlSelected.url);
    if (this.contenidoSeleccionado == true) {
      this.ContentREAService.allContent().subscribe(res => {
        //console.log(res);
        this.ContentREAService.contenidosREA = res as contenidoREAI[];
        //console.log('Contenidos',  this.ContentREAService.contenidosREA);

        //Generar Cont
        if (this.ContentREAService.contenidosREA.length == 0) {
          this.newCont = 1;
        }
        else {
          if (this.ContentREAService.contenidosREA.length) {
            this.newCont = 1;
          }
          for (let n = 0; n < this.ContentREAService.contenidosREA.length; n++) {
            for (let i = 0; i < this.ContentREAService.contenidosREA.length; i++) {
              if (this.ContentREAService.contenidosREA[i].id_colegio == this.id_colegioAuth) {
                if (this.ContentREAService.contenidosREA.length) {
                  this.newCont = 1;
                }
                if (n + 1 == this.ContentREAService.contenidosREA[i].cont) {
                  this.newCont = n + 2;
                  this.temp = 0;
                  i = this.ContentREAService.contenidosREA.length;
                }
                else {
                  this.newCont = n + 1;
                  this.temp = 1;
                }
              }
            }
            if (this.temp == 1) {
              n = this.ContentREAService.contenidosREA.length + 1;
            }
          }
        }

        //Generar ID
        var idGlobal = "" + this.id_colegioAuth + this.newCont;
        this.newID = parseInt(idGlobal);
        //console.log('nuevaID y cont', this.newID, this.newCont);

        const newContenidoREA = {
          //id_CREA: Math.floor((Math.random() * 100) + 1),
          id_CREA: this.newID,
          cont: this.newCont,
          tipo_CREA: this.tipoContenidoSelected,
          id_docente: this.id_docenteAuth,
          id_materia: this.materiaSelected,
          id_grado: this.gradoSelected,
          id_colegio: this.id_colegioAuth,
          nombre_CREA: form.value.nombre_CREA,
          urlrepositorio: 'Temporal',
          descripcion_CREA: form.value.descripcion_CREA,
          en_uso: 0
        }

        //console.log('datosContenido', newContenidoREA);

        this.correcto = false;
        this.error = false;
        this.error2 = false;
        this.subiendo = true;

        this.ContentREAService.createContentREA(newContenidoREA).subscribe(res => {
          //this.router.navigateByUrl('/inicioProfesores')
          //console.log('res',res);
          this.temp2 = res;
          console.log("123", this.temp2);

          if (this.temp2.Estado == "Error Crear Contenido") {
            this.correcto = false;
            this.error = true;
            this.subiendo = false;
          } else {
            this.correcto = false;
            this.error = false;
            this.subiendo = true;

            /*para subir multiples archivos*/
            let formData = new FormData();
            for (let i = 0; i < this.uploadedFiles.length; i++) {
              formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name)
            }

            this.ContentREAService.uploadFile(formData).subscribe((res) => {
              //console.log('url-res', res);
              this.urlSelected = res;

              const newUrl = {
                id_CREA: this.newID,
                urlrepositorio: this.urlSelected.url
              }

              //console.log('newUrl', newUrl);

              this.ContentREAService.uploadURLContentREA(newUrl).subscribe((res) => {
                //console.log('res', res);
                this.ContentREAService.uploadEstadoContentREA(this.contenidoToSave).subscribe(res =>{
                  //console.log(res);
                  this.correcto = true;
                  this.getContenidos();
                });
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

  getQuetions(){
    this.questionList
  }
 
  onClickAddQuestion() {
    this.clickorigin=false;
    this.sh=0;
    this.questionOptionsListCorrect = new Array();
    this.questionOptionsList = new Array();
    this.descripcion_Pregunta = '';
    this.retroA = '';
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

      // Codigo Crear Pregunta Abierta
      //console.log('mensaje tipo '+ form.value.sh);
      // if(form.value.sh == 1){
      //   console.log('pregunta abierta rta '+form.value.descripcion_Pregunta_Abierta);
      //   jona.correct = form.value.descripcion_Pregunta_Abierta;
      //   console.log('Finalizo rta '+form.value.descripcion_Pregunta_Abierta);

      // }

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

  // editQuestion(form: NgForm, row) {
  //   this.questionOptionsListCorrect = new Array();
  //   this.descripcion_Pregunta = row.question;
    
  //   if(row.options != null) {
  //     this.questionOptionsList = row.options;
      
  //     this.resetListQuestionsOptions();
  //   }
  //     else {
  //      this.questionOptionsList = new Array();
  //   }
  //   this.retroA = row.retro;
  // }

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

  onCrearRespuesta(form: NgForm) {
    let value = this.dictionary[this.questionOptionsList.length];

    //let nextItem = this.questionOptionsList.length + 1;
    if(form.value.respuesta11E.length > 0 && this.questionOptionsList.length < 4) {
      this.questionOptionsListCorrect.push({id: this.questionOptionsListCorrect.length, value: value});
      let jona = {id: value, question: form.value.respuesta11E};
      this.questionOptionsList.push(jona);
    
      form.controls['respuesta11E'].setValue('');
    }

    // ****** Codigo Agregar Pregunta Abierta ******
    // if(form.value.descripcion_Pregunta_Abierta.length > 0 ) {
    //   this.questionOptionsListCorrect.push({id: this.questionOptionsListCorrect.length, value: value});
    //   let jona = {id: value, question: form.value.descripcion_Pregunta_Abierta};
    //   console.log('linea 439 '+jona);
    //   this.questionOptionsList.push(jona);
    //   console.log('linea 442 '+this.questionOptionsList);
    // }
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

  resetListQuestionsOptions() {
    const letters = ["A", "B", "C", "D"];
    for (let index = 0; index < this.questionOptionsList.length; index++) {
      const element = this.questionOptionsList[index];
      element.id = letters[index]; // Usar las letras en lugar del índice
      this.questionOptionsListCorrect.push({ id: element.id, value: element.question });
    }
  }

  //Almacenar info temporal de un Taller
  saveDataTaller(tallerhtml){
    this.tallerToSave = tallerhtml;
    this.tallerVerificacion = true;
    //console.log("taller guardado:", this.tallerToSave);
  }

  //Almacenar info temporal de una RetroTaller
  saveDataRetroTaller(retrotallerhtml){
    this.retroTallerToSave = retrotallerhtml;
    this.retroTallerVerificacion = true;
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
      this.contenidoSeleccionado = false;
      this.nombreContenido = "...";
      this.ContentREAService.selectedContenidoREA = new contenidoREAI();
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