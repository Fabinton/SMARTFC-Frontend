import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ContentREAService } from '../../services/content-rea.service';
import { contenidoREAI } from '../../models/contenidoREA';
import { MateriaI } from '../../models/materia';
import { GradoI } from '../../models/grado';
import { TipoContenidoI } from '../../models/tipoContenido';
import { AuthDService } from '../../services/auth-d.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subir-contenido',
  templateUrl: './subir-contenido.component.html',
  styleUrls: ['./subir-contenido.component.css']
})
export class SubirContenidoComponent implements OnInit {

  contenido:contenidoREAI[];
  materia:MateriaI[];
  grado:GradoI[];
  tipoContenido:TipoContenidoI[];
  materiaSelected:number;
  gradoSelected:number;
  tipoContenidoSelected:number;
  uploadedFiles: Array <File>;
  urlFinal:string;
  urlSelected:any;
  newCont: number;
  newID: number;
  temp: number;
  id_docenteAuth:number;
  id_colegioAuth:number;
  correcto:boolean;
  error:boolean;
  error2:boolean;
  subiendo:boolean;
  temp2:any;
  nombreContenido:String;
  contenidoSeleccionado:boolean;

  constructor(private AuthDService: AuthDService, private ContentREAService: ContentREAService, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();

    this.correcto = false;
    this.error = false;
    this.error2 = false;
    this.subiendo = false;
    this.contenidoSeleccionado = false;
    
    this.nombreContenido = '...';
    this.getOptions();
    this.getContenidos();
    this.id_docenteAuth = this.AuthDService.getIdDocente() as number;
    this.id_colegioAuth = this.AuthDService.getIdColegioDocente();
    //console.log('prueba', this.id_colegioAuth, this.id_docenteAuth);
    this.ContentREAService.selectedContenidoREA = new contenidoREAI();
  }

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
  }

  getContenidos(){
    this.ContentREAService.allContent().subscribe(res =>{
      //console.log(res);
      this.ContentREAService.contenidosREA = res as contenidoREAI[];
    });
  }

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

  resetPage(){
    window.location.reload();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.contenidoSeleccionado = false;
      this.nombreContenido = "...";
      this.ContentREAService.selectedContenidoREA = new contenidoREAI();
      window.scrollTo(0, 0);
      //this.ContentREAService.selectedContenidoREA = new contenidoREAI();
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
