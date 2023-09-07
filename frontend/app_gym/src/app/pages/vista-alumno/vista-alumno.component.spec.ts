import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAlumnoComponent } from './vista-alumno.component';

describe('VistaAlumnoComponent', () => {
  let component: VistaAlumnoComponent;
  let fixture: ComponentFixture<VistaAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaAlumnoComponent]
    });
    fixture = TestBed.createComponent(VistaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
