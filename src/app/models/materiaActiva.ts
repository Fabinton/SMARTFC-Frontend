export class MateriaActivaI {

    constructor(id_materiaActiva = 0, cont = 0, nombre_materiaActiva = '', id_materia = 0, id_grado = 0,
        id_docente = 0, id_colegio = 0, url_imagen = ''){
            this.id_materiaActiva = id_materiaActiva;
            this.cont = cont;
            this.nombre_materiaActiva = nombre_materiaActiva;
            this.id_materia = id_materia;
            this.id_grado = id_grado;
            this.id_docente = id_docente;
            this.id_colegio = id_colegio;
            this.url_imagen = url_imagen;
    }

    id_materiaActiva: number;
    cont: number;
    nombre_materiaActiva: string;
    id_materia: number;
    id_grado: number;
    id_docente: number;
    id_colegio: number;
    url_imagen: string;
}