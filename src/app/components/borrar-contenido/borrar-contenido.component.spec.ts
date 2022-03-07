import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrarContenidoComponent } from './borrar-contenido.component';

describe('BorrarContenidoComponent', () => {
  let component: BorrarContenidoComponent;
  let fixture: ComponentFixture<BorrarContenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrarContenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarContenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
