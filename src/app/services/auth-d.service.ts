import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocenteI } from '../models/docente';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { MateriaActivaI } from '../models/materiaActiva';
import { ColegioI } from '../models/colegio';
import { DudaI } from '../models/duda';
import { EstuadianteI } from '../models/estudiante';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';


@Injectable()
export class AuthDService {
  AUTHD_SERVER: string = "http://localhost:3000";
  authDocente = new BehaviorSubject(false);
  private token: string;
  private nombreApellido_docenteAuth: string;
  private id_docenteAuth: number;
  private nombre_usuarioAuth: string;

  private localStorageService;
  //private currentSession : DocenteI = null;

  selectedMateriaActiva: MateriaActivaI;
  MateriasActivas: MateriaActivaI[];
  selectedDocente: DocenteI;
  Docentes: DocenteI[]; 
  selectedColegio: ColegioI;
  Colegios: ColegioI[];
  selectedDuda: DudaI;
  Dudas: DudaI[];
  
  temp:any;

  constructor(private httpClient: HttpClient, private router: Router) {
    //this.localStorageService = sessionStorage;
    this.localStorageService = localStorage;
    //this.currentSession = this.loadSessionData();
    this.selectedDocente = new DocenteI;
    this.selectedMateriaActiva = new MateriaActivaI;
    this.selectedColegio = new ColegioI;
    this.selectedDuda = new DudaI;
  }


  //====================================================================================  IPSERVER

  loadIPServer(): string {
    var IPServer = this.localStorageService.getItem("IPSERVER");
    return IPServer; 
  }


  //====================================================================================  DOCENTE

  //Servicio Crear Docente
  createDocente(docente:DocenteI){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/createDocente`, docente);
  }

  //Buscar un Docente
  loadDocente(info:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadDocente`, info);
  }

  //Cragar Todos los docentes
  loadAllDocentes(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllDocentes`);
  }

  //Eliminar una Actividad Activa
  deleteDocente(docente:DocenteI){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/deleteDocente`, docente);
  }

  //Modificar datos Login del Docente en MongoDB 
  uploadInfoLoginDocente(info:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadInfoLoginDocente`, info);
  }

  //Modificar datos Presonales del Docente en MongoDB 
  uploadInfoPersonalDocente(info:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadInfoPersonalDocente`, info);
  }

  //====================================================================================  LOGIN
  register(docente:DocenteI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`http://${this.localStorageService.getItem("IPSERVER")}:3000/register`,
    docente).pipe(tap(
      (res:JwtResponseI) => {
        if(res){
          // guardar token
          //this.saveToken(res.dataDocente.accessToken, res.dataDocente.expiresIn);
        }
      })
    );
  }

  //Sericio Verificacion de Login
  loginDocente(docente:DocenteI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loginDocente`,
    docente).pipe(tap(
      (res:JwtResponseI) => {
        if(res){
          //this.saveData(res.dataDocente.id_docente, res.dataDocente)
          //console.log('login res:', res);
          this.temp = res;
          if(this.temp.Estado != "Error Servidor" && this.temp.Estado != "Error Login"){
            this.saveSession(res.dataDocente.id_docente, res.dataDocente.nombre_docente, res.dataDocente.apellido_docente,  
                           res.dataDocente.accessToken, res.dataDocente.expiresIn, res.dataDocente.nombre_usuario,
                           res.dataDocente.id_colegio);
          }
        }
      })
    );
  }

  //Servicio de Logout
  logout(): void{
    this.token = '';
    this.nombreApellido_docenteAuth = '';
    this.id_docenteAuth = 0;
    this.nombre_usuarioAuth = "";
    localStorage.removeItem("ID_DOCENTE");
    localStorage.removeItem("NOMBRE_DOCENTE");
    localStorage.removeItem("APELLIDO_DOCENTE");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("NOMBRE_USUARIO");
    localStorage.removeItem("ID_COLEGIO");
  }

  //Guardar Informacion de inicio de Sesion
  saveSession(id_docent: number, nombre_docente: string, apellido_docente: string, 
              token: string, expiresIn: string, nombre_usuario: string, id_colegio: number): void{
    this.localStorageService.setItem("ID_DOCENTE", id_docent);
    this.localStorageService.setItem("NOMBRE_DOCENTE", nombre_docente);
    this.localStorageService.setItem("APELLIDO_DOCENTE", apellido_docente);
    this.localStorageService.setItem("ACCESS_TOKEN", token);
    this.localStorageService.setItem("EXPIRES_IN", expiresIn);
    this.localStorageService.setItem("NOMBRE_USUARIO", nombre_usuario);
    this.localStorageService.setItem("ID_COLEGIO", id_colegio);
    this.token = token;
    this.nombreApellido_docenteAuth = nombre_docente+" "+apellido_docente;
    //console.log('prueba', this.nombreApellido_docenteAuth);
    this.id_docenteAuth = id_docent;
    this.nombre_usuarioAuth = nombre_usuario;
  }

  getToken():string{
    if(!this.token)
    {
      this.token=localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

  getnombreApellidoDocente(): string {
    if(!this.nombreApellido_docenteAuth)
    {
      this.nombreApellido_docenteAuth = this.localStorageService.getItem("NOMBRE_DOCENTE")+" "+this.localStorageService.getItem("APELLIDO_DOCENTE");
    }
    return this.nombreApellido_docenteAuth;
  }

  getIdDocente(): number {
    var id_docenteAuthString = this.localStorageService.getItem("ID_DOCENTE");
    //console.log('prueba',id_docenteAuthString);
    if(!isNullOrUndefined(id_docenteAuthString)){
      return parseInt(id_docenteAuthString);
    } else {
      return null;
    }
  }

  getIdColegioDocente(): number {
    var id_ColegioAuthString = this.localStorageService.getItem("ID_COLEGIO");
    return parseInt(id_ColegioAuthString);
  }

  getNombreUsuario(): string {
    if(!this.nombre_usuarioAuth)
    {
      this.nombre_usuarioAuth = this.localStorageService.getItem("NOMBRE_USUARIO");
    }
    return this.nombre_usuarioAuth;
  }

  isAuthenticated(): boolean {
    return (this.getToken() != null) ? true : false;
  };

  //====================================================================================  MATERIAACTIVA

  //Crear Materia Activa del profesor
  createSubjectActive(materiaActiva:MateriaActivaI){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/createSubjectActive`, materiaActiva);
  }

  //Cragar Todas las Materias Activas
  loadAllSubjectActives(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllSubjectActives`);
  }

  //Eliminar una Materia Activa
  deleteSubjectActive(materiaActiva:MateriaActivaI){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/deleteSubjectActive`, materiaActiva);
  }

  //====================================================================================  COLEGIO

  //Servicio para obtener todos los colegio
  loadAllColegios(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllSchools`);
  }

  //Servicio para obtener la informacion de un colegio
  loadColegio(infoColegio:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadSchool`, infoColegio);
  }


  //====================================================================================  DUDAS

  //Servicio para obtener todos los colegio
  loadAllDudas(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllDudas`);
  }

  //Ingresar respuesta y estado de la Duda en MongoDB 
  uploadRespuestaDuda(info:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadRespuestaDuda`, info);
  }

  //Modificar estado de la Duda en MongoDB 
  uploadEstadoDuda(info:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadEstadoDuda`, info);
  }


  //====================================================================================  EVENTOS

  //Servicio para obtener todos los Eventos
  loadAllEvento(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllEventoForAngular`);
  }

  //Ingresar respuesta y estado de la Duda en MongoDB 
  loadEvento(info:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadEvento`, info);
  }


  //====================================================================================  Estudiantes

  //Buscar un Estudiante
  loadEstudiante(info:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadEstudiante`, info);
  }

  //Cargar Todos los Estudiantes
  loadAllEstudiantes(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllEstudiantes`);
  }

  //Actualizar datos de evento en MongoDB 
  uploadEvento(info:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadEvento`, info);
  }

  //Actualizar datos de evento en MongoDB 
  uploadEstadoEvento(info:any){
    return this.httpClient.post(`http://${this.localStorageService.getItem("IPSERVER")}:3000/uploadEstadoEvento`, info);
  }


  //====================================================================================  Servicios de Ayuda

  //Servicio para llamar todas las materias
  allSubject() {
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllSubjects`);
  }

  //Servicio para llamar todos los grados
  allGrade() {
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllGrades`);
  }

  //Servicio para llamar todas las ACtividades en MongoDB
  allActivities(){
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllActivities`);
  }

  allType() {
    return this.httpClient.get(`http://${this.localStorageService.getItem("IPSERVER")}:3000/loadAllTypes`);
  }




  /* Storage Services

  setCurrentSession(docente: DocenteI): void {
    this.currentSession = docente;
    this.localStorageService.setItem('currentUser', docente)
  }

  loadSessionData(): DocenteI{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return sessionStr;
  }

  getCurrentSession(): DocenteI {
    return this.currentSession;
  }

  removeCurrentSession(): void{
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  /*getCurrentUser(): JwtResponseI {
    var user: JwtResponseI = this.getCurrentSession();
    return user;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.accessToken) ? session.accessToken : null;
  };

  logoutDocente(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }*/
}
