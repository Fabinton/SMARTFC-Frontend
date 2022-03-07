import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEstudiantesAdmin'
})
export class FilterEstudiantesAdminPipe implements PipeTransform {

  //transform(value: any, ...args: any[]): any {
  transform(items: any, palabraSearch: string, gradoSearch: number, cursoSearch: number, colegioSearch: number) {
    //console.log("entradas:", palabraSearch, gradoSearch, cursoSearch, colegioSearch);
    //console.log("item:", items);

    if (items && items.length) {
      
      return items.filter(item => {
        if (palabraSearch && (item.nombre_estudiante.toLowerCase().indexOf(palabraSearch.toLowerCase()) === -1) && 
           (item.apellido_estudiante.toLowerCase().indexOf(palabraSearch.toLowerCase()) === -1) && 
           (item.nombre_usuario.toLowerCase().indexOf(palabraSearch.toLowerCase()) === -1) && 
           (item.correo_electronico.toLowerCase().indexOf(palabraSearch.toLowerCase()) === -1)) {
          return false;
        }
        if (gradoSearch && item.grado_estudiante != gradoSearch) {
          return false;
        }
        if (cursoSearch && item.curso_estudiante != cursoSearch) {
          return false;
        }
        if (colegioSearch && item.id_colegio != colegioSearch) {
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
