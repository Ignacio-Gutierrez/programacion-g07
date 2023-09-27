import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaErrorComponent } from './vista-error.component';

describe('VistaErrorComponent', () => {
  let component: VistaErrorComponent;
  let fixture: ComponentFixture<VistaErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaErrorComponent]
    });
    fixture = TestBed.createComponent(VistaErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
