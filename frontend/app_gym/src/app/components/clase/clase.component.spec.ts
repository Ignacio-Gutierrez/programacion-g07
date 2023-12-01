import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseComponent } from './clase.component';

describe('ClaseComponent', () => {
  let component: ClaseComponent;
  let fixture: ComponentFixture<ClaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaseComponent]
    });
    fixture = TestBed.createComponent(ClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
