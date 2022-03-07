import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEstudianteMetricas'
})
export class FilterEstudianteMetricasPipe implements PipeTransform {

  //transform(value: any, ...args: any[]): any {
  transform(items: any, palabraSearch: string, optionSearch: number) {
    //console.log("entradas:", palabraSearch, optionSearch);
    //console.log("item:", items);

    if (items && items.length) {
      
      return items.filter(item => {
        if (palabraSearch && (item.estudiante.toLowerCase().indexOf(palabraSearch.toLowerCase()) === -1)) {
          return false;
        }
        if (optionSearch && optionSearch == 1 && item.check_contenido != 1) {
          return false;
        }
        if (optionSearch && optionSearch == 2 && item.check_quiz != 1) {
          return false;
        }
        if (optionSearch && optionSearch == 3 && item.check_taller != 1) {
          return false;
        }
        if (optionSearch && optionSearch == 4 && item.check_evaluacion != 1) {
          return false;
        }
        if (optionSearch && optionSearch == 5 && item.check_contenido != 0) {
          return false;
        }
        if (optionSearch && optionSearch == 6 && item.check_quiz != 0) {
          return false;
        }
        if (optionSearch && optionSearch == 7 && item.check_taller != 0) {
          return false;
        }
        if (optionSearch && optionSearch == 8 && item.check_evaluacion != 0) {
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
