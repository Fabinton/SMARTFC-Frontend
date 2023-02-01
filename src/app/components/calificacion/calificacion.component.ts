import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {
  @Input() calificacion: number;
  public stars: boolean[] = Array(5).fill(false);
  constructor() { 
  }

  ngOnInit(): void {
    this.setStart();
  }

  setStart(){
    this.stars = this.stars.map((_, i) => this.calificacion > i);
  }

}
