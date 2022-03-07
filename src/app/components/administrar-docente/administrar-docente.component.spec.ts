import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarDocenteComponent } from './administrar-docente.component';

describe('AdministrarDocenteComponent', () => {
  let component: AdministrarDocenteComponent;
  let fixture: ComponentFixture<AdministrarDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
