import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioProfesoresComponent } from './inicio-profesores.component';

describe('InicioProfesoresComponent', () => {
  let component: InicioProfesoresComponent;
  let fixture: ComponentFixture<InicioProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioProfesoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
