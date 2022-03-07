import { Pipe, PipeTransform } from '@angular/core';
import { ContentREAService } from '../services/content-rea.service';
import { MateriaI } from '../models/materia';

@Pipe({
  name: 'filterCompetencia'
})
export class FilterCompetenciaPipe implements PipeTransform {

  Materia:MateriaI[];
  id_areaMateria:number;

  constructor(private ContentREAService: ContentREAService) {
    this.ContentREAService.allSubject().subscribe(res =>{
      this.Materia = res as MateriaI[];
    });
  }
  
  //transform(value: any, ...args: any[]): any {
    transform(items: any, nombreCSearch: string, materiaCSearch: number, gradoCSearch: number) {

      if (this.Materia) {
        for (let n = 0; n < this.Materia.length; n++) {
          if (materiaCSearch == this.Materia[n].id_materia) {
            this.id_areaMateria = this.Materia[n].id_areaMateria;
          }
        }
      }
      //console.log("entradas:", nombreCSearch,  materiaCSearch, gradoCSearch);
      //console.log("id_area", this.id_areaMateria);
      //console.log("item:", items);

      if (items && items.length) {
        return items.filter(item => {
          if (nombreCSearch && item.nombre_competencia.toLowerCase().indexOf(nombreCSearch.toLowerCase()) === -1) {
            return false;
          }
          if (materiaCSearch && item.id_areaMateria != this.id_areaMateria) {
            return false;
          }
          if (item.id_areaMateria == 0) {
            return false;
          }
          if (gradoCSearch && item.gradoInicial > gradoCSearch) {
            return false;
          }
          if (gradoCSearch && item.gradoFinal < gradoCSearch) {
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
