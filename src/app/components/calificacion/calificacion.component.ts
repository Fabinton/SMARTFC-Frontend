import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent implements OnInit {
  public stars: boolean[] = Array(5).fill(false);
  constructor() { 
    let ratingg = 2;
    this.stars = this.stars.map((_, i) => ratingg > i);
  }

  ngOnInit(): void {
  }

}
