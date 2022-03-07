import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms'; 
import { ColegioI } from '../../../models/colegio';
import { GradoI } from '../../../models/grado';
import { MateriaI } from '../../../models/materia';
import { AreaMateriaI } from '../../../models/areaMateria';
import { AuthAdminService } from '../../../services/auth-admin.service';
import { MateriaVisualizarI } from '../../../models/materiaVisualizar';
import { DocenteI } from '../../../models/docente';
import { MateriaActivaI } from '../../../models/materiaActiva';
import { MateriaActivaVisualizarI } from '../../../models/materiaActivaVisualizar';


@Component({
  selector: 'app-gestionar-colegio-admin',
  templateUrl: './gestionar-colegio-admin.component.html',
  styleUrls: ['./gestionar-colegio-admin.component.css']
})
export class GestionarColegioAdminComponent implements OnInit {

  colegios:ColegioI[];
  resColegio:any;
  areasMaterias:AreaMateriaI[];
  materias:MateriaI[];
  materiasVisualizar:MateriaVisualizarI[];
  grados:GradoI[];
  materiaToSave:MateriaI;
  gradoToSave:GradoI;
  colegioToSave:ColegioI;
  docentes:DocenteI[];
  MateriaActivaInfo:MateriaActivaVisualizarI[];
  newCont:number;
  newID:number;
  temp:number;
  correcto:boolean;
  correcto1:boolean;
  correcto2:boolean;
  correcto3:boolean;
  error:boolean;
  error1:boolean;
  error2:boolean;
  error3:boolean;
  subiendo:boolean;
  temp2:any;
  urlTemp: string;
  colegioSelected:boolean;

  constructor(private router: Router, private AuthAdminService: AuthAdminService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();
    
    this.correcto = false;
    this.correcto1 = false;
    this.correcto2 = false;
    this.correcto3 = false;
    this.error = false;
    this.error1 = false;
    this.error2 = false;
    this.error3 = false;
    this.subiendo = false;
    this.colegioSelected = false;

    this.getOptions();
  }

  getOptions(){
    this.AuthAdminService.allGrade().subscribe(res => {
      this.grados = res as GradoI[];
    });
    this.AuthAdminService.loadAllDocentes().subscribe(res => {
      this.docentes = res as DocenteI[];
    });
    this.AuthAdminService.loadAllColegios().subscribe(res => {
      this.colegios = res as ColegioI[];
    });
    this.AuthAdminService.loadAllAreaSubjects().subscribe(res => {
      this.areasMaterias = res as AreaMateriaI[]; 

      this.AuthAdminService.allSubject().subscribe(res => {
        this.materias = res as MateriaI[];
        this.materiasVisualizar = res as MateriaVisualizarI[];

        for (let i = 0; i < this.materias.length; i++) {
          for (let n = 0; n < this.areasMaterias.length; n++) {
            if (this.materias[i].id_areaMateria == this.areasMaterias[n].id_areaMateria) {
              this.materiasVisualizar[i].areaMateria = this.areasMaterias[n].nombre_areaMateria;
            }
          }
        }
        //console.log("actividades visualizar:", this.materiasVisualizar)
      });
    });
  }

  //Obtener informacion y listado de todas las MateriasActivas
  getInformacionCompletaMateriasActivas(){
    this.AuthAdminService.allSubject().subscribe(res => {
      this.materias = res as MateriaI[];
      //console.log('info materia',this.materia.length);

      this.AuthAdminService.loadAllDocentes().subscribe(res =>{
        this.docentes = res as DocenteI[];
        //console.log('info docente', this.resDocente);
  
        this.AuthAdminService.loadAllColegios().subscribe(res =>{
          this.colegios = res as ColegioI[];
          //console.log('info colegio', this.resColegio);
  
          this.AuthAdminService.loadAllSubjectActives().subscribe(res =>{
            this.AuthAdminService.MateriasActivas = res as MateriaActivaI[];
            this.MateriaActivaInfo = res as MateriaActivaVisualizarI[];
  
            for (let i = 0; i < this.AuthAdminService.MateriasActivas.length; i++) {
              for (let m = 0; m < this.materias.length; m++) {
                if (this.AuthAdminService.MateriasActivas[i].id_materia == this.materias[m].id_materia) {
                  this.MateriaActivaInfo[i].nombre_materia = this.materias[m].nombre_materia;
                }
              }
              for (let m = 0; m < this.colegios.length; m++) {
                if (this.AuthAdminService.MateriasActivas[i].id_colegio == this.colegios[m].id_colegio) {
                  this.MateriaActivaInfo[i].colegio = this.colegios[m].nombre_colegio;
                }
              }
              for (let m = 0; m < this.docentes.length; m++) {
                if (this.AuthAdminService.MateriasActivas[i].id_docente == this.docentes[m].id_docente) {
                  this.MateriaActivaInfo[i].docente = this.docentes[m].nombre_docente+" "+this.docentes[m].apellido_docente;
                }
              }
            }
            //console.log('materiaActivaVisualizar', this.MateriaActivaInfo);
          });
        });
      });
    });
  }

  //Imprimir datos del docente en el Form 
  getColegioinForm(colegiohtml){
    this.AuthAdminService.selectedColegio = colegiohtml;
    this.colegioSelected = true;
    //console.log('info colegio', this.AuthAdminService.selectedColegio);
  }

  //Crear Colegio
  crearColegio(form: NgForm): void{
    this.correcto3 = false;
    this.error3 = false;
    this.subiendo = true;

    const newColegio = {
      id_colegio: form.value.NIT,
      NIT: form.value.NIT,
      nombre_colegio: form.value.nombre_colegio,
      ciudad: form.value.ciudad,
      direccion: form.value.direccion,
      telefono: form.value.telefono,
      tipo_colegio: form.value.tipo_colegio,
      calendario: form.value.calendario,
      rector: form.value.rector,
      colegioActivo: 1
    }
    //console.log(newColegioL);
    this.AuthAdminService.createColegio(newColegio).subscribe(res => {
      //console.log(res);
      this.temp2 = res;

      if(this.temp2.Estado == "Error Crear Colegio"){
        this.correcto3 = false;
        this.error3 = true;
        this.subiendo = false;
      } else {
        this.correcto3 = true;
        this.error3 = false;
        this.subiendo = false;
        this.getOptions();
        this.resetForm(form);
      }
    });
  }

  //Actualizar datos del Colegio
  actualizarColegio(form: NgForm): void{
    this.correcto = false
    this.error = true;

    if(this.colegioSelected){
      const newInfoColegio = {
        id_colegio: this.AuthAdminService.selectedColegio.id_colegio,
        NIT: form.value.NIT,
        nombre_colegio: form.value.nombre_colegio,
        ciudad: form.value.ciudad,
        direccion: form.value.direccion,
        telefono: form.value.telefono,
        tipo_colegio: form.value.tipo_colegio,
        calendario: form.value.calendario,
        rector: form.value.rector
      }
      //console.log(newInfoColegio);
      this.AuthAdminService.uploadSchool(newInfoColegio).subscribe(res => {
        //console.log(res);
        this.correcto = true;
        this.error = false;
        this.getOptions();
        this.resetForm(form);
      });
    }
  }

  //Crear Materia en Mongo
  crearMateria(form: NgForm): void {
    this.correcto1 = false;
    this.error1 = false;
    this.subiendo = true;

    this.AuthAdminService.allSubject().subscribe(res => {
      this.AuthAdminService.Materias = res as MateriaI[];

      //crear Cont
      if (this.AuthAdminService.Materias.length == 0) {
        this.newCont = 1;
      }
      else {
        if (this.AuthAdminService.Materias.length) {
          this.newCont = 1;
        }
        for (let n = 0; n < this.AuthAdminService.Materias.length; n++) {
          for (let i = 0; i < this.AuthAdminService.Materias.length; i++) {
            if(this.AuthAdminService.Materias[i].id_colegio == form.value.id_colegioM){
              if (this.AuthAdminService.Materias.length) {
                this.newCont = 1;
              }
              if (n + 1 == this.AuthAdminService.Materias[i].cont) {
                this.newCont = n + 2;
                this.temp = 0;
                i = this.AuthAdminService.Materias.length;
              }
              else {
                this.newCont = n + 1;
                this.temp = 1;
              }
            }
          }
          if (this.temp == 1) {
            n = this.AuthAdminService.Materias.length + 1;
          }
        }
      }

      // ID Materia
      var idGlobal = ""+form.value.id_colegioM+this.newCont;
      this.newID = parseInt(idGlobal);

      // Imagen
      if(form.value.id_areaMateria == 0 || form.value.id_areaMateria > 4){
        this.urlTemp = "http://localhost:3000/public/repositorio/materiaPorDefecto.jpg"
      }
      if(form.value.id_areaMateria == 1){
        this.urlTemp = "http://localhost:3000/public/repositorio/lenguajeImagen.jpg"
      }
      if(form.value.id_areaMateria == 2){
        this.urlTemp = "http://localhost:3000/public/repositorio/matematicasImagen.jpg"
      }
      if(form.value.id_areaMateria == 3){
        this.urlTemp = "http://localhost:3000/public/repositorio/cienciasSocialesImagen.jpg"
      }
      if(form.value.id_areaMateria == 4){
        this.urlTemp = "http://localhost:3000/public/repositorio/cienciasNaturalesImagen.jpg"
      }

      const newMateria = {
        id_materia: this.newID,
        cont: this.newCont,
        nombre_materia: form.value.nombre_materia,
        id_colegio: form.value.id_colegioM,
        id_areaMateria: form.value.id_areaMateria,
        gradoInicial: form.value.gradoInicial,
        url_imagen: this.urlTemp
      }
      //console.log('datos newMateria', newMateria);
    
      this.AuthAdminService.createMateria(newMateria).subscribe(res => {
        //console.log(res);
        this.temp2 = res;

        if(this.temp2.Estado == "Error Crear Materia"){
          this.correcto1 = false;
          this.error1 = true;
          this.subiendo = false;
        } else {
          this.correcto1 = true;
          this.error1 = false;
          this.subiendo = false;
          this.resetForm(form);
        }
      });
    });
  }

  //Crear Grado en Mongo
  CrearGrado(form: NgForm): void {
    this.correcto2 = false;
    this.error2 = false;
    this.subiendo = true;

    const newGrado = {
      id_grado: form.value.id_grado,
      nombre_grado: form.value.nombre_grado
    }
    //console.log('datosGrado', newGrado);

    this.AuthAdminService.createGrade(newGrado).subscribe(res => {
      //console.log(res);
      this.temp2 = res;

      if(this.temp2.Estado == "Error Crear Grado"){
        this.correcto2 = false;
        this.error2 = true;
        this.subiendo = false;
      } else {
        this.correcto2 = true;
        this.error2 = false;
        this.subiendo = false;
        this.resetForm(form);
      }
    });
  }

  //Eliminar Materia de Mongo
  deleteMateria(){
    //console.log("id para eliminar:", this.materiaToSave.id_materia);
    this.AuthAdminService.deleteMateria(this.materiaToSave).subscribe(res =>{
      //console.log(res);
      this.getOptions();
      this.materiaToSave = new MateriaI();
    });
    //window.location.reload();
  }
  //Eliminar Grado de Mongo
  deleteGrado(){
    //console.log("id para eliminar:", this.gradoToSave.id_competencia);
    this.AuthAdminService.deleteGrade(this.gradoToSave).subscribe(res =>{
      //console.log(res);
      this.getOptions();
      this.gradoToSave = new GradoI();
    });
    //window.location.reload();
  }

  //Almacenar info temporal de una Competencia
  saveDataMateria(materiahtml){
    this.materiaToSave = materiahtml;
    //console.log('docente guardada:', this.materiaToSave);
  }
  //Almacenar info temporal de una AreaMAteria
  saveDataGrado(gradohtml){
    this.gradoToSave = gradohtml;
    //console.log('estudiante guardada:', this.gradoToSave);
  }
  saveDataColegio(colegiohtml){
    this.colegioToSave = colegiohtml;
    //console.log('estudiante guardada:', this.gradoToSave);
  }

  //Resetear pagina
  resetPage(){
    window.location.reload();
  }

  //resetear Formulario
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.newID = 0;
      this.temp = 0;
      this.AuthAdminService.selectedColegio = new ColegioI();
      this.colegioSelected = false;
      this.getOptions();
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
