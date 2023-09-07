import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaProfesorPlanificacionComponent } from './vista-profesor-planificacion.component';

describe('VistaProfesorPlanificacionComponent', () => {
  let component: VistaProfesorPlanificacionComponent;
  let fixture: ComponentFixture<VistaProfesorPlanificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaProfesorPlanificacionComponent]
    });
    fixture = TestBed.createComponent(VistaProfesorPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
