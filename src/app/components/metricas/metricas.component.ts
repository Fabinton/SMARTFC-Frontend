import { AuthDService } from '../../services/auth-d.service';
import { ActividadService } from '../../services/actividad.service';
import { ActividadI } from '../../models/actividad';
import { ActividadVisualizaI } from '../../models/actividadVisualizar';
import { EstuadianteI } from '../../models/estudiante';
import { EstuadianteVisualizarI } from '../../models/estudianteVisualizar';
import { CompetenciaI } from '../../models/competencia';
import { MateriaI } from '../../models/materia';
import { TipoContenidoI } from '../../models/tipoContenido';
import { GradoI } from '../../models/grado';
import { EventoI } from '../../models/evento';
import { MetricaI } from '../../models/metrica';
import { MetricaVisualizarI } from '../../models/metricaVisualizar';
import { MetricaActividadI } from '../../models/metricaActividad';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metricas',
  templateUrl: './metricas.component.html',
  styleUrls: ['./metricas.component.css']
})
export class MetricasComponent implements OnInit {

  actividades:ActividadI[];
  estudiantes:EstuadianteI[];
  materias:MateriaI[];
  grados:GradoI[];
  eventos:EventoI[];
  metricas:MetricaI[];
  metrica:MetricaI;
  metricasVisualizar:MetricaVisualizarI[];
  competencias:CompetenciaI[];
  tipoContenidos:TipoContenidoI[];
  actividadVisualizar:ActividadVisualizaI[];
  estuadianteVisualizar:EstuadianteVisualizarI[];
  actividadToSave:ActividadI;
  metricaToSave:MetricaI;
  metricaVisualizarToSave:MetricaVisualizarI;
  metricasActividad:MetricaActividadI;
  options:any;

  id_docenteAuth:number;
  nombre_docenteAuth:string;
  contInicio:number;
  contContenido:number;
  contQuiz:number;
  contTaller:number;
  contEvaluacion:number;
  contNotaQuiz:number;
  contNotaEvaluacion:number;
  contNotaFinal:number;
  divisorCont:number;
  notaA1:number; notaA2:number; notaA3:number; notaEA1:number; notaEA2:number; notaEA3:number;
  bar20:boolean; bar40:boolean; bar60:boolean; bar80:boolean; bar100:boolean; 

  constructor(private AuthDService: AuthDService, private ActividadService: ActividadService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();
    this.id_docenteAuth = this.AuthDService.getIdDocente();
    this.nombre_docenteAuth = this.AuthDService.getnombreApellidoDocente();

    this.bar20 = false;
    this.bar40 = false;
    this.bar60 = false;
    this.bar80 = false;
    this.bar100 = false;

    this.contInicio = 0;
    this.contContenido = 0;
    this.contQuiz = 0;
    this.contTaller = 0;
    this.contEvaluacion = 0;
    this.contNotaQuiz = 0;
    this.contNotaEvaluacion = 0;
    this.contNotaFinal = 0;

    
    this.metricasActividad = {id_metrica:0, id_actividad:0, nota_quiz:0, nota_evaluacion:0, 
                              nota_final:0, inicio:0, contenido:0, quiz:0, taller:0, evaluacion:0};
    this.options = [
      {valor:1, opcion:"SI vieron el Contenido"},     {valor:5, opcion:"NO vieron el Contenido"},
      {valor:2, opcion:"SI hicieron el Quiz"},        {valor:6, opcion:"NO hicieron el Quiz"},
      {valor:3, opcion:"SI hicieron el Taller"},      {valor:7, opcion:"NO hicieron el Taller"},
      {valor:4, opcion:"SI hicieron la Evaluacion"},  {valor:8, opcion:"NO hicieron la Evaluacion"}
    ];
    this.metricaVisualizarToSave = new MetricaVisualizarI;

    this.getOptions();
    this.getActividades();
  }

  getOptions(){
    this.AuthDService.allSubject().subscribe(res =>{
      this.materias = res as MateriaI[];
    });
    this.AuthDService.allGrade().subscribe(res =>{
      this.grados = res as GradoI[];
    });
    this.ActividadService.allCompetencias().subscribe(res =>{
      this.competencias = res as CompetenciaI[];
    });
  }

  //consultar todos las Actividades y verificar el nombre de la materia, competencia y profesor con sus respectivos ID´s
  getActividades() {
    /** EN ESTE METODO SE DEBE SETAER LA INFORMACIÓN DE CALIFIACIONES DE CADA VIDEO*/
    this.ActividadService.allCompetencias().subscribe(res => {
      this.competencias = res as CompetenciaI[];

      this.ActividadService.allActivities().subscribe(res => {
        //console.log(res);
        this.ActividadService.actividades = res as ActividadI[];
        this.actividadVisualizar = res as ActividadVisualizaI[];
        //console.log(this.ActividadService.actividades.length);

        for (let i = 0; i < this.ActividadService.actividades.length; i++) {
          if (this.ActividadService.actividades[i].id_docente == this.id_docenteAuth) {
            for (let n = 0; n < this.competencias.length; n++) {
              if (this.ActividadService.actividades[i].id_competencia == this.competencias[n].id_competencia) {
                this.actividadVisualizar[i].competencia = this.competencias[n].nombre_competencia;
              }
            }
            for (let p = 0; p < this.materias.length; p++) {
              if (this.ActividadService.actividades[i].id_materia == this.materias[p].id_materia) {
                this.actividadVisualizar[i].materia = this.materias[p].nombre_materia;
              }
            }
            this.actividadVisualizar[i].docente = this.nombre_docenteAuth;
          }
        }
        //console.log("actividades visualizar:", this.actividadVisualizar)
      });
    });
  }

  getAvanceEstudianteModal(metricaEstudiante){
    this.saveDataMetricaVisualizar(metricaEstudiante);

    this.bar20 = false;
    this.bar40 = false;
    this.bar60 = false;
    this.bar80 = false;
    this.bar100 = false;

    if(metricaEstudiante.check_inicio == 1){
      if(metricaEstudiante.check_contenido == 1){
        if(metricaEstudiante.check_quiz == 1){
          if(metricaEstudiante.check_taller == 1){
            if(metricaEstudiante.check_evaluacion == 1){
              this.bar100 = true;
            }
            else{
              this.bar80 = true;
            }
          }
          else{
            this.bar60 = true;
          }
        }
        else{
          this.bar40 = true;
        }
      }
      else{
        this.bar20 = true;
      }
    }
  }

  //Imprimir Metricas de la Actividad seleccionanda en el Modal 
  getActividadinModal(actividad: ActividadI) {
    this.ActividadService.selectedActividad = actividad;
    this.saveDataActivity(actividad);
    this.metricasActividad = new MetricaActividadI; 

    this.metricas = new Array;
    this.metricasVisualizar = new Array;

    this.contInicio = 0;
    this.contContenido = 0;
    this.contQuiz = 0;
    this.contTaller = 0;
    this.contEvaluacion = 0;
    this.contNotaQuiz = 0;
    this.contNotaEvaluacion = 0;
    this.contNotaFinal = 0;
    this.divisorCont = 0;

    this.metricasActividad.id_metrica = this.actividadToSave.id_actividad;
    this.metricasActividad.id_actividad = this.actividadToSave.id_actividad;

    this.AuthDService.loadAllEstudiantes().subscribe(res => {
      this.estudiantes = res as EstuadianteI[];

      this.AuthDService.loadAllEvento().subscribe(res =>{
        this.eventos = res as EventoI[];
        
        if(this.eventos.length){
          for(let n=0; n < this.eventos.length; n++){

            if(this.eventos[n].oculto != 1){
              if(this.eventos[n].id_actividad == this.actividadToSave.id_actividad){
                this.divisorCont = this.divisorCont + 1;
  
                var check_evaluacionTemp = 0;
  
                //Consultar si el estudiante hizo la evaluacion
                if(this.eventos[n].check_Ea1 && 0 < this.eventos[n].check_Ea1){
                  check_evaluacionTemp = 1;
                }
                else{
                  check_evaluacionTemp = 0;
                }
                
                //contadores
                this.contInicio = this.contInicio + this.eventos[n].check_inicio;
                this.contContenido = this.contContenido + this.eventos[n].check_video;
                this.contQuiz = this.contQuiz + this.eventos[n].check_answer;
                this.contTaller = this.contTaller + this.eventos[n].check_download;
                if(this.eventos[n].check_Ea1 && 0 < this.eventos[n].check_Ea1){
                  this.contEvaluacion = this.contEvaluacion + 1; 
                }
  
                this.notaA1 = 0; this.notaA2 = 0; this.notaA3 = 0; this.notaEA1 = 0; this.notaEA2 = 0; this.notaEA3 = 0;
    
                //Evaluar respuestas del evento
                if(this.eventos[n].check_a1 == this.actividadToSave.CA1){
                  this.notaA1 = 5;
                }
                if(this.eventos[n].check_a2 == this.actividadToSave.CA2){
                  this.notaA2 = 5;
                }
                if(this.eventos[n].check_a3 == this.actividadToSave.CA3){
                  this.notaA3 = 5;
                }
                if(this.eventos[n].check_Ea1 == this.actividadToSave.ECA1){
                  this.notaEA1 = 5;
                }
                if(this.eventos[n].check_Ea2 == this.actividadToSave.ECA2){
                  this.notaEA2 = 5;
                }
                if(this.eventos[n].check_Ea3 == this.actividadToSave.ECA3){
                  this.notaEA3 = 5;
                }
    
                var nota_quizTemp = parseFloat(((this.notaA1 + this.notaA2 + this.notaA3)/3).toFixed(2));
                var nota_evaluacionTemp = parseFloat(((this.notaEA1 + this.notaEA2 + this.notaEA3)/3).toFixed(2));
                var nota_finalTemp = parseFloat(((nota_quizTemp + nota_evaluacionTemp)/2).toFixed(2)); 
    
                this.contNotaQuiz = this.contNotaQuiz + nota_quizTemp;
                this.contNotaEvaluacion = this.contNotaEvaluacion + nota_evaluacionTemp;
                this.contNotaFinal = this.contNotaFinal + nota_finalTemp;
  
                //pasar datos del evento a metricas
                this.metricas.push({id_metrica:this.eventos[n].id_evento, id_evento:this.eventos[n].id_evento, 
                    id_actividad:this.actividadToSave.id_actividad, id_estudiante:this.eventos[n].id_estudiante, 
                    check_inicio:this.eventos[n].check_inicio, check_contenido: this.eventos[n].check_video,count_contenido: this.eventos[n].count_video, 
                    check_quiz:this.eventos[n].check_answer, check_evaluacion:check_evaluacionTemp, check_taller: this.eventos[n].check_download,
                    nota_quiz:nota_quizTemp, nota_evaluacion:nota_evaluacionTemp, nota_final:nota_finalTemp});
              }
            }
          }

          if(this.divisorCont == 0){
            this.divisorCont = 1;
          }
  
          //Ingresar datos de los contadores a la Metricas de la Actividade
          this.metricasActividad.nota_quiz = parseFloat((this.contNotaQuiz/this.divisorCont).toFixed(2));
          this.metricasActividad.nota_evaluacion = parseFloat((this.contNotaEvaluacion/this.divisorCont).toFixed(2));
          this.metricasActividad.nota_final = parseFloat((this.contNotaFinal/this.divisorCont).toFixed(2));
          this.metricasActividad.inicio = this.contInicio;
          this.metricasActividad.contenido = this.contContenido;
          this.metricasActividad.quiz = this.contQuiz;
          this.metricasActividad.taller = this.contTaller;
          this.metricasActividad.evaluacion = this.contEvaluacion;
  
          //console.log('metricasActividad', this.metricasActividad);
          //console.log('metricas', this.metricas);

          //Creacion Metricas para Visualizar
          for(let y=0; y < this.metricas.length; y++){

            var nombre_estudianteTemp = "";
            for (let m=0; m < this.estudiantes.length; m++) {
              if (this.metricas[y].id_estudiante == this.estudiantes[m].id_estudiante) {
                nombre_estudianteTemp = this.estudiantes[m].nombre_estudiante + " " + this.estudiantes[m].apellido_estudiante;
              }
            }

            var accionInicio = "No";
            var accionContenido = "No";
            var accionTaller = "No";
            var accionQuiz = "No";
            var accionEvaluacion = "No"

            if (this.metricas[y].check_inicio == 1) {
              accionInicio = "Si";
            }
            if (this.metricas[y].check_contenido == 1) {
              accionContenido = "Si";
            }
            if (this.metricas[y].check_quiz == 1) {
              accionQuiz = "Si";
            }
            if (this.metricas[y].check_taller == 1) {
              accionTaller = "Si";
            }
            if (this.metricas[y].check_evaluacion == 1) {
              accionEvaluacion = "Si";
            }

            this.metricasVisualizar.push({id_metrica:this.metricas[y].id_evento, id_evento:this.metricas[y].id_evento, 
                id_actividad:this.metricas[y].id_actividad, id_estudiante:this.metricas[y].id_estudiante, 
                check_inicio:this.metricas[y].check_inicio, check_contenido:this.metricas[y].check_contenido, count_contenido:this.metricas[y].count_contenido,
                check_quiz:this.metricas[y].check_quiz, check_evaluacion:this.metricas[y].check_evaluacion, check_taller: this.metricas[y].check_taller,
                nota_quiz:this.metricas[y].nota_quiz, nota_evaluacion:this.metricas[y].nota_evaluacion, nota_final:this.metricas[y].nota_final, actividad: this.actividadToSave.titulo_actividad,
                estudiante:nombre_estudianteTemp, inicio:accionInicio, contenido:accionContenido, quiz:accionQuiz, taller:accionTaller, evaluacion:accionEvaluacion});
          
          }
          //console.log('metricasVisualizar', this.metricasVisualizar);
        }
      });
    });
  }

  reiniciarActividad(){
    this.AuthDService.loadAllEvento().subscribe(res => {
      this.eventos = res as EventoI[];
      if (this.eventos.length) {
        for (let w = 0; w < this.eventos.length; w++) {
          if (this.eventos[w].id_actividad == this.actividadToSave.id_actividad) {
            const infoEvento = {
              id_evento: this.eventos[w].id_evento,
              oculto: 1
            }
            this.AuthDService.uploadEstadoEvento(infoEvento).subscribe(res =>{
              //console.log('respuesta',res);
            });
          }
        }
        //this.resetPage();
      }
    });
  }

  //Almacenar info temporal de una Actividad
  saveDataActivity(actividadhtml){
    this.actividadToSave = actividadhtml;
    //console.log("actividad guardada:", this.actividadToSave);
  }
  //Almacenar info temporal de una Actividad
  saveDataMetrica(metricahtml){
    this.metricaToSave = metricahtml;
    //console.log("actividad guardada:", this.actividadToSave);
  }
  //Almacenar info temporal de una Actividad
  saveDataMetricaVisualizar(metricavisualizarhtml){
    this.metricaVisualizarToSave = metricavisualizarhtml;
    //console.log("actividad guardada:", this.actividadToSave);
  }

  resetPage(){
    window.location.reload();
  }

  comprobacionLogin(){
    if (this.AuthDService.getIdDocente()){
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  calificacion: number = 3;
  listQualification = [
    {
      "quantity": 1
    },
    {
      "quantity": 2
    },
    {
      "quantity": 3
    },
    {
      "quantity": 4
    },
    {
      "quantity": 5
    }
  ]

}
