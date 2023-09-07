import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaProfesorPerfilAlumnoComponent } from './vista-profesor-perfil-alumno.component';

describe('VistaProfesorPerfilAlumnoComponent', () => {
  let component: VistaProfesorPerfilAlumnoComponent;
  let fixture: ComponentFixture<VistaProfesorPerfilAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaProfesorPerfilAlumnoComponent]
    });
    fixture = TestBed.createComponent(VistaProfesorPerfilAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
