import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarActividadComponent } from './borrar-actividad.component';

describe('BorrarActividadComponent', () => {
  let component: BorrarActividadComponent;
  let fixture: ComponentFixture<BorrarActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
