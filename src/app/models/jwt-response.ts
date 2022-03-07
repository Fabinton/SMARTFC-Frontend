export interface JwtResponseI {
    dataDocente:{
        id_docente: number,
        tipo_usuario: number,
        nombre_docente: string,
        apellido_docente: string,
        id_colegio: number,
        nombre_usuario: string,
        contrasena: string,
        correo_electronico: string
        accessToken: string,
        expiresIn: string
    }

    dataAdmin:{
        id_admin: number,
        tipo_usuario: number,
        id_colegio: number,
        nombre_usuario: string,
        contrasena: string,
        accessToken: string,
        expiresIn: string
    }
}
