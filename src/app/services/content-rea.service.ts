import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { contenidoREAI } from '../models/contenidoREA';
import { ActividadI } from '../models/actividad';


@Injectable()
export class ContentREAService {
  private localStorageService;

  selectedContenidoREA: contenidoREAI;  
  contenidosREA: contenidoREAI[];  
  AUTHD_SERVER: string = "http://localhost:3000";
  constructor(private httpClient: HttpClient) {
    //this.localStorageService = sessionStorage;
    this.localStorageService = localStorage;

    this.selectedContenidoREA = new contenidoREAI;
   }


  //====================================================================================  IPSERVER

  loadIPServer(): string {
    var IPServer = this.localStorageService.getItem("IPSERVER");
    return IPServer; 
  }


  //------------------------------------------------------------------------------------ ContenidoREA
  //Servicio para crear el contenido en MongoDB
  createContentREA(contenidoREA:contenidoREAI){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/createContentREA`, contenidoREA);
  }

  //Servicio para cambiar el estado de USO del contenido en Mongo
  uploadEstadoContentREA(data:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadEstadoContentREA`, data);
  }

  //Servicio para cambiar la URL del contenido en Mongo
  uploadURLContentREA(data:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadURLContentREA`, data);
  }

  //Servicio para subir el contenido al Repositorio ***
  uploadFile(formData){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/subir`, formData);
  }

  //Buscar un Contenido
  loadContentREA(data:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadContentREA`, data);
  }

  //Servicio para llamar todos los contenidos en MongoDB
  allContent(){
      return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllcontents`);
  }
  newAllContents(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/newLoadContentREA`);
  }

  //Servicio para borrar el contenido de MongoDB
  deleteContentREA(contenidoREA: contenidoREAI){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/deleteContentREA/`, contenidoREA)
  }


  //------------------------------------------------------------------------------------ Servicions de Ayuda

  //Servicio para llamar todas las materias
  allSubject() {
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllSubjects`);
  }
  newAllSubjects(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/newLoadSubjects`);
  }

  //Servicio para llamar todos los grados
  allGrade() {
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllGrades`);
  }
  newAllGrades(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/newLoadGrades`);
  }

  //Servicio para llamar todos los tipos de Contenidos
  allType() {
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllTypes`);
  }
  newAllTypes(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/newLoadTypes`);
  }

}
