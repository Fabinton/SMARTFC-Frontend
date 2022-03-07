import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDuda'
})
export class FilterDudaPipe implements PipeTransform {

  //transform(value: any, ...args: any[]): any {
  transform(items: any, nombreSearch: string, materiaSearch: number, gradoSearch: number, docenteSearch: number, estadoDuda: number, nombreEstudianteSearch: string) {
    //console.log("entradas:", nombreSearch, nombreEstudianteSearch,  materiaSearch, gradoSearch, docenteSearch, estadoDuda);
    //console.log("item:", items);
    if (items && items.length) {
      return items.filter(item => {
        if (nombreSearch && item.nombre_actividad.toLowerCase().indexOf(nombreSearch.toLowerCase()) === -1) {
          return false;
        }
        if (nombreEstudianteSearch && item.estudiante.toLowerCase().indexOf(nombreEstudianteSearch.toLowerCase()) === -1) {
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
        if (item.estado_duda != estadoDuda) {
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
