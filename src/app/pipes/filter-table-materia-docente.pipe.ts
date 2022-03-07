import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTableMateriaDocente'
})
export class FilterTableMateriaDocentePipe implements PipeTransform {


  //transform(value: any, ...args: any[]): any {
  transform(items: any, idDocenteSearch: any) {
    //console.log("entradas:", idDocenteSearch);
    //console.log("item:", items);
    if (items && items.length) {
      return items.filter(item => {
        if (idDocenteSearch && item.id_docente != idDocenteSearch) {
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
