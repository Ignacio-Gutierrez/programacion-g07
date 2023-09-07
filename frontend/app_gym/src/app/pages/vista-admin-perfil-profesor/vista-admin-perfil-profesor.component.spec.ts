import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdminPerfilProfesorComponent } from './vista-admin-perfil-profesor.component';

describe('VistaAdminPerfilProfesorComponent', () => {
  let component: VistaAdminPerfilProfesorComponent;
  let fixture: ComponentFixture<VistaAdminPerfilProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaAdminPerfilProfesorComponent]
    });
    fixture = TestBed.createComponent(VistaAdminPerfilProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
