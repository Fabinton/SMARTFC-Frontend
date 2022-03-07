export class MetricaVisualizarI {
    
    constructor(id_metrica = 0, id_evento = 0, id_actividad = 0, id_estudiante = 0,
                nota_quiz = 0, nota_evaluacion = 0, nota_final = 0, check_inicio = 0, 
                check_contenido = 0, count_contenido = 0, check_quiz = 0, check_taller = 0, 
                check_evaluacion = 0, actividad = '', estudiante = '', inicio = '', 
                contenido = '', quiz = '', taller = '', evaluacion = '') {

    this.id_metrica = id_metrica;
    this.id_evento = id_evento;
    this.id_actividad = id_actividad;
    this.id_estudiante = id_estudiante;
    this.actividad = actividad;
    this.estudiante = estudiante;
    this.nota_quiz = nota_quiz;
    this.nota_evaluacion = nota_evaluacion;
    this.nota_final = nota_final;
    this.check_inicio = check_inicio;
    this.check_contenido = check_contenido;
    this.count_contenido = count_contenido;
    this.check_quiz = check_quiz;
    this.check_taller = check_taller;
    this.check_evaluacion = check_evaluacion;
    this.inicio = inicio;
    this.contenido = contenido;
    this.quiz = quiz;
    this.taller = taller;
    this.evaluacion = evaluacion;
}

    id_metrica: number;
    id_evento: number;
    id_actividad: number;
    id_estudiante: number;
    actividad: string;
    estudiante: string;
    nota_quiz: number;
    nota_evaluacion: number;
    nota_final: number;
    check_inicio: number;
    check_contenido: number;
    count_contenido: number;
    check_quiz: number;
    check_taller: number;
    check_evaluacion: number;
    inicio: string;
    contenido: string;
    quiz: string;
    taller: string;
    evaluacion: string;
}