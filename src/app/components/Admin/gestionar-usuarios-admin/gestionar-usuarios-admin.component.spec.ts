import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarUsuariosAdminComponent } from './gestionar-usuarios-admin.component';

describe('GestionarUsuariosAdminComponent', () => {
  let component: GestionarUsuariosAdminComponent;
  let fixture: ComponentFixture<GestionarUsuariosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarUsuariosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarUsuariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
