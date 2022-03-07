import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterActividadDelete'
})
export class FilterActividadDeletePipe implements PipeTransform {

  //transform(value: any, ...args: any[]): any {
    transform(items: any, nombreSearch: string, materiaSearch: number, gradoSearch: number, docenteSearch: number, competenciaSearch: number) {
      //console.log("entradas:", nombreSearch,  materiaSearch, gradoSearch, docenteSearch, competenciaSearch);
      //console.log("item:", items);
      if (items && items.length) {
        return items.filter(item => {
          if (nombreSearch && item.titulo_actividad.toLowerCase().indexOf(nombreSearch.toLowerCase()) === -1) {
            return false;
          }
          if (materiaSearch && item.id_materia != materiaSearch) {
            return false;
          }
          if (gradoSearch && item.id_grado != gradoSearch) {
            return false;
          }
          if (docenteSearch && item.id_docente != docenteSearch) {
            return false;
          }
          if (competenciaSearch && item.id_competencia != competenciaSearch) {
            return false;
          }
          return true;
        })
      }
      else {
        return items;
      }
    }

}
