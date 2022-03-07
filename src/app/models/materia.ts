export class MateriaI {

    constructor(id_materia = 0, cont = 0, nombre_materia = '', id_colegio = 0, id_areaMateria = 0,
                url_imagen = '') {
        this.id_materia = id_materia;
        this.cont = cont;
        this.nombre_materia = nombre_materia;
        this.id_colegio = id_colegio;
        this.id_areaMateria = id_areaMateria;
        this.url_imagen = url_imagen;
    }

    id_materia: number;
    cont: number;
    nombre_materia: string;
    id_colegio: number;
    id_areaMateria: number;
    url_imagen: string;
}