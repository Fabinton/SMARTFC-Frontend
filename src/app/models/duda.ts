export class DudaI {

    constructor(id_duda = 0, id_actividad = 0, id_estudiante = 0, pregunta = '', respuesta = '',
        estado_duda = 0){
            this.id_duda = id_duda;
            this.id_actividad = id_actividad;
            this.id_estudiante = id_estudiante;
            this.pregunta = pregunta;
            this.respuesta = respuesta;
            this.estado_duda = estado_duda;
    }

    id_duda: number;
    id_actividad: number;
    id_estudiante: number;
    pregunta: string; 
    respuesta: string;
    estado_duda: number;
}