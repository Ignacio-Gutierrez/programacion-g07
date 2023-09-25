import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaInicioComponent } from './vista-inicio.component';

describe('VistaInicioComponent', () => {
  let component: VistaInicioComponent;
  let fixture: ComponentFixture<VistaInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaInicioComponent]
    });
    fixture = TestBed.createComponent(VistaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
