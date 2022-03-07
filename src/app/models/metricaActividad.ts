export class MetricaActividadI {
    
    constructor(id_metrica = 0, inicio = 0, id_actividad = 0,
                nota_quiz = 0, nota_evaluacion = 0, nota_final = 0,  
                contenido = 0, quiz = 0, taller = 0, evaluacion = 0) {

        this.id_metrica = id_metrica;
        this.id_actividad = id_actividad;
        this.nota_quiz = nota_quiz;
        this.nota_evaluacion = nota_evaluacion;
        this.nota_final = nota_final;
        this.inicio = inicio;
        this.contenido = contenido;
        this.quiz = quiz;
        this.taller = taller;
        this.evaluacion = evaluacion;
    }


    id_metrica: number;
    id_actividad: number;
    nota_quiz: number;
    nota_evaluacion: number;
    nota_final: number;
    inicio: number;
    contenido: number;
    quiz: number;
    taller: number;
    evaluacion: number;
}