import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaProfesorComponent } from './vista-profesor.component';

describe('VistaProfesorComponent', () => {
  let component: VistaProfesorComponent;
  let fixture: ComponentFixture<VistaProfesorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaProfesorComponent]
    });
    fixture = TestBed.createComponent(VistaProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
