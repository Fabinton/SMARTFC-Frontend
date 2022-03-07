import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarColegioAdminComponent } from './gestionar-colegio-admin.component';

describe('GestionarColegioAdminComponent', () => {
  let component: GestionarColegioAdminComponent;
  let fixture: ComponentFixture<GestionarColegioAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarColegioAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarColegioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
