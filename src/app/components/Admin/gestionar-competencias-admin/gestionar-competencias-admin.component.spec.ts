import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCompetenciasAdminComponent } from './gestionar-competencias-admin.component';

describe('GestionarCompetenciasAdminComponent', () => {
  let component: GestionarCompetenciasAdminComponent;
  let fixture: ComponentFixture<GestionarCompetenciasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCompetenciasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCompetenciasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
