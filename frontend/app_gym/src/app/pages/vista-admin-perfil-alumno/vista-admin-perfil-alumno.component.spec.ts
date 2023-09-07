import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdminPerfilAlumnoComponent } from './vista-admin-perfil-alumno.component';

describe('VistaAdminPerfilAlumnoComponent', () => {
  let component: VistaAdminPerfilAlumnoComponent;
  let fixture: ComponentFixture<VistaAdminPerfilAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaAdminPerfilAlumnoComponent]
    });
    fixture = TestBed.createComponent(VistaAdminPerfilAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
