import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDocenteAdmin'
})
export class FilterDocenteAdminPipe implements PipeTransform {

  //transform(value: any, ...args: any[]): any {
  transform(items: any, palabraSearch: string, colegioSearch: number) {
    //console.log("entradas:", nombreSearch, colegioSearch);
    //console.log("item:", items);
    
    if (items && items.length) {
      return items.filter(item => {
        if (palabraSearch && (item.nombre_docente.toLowerCase().indexOf(palabraSearch.toLowerCase()) === -1) && 
           (item.apellido_docente.toLowerCase().indexOf(palabraSearch.toLowerCase()) === -1) && 
           (item.nombre_usuario.toLowerCase().indexOf(palabraSearch.toLowerCase()) === -1) && 
           (item.correo_electronico.toLowerCase().indexOf(palabraSearch.toLowerCase()) === -1)) {
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
