export interface EventoI {
    
    id_evento: number,
    id_actividad: number, 
    id_estudiante: number,
    data_start: string,
    hour_start: string,
    data_end: string,
    hour_end: string,
    check_download: number,
    check_inicio: number,
    check_fin: number,
    check_answer: number,
    count_video: number,
    check_video: number,
    check_documento: number,
    check_a1: string,
    check_a2: string,
    check_a3: string,
    check_profile: number,
    answers:[],
    oculto: number
}