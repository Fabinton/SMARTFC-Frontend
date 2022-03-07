import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ContentREAService } from '../../services/content-rea.service';
import { contenidoREAI } from '../../models/contenidoREA';
import { MateriaI } from '../../models/materia';
import { GradoI } from '../../models/grado';
import { TipoContenidoI } from '../../models/tipoContenido';
import { contenidoREAVisualizarI } from '../../models/contenidoREAVisualizar';
import { AuthDService } from '../../services/auth-d.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-borrar-contenido',
  templateUrl: './borrar-contenido.component.html',
  styleUrls: ['./borrar-contenido.component.css']
})
export class BorrarContenidoComponent implements OnInit {

  //Elementos de Busqueda de Contenido
  contenidoToSave:contenidoREAI;
  contenidos:contenidoREAI[];
  materia:MateriaI[];
  grado:GradoI[];
  tipoContenido:TipoContenidoI[];
  materiaSelected:number;
  gradoSelected:number;
  tipoContenidoSelected:number;
  contenidoVisualizar:contenidoREAVisualizarI[];

  correcto:boolean;
  mensaje:boolean;

  constructor(private AuthDService: AuthDService, private ContentREAService: ContentREAService, private router: Router) { 
    //this.getOptions();
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.comprobacionLogin();

    this.correcto = false;
    this.mensaje = false;

    this.getOptions();
    this.getContenidos();
  }

  //Obtener los datos de los options
  getOptions(){
    this.ContentREAService.allSubject().subscribe(res =>{
      this.materia = res as MateriaI[];
      //console.log("1:",this.materia.length);
    });
    this.ContentREAService.allGrade().subscribe(res =>{
      this.grado = res as GradoI[];
    });
    this.ContentREAService.allType().subscribe(res =>{
      this.tipoContenido = res as TipoContenidoI[];
      //console.log("2:",this.tipoContenido.length);
    });
  }

  //consultar todos los ContenidosREA y verificar el nombre de la materia y contenido con sus respectivos ID´s
  getContenidos() {
    this.ContentREAService.allSubject().subscribe(res => {
      this.materia = res as MateriaI[];
      //console.log("1:",this.materia.length);

      this.ContentREAService.allType().subscribe(res => {
        this.tipoContenido = res as TipoContenidoI[];
        //console.log("2:",this.tipoContenido.length);

        this.ContentREAService.allContent().subscribe(res => {
          //console.log(res);
          this.ContentREAService.contenidosREA = res as contenidoREAI[];
          this.contenidoVisualizar = res as contenidoREAVisualizarI[];
          this.contenidoVisualizar.reverse();
          //console.log(this.ContentREAService.contenidosREA.length);
          //console.log("contenido visualizar:", this.contenidoVisualizar);

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

  //Almacenar info temporal de un ContenidoREA
  saveData(contenidoREAhtml){
    this.contenidoToSave = contenidoREAhtml;
    //console.log("contenido guardado:", this.contenidoToSave);
  }

  //Eliminar contenidoREA de Mongo
  deleteContenido(){
    this.correcto = false;
    this.mensaje = true;
    //console.log("id para eliminar:", this.contenidoToSave.id_CREA);
    this.ContentREAService.deleteContentREA(this.contenidoToSave).subscribe(res =>{
      //console.log(res);
      this.correcto = true;
      this.mensaje = false;
      this.getContenidos();
    });
    //window.location.reload();
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
