export class DocenteI {

    constructor(id_docente = 0, cont = 0, tipo_usuario = 2, nombre_docente = '', apellido_docente = '',
        id_colegio = 0, nombre_usuario = '', contrasena = '', correo_electronico = ''){
            this.id_docente = id_docente;
            this.cont = cont;
            this.tipo_usuario = tipo_usuario;
            this.nombre_docente = nombre_docente;
            this.apellido_docente = apellido_docente;
            this.id_colegio = id_colegio;
            this.nombre_usuario = nombre_usuario;
            this.contrasena = contrasena;
            this.correo_electronico = correo_electronico;
    }

    id_docente: number;
    cont: number;
    tipo_usuario: number;
    nombre_docente: string; 
    apellido_docente: string;
    id_colegio: number;
    nombre_usuario: string;
    contrasena: string;
    correo_electronico: string;
}
