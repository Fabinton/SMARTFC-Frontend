export class AreaMateriaI {

    constructor(id_areaMateria = 0, cont = 0, id_colegio = 0, nombre_areaMateria = '') {
        this.id_areaMateria = id_areaMateria;
        this.cont = cont;
        this.id_colegio = id_colegio;
        this.nombre_areaMateria = nombre_areaMateria;
     }

    id_areaMateria: number;
    cont: number;
    id_colegio: number;
    nombre_areaMateria: string;
}