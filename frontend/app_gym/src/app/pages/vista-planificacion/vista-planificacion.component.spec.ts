import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPlanificacionComponent } from './vista-planificacion.component';

describe('VistaPlanificacionComponent', () => {
  let component: VistaPlanificacionComponent;
  let fixture: ComponentFixture<VistaPlanificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaPlanificacionComponent]
    });
    fixture = TestBed.createComponent(VistaPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
