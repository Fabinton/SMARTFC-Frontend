import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVisitanteComponent } from './header-visitante.component';

describe('HeaderVisitanteComponent', () => {
  let component: HeaderVisitanteComponent;
  let fixture: ComponentFixture<HeaderVisitanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderVisitanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderVisitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
