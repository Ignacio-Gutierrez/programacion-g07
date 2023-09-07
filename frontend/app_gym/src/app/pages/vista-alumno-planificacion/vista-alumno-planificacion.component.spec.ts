import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAlumnoPlanificacionComponent } from './vista-alumno-planificacion.component';

describe('VistaAlumnoPlanificacionComponent', () => {
  let component: VistaAlumnoPlanificacionComponent;
  let fixture: ComponentFixture<VistaAlumnoPlanificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaAlumnoPlanificacionComponent]
    });
    fixture = TestBed.createComponent(VistaAlumnoPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
