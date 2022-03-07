import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCompetenciaAdmin'
})
export class FilterCompetenciaAdminPipe implements PipeTransform {

  //transform(value: any, ...args: any[]): any {
  transform(items: any, nombreCSearch: string, areaMateriaCSearch: number, gradoCSearch: number, gradoInicialCSearch: number, gradoFinalCSearch: number, colegioCSearch: number) {
    //console.log("entradas:", nombreCSearch,  areaMateriaCSearch, gradoCSearch,  gradoInicialCSearch, gradoFinalCSearch, colegioCSearch);
    //console.log("item:", items);

    if (items && items.length) {
      return items.filter(item => {
        if (nombreCSearch && item.nombre_competencia.toLowerCase().indexOf(nombreCSearch.toLowerCase()) === -1) {
          return false;
        }
        if (areaMateriaCSearch && item.id_areaMateria != areaMateriaCSearch) {
          return false;
        }
        if ((gradoInicialCSearch && gradoFinalCSearch) && (item.gradoInicial != gradoInicialCSearch || item.gradoFinal != gradoFinalCSearch)) {
          return false;
        }
        if (gradoCSearch && item.gradoInicial > gradoCSearch) {
          return false;
        }
        if (gradoCSearch && item.gradoFinal < gradoCSearch) {
          return false;
        }
        if (colegioCSearch && item.id_colegio != colegioCSearch) {
          return false;
        }
        if (item.id_areaMateria == 0) {
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
