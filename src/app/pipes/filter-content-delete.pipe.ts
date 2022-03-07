import { Pipe, PipeTransform } from '@angular/core';
import { DocenteI } from '../models/docente';
import { AuthDService } from '../services/auth-d.service';

@Pipe({
  name: 'filterContentDelete'
})
export class FilterContentDeletePipe implements PipeTransform {

  id_docenteAuth:number;

  constructor(private AuthDService: AuthDService) {
    this.id_docenteAuth = this.AuthDService.getIdDocente() as number;
  }

  //transform(value: any, ...args: any[]): any {
  transform(items: any, nombreSearch: string, materiaSearch: string, gradoSearch: number, tipoContenidoSearch: number) {
    //console.log("entradas:", nombreSearch,  materiaSearch, gradoSearch, tipoContenidoSearch);
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
        if (tipoContenidoSearch && item.tipo_CREA != tipoContenidoSearch) {
          return false;
        }
        if (this.id_docenteAuth && item.id_docente != this.id_docenteAuth) {
          return false;
        }
        if (item.en_uso != 0) {
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
