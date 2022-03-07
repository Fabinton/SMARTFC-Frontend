export class EstuadianteI {
    
    constructor(id_estudiante = 0, tipo_usuario = 1, nombre_estudiante = '', apellido_estudiante = '',
        id_colegio = 0, nombre_usuario = '', contrasena = '', correo_electronico = '', grado_estudiante = 0,
        curso_estudiante = 0,){
            this.id_estudiante = id_estudiante;
            this.tipo_usuario = tipo_usuario;
            this.nombre_estudiante = nombre_estudiante;
            this.apellido_estudiante = apellido_estudiante;
            this.grado_estudiante = grado_estudiante;
            this.curso_estudiante = curso_estudiante;
            this.id_colegio = id_colegio;
            this.nombre_usuario = nombre_usuario;
            this.contrasena = contrasena;
            this.correo_electronico = correo_electronico;
    }
    
    id_estudiante: number;
    tipo_usuario: number;
    nombre_estudiante: string; 
    apellido_estudiante:string;
    grado_estudiante: number;
    curso_estudiante: number;
    id_colegio: number;
    nombre_usuario: string;
    contrasena: string;
    correo_electronico: string;
}