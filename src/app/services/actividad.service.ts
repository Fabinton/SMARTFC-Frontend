import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActividadI } from '../models/actividad';


@Injectable()
export class ActividadService {
  private localStorageService;

  selectedActividad: ActividadI;  
  actividades: ActividadI[];  
  AUTHD_SERVER: string = "http://localhost:3000";
  constructor(private httpClient: HttpClient) {
    //this.localStorageService = sessionStorage;
    this.localStorageService = localStorage;
    this.selectedActividad = new ActividadI;
  }

  //Servicio para crear la Actividad en MongoDB
  createActivity(actividad:ActividadI){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/createActivity`, actividad);
  }

  //Servicio llamar una Actividad en MongoDB
  loadActivity(id:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadActivity`, id);
  }

  //Servicio para llamar todas las ACtividades en MongoDB
  allActivities(){
      return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllActivities`);
  }

  //Servicio para modificar datos de la Actividad en MongoDB 
  uploadActivity(actividad: ActividadI){
      return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadActivity`, actividad);
  }

  //Servicio para modificar Secciones de la Actividad en MongoDB 
  uploadSectionsActivity(infoSections: any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadSectionsActivity`, infoSections);
}

  //Servicio para borrar la Actividad de MongoDB
  deleteActivity(actividad: ActividadI){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/deleteActivity`, actividad)
  }

  //Servicio para llamar todas las Competencias en Mongo
  allCompetencias() {
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllCompetencias`);
  }

  //Servicio para llamar todos los Docentes en Mongo
  allDocente() {
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllDocentes`);
  }

}
