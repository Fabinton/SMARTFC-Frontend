import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMateriaactivaAdmin'
})
export class FilterMateriaactivaAdminPipe implements PipeTransform {

  //transform(value: any, ...args: any[]): any {
  transform(items: any, materiaSearch: number, gradoSearch: number, docenteSearch: number, colegioSearch: number) {
    //console.log("entradas:", materiaSearch, gradoSearch, docenteSearch, colegioSearch);
    //console.log("item:", items);
    if (items && items.length) {
      return items.filter(item => {
        if (materiaSearch && item.id_materia != materiaSearch) {
          return false;
        }
        if (gradoSearch && item.id_grado != gradoSearch) {
          return false;
        }
        if (docenteSearch && item.id_docente != docenteSearch) {
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