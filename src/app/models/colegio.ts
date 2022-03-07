export class ColegioI {

    constructor(id_colegio = 0, nombre_colegio = "", ciudad = "", direccion = "", telefono = 0,
        tipo_colegio = '', calendario = '', colegioActivo = 0){
            this.id_colegio = id_colegio;
            this.nombre_colegio = nombre_colegio;
            this.ciudad = ciudad;
            this.direccion = direccion;
            this.telefono = telefono;
            this.tipo_colegio = tipo_colegio;
            this.calendario = calendario;
            this.colegioActivo = colegioActivo;
    }

    id_colegio: number;
    nombre_colegio: string;
    ciudad: string;
    direccion: string;
    telefono: number;
    tipo_colegio: string;
    calendario: string;
    colegioActivo: number;
}