export class AdminI {

    constructor(id_admin = 0, tipo_usuario = 3, id_colegio = 0, nombre_usuario = '',
                 contrasena = '', accessToken = '', expiresIn = ''){
            this.id_admin = id_admin;
            this.tipo_usuario = tipo_usuario;
            this.id_colegio = id_colegio;
            this.nombre_usuario = nombre_usuario;
            this.contrasena = contrasena;
            this.accessToken = accessToken;
            this.expiresIn = expiresIn;
    }

    id_admin: number;
    tipo_usuario: number;
    id_colegio: number;
    nombre_usuario: string;
    contrasena: string;
    accessToken: string;
    expiresIn: string;
}
