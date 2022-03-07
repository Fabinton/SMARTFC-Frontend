export class CompetenciaI {
    
  constructor(id_competencia = 0, cont = 0, id_colegio = 0, nombre_competencia = '', id_areaMateria = 0,
              gradoInicial = 0, gradoFinal = 0) {
    this.id_competencia = id_competencia;
    this.cont = cont;
    this.id_colegio = id_colegio;
    this.nombre_competencia = nombre_competencia;
    this.id_areaMateria = id_areaMateria;
    this.gradoInicial = gradoInicial;
    this.gradoFinal = gradoFinal;
  }
  
  id_competencia: number;
  cont: number;
  id_colegio: number;
  nombre_competencia: string;
  id_areaMateria: number;
  gradoInicial: number;
  gradoFinal: number;
}