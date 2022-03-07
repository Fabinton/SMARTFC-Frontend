import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfromacionDocenteComponent } from './infromacion-docente.component';

describe('InfromacionDocenteComponent', () => {
  let component: InfromacionDocenteComponent;
  let fixture: ComponentFixture<InfromacionDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfromacionDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfromacionDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
