import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContent'
})
export class FilterContentPipe implements PipeTransform {

  //transform(value: any, ...args: any[]): any {
  transform(items: any, nombreSearch: string, materiaSearch: number, gradoSearch: number, docenteSearch: number, tipoContenidoSearch: number, id_taller: number) {
    //console.log("entradas:", nombreSearch,  materiaSearch, gradoSearch, docenteSearch, tipoContenidoSearch, id_taller);
    //console.log("item:", items);
    if (items && items.length) {
      return items.filter(item => {
        if (nombreSearch && item.nombre_CREA.toLowerCase().indexOf(nombreSearch.toLowerCase()) === -1) {
          return false;
        }
        if (materiaSearch && item.materia != materiaSearch) {
          return false;
        }
        if (gradoSearch && item.id_grado != gradoSearch) {
          return false;
        }
        if (docenteSearch && item.id_docente != docenteSearch) {
          return false;
        }
        if (tipoContenidoSearch && item.tipo_CREA != tipoContenidoSearch) {
          return false;
        }
        if (id_taller && item.tipo_CREA == id_taller) {
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
