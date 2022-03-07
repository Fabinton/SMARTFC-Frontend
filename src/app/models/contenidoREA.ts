export class contenidoREAI {

    constructor(id_CREA = 0, cont = 0, tipo_CREA = 0, id_materia = 0, id_grado = 0, en_uso = 0, id_docente = 0,
                nombre_CREA = '', urlrepositorio = '', descripcion_CREA = '', id_colegio = 0){
                    this.id_CREA = id_CREA;
                    this.cont = cont;
                    this.tipo_CREA = tipo_CREA;
                    this.id_docente = id_docente;
                    this.id_materia = id_materia;
                    this.id_grado = id_grado;
                    this.id_colegio = id_colegio;
                    this.nombre_CREA = nombre_CREA;
                    this.urlrepositorio = urlrepositorio;
                    this.descripcion_CREA = descripcion_CREA;
                    this.en_uso = en_uso;
    }

    id_CREA: number;
    cont: number;
    tipo_CREA: number;
    id_docente: number;
    id_materia: number;
    id_grado: number;
    id_colegio: number;
    nombre_CREA: string;
    urlrepositorio: string;
    descripcion_CREA: string;
    en_uso: number;
}
