import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdminPlanificacionComponent } from './vista-admin-planificacion.component';

describe('VistaAdminPlanificacionComponent', () => {
  let component: VistaAdminPlanificacionComponent;
  let fixture: ComponentFixture<VistaAdminPlanificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaAdminPlanificacionComponent]
    });
    fixture = TestBed.createComponent(VistaAdminPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
